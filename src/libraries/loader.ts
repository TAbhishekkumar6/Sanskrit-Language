import { पुस्तकालयघोषणा, पुस्तकालयत्रुटि } from '../stdlib/core';
import { मानकनियम, नियमसत्यापक } from './config';
import { संस्करणउपयोगिता } from './utils/version';
import * as fs from 'fs/promises';
import * as path from 'path';

interface निर्भरताग्राफ {
    [key: string]: {
        संस्करण: string;
        निर्भरता: string[];
        लोडहोगया: boolean;
    };
}

export class पुस्तकालयलोडर {
    private static instance: पुस्तकालयलोडर;
    private लोडेडपुस्तकालय = new Map<string, any>();
    private निर्भरताग्राफ: निर्भरताग्राफ = {};

    private constructor() {}

    static प्राप्त(): पुस्तकालयलोडर {
        if (!पुस्तकालयलोडर.instance) {
            पुस्तकालयलोडर.instance = new पुस्तकालयलोडर();
        }
        return पुस्तकालयलोडर.instance;
    }

    async लोड(पुस्तकालयपथ: string): Promise<any> {
        try {
            // Read and validate manifest
            const घोषणापथ = path.join(पुस्तकालयपथ, 'manifest.json');
            const घोषणा: पुस्तकालयघोषणा = JSON.parse(
                await fs.readFile(घोषणापथ, 'utf-8')
            );

            // Validate library structure and version
            await this.संरचनासत्यापन(पुस्तकालयपथ, घोषणा);

            // Check if already loaded with compatible version
            const लोडेडवर्जन = this.लोडेडपुस्तकालय.get(घोषणा.नाम)?.संस्करण;
            if (लोडेडवर्जन && संस्करणउपयोगिता.संगतहै(लोडेडवर्जन, घोषणा.संस्करण)) {
                return this.लोडेडपुस्तकालय.get(घोषणा.नाम).मॉड्यूल;
            }

            // Build dependency graph
            await this.निर्भरताग्राफनिर्माण(घोषणा, पुस्तकालयपथ);

            // Validate dependency graph for cycles
            this.चक्रपरीक्षण(घोषणा.नाम);

            // Load dependencies in correct order
            await this.क्रमिकनिर्भरतालोड(घोषणा.नाम);

            // Load the main library file
            const मुख्यफ़ाइलपथ = path.join(पुस्तकालयपथ, घोषणा.मुख्यफ़ाइल);
            const मॉड्यूल = await this.सुरक्षितआयात(मुख्यफ़ाइलपथ);

            // Register the loaded library
            this.लोडेडपुस्तकालय.set(घोषणा.नाम, {
                मॉड्यूल,
                संस्करण: घोषणा.संस्करण
            });

            return मॉड्यूल;
        } catch (error) {
            throw new पुस्तकालयत्रुटि(`पुस्तकालय लोड करने में त्रुटि: ${(error as Error).message}`);
        }
    }

    private async संरचनासत्यापन(पथ: string, घोषणा: पुस्तकालयघोषणा): Promise<void> {
        // Check required files
        for (const फ़ाइल of मानकनियम.अनिवार्यफ़ाइल) {
            const फ़ाइलपथ = path.join(पथ, फ़ाइल);
            try {
                await fs.access(फ़ाइलपथ);
            } catch {
                throw new Error(`आवश्यक फ़ाइल नहीं मिली: ${फ़ाइल}`);
            }
        }

        // Validate version format
        if (!संस्करणउपयोगिता.मान्यप्रारूप(घोषणा.संस्करण)) {
            throw new Error('अमान्य संस्करण प्रारूप');
        }

        // Validate library size
        const आकार = await this.निर्देशिकाआकार(पथ);
        if (आकार > मानकनियम.अधिकतमआकार * 1024) {
            throw new Error('पुस्तकालय का आकार अधिकतम सीमा से अधिक है');
        }

        // Validate minimum version requirement
        if (!संस्करणउपयोगिता.संगतहै(घोषणा.संस्करण, मानकनियम.न्यूनतमसंस्करण)) {
            throw new Error(`पुस्तकालय ${मानकनियम.न्यूनतमसंस्करण} या उच्चतर संस्करण की आवश्यकता है`);
        }
    }

    private async निर्भरताग्राफनिर्माण(घोषणा: पुस्तकालयघोषणा, मूलपथ: string): Promise<void> {
        if (this.निर्भरताग्राफ[घोषणा.नाम]) return;

        this.निर्भरताग्राफ[घोषणा.नाम] = {
            संस्करण: घोषणा.संस्करण,
            निर्भरता: [...घोषणा.निर्भरता],
            लोडहोगया: false
        };

        for (const निर्भरता of घोषणा.निर्भरता) {
            const निर्भरतापथ = path.join(path.dirname(मूलपथ), निर्भरता);
            const निर्भरताघोषणा: पुस्तकालयघोषणा = JSON.parse(
                await fs.readFile(path.join(निर्भरतापथ, 'manifest.json'), 'utf-8')
            );
            await this.निर्भरताग्राफनिर्माण(निर्भरताघोषणा, निर्भरतापथ);
        }
    }

    private चक्रपरीक्षण(नाम: string, पथ: string[] = []): void {
        if (पथ.includes(नाम)) {
            throw new Error(`चक्रीय निर्भरता पाई गई: ${[...पथ, नाम].join(' -> ')}`);
        }

        const नोड = this.निर्भरताग्राफ[नाम];
        if (!नोड) return;

        पथ.push(नाम);
        for (const निर्भरता of नोड.निर्भरता) {
            this.चक्रपरीक्षण(निर्भरता, [...पथ]);
        }
    }

    private async क्रमिकनिर्भरतालोड(नाम: string): Promise<void> {
        const नोड = this.निर्भरताग्राफ[नाम];
        if (!नोड || नोड.लोडहोगया) return;

        // First load all dependencies
        for (const निर्भरता of नोड.निर्भरता) {
            await this.क्रमिकनिर्भरतालोड(निर्भरता);
        }

        // Mark as loaded
        नोड.लोडहोगया = true;
    }

    private async निर्देशिकाआकार(पथ: string): Promise<number> {
        const फ़ाइलें = await fs.readdir(पथ, { withFileTypes: true });
        let कुलआकार = 0;

        for (const फ़ाइल of फ़ाइलें) {
            const पूर्णपथ = path.join(पथ, फ़ाइल.name);
            if (फ़ाइल.isDirectory()) {
                कुलआकार += await this.निर्देशिकाआकार(पूर्णपथ);
            } else {
                const stats = await fs.stat(पूर्णपथ);
                कुलआकार += stats.size;
            }
        }

        return कुलआकार;
    }

    private async सुरक्षितआयात(फ़ाइलपथ: string): Promise<any> {
        if (!नियमसत्यापक.प्रकारसत्यापन(फ़ाइलपथ)) {
            throw new Error('असुरक्षित फ़ाइल प्रकार');
        }

        try {
            return await import(फ़ाइलपथ);
        } catch (error) {
            throw new Error(`फ़ाइल आयात में त्रुटि: ${(error as Error).message}`);
        }
    }

    पंजीकृतसूची(): string[] {
        return Array.from(this.लोडेडपुस्तकालय.keys());
    }

    संस्करणप्राप्त(नाम: string): string | undefined {
        return this.लोडेडपुस्तकालय.get(नाम)?.संस्करण;
    }

    निकालें(नाम: string): boolean {
        return this.लोडेडपुस्तकालय.delete(नाम);
    }

    सभीनिकालें(): void {
        this.लोडेडपुस्तकालय.clear();
        this.निर्भरताग्राफ = {};
    }
}