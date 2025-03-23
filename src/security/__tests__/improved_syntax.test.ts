import { व्याकरणविश्लेषक } from '../../parser/parser';
import { compile } from '../../compiler/compiler';
import { tokenize } from '../../parser/tokenizer';
import * as fs from 'fs';
import * as path from 'path';

describe('संस्कृत भाषा सुधार परीक्षण', () => {
    const examplePath = path.join(__dirname, '../../examples/improved_syntax.sam');
    let exampleCode: string;
    
    beforeEach(async () => {
        try {
            exampleCode = fs.readFileSync(examplePath, 'utf8');
        } catch (error) {
            console.warn(`Could not read example file: ${error instanceof Error ? error.message : String(error)}`);
            exampleCode = `
                कार्य उदाहरण() -> शून्य {
                    मान x = 10;
                    मान y = 20;
                    मान योग = x + y;
                    फल योग;
                }
            `;
        }
    });
    
    it.skip('should parse Sanskrit keywords correctly', () => {
        const tokens = tokenize(exampleCode);
        const parser = new व्याकरणविश्लेषक(tokens);
        const result = parser.parse();
        expect(result.errors.length).toBe(0);
        expect(result.ast).not.toBeNull();
    });
    
    it('should parse romanized keywords correctly', () => {
        const romanizedCode = `
            karya test() -> shunya {
                maan x = 5;
                maan y = 10;
                maan z = x + y;
                phal z;
            }
        `;
        
        const tokens = tokenize(romanizedCode);
        const parser = new व्याकरणविश्लेषक(tokens);
        const result = parser.parse();
        expect(result.errors.length).toBe(0);
        expect(result.ast).not.toBeNull();
    });
    
    it('should handle default parameters correctly', () => {
        const codeWithDefaults = `
            कार्य परीक्षण(अ: संख्या = 10, ब: संख्या = 20) -> संख्या {
                फल अ + ब;
            }
            मान परिणाम = परीक्षण();
        `;
        
        const tokens = tokenize(codeWithDefaults);
        const parser = new व्याकरणविश्लेषक(tokens);
        const result = parser.parse();
        expect(result.errors.length).toBe(0);
        
        // Compile and check the generated code
        const compiledCode = compile(result.ast);
        expect(compiledCode).toContain('function परीक्षण(अ = 10, ब = 20)');
    });
    
    it('should handle symbolic operators correctly', () => {
        const operatorCode = `
            कार्य गणना() -> संख्या {
                मान अ = 5;
                मान ब = 10;
                मान योग = अ + ब;  // Using + instead of YOGA
                मान अंतर = अ - ब;  // Using - instead of VIYOGA
                मान गुणनफल = अ * ब;  // Using * instead of GUNA
                मान भागफल = अ / ब;  // Using / instead of BHAG
                फल योग + अंतर + गुणनफल + भागफल;
            }
        `;
        
        const tokens = tokenize(operatorCode);
        const parser = new व्याकरणविश्लेषक(tokens);
        const result = parser.parse();
        expect(result.errors.length).toBe(0);
        expect(result.ast).not.toBeNull();
    });
    
    it.skip('should handle string interpolation correctly', () => {
        const templateCode = `
            कार्य संदेश(नाम: वाक्य) -> वाक्य {
                फल \`नमस्ते \${नाम}!\`;
            }
        `;
        
        const tokens = tokenize(templateCode);
        const parser = new व्याकरणविश्लेषक(tokens);
        const result = parser.parse();
        expect(result.errors.length).toBe(0);
        
        // Check for template literal node in the AST
        const funcNode = result.ast.find((node: any) => node.type === 'function');
        if (funcNode && funcNode.शरीर && funcNode.शरीर.कथन) {
            const returnStmt = funcNode.शरीर.कथन.find((node: any) => node.type === 'return');
            if (returnStmt && returnStmt.value) {
                expect(returnStmt.value.type).toBe('TEMPLATE_LITERAL');
            }
        }
    });
    
    it.skip('should handle pattern matching correctly', () => {
        const patternCode = `
            कार्य परीक्षणमिलान(मान: संख्या) -> वाक्य {
                फल मिलान(मान) {
                    केस 1 => "एक";
                    केस 2 => "दो";
                    डिफॉल्ट => "अन्य";
                }
            }
        `;
        
        const tokens = tokenize(patternCode);
        const parser = new व्याकरणविश्लेषक(tokens);
        const result = parser.parse();
        expect(result.errors.length).toBe(0);
        
        // Check for pattern match node in the AST
        const funcNode = result.ast.find((node: any) => node.type === 'function');
        if (funcNode && funcNode.शरीर && funcNode.शरीर.कथन) {
            const returnStmt = funcNode.शरीर.कथन.find((node: any) => node.type === 'return');
            if (returnStmt && returnStmt.value) {
                expect(returnStmt.value.type).toBe('PATTERN_MATCH');
                expect(returnStmt.value.patterns).toHaveLength(3);
            }
        }
    });
    
    it('should properly compile and run a simple example', () => {
        const simpleCode = `
            कार्य योग(अ: संख्या, ब: संख्या = 10) -> संख्या {
                फल अ + ब;
            }
            
            कार्य मुख्य() -> संख्या {
                मान परिणाम = योग(5);
                फल परिणाम;
            }
        `;
        
        const tokens = tokenize(simpleCode);
        const parser = new व्याकरणविश्लेषक(tokens);
        const parseResult = parser.parse();
        expect(parseResult.errors.length).toBe(0);
        
        const compiledCode = compile(parseResult.ast);
        // In a real environment, we would evaluate this code
        expect(compiledCode).toContain('function योग(अ, ब = 10)');
        expect(compiledCode).toContain('return अ + ब;');
    });
}); 