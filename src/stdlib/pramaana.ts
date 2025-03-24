// filepath: src/stdlib/pramaana.ts
// प्रमाण (pramaana) - Validation module

import { त्रुटि } from './core';

// Validation error
export class प्रमाणत्रुटि extends त्रुटि {
  constructor(संदेश: string) {
    super(संदेश);
    this.name = 'प्रमाणत्रुटि';
  }
}

// Schema types
export type प्रमाणप्रकार = 
  | 'संख्या'
  | 'पूर्णांक'
  | 'स्ट्रिंग'
  | 'बूलियन'
  | 'सूची'
  | 'वस्तु'
  | 'शून्य'
  | 'अपरिभाषित'
  | 'कोईभी';

// Schema definition
export interface प्रमाणयोजना {
  प्रकार: प्रमाणप्रकार;
  आवश्यक?: boolean;
  न्यूनतम?: number;
  अधिकतम?: number;
  प्रारूप?: RegExp;
  मान?: any[];
  सदस्य?: प्रमाणयोजना;
  गुण?: { [key: string]: प्रमाणयोजना };
  विकल्पीय?: { [key: string]: प्रमाणयोजना };
}

// Validator class
export class प्रमाणक {
  private योजना: प्रमाणयोजना;

  constructor(योजना: प्रमाणयोजना) {
    this.योजना = योजना;
  }

  // Validate value against schema
  जाँच(मान: any): { मान्य: boolean; त्रुटियाँ: string[] } {
    const त्रुटियाँ: string[] = [];

    try {
      this.मान्यकरें(मान, this.योजना, '');
    } catch (त्रुटि) {
      if (त्रुटि instanceof प्रमाणत्रुटि) {
        त्रुटियाँ.push(त्रुटि.message);
      } else {
        त्रुटियाँ.push('अज्ञात त्रुटि: ' + String(त्रुटि));
      }
    }

    return {
      मान्य: त्रुटियाँ.length === 0,
      त्रुटियाँ
    };
  }

  private मान्यकरें(मान: any, योजना: प्रमाणयोजना, पथ: string): void {
    // Check required
    if (योजना.आवश्यक && (मान === undefined || मान === null)) {
      throw new प्रमाणत्रुटि(`${पथ || 'मान'} आवश्यक है`);
    }

    // Skip validation if value is undefined/null and not required
    if (मान === undefined || मान === null) {
      return;
    }

    // Type validation
    this.प्रकारजाँच(मान, योजना, पथ);

    // Additional validations based on type
    switch (योजना.प्रकार) {
      case 'संख्या':
      case 'पूर्णांक':
        this.संख्याजाँच(मान, योजना, पथ);
        break;
      case 'स्ट्रिंग':
        this.स्ट्रिंगजाँच(मान, योजना, पथ);
        break;
      case 'सूची':
        this.सूचीजाँच(मान, योजना, पथ);
        break;
      case 'वस्तु':
        this.वस्तुजाँच(मान, योजना, पथ);
        break;
    }
  }

  private प्रकारजाँच(मान: any, योजना: प्रमाणयोजना, पथ: string): void {
    const पूरापथ = पथ || 'मान';

    switch (योजना.प्रकार) {
      case 'संख्या':
        if (typeof मान !== 'number' || isNaN(मान)) {
          throw new प्रमाणत्रुटि(`${पूरापथ} एक मान्य संख्या होनी चाहिए`);
        }
        break;
      case 'पूर्णांक':
        if (!Number.isInteger(मान)) {
          throw new प्रमाणत्रुटि(`${पूरापथ} एक पूर्णांक होना चाहिए`);
        }
        break;
      case 'स्ट्रिंग':
        if (typeof मान !== 'string') {
          throw new प्रमाणत्रुटि(`${पूरापथ} एक स्ट्रिंग होनी चाहिए`);
        }
        break;
      case 'बूलियन':
        if (typeof मान !== 'boolean') {
          throw new प्रमाणत्रुटि(`${पूरापथ} एक बूलियन होना चाहिए`);
        }
        break;
      case 'सूची':
        if (!Array.isArray(मान)) {
          throw new प्रमाणत्रुटि(`${पूरापथ} एक सूची होनी चाहिए`);
        }
        break;
      case 'वस्तु':
        if (typeof मान !== 'object' || मान === null || Array.isArray(मान)) {
          throw new प्रमाणत्रुटि(`${पूरापथ} एक वस्तु होनी चाहिए`);
        }
        break;
      case 'शून्य':
        if (मान !== null) {
          throw new प्रमाणत्रुटि(`${पूरापथ} शून्य होना चाहिए`);
        }
        break;
      case 'अपरिभाषित':
        if (मान !== undefined) {
          throw new प्रमाणत्रुटि(`${पूरापथ} अपरिभाषित होना चाहिए`);
        }
        break;
    }
  }

  private संख्याजाँच(मान: number, योजना: प्रमाणयोजना, पथ: string): void {
    const पूरापथ = पथ || 'मान';

    if (योजना.न्यूनतम !== undefined && मान < योजना.न्यूनतम) {
      throw new प्रमाणत्रुटि(`${पूरापथ} ${योजना.न्यूनतम} से बड़ा या बराबर होना चाहिए`);
    }

    if (योजना.अधिकतम !== undefined && मान > योजना.अधिकतम) {
      throw new प्रमाणत्रुटि(`${पूरापथ} ${योजना.अधिकतम} से छोटा या बराबर होना चाहिए`);
    }

    if (योजना.मान && !योजना.मान.includes(मान)) {
      throw new प्रमाणत्रुटि(`${पूरापथ} इनमें से एक होना चाहिए: ${योजना.मान.join(', ')}`);
    }
  }

  private स्ट्रिंगजाँच(मान: string, योजना: प्रमाणयोजना, पथ: string): void {
    const पूरापथ = पथ || 'मान';

    if (योजना.न्यूनतम !== undefined && मान.length < योजना.न्यूनतम) {
      throw new प्रमाणत्रुटि(`${पूरापथ} की लंबाई ${योजना.न्यूनतम} से कम नहीं हो सकती`);
    }

    if (योजना.अधिकतम !== undefined && मान.length > योजना.अधिकतम) {
      throw new प्रमाणत्रुटि(`${पूरापथ} की लंबाई ${योजना.अधिकतम} से अधिक नहीं हो सकती`);
    }

    if (योजना.प्रारूप && !योजना.प्रारूप.test(मान)) {
      throw new प्रमाणत्रुटि(`${पूरापथ} प्रारूप ${योजना.प्रारूप} से मेल नहीं खाता`);
    }

    if (योजना.मान && !योजना.मान.includes(मान)) {
      throw new प्रमाणत्रुटि(`${पूरापथ} इनमें से एक होना चाहिए: ${योजना.मान.join(', ')}`);
    }
  }

  private सूचीजाँच(मान: any[], योजना: प्रमाणयोजना, पथ: string): void {
    const पूरापथ = पथ || 'मान';

    if (योजना.न्यूनतम !== undefined && मान.length < योजना.न्यूनतम) {
      throw new प्रमाणत्रुटि(`${पूरापथ} में कम से कम ${योजना.न्यूनतम} सदस्य होने चाहिए`);
    }

    if (योजना.अधिकतम !== undefined && मान.length > योजना.अधिकतम) {
      throw new प्रमाणत्रुटि(`${पूरापथ} में अधिकतम ${योजना.अधिकतम} सदस्य हो सकते हैं`);
    }

    if (योजना.सदस्य) {
      मान.forEach((सदस्य, क्रम) => {
        this.मान्यकरें(सदस्य, योजना.सदस्य!, `${पूरापथ}[${क्रम}]`);
      });
    }
  }

  private वस्तुजाँच(मान: object, योजना: प्रमाणयोजना, पथ: string): void {
    const पूरापथ = पथ || 'मान';

    // Required properties
    if (योजना.गुण) {
      for (const [नाम, उपयोजना] of Object.entries(योजना.गुण)) {
        const मानगुण = (मान as any)[नाम];
        this.मान्यकरें(मानगुण, उपयोजना, पथ ? `${पथ}.${नाम}` : नाम);
      }
    }

    // Optional properties
    if (योजना.विकल्पीय) {
      for (const [नाम, उपयोजना] of Object.entries(योजना.विकल्पीय)) {
        const मानगुण = (मान as any)[नाम];
        if (मानगुण !== undefined) {
          this.मान्यकरें(मानगुण, उपयोजना, पथ ? `${पथ}.${नाम}` : नाम);
        }
      }
    }
  }
}

// Helper functions
export const प्रमाण = {
  // Create validator
  नया(योजना: प्रमाणयोजना): प्रमाणक {
    return new प्रमाणक(योजना);
  },

  // Common schema builders
  योजना: {
    // String schema
    स्ट्रिंग(विकल्प: {
      आवश्यक?: boolean;
      न्यूनतम?: number;
      अधिकतम?: number;
      प्रारूप?: RegExp;
      मान?: string[];
    } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'स्ट्रिंग',
        ...विकल्प
      };
    },

    // Number schema
    संख्या(विकल्प: {
      आवश्यक?: boolean;
      न्यूनतम?: number;
      अधिकतम?: number;
      मान?: number[];
    } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'संख्या',
        ...विकल्प
      };
    },

    // Integer schema
    पूर्णांक(विकल्प: {
      आवश्यक?: boolean;
      न्यूनतम?: number;
      अधिकतम?: number;
      मान?: number[];
    } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'पूर्णांक',
        ...विकल्प
      };
    },

    // Boolean schema
    बूलियन(विकल्प: { आवश्यक?: boolean } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'बूलियन',
        ...विकल्प
      };
    },

    // Array schema
    सूची(सदस्य?: प्रमाणयोजना, विकल्प: {
      आवश्यक?: boolean;
      न्यूनतम?: number;
      अधिकतम?: number;
    } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'सूची',
        सदस्य,
        ...विकल्प
      };
    },

    // Object schema
    वस्तु(गुण: { [key: string]: प्रमाणयोजना } = {}, विकल्पीय: { [key: string]: प्रमाणयोजना } = {}, विकल्प: {
      आवश्यक?: boolean;
    } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'वस्तु',
        गुण,
        विकल्पीय,
        ...विकल्प
      };
    },

    // Email schema
    ईमेल(विकल्प: { आवश्यक?: boolean } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'स्ट्रिंग',
        प्रारूप: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        ...विकल्प
      };
    },

    // URL schema
    यूआरएल(विकल्प: { आवश्यक?: boolean } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'स्ट्रिंग',
        प्रारूप: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
        ...विकल्प
      };
    },

    // Date schema
    दिनांक(विकल्प: { आवश्यक?: boolean } = {}): प्रमाणयोजना {
      return {
        प्रकार: 'स्ट्रिंग',
        प्रारूप: /^\d{4}-\d{2}-\d{2}$/,
        ...विकल्प
      };
    }
  }
}; 