// filepath: src/stdlib/pareekshana.ts
// परीक्षण (pareekshana) - Testing framework

import { त्रुटि } from './core';

export class परीक्षणत्रुटि extends त्रुटि {
  constructor(संदेश: string) {
    super(संदेश);
    this.name = 'परीक्षणत्रुटि';
  }
}

// Test Suite (परीक्षणसमूह)
export class परीक्षणसमूह {
  private परीक्षण: Array<{
    नाम: string;
    कार्य: () => Promise<void> | void;
  }> = [];
  
  private पूर्वकार्य: Array<() => Promise<void> | void> = [];
  private पश्चातकार्य: Array<() => Promise<void> | void> = [];
  
  constructor(private नाम: string) {}
  
  // Add test (जोड़ें - joden)
  जोड़ें(नाम: string, कार्य: () => Promise<void> | void): void {
    this.परीक्षण.push({ नाम, कार्य });
  }
  
  // Before each test (प्रत्येकपूर्व - pratyekPoorv)
  प्रत्येकपूर्व(कार्य: () => Promise<void> | void): void {
    this.पूर्वकार्य.push(कार्य);
  }
  
  // After each test (प्रत्येकपश्चात - pratyekPashchat)
  प्रत्येकपश्चात(कार्य: () => Promise<void> | void): void {
    this.पश्चातकार्य.push(कार्य);
  }
  
  // Run tests (चलाएं - chalayen)
  async चलाएं(): Promise<{
    कुल: number;
    सफल: number;
    असफल: number;
    परिणाम: Array<{
      नाम: string;
      सफल: boolean;
      त्रुटि?: Error;
    }>;
  }> {
    const परिणाम = [];
    let सफल = 0;
    
    console.log(`\nपरीक्षण समूह: ${this.नाम}`);
    
    for (const { नाम, कार्य } of this.परीक्षण) {
      try {
        // Run before hooks
        for (const पूर्व of this.पूर्वकार्य) {
          await पूर्व();
        }
        
        // Run test
        await कार्य();
        
        // Run after hooks
        for (const पश्चात of this.पश्चातकार्य) {
          await पश्चात();
        }
        
        सफल++;
        परिणाम.push({ नाम, सफल: true });
        console.log(`✓ ${नाम}`);
      } catch (त्रुटि) {
        परिणाम.push({ नाम, सफल: false, त्रुटि: त्रुटि as Error });
        console.error(`✗ ${नाम}`);
        console.error(`  ${(त्रुटि as Error).message}`);
      }
    }
    
    return {
      कुल: this.परीक्षण.length,
      सफल,
      असफल: this.परीक्षण.length - सफल,
      परिणाम
    };
  }
}

// Assertions (दावा)
export const दावा = {
  // Equals (बराबर - barabar)
  बराबर<T>(वास्तविक: T, अपेक्षित: T, संदेश?: string): void {
    if (वास्तविक !== अपेक्षित) {
      throw new परीक्षणत्रुटि(
        संदेश || `अपेक्षित: ${अपेक्षित}, वास्तविक: ${वास्तविक}`
      );
    }
  },
  
  // Not equals (बराबरनहीं - barabarNahi)
  बराबरनहीं<T>(वास्तविक: T, अनपेक्षित: T, संदेश?: string): void {
    if (वास्तविक === अनपेक्षित) {
      throw new परीक्षणत्रुटि(
        संदेश || `${वास्तविक} अनपेक्षित मूल्य के बराबर नहीं होना चाहिए`
      );
    }
  },
  
  // True (सत्य - satya)
  सत्य(मान: boolean, संदेश?: string): void {
    if (!मान) {
      throw new परीक्षणत्रुटि(संदेश || 'मान सत्य होना चाहिए');
    }
  },
  
  // False (असत्य - asatya)
  असत्य(मान: boolean, संदेश?: string): void {
    if (मान) {
      throw new परीक्षणत्रुटि(संदेश || 'मान असत्य होना चाहिए');
    }
  },
  
  // Null (शून्य - shunya)
  शून्य(मान: any, संदेश?: string): void {
    if (मान !== null) {
      throw new परीक्षणत्रुटि(संदेश || 'मान शून्य होना चाहिए');
    }
  },
  
  // Not null (शून्यनहीं - shunyaNahi)
  शून्यनहीं(मान: any, संदेश?: string): void {
    if (मान === null) {
      throw new परीक्षणत्रुटि(संदेश || 'मान शून्य नहीं होना चाहिए');
    }
  },
  
  // Undefined (अपरिभाषित - aparibhashit)
  अपरिभाषित(मान: any, संदेश?: string): void {
    if (मान !== undefined) {
      throw new परीक्षणत्रुटि(संदेश || 'मान अपरिभाषित होना चाहिए');
    }
  },
  
  // Defined (परिभाषित - paribhashit)
  परिभाषित(मान: any, संदेश?: string): void {
    if (मान === undefined) {
      throw new परीक्षणत्रुटि(संदेश || 'मान परिभाषित होना चाहिए');
    }
  },
  
  // Throws (फेंकता - phenkata)
  फेंकता(कार्य: () => void, त्रुटिप्रकार?: any, संदेश?: string): void {
    try {
      कार्य();
      throw new परीक्षणत्रुटि(संदेश || 'कार्य को त्रुटि फेंकनी चाहिए');
    } catch (त्रुटि) {
      if (त्रुटिप्रकार && !(त्रुटि instanceof त्रुटिप्रकार)) {
        throw new परीक्षणत्रुटि(
          संदेश || `त्रुटि ${त्रुटिप्रकार.name} प्रकार की होनी चाहिए`
        );
      }
    }
  },
  
  // Array contains (सूचीमेंहै - soochiMeinHai)
  सूचीमेंहै<T>(सूची: T[], मान: T, संदेश?: string): void {
    if (!सूची.includes(मान)) {
      throw new परीक्षणत्रुटि(
        संदेश || `सूची में ${मान} होना चाहिए`
      );
    }
  },
  
  // Array not contains (सूचीमेंनहींहै - soochiMeinNahiHai)
  सूचीमेंनहींहै<T>(सूची: T[], मान: T, संदेश?: string): void {
    if (सूची.includes(मान)) {
      throw new परीक्षणत्रुटि(
        संदेश || `सूची में ${मान} नहीं होना चाहिए`
      );
    }
  },
  
  // Object has property (वस्तुमेंहै - vastuMeinHai)
  वस्तुमेंहै(वस्तु: object, गुण: string, संदेश?: string): void {
    if (!(गुण in वस्तु)) {
      throw new परीक्षणत्रुटि(
        संदेश || `वस्तु में '${गुण}' गुण होना चाहिए`
      );
    }
  },
  
  // Match regex (रेजेक्सहै - regexHai)
  रेजेक्सहै(पाठ: string, रेजेक्स: RegExp, संदेश?: string): void {
    if (!रेजेक्स.test(पाठ)) {
      throw new परीक्षणत्रुटि(
        संदेश || `'${पाठ}' को रेजेक्स ${रेजेक्स} से मेल खाना चाहिए`
      );
    }
  }
};

// Test Runner (परीक्षणचालक)
export class परीक्षणचालक {
  private समूह: परीक्षणसमूह[] = [];
  
  // Add test suite (समूहजोड़ें - samoohJoden)
  समूहजोड़ें(समूह: परीक्षणसमूह): void {
    this.समूह.push(समूह);
  }
  
  // Run all tests (सभीचलाएं - sabhiChalayen)
  async सभीचलाएं(): Promise<{
    कुलपरीक्षण: number;
    कुलसफल: number;
    कुलअसफल: number;
    समूहपरिणाम: Array<{
      नाम: string;
      परिणाम: Array<{
        नाम: string;
        सफल: boolean;
        त्रुटि?: Error;
      }>;
    }>;
  }> {
    let कुलपरीक्षण = 0;
    let कुलसफल = 0;
    const समूहपरिणाम = [];
    
    for (const समूह of this.समूह) {
      const परिणाम = await समूह.चलाएं();
      कुलपरीक्षण += परिणाम.कुल;
      कुलसफल += परिणाम.सफल;
      समूहपरिणाम.push({
        नाम: समूह['नाम'],
        परिणाम: परिणाम.परिणाम
      });
    }
    
    console.log('\nपरीक्षण परिणाम:');
    console.log(`कुल परीक्षण: ${कुलपरीक्षण}`);
    console.log(`सफल: ${कुलसफल}`);
    console.log(`असफल: ${कुलपरीक्षण - कुलसफल}`);
    
    return {
      कुलपरीक्षण,
      कुलसफल,
      कुलअसफल: कुलपरीक्षण - कुलसफल,
      समूहपरिणाम
    };
  }
}