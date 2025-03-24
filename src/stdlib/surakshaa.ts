// filepath: src/stdlib/surakshaa.ts
// सुरक्षा (surakshaa) - Security module

import { त्रुटि } from './core';
import * as crypto from 'crypto';

// Security error
export class सुरक्षात्रुटि extends त्रुटि {
  constructor(संदेश: string) {
    super(संदेश);
    this.name = 'सुरक्षात्रुटि';
  }
}

// Hash algorithms
export type हैशप्रकार = 'md5' | 'sha1' | 'sha256' | 'sha512';

// Encryption algorithms
export type एन्क्रिप्शनप्रकार = 'aes-256-gcm' | 'aes-256-cbc';

// Hash class
export class हैश {
  private एल्गोरिथम: हैशप्रकार;

  constructor(एल्गोरिथम: हैशप्रकार = 'sha256') {
    this.एल्गोरिथम = एल्गोरिथम;
  }

  // Create hash
  बनाएं(डेटा: string | Buffer): string {
    const हैश = crypto.createHash(this.एल्गोरिथम);
    हैश.update(डेटा);
    return हैश.digest('hex');
  }

  // Verify hash
  सत्यापन(डेटा: string | Buffer, हैश: string): boolean {
    const नयाहैश = this.बनाएं(डेटा);
    return नयाहैश === हैश;
  }
}

// HMAC class
export class एचमैक {
  private एल्गोरिथम: हैशप्रकार;
  private कुंजी: string;

  constructor(कुंजी: string, एल्गोरिथम: हैशप्रकार = 'sha256') {
    this.कुंजी = कुंजी;
    this.एल्गोरिथम = एल्गोरिथम;
  }

  // Create HMAC
  बनाएं(डेटा: string | Buffer): string {
    const एचमैक = crypto.createHmac(this.एल्गोरिथम, this.कुंजी);
    एचमैक.update(डेटा);
    return एचमैक.digest('hex');
  }

  // Verify HMAC
  सत्यापन(डेटा: string | Buffer, एचमैक: string): boolean {
    const नयाएचमैक = this.बनाएं(डेटा);
    return नयाएचमैक === एचमैक;
  }
}

// Encryption class
export class एन्क्रिप्शन {
  private एल्गोरिथम: एन्क्रिप्शनप्रकार;
  private कुंजी: Buffer;

  constructor(कुंजी: string | Buffer, एल्गोरिथम: एन्क्रिप्शनप्रकार = 'aes-256-gcm') {
    this.एल्गोरिथम = एल्गोरिथम;
    this.कुंजी = typeof कुंजी === 'string' ? 
      crypto.scryptSync(कुंजी, 'salt', 32) : 
      कुंजी;
  }

  // Encrypt data
  एन्क्रिप्ट(डेटा: string | Buffer): { एन्क्रिप्टेड: string; iv: string; टैग?: string } {
    const iv = crypto.randomBytes(16);
    const साइफर = crypto.createCipheriv(
      this.एल्गोरिथम, 
      this.कुंजी, 
      iv
    ) as crypto.CipherGCM;

    const इनपुटडेटा = Buffer.isBuffer(डेटा) ? डेटा : Buffer.from(डेटा, 'utf8');
    let एन्क्रिप्टेड = साइफर.update(इनपुटडेटा).toString('hex');
    एन्क्रिप्टेड += साइफर.final('hex');

    return {
      एन्क्रिप्टेड,
      iv: iv.toString('hex'),
      टैग: this.एल्गोरिथम === 'aes-256-gcm' ? साइफर.getAuthTag().toString('hex') : undefined
    };
  }

  // Decrypt data
  डिक्रिप्ट(एन्क्रिप्टेड: string, iv: string, टैग?: string): string {
    const डिसाइफर = crypto.createDecipheriv(
      this.एल्गोरिथम, 
      this.कुंजी, 
      Buffer.from(iv, 'hex')
    );

    if (this.एल्गोरिथम === 'aes-256-gcm' && टैग) {
      (डिसाइफर as crypto.DecipherGCM).setAuthTag(Buffer.from(टैग, 'hex'));
    }

    let डिक्रिप्टेड = डिसाइफर.update(एन्क्रिप्टेड, 'hex', 'utf8');
    डिक्रिप्टेड += डिसाइफर.final('utf8');

    return डिक्रिप्टेड;
  }
}

// Password utilities
export class पासवर्ड {
  private static लवणांक = 16;
  private static पुनरावृत्तियाँ = 1000;
  private static कुंजीलंबाई = 64;

  // Hash password
  static async हैश(पासवर्ड: string): Promise<string> {
    const लवण = crypto.randomBytes(this.लवणांक);
    
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        पासवर्ड,
        लवण,
        this.पुनरावृत्तियाँ,
        this.कुंजीलंबाई,
        'sha512',
        (त्रुटि, कुंजी) => {
          if (त्रुटि) reject(त्रुटि);
          resolve(`${लवण.toString('hex')}:${कुंजी.toString('hex')}`);
        }
      );
    });
  }

  // Verify password
  static async सत्यापन(पासवर्ड: string, हैश: string): Promise<boolean> {
    const [लवण, मूल्य] = हैश.split(':');
    
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        पासवर्ड,
        Buffer.from(लवण, 'hex'),
        this.पुनरावृत्तियाँ,
        this.कुंजीलंबाई,
        'sha512',
        (त्रुटि, कुंजी) => {
          if (त्रुटि) reject(त्रुटि);
          resolve(कुंजी.toString('hex') === मूल्य);
        }
      );
    });
  }

  // Generate secure password
  static सुरक्षितबनाएं(लंबाई: number = 16): string {
    const वर्ण = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let पासवर्ड = '';
    
    for (let i = 0; i < लंबाई; i++) {
      पासवर्ड += वर्ण[crypto.randomInt(0, वर्ण.length)];
    }
    
    return पासवर्ड;
  }
}

// JWT utilities
export class टोकन {
  private कुंजी: string;
  private एल्गोरिथम: string;

  constructor(कुंजी: string, एल्गोरिथम: string = 'HS256') {
    this.कुंजी = कुंजी;
    this.एल्गोरिथम = एल्गोरिथम;
  }

  // Create JWT
  बनाएं(डेटा: object, समयसीमा?: number): string {
    const हेडर = {
      alg: this.एल्गोरिथम,
      typ: 'JWT'
    };

    const पेलोड: { [key: string]: any } = {
      ...डेटा,
      iat: Math.floor(Date.now() / 1000)
    };

    if (समयसीमा) {
      पेलोड.exp = पेलोड.iat + समयसीमा;
    }

    const एन्कोडेडहेडर = Buffer.from(JSON.stringify(हेडर)).toString('base64url');
    const एन्कोडेडपेलोड = Buffer.from(JSON.stringify(पेलोड)).toString('base64url');
    
    const हस्ताक्षर = new एचमैक(this.कुंजी).बनाएं(`${एन्कोडेडहेडर}.${एन्कोडेडपेलोड}`);

    return `${एन्कोडेडहेडर}.${एन्कोडेडपेलोड}.${हस्ताक्षर}`;
  }

  // Verify and decode JWT
  सत्यापन(टोकन: string): object | null {
    try {
      const [एन्कोडेडहेडर, एन्कोडेडपेलोड, हस्ताक्षर] = टोकन.split('.');

      // Verify signature
      const नयाहस्ताक्षर = new एचमैक(this.कुंजी).बनाएं(`${एन्कोडेडहेडर}.${एन्कोडेडपेलोड}`);
      if (नयाहस्ताक्षर !== हस्ताक्षर) {
        return null;
      }

      // Decode payload
      const पेलोड = JSON.parse(Buffer.from(एन्कोडेडपेलोड, 'base64url').toString());

      // Check expiration
      if (पेलोड.exp && पेलोड.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }

      return पेलोड;
    } catch {
      return null;
    }
  }
}

// Random number generation
export class यादृच्छिक {
  // Generate random bytes
  static बाइट्स(लंबाई: number): Buffer {
    return crypto.randomBytes(लंबाई);
  }

  // Generate random number in range
  static संख्या(न्यूनतम: number, अधिकतम: number): number {
    return crypto.randomInt(न्यूनतम, अधिकतम);
  }

  // Generate random string
  static स्ट्रिंग(लंबाई: number, वर्ण: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let परिणाम = '';
    const वर्णलंबाई = वर्ण.length;
    
    for (let i = 0; i < लंबाई; i++) {
      परिणाम += वर्ण[this.संख्या(0, वर्णलंबाई)];
    }
    
    return परिणाम;
  }

  // Generate UUID v4
  static uuid(): string {
    return crypto.randomUUID();
  }
}

// Export main security object
export const सुरक्षा = {
  हैश: (एल्गोरिथम?: हैशप्रकार) => new हैश(एल्गोरिथम),
  एचमैक: (कुंजी: string, एल्गोरिथम?: हैशप्रकार) => new एचमैक(कुंजी, एल्गोरिथम),
  एन्क्रिप्शन: (कुंजी: string | Buffer, एल्गोरिथम?: एन्क्रिप्शनप्रकार) => new एन्क्रिप्शन(कुंजी, एल्गोरिथम),
  पासवर्ड,
  टोकन: (कुंजी: string, एल्गोरिथम?: string) => new टोकन(कुंजी, एल्गोरिथम),
  यादृच्छिक
}; 