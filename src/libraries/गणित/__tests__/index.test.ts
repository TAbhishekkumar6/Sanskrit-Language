import { उन्नतगणित } from '../index';

describe('उन्नतगणित', () => {
    describe('अंकगणित', () => {
        test('अभाज्यहै should identify prime numbers', () => {
            expect(उन्नतगणित.अंकगणित.अभाज्यहै(17)).toBe(true);
            expect(उन्नतगणित.अंकगणित.अभाज्यहै(4)).toBe(false);
        });

        test('अभाज्यसंख्याएँ should generate prime numbers up to limit', () => {
            expect(उन्नतगणित.अंकगणित.अभाज्यसंख्याएँ(10))
                .toEqual([2, 3, 5, 7]);
        });

        test('अभाज्यगुणनखंड should factorize numbers', () => {
            const खंड = उन्नतगणित.अंकगणित.अभाज्यगुणनखंड(12);
            expect(खंड.get(2)).toBe(2);
            expect(खंड.get(3)).toBe(1);
        });
    });

    describe('बीजगणित', () => {
        test('द्विघातसमीकरण should solve quadratic equations', () => {
            expect(उन्नतगणित.बीजगणित.द्विघातसमीकरण(1, -5, 6))
                .toEqual([3, 2]);
            expect(उन्नतगणित.बीजगणित.द्विघातसमीकरण(1, 2, 5))
                .toEqual([]);
        });

        test('बहुपदमूल्यांकन should evaluate polynomials', () => {
            // For polynomial x² + 2x + 1
            expect(उन्नतगणित.बीजगणित.बहुपदमूल्यांकन([1, 2, 1], 2))
                .toBe(9);
        });
    });

    describe('त्रिकोणमिति', () => {
        test('रेडियन should convert degrees to radians', () => {
            expect(उन्नतगणित.त्रिकोणमिति.रेडियन(180))
                .toBeCloseTo(Math.PI, 5);
        });

        test('अंश should convert radians to degrees', () => {
            expect(उन्नतगणित.त्रिकोणमिति.अंश(Math.PI))
                .toBeCloseTo(180, 5);
        });

        test('त्रिकोणमितीयअनुपात should calculate all ratios', () => {
            const अनुपात = उन्नतगणित.त्रिकोणमिति.त्रिकोणमितीयअनुपात(0);
            expect(अनुपात.ज्या).toBeCloseTo(0, 5);
            expect(अनुपात.कोज्या).toBeCloseTo(1, 5);
        });
    });

    describe('सांख्यिकी', () => {
        const डेटा = [2, 4, 4, 4, 5, 5, 7, 9];

        test('माध्य should calculate arithmetic mean', () => {
            expect(उन्नतगणित.सांख्यिकी.माध्य(डेटा))
                .toBe(5);
        });

        test('माध्यिका should calculate median', () => {
            expect(उन्नतगणित.सांख्यिकी.माध्यिका(डेटा))
                .toBe(4.5);
        });

        test('मानकविचलन should calculate standard deviation', () => {
            expect(उन्नतगणित.सांख्यिकी.मानकविचलन(डेटा))
                .toBeCloseTo(2.138, 3);
        });

        test('सहसंबंध should calculate correlation coefficient', () => {
            const एक्स = [1, 2, 3, 4, 5];
            const वाई = [2, 4, 6, 8, 10];
            expect(उन्नतगणित.सांख्यिकी.सहसंबंध(एक्स, वाई))
                .toBeCloseTo(1, 5);
        });

        test('सहसंबंध should throw error for unequal arrays', () => {
            const एक्स = [1, 2, 3];
            const वाई = [2, 4];
            expect(() => उन्नतगणित.सांख्यिकी.सहसंबंध(एक्स, वाई))
                .toThrow('दोनों श्रेणियों की लंबाई समान होनी चाहिए');
        });
    });

    describe('मैट्रिक्स', () => {
        const अ = [[1, 2], [3, 4]];
        const ब = [[5, 6], [7, 8]];

        test('आव्यूहयोग should add matrices', () => {
            expect(उन्नतगणित.आव्यूहयोग(अ, ब))
                .toEqual([[6, 8], [10, 12]]);
        });

        test('आव्यूहगुणन should multiply matrices', () => {
            expect(उन्नतगणित.आव्यूहगुणन(अ, ब))
                .toEqual([[19, 22], [43, 50]]);
        });
    });

    describe('सम्मिश्र संख्याएँ', () => {
        test('सम्मिश्रयोग should add complex numbers', () => {
            expect(उन्नतगणित.सम्मिश्रयोग([1, 2], [3, 4]))
                .toEqual([4, 6]);
        });

        test('सम्मिश्रगुणन should multiply complex numbers', () => {
            expect(उन्नतगणित.सम्मिश्रगुणन([1, 2], [3, 4]))
                .toEqual([-5, 10]);
        });
    });

    describe('ज्यामिति', () => {
        test('त्रिभुजक्षेत्रफल should calculate triangle area', () => {
            expect(उन्नतगणित.त्रिभुजक्षेत्रफल(6, 4))
                .toBe(12);
        });

        test('वृत्तक्षेत्रफल should calculate circle area', () => {
            expect(उन्नतगणित.वृत्तक्षेत्रफल(2))
                .toBeCloseTo(12.5664, 4);
        });
    });

    describe('सदिश', () => {
        const सदिश१ = [1, 2, 3];
        const सदिश२ = [4, 5, 6];
        const शून्यसदिश = [0, 0, 0];

        test('परिमाण should calculate vector magnitude', () => {
            expect(उन्नतगणित.सदिश.परिमाण([3, 4])).toBe(5);
            expect(उन्नतगणित.सदिश.परिमाण([1, 1, 1])).toBeCloseTo(Math.sqrt(3), 5);
        });

        test('योग should add vectors', () => {
            expect(उन्नतगणित.सदिश.योग(सदिश१, सदिश२))
                .toEqual([5, 7, 9]);
        });

        test('अंतर should subtract vectors', () => {
            expect(उन्नतगणित.सदिश.अंतर(सदिश२, सदिश१))
                .toEqual([3, 3, 3]);
        });

        test('बिंदुगुणन should calculate dot product', () => {
            expect(उन्नतगणित.सदिश.बिंदुगुणन(सदिश१, सदिश२))
                .toBe(32); // 1*4 + 2*5 + 3*6
        });

        test('सदिशगुणन should calculate cross product', () => {
            expect(उन्नतगणित.सदिश.सदिशगुणन(सदिश१, सदिश२))
                .toEqual([-3, 6, -3]);
        });

        test('मापन should scale vector', () => {
            expect(उन्नतगणित.सदिश.मापन(सदिश१, 2))
                .toEqual([2, 4, 6]);
        });

        test('एकांक should normalize vector', () => {
            const परिमाण = Math.sqrt(14); // sqrt(1² + 2² + 3²)
            const एकांक = उन्नतगणित.सदिश.एकांक(सदिश१);
            expect(एकांक[0]).toBeCloseTo(1/परिमाण, 5);
            expect(एकांक[1]).toBeCloseTo(2/परिमाण, 5);
            expect(एकांक[2]).toBeCloseTo(3/परिमाण, 5);
        });

        test('एकांक should throw error for zero vector', () => {
            expect(() => उन्नतगणित.सदिश.एकांक(शून्यसदिश))
                .toThrow('शून्य सदिश को एकांक नहीं किया जा सकता');
        });

        test('कोण should calculate angle between vectors', () => {
            const कोण = उन्नतगणित.सदिश.कोण([1, 0], [0, 1]);
            expect(कोण).toBeCloseTo(Math.PI/2, 5); // 90 degrees
        });

        test('समांतर should check if vectors are parallel', () => {
            expect(उन्नतगणित.सदिश.समांतर([2, 4, 6], [1, 2, 3])).toBe(true);
            expect(उन्नतगणित.सदिश.समांतर([1, 0, 0], [0, 1, 0])).toBe(false);
        });

        test('लंबवत should check if vectors are perpendicular', () => {
            expect(उन्नतगणित.सदिश.लंबवत([1, 0, 0], [0, 1, 0])).toBe(true);
            expect(उन्नतगणित.सदिश.लंबवत([1, 1, 0], [1, 1, 0])).toBe(false);
        });

        test('प्रक्षेपण should project one vector onto another', () => {
            const प्रक्षेप = उन्नतगणित.सदिश.प्रक्षेपण([3, 3], [0, 1]);
            expect(प्रक्षेप[0]).toBeCloseTo(0, 5);
            expect(प्रक्षेप[1]).toBeCloseTo(3, 5);
        });

        test('should throw error for mismatched dimensions', () => {
            expect(() => उन्नतगणित.सदिश.योग([1, 2], [1, 2, 3]))
                .toThrow('सदिशों की विमाएं समान होनी चाहिए');
            
            expect(() => उन्नतगणित.सदिश.बिंदुगुणन([1, 2], [1, 2, 3]))
                .toThrow('सदिशों की विमाएं समान होनी चाहिए');
            
            expect(() => उन्नतगणित.सदिश.सदिशगुणन([1, 2], [1, 2]))
                .toThrow('सदिशगुणन केवल त्रिविमीय सदिशों के लिए परिभाषित है');
        });
    });
});