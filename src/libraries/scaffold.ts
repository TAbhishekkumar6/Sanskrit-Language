import { पुस्तकालयघोषणा } from '../stdlib/core';
import { संस्करणउपयोगिता } from './utils/version';
import * as fs from 'fs/promises';
import * as path from 'path';

export class पुस्तकालयनिर्माता {
    private निर्माणपथ: string;

    constructor(निर्माणपथ: string) {
        this.निर्माणपथ = निर्माणपथ;
    }

    async नईपुस्तकालयबनाएं(घोषणा: पुस्तकालयघोषणा): Promise<void> {
        const पुस्तकालयपथ = path.join(this.निर्माणपथ, घोषणा.नाम);

        // Create directory structure
        await fs.mkdir(पुस्तकालयपथ, { recursive: true });
        await fs.mkdir(path.join(पुस्तकालयपथ, '__tests__'), { recursive: true });

        // Create manifest.json
        await fs.writeFile(
            path.join(पुस्तकालयपथ, 'manifest.json'),
            JSON.stringify(घोषणा, null, 2)
        );

        // Create README.md
        await fs.writeFile(
            path.join(पुस्तकालयपथ, 'README.md'),
            this.रीडमीटेम्पलेट(घोषणा)
        );

        // Create index.ts
        await fs.writeFile(
            path.join(पुस्तकालयपथ, 'index.ts'),
            this.इंडेक्सटेम्पलेट(घोषणा)
        );

        // Create test file
        await fs.writeFile(
            path.join(पुस्तकालयपथ, '__tests__', 'index.test.ts'),
            this.टेस्टटेम्पलेट(घोषणा)
        );

        // Create LICENSE file
        await fs.writeFile(
            path.join(पुस्तकालयपथ, 'LICENSE'),
            this.लाइसेंसटेम्पलेट(घोषणा)
        );
    }

    private रीडमीटेम्पलेट(घोषणा: पुस्तकालयघोषणा): string {
        return `# ${घोषणा.नाम}

## विवरण
${घोषणा.विवरण}

## संस्करण
${घोषणा.संस्करण}

## लेखक
${घोषणा.लेखक}

## स्थापना
\`\`\`bash
samskrit install ${घोषणा.नाम}
\`\`\`

## उपयोग
\`\`\`typescript
import { ${घोषणा.नाम} } from '${घोषणा.नाम}';

// Add usage examples here
\`\`\`

## निर्भरता
${घोषणा.निर्भरता.length > 0 ? घोषणा.निर्भरता.join('\n') : 'कोई निर्भरता नहीं'}

## टैग
${घोषणा.टैग.join(', ')}

## योगदान
योगदान का स्वागत है! कृपया इन चरणों का पालन करें:
1. रिपॉजिटरी को फोर्क करें
2. एक नई शाखा बनाएं
3. अपने परिवर्तन करें और प्रतिबद्ध करें
4. एक पुल अनुरोध बनाएं

## लाइसेंस
MIT License देखें LICENSE फ़ाइल
`;
    }

    private इंडेक्सटेम्पलेट(घोषणा: पुस्तकालयघोषणा): string {
        return `/**
 * ${घोषणा.नाम} - ${घोषणा.विवरण}
 * संस्करण: ${घोषणा.संस्करण}
 * लेखक: ${घोषणा.लेखक}
 */

export class ${घोषणा.नाम} {
    // Add your library code here
    
    /**
     * संस्करण प्राप्त करें
     * @returns वर्तमान संस्करण
     */
    static संस्करण(): string {
        return '${घोषणा.संस्करण}';
    }

    /**
     * लेखक का नाम प्राप्त करें
     * @returns लेखक का नाम
     */
    static लेखक(): string {
        return '${घोषणा.लेखक}';
    }
}
`;
    }

    private टेस्टटेम्पलेट(घोषणा: पुस्तकालयघोषणा): string {
        return `import { ${घोषणा.नाम} } from '../index';

describe('${घोषणा.नाम}', () => {
    describe('मूलभूत कार्यक्षमता', () => {
        test('should return correct version', () => {
            expect(${घोषणा.नाम}.संस्करण()).toBe('${घोषणा.संस्करण}');
        });

        test('should return correct author', () => {
            expect(${घोषणा.नाम}.लेखक()).toBe('${घोषणा.लेखक}');
        });
    });

    // Add more test cases here
});
`;
    }

    private लाइसेंसटेम्पलेट(घोषणा: पुस्तकालयघोषणा): string {
        return `MIT License

Copyright (c) ${new Date().getFullYear()} ${घोषणा.लेखक}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
    }

    static सत्यापनघोषणा(घोषणा: पुस्तकालयघोषणा): string[] {
        const त्रुटियाँ: string[] = [];

        // Validate name
        if (!/^[a-zA-Z_\u0900-\u097F][a-zA-Z0-9_\u0900-\u097F]*$/.test(घोषणा.नाम)) {
            त्रुटियाँ.push('पुस्तकालय का नाम अमान्य है');
        }

        // Validate version
        if (!संस्करणउपयोगिता.मान्यप्रारूप(घोषणा.संस्करण)) {
            त्रुटियाँ.push('संस्करण प्रारूप अमान्य है');
        }

        // Validate author
        if (!घोषणा.लेखक || घोषणा.लेखक.trim().length === 0) {
            त्रुटियाँ.push('लेखक का नाम आवश्यक है');
        }

        // Validate description
        if (!घोषणा.विवरण || घोषणा.विवरण.trim().length < 10) {
            त्रुटियाँ.push('विवरण बहुत छोटा है (कम से कम 10 वर्ण)');
        }

        // Validate tags
        if (!घोषणा.टैग || घोषणा.टैग.length === 0) {
            त्रुटियाँ.push('कम से कम एक टैग आवश्यक है');
        }

        // Validate main file
        if (!घोषणा.मुख्यफ़ाइल || !घोषणा.मुख्यफ़ाइल.endsWith('.ts')) {
            त्रुटियाँ.push('मुख्य फ़ाइल .ts प्रारूप में होनी चाहिए');
        }

        return त्रुटियाँ;
    }
}