import * as ts from 'typescript';
import * as fs from 'fs/promises';
import * as path from 'path';
import { पुस्तकालयघोषणा, पुस्तकालयत्रुटि } from '../stdlib/core';

interface सुरक्षाजांच {
    नाम: string;
    विवरण: string;
    जांचकरें: (स्रोत: string) => Promise<string[]>;
}

export class पुस्तकालयवैधक {
    private static readonly सुरक्षाजांचें: सुरक्षाजांच[] = [
        {
            नाम: 'असुरक्षित_eval',
            विवरण: 'eval का उपयोग असुरक्षित है',
            जांचकरें: async (स्रोत: string) => {
                const त्रुटियाँ: string[] = [];
                if (स्रोत.includes('eval(')) {
                    त्रुटियाँ.push('eval का उपयोग वर्जित है');
                }
                return त्रुटियाँ;
            }
        },
        {
            नाम: 'असुरक्षित_function',
            विवरण: 'Function कंस्ट्रक्टर का उपयोग असुरक्षित है',
            जांचकरें: async (स्रोत: string) => {
                const त्रुटियाँ: string[] = [];
                if (स्रोत.includes('new Function(')) {
                    त्रुटियाँ.push('Function कंस्ट्रक्टर का उपयोग वर्जित है');
                }
                return त्रुटियाँ;
            }
        },
        {
            नाम: 'अमान्य_आयात',
            विवरण: 'अमान्य मॉड्यूल आयात',
            जांचकरें: async (स्रोत: string) => {
                const त्रुटियाँ: string[] = [];
                const निषिद्धमॉड्यूल = ['fs', 'child_process', 'http', 'https'];
                for (const मॉड्यूल of निषिद्धमॉड्यूल) {
                    if (स्रोत.includes(`from '${मॉड्यूल}'`)) {
                        त्रुटियाँ.push(`${मॉड्यूल} मॉड्यूल का आयात वर्जित है`);
                    }
                }
                return त्रुटियाँ;
            }
        }
    ];

    static async वैधता(पथ: string, घोषणा: पुस्तकालयघोषणा): Promise<string[]> {
        const त्रुटियाँ: string[] = [];

        try {
            // Check required files
            const आवश्यकफ़ाइलें = ['manifest.json', 'README.md', 'LICENSE'];
            for (const फ़ाइल of आवश्यकफ़ाइलें) {
                try {
                    await fs.access(path.join(पथ, फ़ाइल));
                } catch {
                    त्रुटियाँ.push(`आवश्यक फ़ाइल ${फ़ाइल} नहीं मिली`);
                }
            }

            // Read main file
            const मुख्यफ़ाइलपथ = path.join(पथ, घोषणा.मुख्यफ़ाइल);
            let स्रोत: string;
            try {
                स्रोत = await fs.readFile(मुख्यफ़ाइलपथ, 'utf-8');
            } catch {
                त्रुटियाँ.push('मुख्य फ़ाइल नहीं मिली');
                return त्रुटियाँ;
            }

            // Validate TypeScript syntax
            const टाइपस्क्रिप्टत्रुटियाँ = await this.टाइपस्क्रिप्टसत्यापन(स्रोत);
            त्रुटियाँ.push(...टाइपस्क्रिप्टत्रुटियाँ);

            // Run security checks
            for (const जांच of this.सुरक्षाजांचें) {
                const सुरक्षात्रुटियाँ = await जांच.जांचकरें(स्रोत);
                त्रुटियाँ.push(...सुरक्षात्रुटियाँ);
            }

            // Check for documentation
            const डॉक्सत्रुटियाँ = await this.दस्तावेज़ीकरणसत्यापन(स्रोत);
            त्रुटियाँ.push(...डॉक्सत्रुटियाँ);

            // Check test coverage
            const टेस्टत्रुटियाँ = await this.टेस्टसत्यापन(पथ);
            त्रुटियाँ.push(...टेस्टत्रुटियाँ);

        } catch (error) {
            त्रुटियाँ.push(`सत्यापन के दौरान त्रुटि: ${(error as Error).message}`);
        }

        return त्रुटियाँ;
    }

    private static async टाइपस्क्रिप्टसत्यापन(स्रोत: string): Promise<string[]> {
        const त्रुटियाँ: string[] = [];

        const कंपाइलरविकल्प: ts.CompilerOptions = {
            strict: true,
            noImplicitAny: true,
            noUnusedLocals: true,
            noUnusedParameters: true
        };

        const अस्थायीफ़ाइल = ts.createSourceFile(
            'temp.ts',
            स्रोत,
            ts.ScriptTarget.Latest,
            true
        );

        const प्रोग्राम = ts.createProgram(['temp.ts'], कंपाइलरविकल्प);
        const डायग्नोस्टिक्स = ts.getPreEmitDiagnostics(प्रोग्राम);

        डायग्नोस्टिक्स.forEach(डायग्नोस्टिक => {
            if (डायग्नोस्टिक.file) {
                const { line, character } = डायग्नोस्टिक.file.getLineAndCharacterOfPosition(डायग्नोस्टिक.start!);
                त्रुटियाँ.push(`पंक्ति ${line + 1}, स्तंभ ${character + 1}: ${ts.flattenDiagnosticMessageText(डायग्नोस्टिक.messageText, '\n')}`);
            }
        });

        return त्रुटियाँ;
    }

    private static async दस्तावेज़ीकरणसत्यापन(स्रोत: string): Promise<string[]> {
        const त्रुटियाँ: string[] = [];

        // Check for JSDoc comments on exported elements
        const फ़ाइल = ts.createSourceFile(
            'temp.ts',
            स्रोत,
            ts.ScriptTarget.Latest,
            true
        );

        const जांचनोड = (नोड: ts.Node) => {
            if (ts.isClassDeclaration(नोड) || ts.isFunctionDeclaration(नोड) || ts.isMethodDeclaration(नोड)) {
                if (this.हैनिर्यात(नोड) && !this.हैजेएसडॉक(नोड)) {
                    const नाम = (नोड as any).name?.text || 'अज्ञात';
                    त्रुटियाँ.push(`${ts.SyntaxKind[नोड.kind]} '${नाम}' में JSDoc दस्तावेज़ीकरण की कमी है`);
                }
            }
            ts.forEachChild(नोड, जांचनोड);
        };

        जांचनोड(फ़ाइल);

        return त्रुटियाँ;
    }

    private static async टेस्टसत्यापन(पथ: string): Promise<string[]> {
        const त्रुटियाँ: string[] = [];

        // Check for test file existence
        const टेस्टडायरेक्टरी = path.join(पथ, '__tests__');
        try {
            await fs.access(टेस्टडायरेक्टरी);
            const टेस्टफ़ाइलें = await fs.readdir(टेस्टडायरेक्टरी);
            
            if (टेस्टफ़ाइलें.length === 0) {
                त्रुटियाँ.push('कोई टेस्ट फ़ाइल नहीं मिली');
            }
        } catch {
            त्रुटियाँ.push('टेस्ट डायरेक्टरी नहीं मिली');
        }

        return त्रुटियाँ;
    }

    private static हैनिर्यात(नोड: ts.Node): boolean {
        if (ts.canHaveModifiers(नोड)) {
            const modifiers = ts.getModifiers(नोड);
            return modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword) ?? false;
        }
        return false;
    }

    private static हैजेएसडॉक(नोड: ts.Node): boolean {
        const टेक्स्ट = नोड.getFullText();
        const टेक्स्टपहले = टेक्स्ट.substring(0, नोड.getLeadingTriviaWidth());
        return टेक्स्टपहले.includes('/**') && टेक्स्टपहले.includes('*/');
    }
}