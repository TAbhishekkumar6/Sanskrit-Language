import { मानकनियम, नियमसत्यापक } from '../config';

describe('नियमसत्यापक', () => {
    describe('प्रकारसत्यापन', () => {
        test('should allow valid file types', () => {
            expect(नियमसत्यापक.प्रकारसत्यापन('test.ts')).toBe(true);
            expect(नियमसत्यापक.प्रकारसत्यापन('test.js')).toBe(true);
            expect(नियमसत्यापक.प्रकारसत्यापन('test.json')).toBe(true);
            expect(नियमसत्यापक.प्रकारसत्यापन('test.md')).toBe(true);
        });

        test('should reject invalid file types', () => {
            expect(नियमसत्यापक.प्रकारसत्यापन('test.exe')).toBe(false);
            expect(नियमसत्यापक.प्रकारसत्यापन('test.php')).toBe(false);
            expect(नियमसत्यापक.प्रकारसत्यापन('test.dll')).toBe(false);
        });
    });

    describe('मॉड्यूलअनुमत', () => {
        test('should allow safe modules', () => {
            expect(नियमसत्यापक.मॉड्यूलअनुमत('lodash')).toBe(true);
            expect(नियमसत्यापक.मॉड्यूलअनुमत('react')).toBe(true);
        });

        test('should reject forbidden modules', () => {
            मानकनियम.निषिद्धमॉड्यूल.forEach(मॉड्यूल => {
                expect(नियमसत्यापक.मॉड्यूलअनुमत(मॉड्यूल)).toBe(false);
            });
        });
    });

    describe('नामसत्यापन', () => {
        test('should validate proper library names', () => {
            expect(नियमसत्यापक.नामसत्यापन('गणित')).toBe(true);
            expect(नियमसत्यापक.नामसत्यापन('math_utils')).toBe(true);
            expect(नियमसत्यापक.नामसत्यापन('गणित_util')).toBe(true);
        });

        test('should reject invalid library names', () => {
            expect(नियमसत्यापक.नामसत्यापन('')).toBe(false);
            expect(नियमसत्यापक.नामसत्यापन('123test')).toBe(false);
            expect(नियमसत्यापक.नामसत्यापन('test@lib')).toBe(false);
            expect(नियमसत्यापक.नामसत्यापन('a'.repeat(51))).toBe(false);
        });
    });

    describe('टैगसत्यापन', () => {
        test('should validate proper tags', () => {
            expect(नियमसत्यापक.टैगसत्यापन(['गणित'])).toBe(true);
            expect(नियमसत्यापक.टैगसत्यापन(['math', 'utils'])).toBe(true);
            expect(नियमसत्यापक.टैगसत्यापन(['गणित-lib'])).toBe(true);
        });

        test('should reject invalid tags', () => {
            expect(नियमसत्यापक.टैगसत्यापन([])).toBe(false);
            expect(नियमसत्यापक.टैगसत्यापन(Array(11).fill('tag'))).toBe(false);
            expect(नियमसत्यापक.टैगसत्यापन(['tag@lib'])).toBe(false);
        });
    });

    describe('विवरणसत्यापन', () => {
        test('should validate proper descriptions', () => {
            expect(नियमसत्यापक.विवरणसत्यापन('This is a valid description.')).toBe(true);
            expect(नियमसत्यापक.विवरणसत्यापन('गणितीय पुस्तकालय का विवरण')).toBe(true);
        });

        test('should reject invalid descriptions', () => {
            expect(नियमसत्यापक.विवरणसत्यापन('Too short')).toBe(false);
            expect(नियमसत्यापक.विवरणसत्यापन('a'.repeat(501))).toBe(false);
        });
    });

    describe('साइक्लोमेटिकजटिलता', () => {
        test('should calculate complexity correctly', () => {
            const सरलकोड = `
                function test() {
                    return true;
                }
            `;
            expect(नियमसत्यापक.साइक्लोमेटिकजटिलता(सरलकोड)).toBe(1);

            const जटिलकोड = `
                function test() {
                    if (a && b) {
                        while (true) {
                            if (x) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            `;
            expect(नियमसत्यापक.साइक्लोमेटिकजटिलता(जटिलकोड)).toBeGreaterThan(1);
        });
    });

    describe('दस्तावेज़ीकरणकवरेज', () => {
        test('should calculate documentation coverage correctly', () => {
            const पूर्णदस्तावेज़ीकरण = `
                /**
                 * Test function
                 */
                function test() {
                    return true;
                }

                /**
                 * Test class
                 */
                class TestClass {
                    /**
                     * Test method
                     */
                    method() {}
                }
            `;
            expect(नियमसत्यापक.दस्तावेज़ीकरणकवरेज(पूर्णदस्तावेज़ीकरण)).toBe(100);

            const आंशिकदस्तावेज़ीकरण = `
                /**
                 * Test function
                 */
                function test() {
                    return true;
                }

                class TestClass {
                    method() {}
                }
            `;
            expect(नियमसत्यापक.दस्तावेज़ीकरणकवरेज(आंशिकदस्तावेज़ीकरण)).toBeLessThan(100);
        });

        test('should handle empty code', () => {
            expect(नियमसत्यापक.दस्तावेज़ीकरणकवरेज('')).toBe(100);
        });
    });
});