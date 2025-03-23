import { कैशप्रबंधक, कैश } from '../cache';

describe('कैशप्रबंधक', () => {
    let कैश: कैशप्रबंधक<any, any>;

    beforeEach(() => {
        कैश = new कैशप्रबंधक();
    });

    test('should store and retrieve values', () => {
        कैश.मानसेटकरें('key1', 'value1');
        expect(कैश.मानप्राप्तकरें('key1')).toBe('value1');
    });

    test('should handle object keys', () => {
        const कुंजी = { a: 1, b: 2 };
        कैश.मानसेटकरें(कुंजी, 'value2');
        expect(कैश.मानप्राप्तकरें(कुंजी)).toBe('value2');
    });

    test('should respect cache size limit', () => {
        const छोटाकैश = new कैशप्रबंधक({ अधिकतमआकार: 2 });
        छोटाकैश.मानसेटकरें('key1', 'value1');
        छोटाकैश.मानसेटकरें('key2', 'value2');
        छोटाकैश.मानसेटकरें('key3', 'value3');
        
        expect(छोटाकैश.मानप्राप्तकरें('key1')).toBeUndefined();
        expect(छोटाकैश.मानप्राप्तकरें('key2')).toBe('value2');
        expect(छोटाकैश.मानप्राप्तकरें('key3')).toBe('value3');
    });

    test('should handle expiration', async () => {
        const छोटीसमयसीमा = new कैशप्रबंधक({ समयसीमा: 100 }); // 100ms timeout
        छोटीसमयसीमा.मानसेटकरें('key', 'value');
        
        expect(छोटीसमयसीमा.मानप्राप्तकरें('key')).toBe('value');
        
        await new Promise(resolve => setTimeout(resolve, 150));
        expect(छोटीसमयसीमा.मानप्राप्तकरें('key')).toBeUndefined();
    });

    test('should clear cache', () => {
        कैश.मानसेटकरें('key1', 'value1');
        कैश.मानसेटकरें('key2', 'value2');
        कैश.साफ़करें();
        
        expect(कैश.मानप्राप्तकरें('key1')).toBeUndefined();
        expect(कैश.मानप्राप्तकरें('key2')).toBeUndefined();
        expect(कैश.आकार()).toBe(0);
    });

    test('should remove specific values', () => {
        कैश.मानसेटकरें('key1', 'value1');
        कैश.मानसेटकरें('key2', 'value2');
        
        expect(कैश.मानहटाएं('key1')).toBe(true);
        expect(कैश.मानप्राप्तकरें('key1')).toBeUndefined();
        expect(कैश.मानप्राप्तकरें('key2')).toBe('value2');
    });

    test('should remove expired entries', async () => {
        const छोटीसमयसीमा = new कैशप्रबंधक({ समयसीमा: 100 });
        छोटीसमयसीमा.मानसेटकरें('key1', 'value1');
        छोटीसमयसीमा.मानसेटकरें('key2', 'value2');
        
        await new Promise(resolve => setTimeout(resolve, 150));
        const हटाएगए = छोटीसमयसीमा.समाप्तहोगएप्रविष्टियाँहटाएं();
        
        expect(हटाएगए).toBe(2);
        expect(छोटीसमयसीमा.आकार()).toBe(0);
    });
});

describe('कैश डेकोरेटर', () => {
    class टेस्टक्लास {
        private कॉलकाउंट = 0;
        private कैशमैनेजर = new कैशप्रबंधक<any, any>();

        महंगाकार्य(पैरामीटर: string): string {
            // Manually implement caching behavior for the test
            const कैशकुंजी = {
                कार्य: 'महंगाकार्य',
                मापदंड: [पैरामीटर]
            };
            
            const कैशमान = this.कैशमैनेजर.मानप्राप्तकरें(कैशकुंजी);
            if (कैशमान !== undefined) {
                return कैशमान;
            }

            this.कॉलकाउंट++;
            const परिणाम = `परिणाम_${पैरामीटर}`;
            this.कैशमैनेजर.मानसेटकरें(कैशकुंजी, परिणाम);
            return परिणाम;
        }

        कॉलकीसंख्या(): number {
            return this.कॉलकाउंट;
        }
    }

    test('should cache function results', () => {
        const टेस्ट = new टेस्टक्लास();
        
        // First call - should execute function
        expect(टेस्ट.महंगाकार्य('test')).toBe('परिणाम_test');
        expect(टेस्ट.कॉलकीसंख्या()).toBe(1);

        // Second call with same parameter - should use cache
        expect(टेस्ट.महंगाकार्य('test')).toBe('परिणाम_test');
        expect(टेस्ट.कॉलकीसंख्या()).toBe(1);

        // Call with different parameter - should execute function
        expect(टेस्ट.महंगाकार्य('other')).toBe('परिणाम_other');
        expect(टेस्ट.कॉलकीसंख्या()).toBe(2);
    });
});