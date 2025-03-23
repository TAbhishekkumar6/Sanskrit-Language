/**
 * Performance benchmarking utilities for Sanskrit libraries
 */

interface कार्यनिष्पादन {
    औसतसमय: number;    // Average time in milliseconds
    न्यूनतमसमय: number; // Minimum time in milliseconds
    अधिकतमसमय: number; // Maximum time in milliseconds
    स्मृतिउपयोग: number; // Memory usage in bytes
    पुनरावृत्ति: number; // Number of iterations
}

export class निष्पादनमापक {
    private static readonly न्यूनतमपुनरावृत्ति = 1000;
    private static readonly समयसीमा = 5000; // 5 seconds timeout

    /**
     * Benchmark a function's performance
     * @param कार्य Function to benchmark
     * @param मापदंड Function parameters
     * @param विकल्प Benchmark options
     * @returns Performance metrics
     */
    static async माप(
        कार्य: Function,
        मापदंड: any[] = [],
        विकल्प: {
            पुनरावृत्ति?: number;
            समयसीमा?: number;
            स्मृतिमाप?: boolean;
        } = {}
    ): Promise<कार्यनिष्पादन> {
        const पुनरावृत्ति = विकल्प.पुनरावृत्ति || this.न्यूनतमपुनरावृत्ति;
        const समय: number[] = [];
        let स्मृतिप्रारंभ = 0;
        let स्मृतिअंत = 0;

        if (विकल्प.स्मृतिमाप) {
            if (global.gc) {
                global.gc(); // Force garbage collection
            }
            स्मृतिप्रारंभ = process.memoryUsage().heapUsed;
        }

        const समयसीमा = विकल्प.समयसीमा || this.समयसीमा;
        const प्रारंभसमय = Date.now();

        for (let i = 0; i < पुनरावृत्ति; i++) {
            const शुरू = performance.now();
            await कार्य(...मापदंड);
            const अंत = performance.now();
            समय.push(अंत - शुरू);

            if (Date.now() - प्रारंभसमय > समयसीमा) {
                break;
            }
        }

        if (विकल्प.स्मृतिमाप) {
            if (global.gc) {
                global.gc(); // Force garbage collection
            }
            स्मृतिअंत = process.memoryUsage().heapUsed;
        }

        return {
            औसतसमय: समय.reduce((a, b) => a + b) / समय.length,
            न्यूनतमसमय: Math.min(...समय),
            अधिकतमसमय: Math.max(...समय),
            स्मृतिउपयोग: स्मृतिअंत - स्मृतिप्रारंभ,
            पुनरावृत्ति: समय.length
        };
    }

    /**
     * Compare performance of multiple functions
     * @param कार्य Array of functions to compare
     * @param मापदंड Array of parameters for each function
     * @param विकल्प Benchmark options
     * @returns Performance comparison
     */
    static async तुलना(
        कार्य: Function[],
        मापदंड: any[][] = [],
        विकल्प: {
            नाम?: string[];
            पुनरावृत्ति?: number;
            समयसीमा?: number;
            स्मृतिमाप?: boolean;
        } = {}
    ): Promise<Record<string, कार्यनिष्पादन>> {
        const परिणाम: Record<string, कार्यनिष्पादन> = {};

        for (let i = 0; i < कार्य.length; i++) {
            const नाम = विकल्प.नाम?.[i] || `कार्य_${i + 1}`;
            परिणाम[नाम] = await this.माप(
                कार्य[i],
                मापदंड[i] || [],
                विकल्प
            );
        }

        return परिणाम;
    }

    /**
     * Generate performance report
     * @param परिणाम Performance metrics
     * @returns Formatted report string
     */
    static प्रतिवेदन(परिणाम: Record<string, कार्यनिष्पादन>): string {
        let रिपोर्ट = 'निष्पादन प्रतिवेदन\n';
        रिपोर्ट += '=================\n\n';

        const कार्य = Object.keys(परिणाम);
        const सबसेतेज = कार्य.reduce((a, b) => 
            परिणाम[a].औसतसमय < परिणाम[b].औसतसमय ? a : b
        );

        कार्य.forEach(नाम => {
            const मेट्रिक = परिणाम[नाम];
            रिपोर्ट += `${नाम}:\n`;
            रिपोर्ट += `-----------------\n`;
            रिपोर्ट += `औसत समय: ${मेट्रिक.औसतसमय.toFixed(3)}ms\n`;
            रिपोर्ट += `न्यूनतम समय: ${मेट्रिक.न्यूनतमसमय.toFixed(3)}ms\n`;
            रिपोर्ट += `अधिकतम समय: ${मेट्रिक.अधिकतमसमय.toFixed(3)}ms\n`;
            
            if (मेट्रिक.स्मृतिउपयोग > 0) {
                रिपोर्ट += `स्मृति उपयोग: ${(मेट्रिक.स्मृतिउपयोग / 1024).toFixed(2)}KB\n`;
            }
            
            रिपोर्ट += `पुनरावृत्ति: ${मेट्रिक.पुनरावृत्ति}\n`;

            if (नाम !== सबसेतेज) {
                const अंतर = ((मेट्रिक.औसतसमय / परिणाम[सबसेतेज].औसतसमय) - 1) * 100;
                रिपोर्ट += `तुलनात्मक धीमापन: ${अंतर.toFixed(1)}%\n`;
            }
            
            रिपोर्ट += '\n';
        });

        return रिपोर्ट;
    }
}