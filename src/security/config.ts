import { सुरक्षासंदर्भ, टीईईविन्यास, एचएसएमविन्यास } from '../types';

export const मूलसुरक्षासंदर्भ: सुरक्षासंदर्भ = {
    स्तर: 2,
    अनुमतियां: [
        'readFile',
        'writeFile',
        'crypto.randomBytes',
        'crypto.createHash',
        'crypto.createCipheriv',
        'crypto.createDecipheriv'
    ],
    प्रतिबंध: [
        'eval',
        'Function',
        'execSync',
        'child_process',
        'http.request',
        'require("child_process")',
        'process.binding'
    ]
};

export const टीईईविन्यासमूल: टीईईविन्यास = {
    प्रकार: 'SGX',
    स्तर: 2,
    नीतियां: [
        'isolated_memory',
        'sealed_storage',
        'remote_attestation',
        'trusted_time',
        'secure_counter'
    ]
};

export const एचएसएमविन्यासमूल: एचएसएमविन्यास = {
    प्रकार: 'Yubico',
    कुंजीप्रकार: 'ECC',
    कुंजीआकार: 256
};

export const सुरक्षास्तरविन्यास = {
    न्यून: {
        स्तर: 1,
        सत्यापन: ['मूलभूतजांच'],
        अस्पष्टीकरण: false,
        हार्डवेयरसुरक्षा: false
    },
    मध्यम: {
        स्तर: 2,
        सत्यापन: ['मूलभूतजांच', 'स्थैतिकविश्लेषण'],
        अस्पष्टीकरण: true,
        हार्डवेयरसुरक्षा: false
    },
    उच्च: {
        स्तर: 3,
        सत्यापन: ['मूलभूतजांच', 'स्थैतिकविश्लेषण', 'गतिशीलविश्लेषण', 'औपचारिकसत्यापन'],
        अस्पष्टीकरण: true,
        हार्डवेयरसुरक्षा: true
    }
};

export const संवेदनशीलपैटर्न = [
    /password/i,
    /api[_-]?key/i,
    /secret/i,
    /token/i,
    /auth/i,
    /credential/i,
    /private[_-]?key/i
];

export const असुरक्षितकार्य = [
    'eval',
    'Function',
    'setTimeout(string)',
    'setInterval(string)',
    'execSync',
    'execFile',
    'spawn',
    'fork'
];

export const सुरक्षितभंडारणनियम = {
    कुंजीआकार: {
        RSA: 2048,
        ECC: 256,
        AES: 256
    },
    हैशिंगएल्गोरिथम: 'SHA-256',
    एन्क्रिप्शनएल्गोरिथम: 'AES-256-GCM'
};

export const प्रमाणपत्रविन्यास = {
    वैधताअवधि: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
    हस्ताक्षरएल्गोरिथम: 'RSA-SHA256',
    कुंजीप्रकार: 'RSA',
    कुंजीआकार: 2048
};

export const दूरस्थसत्यापनविन्यास = {
    सर्वरURL: 'https://verify.sanskrit-lang.org',
    टाइमआउट: 30000, // 30 seconds
    पुनःप्रयास: 3,
    नोंसआकार: 32 // bytes
};

export const सुरक्षालॉगविन्यास = {
    फ़ाइलपथ: './logs/security.log',
    अधिकतमआकार: 10 * 1024 * 1024, // 10MB
    अधिकतमफ़ाइलें: 5,
    स्तर: 'info'
};

// Utility functions
export function सुरक्षास्तरप्राप्तकरें(स्तर: number): keyof typeof सुरक्षास्तरविन्यास {
    if (स्तर >= 3) return 'उच्च';
    if (स्तर >= 2) return 'मध्यम';
    return 'न्यून';
}

export function सुरक्षाविन्यासप्राप्तकरें(स्तर: number) {
    const स्तरनाम = सुरक्षास्तरप्राप्तकरें(स्तर);
    return सुरक्षास्तरविन्यास[स्तरनाम];
}

export function संवेदनशीलडेटाजांच(कोड: string): boolean {
    return संवेदनशीलपैटर्न.some(पैटर्न => पैटर्न.test(कोड));
}

export function असुरक्षितकार्यजांच(कोड: string): boolean {
    return असुरक्षितकार्य.some(कार्य => कोड.includes(कार्य));
}