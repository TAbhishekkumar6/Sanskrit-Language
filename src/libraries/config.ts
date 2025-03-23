/**
 * Library system configuration and standards
 */
export const मानकनियम = {
    // File size limits
    अधिकतमआकार: 5 * 1024 * 1024, // 5MB max library size
    अधिकतमफ़ाइलआकार: 1 * 1024 * 1024, // 1MB max single file size

    // Required files
    अनिवार्यफ़ाइल: [
        'manifest.json',
        'README.md',
        'LICENSE',
        'index.ts',
        '__tests__/index.test.ts'
    ],

    // Version requirements
    न्यूनतमसंस्करण: '१.०.०',
    संस्करणप्रारूप: /^[१२३४५६७८९०]+\.[१२३४५६७८९०]+\.[१२३४५६७८९०]+$/,

    // Code standards
    न्यूनतमटेस्टकवरेज: 80,
    अधिकतमसाइक्लोमेटिकजटिलता: 10,
    
    // Documentation requirements
    अनिवार्यजेएसडॉक: true,
    न्यूनतमदस्तावेज़ीकरणकवरेज: 70,

    // Security constraints
    निषिद्धमॉड्यूल: [
        'fs',
        'child_process',
        'http',
        'https',
        'net',
        'dns',
        'crypto'
    ],

    // Name constraints
    नामप्रारूप: /^[a-zA-Z_\u0900-\u097F][a-zA-Z0-9_\u0900-\u097F]*$/,
    अधिकतमनामलंबाई: 50,

    // Tag constraints
    न्यूनतमटैग: 1,
    अधिकतमटैग: 10,
    टैगप्रारूप: /^[a-zA-Z0-9_\u0900-\u097F-]+$/,

    // Description constraints
    न्यूनतमविवरणलंबाई: 10,
    अधिकतमविवरणलंबाई: 500
};

/**
 * Library validator utility functions
 */
export class नियमसत्यापक {
    /**
     * Validate file type safety
     */
    static प्रकारसत्यापन(फ़ाइलपथ: string): boolean {
        const अनुमतप्रकार = ['.ts', '.js', '.json', '.md'];
        return अनुमतप्रकार.some(प्रकार => फ़ाइलपथ.endsWith(प्रकार));
    }

    /**
     * Check if a module import is allowed
     */
    static मॉड्यूलअनुमत(मॉड्यूल: string): boolean {
        return !मानकनियम.निषिद्धमॉड्यूल.includes(मॉड्यूल);
    }

    /**
     * Validate library name format
     */
    static नामसत्यापन(नाम: string): boolean {
        return मानकनियम.नामप्रारूप.test(नाम) &&
               नाम.length <= मानकनियम.अधिकतमनामलंबाई;
    }

    /**
     * Validate tag format
     */
    static टैगसत्यापन(टैग: string[]): boolean {
        if (टैग.length < मानकनियम.न्यूनतमटैग || टैग.length > मानकनियम.अधिकतमटैग) {
            return false;
        }

        return टैग.every(टैग => मानकनियम.टैगप्रारूप.test(टैग));
    }

    /**
     * Validate description length
     */
    static विवरणसत्यापन(विवरण: string): boolean {
        return विवरण.length >= मानकनियम.न्यूनतमविवरणलंबाई &&
               विवरण.length <= मानकनियम.अधिकतमविवरणलंबाई;
    }

    /**
     * Calculate cyclomatic complexity of code
     */
    static साइक्लोमेटिकजटिलता(कोड: string): number {
        const जटिलताबढ़ानेवालेशब्द = [
            'if', 'else', 'while', 'for', 'case', '&&', '\\|\\|',
            'catch', '\\?', ':', 'यदि', 'अन्यथा', 'जबतक', 'प्रत्येक'
        ];

        return जटिलताबढ़ानेवालेशब्द.reduce((जटिलता, शब्द) => {
            const regex = new RegExp(शब्द, 'g');
            const मिले = (कोड.match(regex) || []).length;
            return जटिलता + मिले;
        }, 1);
    }

    /**
     * Calculate documentation coverage percentage
     */
    static दस्तावेज़ीकरणकवरेज(कोड: string): number {
        const फंक्शनमिलान = कोड.match(/function\s+\w+|class\s+\w+|method\s+\w+/g) || [];
        const डॉक्समिलान = कोड.match(/\/\*\*[\s\S]*?\*\//g) || [];
        
        if (फंक्शनमिलान.length === 0) return 100;
        const प्रतिशत = Math.min(Math.round((डॉक्समिलान.length / फंक्शनमिलान.length) * 100), 100);
        return प्रतिशत;
    }
}