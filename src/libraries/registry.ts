import { पुस्तकालयघोषणा, पुस्तकालयत्रुटि } from '../stdlib/core';
import { संस्करणउपयोगिता } from './utils/version';
import * as fs from 'fs/promises';
import * as path from 'path';

interface पुस्तकालयमेटाडेटा {
    नाम: string;
    संस्करण: string;
    विवरण: string;
    टैग: string[];
    लेखक: string;
    स्थान: string;
    आखरीअपडेट: Date;
    डाउनलोड: number;
}

export class पुस्तकालयरजिस्ट्री {
    private static instance: पुस्तकालयरजिस्ट्री;
    private पंजीकृतपुस्तकालय = new Map<string, पुस्तकालयमेटाडेटा>();
    private केंद्रीयपथ: string;

    private constructor(केंद्रीयपथ: string) {
        this.केंद्रीयपथ = केंद्रीयपथ;
    }

    static async प्राप्त(केंद्रीयपथ: string): Promise<पुस्तकालयरजिस्ट्री> {
        if (!पुस्तकालयरजिस्ट्री.instance) {
            पुस्तकालयरजिस्ट्री.instance = new पुस्तकालयरजिस्ट्री(केंद्रीयपथ);
            await पुस्तकालयरजिस्ट्री.instance.लोडरजिस्ट्री();
        }
        return पुस्तकालयरजिस्ट्री.instance;
    }

    private async लोडरजिस्ट्री(): Promise<void> {
        try {
            const रजिस्ट्रीडेटा = await fs.readFile(
                path.join(this.केंद्रीयपथ, 'registry.json'),
                'utf-8'
            );
            const डेटा = JSON.parse(रजिस्ट्रीडेटा);
            
            for (const [नाम, मेटाडेटा] of Object.entries(डेटा)) {
                this.पंजीकृतपुस्तकालय.set(नाम, {
                    ...मेटाडेटा as पुस्तकालयमेटाडेटा,
                    आखरीअपडेट: new Date((मेटाडेटा as पुस्तकालयमेटाडेटा).आखरीअपडेट)
                });
            }
        } catch (error) {
            // If registry doesn't exist, create it
            await this.सहेजें();
        }
    }

    private async सहेजें(): Promise<void> {
        const डेटा: Record<string, पुस्तकालयमेटाडेटा> = {};
        this.पंजीकृतपुस्तकालय.forEach((मेटाडेटा, नाम) => {
            डेटा[नाम] = मेटाडेटा;
        });

        await fs.writeFile(
            path.join(this.केंद्रीयपथ, 'registry.json'),
            JSON.stringify(डेटा, null, 2),
            'utf-8'
        );
    }

    async पंजीकरण(घोषणा: पुस्तकालयघोषणा, स्थान: string): Promise<void> {
        // Verify if library with same name exists
        if (this.पंजीकृतपुस्तकालय.has(घोषणा.नाम)) {
            const मौजूदा = this.पंजीकृतपुस्तकालय.get(घोषणा.नाम)!;
            
            // Check if new version is higher
            if (संस्करणउपयोगिता.तुलना(घोषणा.संस्करण, मौजूदा.संस्करण) <= 0) {
                throw new पुस्तकालयत्रुटि(
                    `पुस्तकालय '${घोषणा.नाम}' पहले से ही ${मौजूदा.संस्करण} संस्करण के साथ पंजीकृत है`
                );
            }
        }

        // Register new library
        this.पंजीकृतपुस्तकालय.set(घोषणा.नाम, {
            नाम: घोषणा.नाम,
            संस्करण: घोषणा.संस्करण,
            विवरण: घोषणा.विवरण,
            टैग: घोषणा.टैग,
            लेखक: घोषणा.लेखक,
            स्थान,
            आखरीअपडेट: new Date(),
            डाउनलोड: 0
        });

        await this.सहेजें();
    }

    async खोज(खोजशब्द?: string, टैग?: string[]): Promise<पुस्तकालयमेटाडेटा[]> {
        const परिणाम: पुस्तकालयमेटाडेटा[] = [];

        for (const पुस्तकालय of this.पंजीकृतपुस्तकालय.values()) {
            let मिला = true;

            if (खोजशब्द) {
                const खोजनीचा = खोजशब्द.toLowerCase();
                मिला = पुस्तकालय.नाम.toLowerCase().includes(खोजनीचा) ||
                       पुस्तकालय.विवरण.toLowerCase().includes(खोजनीचा);
            }

            if (मिला && टैग && टैग.length > 0) {
                मिला = टैग.some(tag => पुस्तकालय.टैग.includes(tag));
            }

            if (मिला) {
                परिणाम.push(पुस्तकालय);
            }
        }

        return परिणाम;
    }

    async डाउनलोडगिनती(नाम: string): Promise<void> {
        const पुस्तकालय = this.पंजीकृतपुस्तकालय.get(नाम);
        if (पुस्तकालय) {
            पुस्तकालय.डाउनलोड++;
            await this.सहेजें();
        }
    }

    async अपडेटमेटाडेटा(
        नाम: string,
        नयामेटाडेटा: Partial<पुस्तकालयमेटाडेटा>
    ): Promise<void> {
        const पुस्तकालय = this.पंजीकृतपुस्तकालय.get(नाम);
        if (!पुस्तकालय) {
            throw new पुस्तकालयत्रुटि(`पुस्तकालय '${नाम}' नहीं मिला`);
        }

        this.पंजीकृतपुस्तकालय.set(नाम, {
            ...पुस्तकालय,
            ...नयामेटाडेटा,
            आखरीअपडेट: new Date()
        });

        await this.सहेजें();
    }

    async हटाएं(नाम: string): Promise<void> {
        if (!this.पंजीकृतपुस्तकालय.has(नाम)) {
            throw new पुस्तकालयत्रुटि(`पुस्तकालय '${नाम}' नहीं मिला`);
        }

        this.पंजीकृतपुस्तकालय.delete(नाम);
        await this.सहेजें();
    }

    लोकप्रिय(सीमा: number = 10): पुस्तकालयमेटाडेटा[] {
        return Array.from(this.पंजीकृतपुस्तकालय.values())
            .sort((a, b) => b.डाउनलोड - a.डाउनलोड)
            .slice(0, सीमा);
    }

    नवीनतम(सीमा: number = 10): पुस्तकालयमेटाडेटा[] {
        return Array.from(this.पंजीकृतपुस्तकालय.values())
            .sort((a, b) => b.आखरीअपडेट.getTime() - a.आखरीअपडेट.getTime())
            .slice(0, सीमा);
    }

    सभीटैग(): string[] {
        const टैगसेट = new Set<string>();
        for (const पुस्तकालय of this.पंजीकृतपुस्तकालय.values()) {
            पुस्तकालय.टैग.forEach(tag => टैगसेट.add(tag));
        }
        return Array.from(टैगसेट);
    }
}