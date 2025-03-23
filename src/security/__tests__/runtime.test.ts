import { सुरक्षाकालीन } from '../runtime';
import { औपचारिकसत्यापक } from '../verification';

describe('सुरक्षाकालीन', () => {
    let कालीन: सुरक्षाकालीन;

    beforeEach(() => {
        कालीन = सुरक्षाकालीन.getInstance();
    });

    describe('स्मृति सुरक्षा', () => {
        test('नल पॉइंटर जांच', async () => {
            const कोड = `
                let obj = null;
                console.log(obj.property);
            `;

            const परिणाम = await औपचारिकसत्यापक.getInstance().verifyMemorySafety({
                type: 'program',
                body: कोड
            });

            expect(परिणाम.सफल).toBe(false);
            expect(परिणाम.त्रुटियाँ?.length).toBeGreaterThan(0);
        });

        test('बफर ओवरफ्लो जांच', async () => {
            const कोड = `
                let arr = new Array(5);
                console.log(arr[10]);
            `;

            const परिणाम = await औपचारिकसत्यापक.getInstance().verifyMemorySafety({
                type: 'program',
                body: कोड
            });

            expect(परिणाम.सफल).toBe(false);
            expect(परिणाम.त्रुटियाँ?.some(त्रुटि => त्रुटि.includes('buffer overflow'))).toBe(true);
        });
    });

    describe('प्रकार सुरक्षा', () => {
        test('प्रकार मिलान जांच', async () => {
            const कोड = `
                let संख्या: number = "स्ट्रिंग";
            `;

            const परिणाम = await औपचारिकसत्यापक.getInstance().verifyTypeSafety({
                type: 'program',
                body: कोड
            });

            expect(परिणाम.सफल).toBe(false);
            expect(परिणाम.त्रुटियाँ?.some(त्रुटि => त्रुटि.includes('type mismatch'))).toBe(true);
        });
    });

    describe('समवर्ती सुरक्षा', () => {
        test('रेस कंडीशन जांच', async () => {
            const कोड = `
                let साझाचर = 0;
                async function कार्य1() { साझाचर++; }
                async function कार्य2() { साझाचर++; }
                Promise.all([कार्य1(), कार्य2()]);
            `;

            const परिणाम = await औपचारिकसत्यापक.getInstance().verifyConcurrencySafety({
                type: 'program',
                body: कोड
            });

            expect(परिणाम.सफल).toBe(false);
            expect(परिणाम.त्रुटियाँ?.some(त्रुटि => त्रुटि.includes('race condition'))).toBe(true);
        });
    });
});