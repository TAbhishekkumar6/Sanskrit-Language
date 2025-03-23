import { पुस्तकालयवैधक } from '../validator';
import { पुस्तकालयघोषणा } from '../../stdlib/core';
import * as fs from 'fs/promises';
import * as path from 'path';

jest.mock('fs/promises');

describe('पुस्तकालयवैधक', () => {
    const नमूनाघोषणा: पुस्तकालयघोषणा = {
        नाम: 'परीक्षणपुस्तकालय',
        संस्करण: '१.०.०',
        लेखक: 'परीक्षक',
        विवरण: 'परीक्षण पुस्तकालय का विवरण',
        निर्भरता: [],
        टैग: ['परीक्षण'],
        मुख्यफ़ाइल: 'index.ts'
    };

    beforeEach(() => {
        (fs.access as jest.Mock).mockReset();
        (fs.readFile as jest.Mock).mockReset();
        (fs.readdir as jest.Mock).mockReset();
    });

    describe('आवश्यक फ़ाइल जांच', () => {
        test('should validate required files', async () => {
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue('// Valid TypeScript code');
            (fs.readdir as jest.Mock).mockResolvedValue(['index.test.ts']);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ.length).toBe(0);
        });

        test('should report missing required files', async () => {
            (fs.access as jest.Mock).mockRejectedValue(new Error('File not found'));
            (fs.readFile as jest.Mock).mockResolvedValue('// Valid TypeScript code');
            (fs.readdir as jest.Mock).mockResolvedValue(['index.test.ts']);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ.length).toBeGreaterThan(0);
            expect(त्रुटियाँ[0]).toContain('आवश्यक फ़ाइल');
        });
    });

    describe('सुरक्षा जांच', () => {
        test('should detect unsafe eval usage', async () => {
            const असुरक्षितकोड = `
                export class Test {
                    run(code: string) {
                        eval(code);
                    }
                }
            `;
            
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue(असुरक्षितकोड);
            (fs.readdir as jest.Mock).mockResolvedValue(['index.test.ts']);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ).toContainEqual('eval का उपयोग वर्जित है');
        });

        test('should detect unsafe Function constructor usage', async () => {
            const असुरक्षितकोड = `
                export class Test {
                    run(code: string) {
                        return new Function(code);
                    }
                }
            `;
            
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue(असुरक्षितकोड);
            (fs.readdir as jest.Mock).mockResolvedValue(['index.test.ts']);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ).toContainEqual('Function कंस्ट्रक्टर का उपयोग वर्जित है');
        });

        test('should detect forbidden module imports', async () => {
            const असुरक्षितकोड = `
                import * as fs from 'fs';
                export class Test {
                    run() {
                        fs.readFile('test.txt');
                    }
                }
            `;
            
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue(असुरक्षितकोड);
            (fs.readdir as jest.Mock).mockResolvedValue(['index.test.ts']);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ).toContainEqual('fs मॉड्यूल का आयात वर्जित है');
        });
    });

    describe('दस्तावेज़ीकरण जांच', () => {
        test('should require JSDoc for exported elements', async () => {
            const बिनाडॉक्सकोड = `
                export class Test {
                    run() {
                        return true;
                    }
                }
            `;
            
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue(बिनाडॉक्सकोड);
            (fs.readdir as jest.Mock).mockResolvedValue(['index.test.ts']);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ.some(त्रुटि => त्रुटि.includes('JSDoc दस्तावेज़ीकरण'))).toBe(true);
        });

        test('should accept properly documented code', async () => {
            const डॉक्सयुक्तकोड = `
                /**
                 * A test class
                 */
                export class Test {
                    /**
                     * Runs a test
                     * @returns boolean
                     */
                    run(): boolean {
                        return true;
                    }
                }
            `;
            
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue(डॉक्सयुक्तकोड);
            (fs.readdir as jest.Mock).mockResolvedValue(['index.test.ts']);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ.some(त्रुटि => त्रुटि.includes('JSDoc दस्तावेज़ीकरण'))).toBe(false);
        });
    });

    describe('टेस्ट जांच', () => {
        test('should require test files', async () => {
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue('// Valid TypeScript code');
            (fs.readdir as jest.Mock).mockResolvedValue([]);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ).toContainEqual('कोई टेस्ट फ़ाइल नहीं मिली');
        });

        test('should accept directory with test files', async () => {
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue('// Valid TypeScript code');
            (fs.readdir as jest.Mock).mockResolvedValue(['index.test.ts']);

            const त्रुटियाँ = await पुस्तकालयवैधक.वैधता('/test', नमूनाघोषणा);
            expect(त्रुटियाँ.includes('कोई टेस्ट फ़ाइल नहीं मिली')).toBe(false);
        });
    });
});