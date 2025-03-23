/**
 * Cache utilities for mathematical operations
 */

interface कैशविकल्प {
    समयसीमा?: number;  // Cache timeout in milliseconds
    अधिकतमआकार?: number;  // Maximum cache size
}

export class कैशप्रबंधक<K, V> {
    private कैश = new Map<string, { मान: V; समय: number }>();
    private कुंजीसूची: string[] = [];
    private समयसीमा: number;
    private अधिकतमआकार: number;

    constructor(विकल्प: कैशविकल्प = {}) {
        this.समयसीमा = विकल्प.समयसीमा || 5 * 60 * 1000; // Default 5 minutes
        this.अधिकतमआकार = विकल्प.अधिकतमआकार || 1000;
    }

    private कुंजीबनाएं(कुंजी: K): string {
        return typeof कुंजी === 'object' ? 
            JSON.stringify(कुंजी) : String(कुंजी);
    }

    मानप्राप्तकरें(कुंजी: K): V | undefined {
        const कुंजीस्ट्रिंग = this.कुंजीबनाएं(कुंजी);
        const प्रविष्टि = this.कैश.get(कुंजीस्ट्रिंग);

        if (!प्रविष्टि) return undefined;

        // Check if cache entry has expired
        if (Date.now() - प्रविष्टि.समय > this.समयसीमा) {
            this.कैश.delete(कुंजीस्ट्रिंग);
            this.कुंजीसूची = this.कुंजीसूची.filter(क => क !== कुंजीस्ट्रिंग);
            return undefined;
        }

        return प्रविष्टि.मान;
    }

    मानसेटकरें(कुंजी: K, मान: V): void {
        const कुंजीस्ट्रिंग = this.कुंजीबनाएं(कुंजी);

        // Remove oldest entry if cache is full
        if (this.कैश.size >= this.अधिकतमआकार && !this.कैश.has(कुंजीस्ट्रिंग)) {
            const पुरानीकुंजी = this.कुंजीसूची.shift();
            if (पुरानीकुंजी) this.कैश.delete(पुरानीकुंजी);
        }

        this.कैश.set(कुंजीस्ट्रिंग, { मान, समय: Date.now() });
        this.कुंजीसूची.push(कुंजीस्ट्रिंग);
    }

    साफ़करें(): void {
        this.कैश.clear();
        this.कुंजीसूची = [];
    }

    मानहटाएं(कुंजी: K): boolean {
        const कुंजीस्ट्रिंग = this.कुंजीबनाएं(कुंजी);
        this.कुंजीसूची = this.कुंजीसूची.filter(क => क !== कुंजीस्ट्रिंग);
        return this.कैश.delete(कुंजीस्ट्रिंग);
    }

    आकार(): number {
        return this.कैश.size;
    }

    समाप्तहोगएप्रविष्टियाँहटाएं(): number {
        const वर्तमानसमय = Date.now();
        let हटाएगए = 0;

        this.कुंजीसूची = this.कुंजीसूची.filter(कुंजी => {
            const प्रविष्टि = this.कैश.get(कुंजी);
            if (प्रविष्टि && वर्तमानसमय - प्रविष्टि.समय > this.समयसीमा) {
                this.कैश.delete(कुंजी);
                हटाएगए++;
                return false;
            }
            return true;
        });

        return हटाएगए;
    }
}

/**
 * Decorator for caching function results
 * @param विकल्प Cache options
 */
export function कैश(विकल्प: कैशविकल्प = {}) {
    const कैशमैनेजर = new कैशप्रबंधक(विकल्प);

    return function(
        लक्ष्य: Object,
        कार्यनाम: string | symbol,
        विवरण: PropertyDescriptor
    ): PropertyDescriptor {
        if (!विवरण || typeof विवरण.value !== 'function') {
            throw new Error('कैश decorator can only be used on methods');
        }
        
        const मूलकार्य = विवरण.value;

        विवरण.value = function(...मापदंड: any[]) {
            const कैशकुंजी = {
                कार्य: कार्यनाम.toString(),
                कक्षा: this?.constructor?.name,
                मापदंड
            };
            
            const कैशमान = कैशमैनेजर.मानप्राप्तकरें(कैशकुंजी);
            if (कैशमान !== undefined) {
                return कैशमान;
            }

            const परिणाम = मूलकार्य.apply(this, मापदंड);
            कैशमैनेजर.मानसेटकरें(कैशकुंजी, परिणाम);
            return परिणाम;
        };

        return विवरण;
    };
}