// filepath: src/stdlib/aagama.ts
// आगम (aagama) - File I/O and resource management

import * as fs from 'fs/promises';
import { Stats } from 'fs';
import * as path from 'path';
import { त्रुटि } from './core';

export class आगमत्रुटि extends त्रुटि {
  constructor(संदेश: string) {
    super(संदेश);
    this.name = 'आगमत्रुटि';
  }
}

// File Operations (फ़ाइल संचालन)
export const फ़ाइल = {
  // Read file (पठन - pathan)
  async पठन(पथ: string): Promise<string> {
    try {
      return await fs.readFile(पथ, 'utf-8');
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`फ़ाइल पढ़ने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Read file as binary (बाइनरीपठन - binaryPathan)
  async बाइनरीपठन(पथ: string): Promise<Buffer> {
    try {
      return await fs.readFile(पथ);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`बाइनरी फ़ाइल पढ़ने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Write file (लेखन - lekhan)
  async लेखन(पथ: string, सामग्री: string): Promise<void> {
    try {
      await fs.writeFile(पथ, सामग्री, 'utf-8');
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`फ़ाइल लिखने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Write binary file (बाइनरीलेखन - binaryLekhan)
  async बाइनरीलेखन(पथ: string, सामग्री: Buffer): Promise<void> {
    try {
      await fs.writeFile(पथ, सामग्री);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`बाइनरी फ़ाइल लिखने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Append to file (परिशिष्ट - parishisht)
  async परिशिष्ट(पथ: string, सामग्री: string): Promise<void> {
    try {
      await fs.appendFile(पथ, सामग्री, 'utf-8');
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`फ़ाइल में परिशिष्ट करने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Delete file (हटाना - hatana)
  async हटाना(पथ: string): Promise<void> {
    try {
      await fs.unlink(पथ);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`फ़ाइल हटाने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Check if file exists (अस्तित्व - astitva)
  async अस्तित्व(पथ: string): Promise<boolean> {
    try {
      await fs.access(पथ);
      return true;
    } catch {
      return false;
    }
  },

  // Get file info (जानकारी - jankari)
  async जानकारी(पथ: string): Promise<Stats> {
    try {
      return await fs.stat(पथ);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`फ़ाइल जानकारी प्राप्त करने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Copy file (प्रतिलिपि - pratilipi)
  async प्रतिलिपि(स्रोत: string, गंतव्य: string): Promise<void> {
    try {
      await fs.copyFile(स्रोत, गंतव्य);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`फ़ाइल की प्रतिलिपि बनाने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Rename or move file (पुनर्नामकरण - punarnamkaran)
  async पुनर्नामकरण(पुरानापथ: string, नयापथ: string): Promise<void> {
    try {
      await fs.rename(पुरानापथ, नयापथ);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`फ़ाइल का पुनर्नामकरण करने में त्रुटि: ${त्रुटि}`);
    }
  }
};

// Directory Operations (निर्देशिका संचालन)
export const निर्देशिका = {
  // Create directory (निर्माण - nirman)
  async निर्माण(पथ: string): Promise<void> {
    try {
      await fs.mkdir(पथ, { recursive: true });
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`निर्देशिका बनाने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Read directory contents (सूची - soochi)
  async सूची(पथ: string): Promise<string[]> {
    try {
      return await fs.readdir(पथ);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`निर्देशिका सामग्री पढ़ने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Delete directory (हटाना - hatana)
  async हटाना(पथ: string, पुनरावर्ती: boolean = false): Promise<void> {
    try {
      await fs.rm(पथ, { recursive: पुनरावर्ती, force: true });
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`निर्देशिका हटाने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Check if directory exists (अस्तित्व - astitva)
  async अस्तित्व(पथ: string): Promise<boolean> {
    try {
      const स्थिति = await fs.stat(पथ);
      return स्थिति.isDirectory();
    } catch {
      return false;
    }
  }
};

// Path Operations (पथ संचालन)
export const पथ = {
  // Join path components (संयोजन - sanyojan)
  संयोजन(...खंड: string[]): string {
    return path.join(...खंड);
  },

  // Get directory name (निर्देशिकानाम - nirdesikanaam)
  निर्देशिकानाम(पथ: string): string {
    return path.dirname(पथ);
  },

  // Get file name (फ़ाइलनाम - filename)
  फ़ाइलनाम(पथ: string): string {
    return path.basename(पथ);
  },

  // Get file extension (विस्तार - vistar)
  विस्तार(पथ: string): string {
    return path.extname(पथ);
  },

  // Resolve path (समाधान - samadhan)
  समाधान(...खंड: string[]): string {
    return path.resolve(...खंड);
  },

  // Normalize path (सामान्यीकरण - samanyikaran)
  सामान्यीकरण(पथ: string): string {
    return path.normalize(पथ);
  },

  // Check if path is absolute (पूर्णपथ - poornpath)
  पूर्णपथ(पथ: string): boolean {
    return path.isAbsolute(पथ);
  }
};

// Resource Management (संसाधन प्रबंधन)
export class संसाधन<T> {
  private संसाधनमूल्य: T;
  private निपटानकार्य: (मूल्य: T) => Promise<void>;
  private निपटागया: boolean = false;

  constructor(मूल्य: T, निपटानकार्य: (मूल्य: T) => Promise<void>) {
    this.संसाधनमूल्य = मूल्य;
    this.निपटानकार्य = निपटानकार्य;
  }

  // Get resource value (मूल्य - mulya)
  मूल्य(): T {
    if (this.निपटागया) {
      throw new आगमत्रुटि('निपटाए गए संसाधन का उपयोग करने का प्रयास');
    }
    return this.संसाधनमूल्य;
  }

  // Dispose resource (निपटाना - nipatana)
  async निपटाना(): Promise<void> {
    if (!this.निपटागया) {
      await this.निपटानकार्य(this.संसाधनमूल्य);
      this.निपटागया = true;
    }
  }

  // Use resource with proper disposal (प्रयोग - prayog)
  static async प्रयोग<T, R>(
    संसाधनप्रदाता: () => Promise<संसाधन<T>>,
    उपयोगकर्ता: (संसाधन: T) => Promise<R>
  ): Promise<R> {
    const संसाधनइंस्टेंस = await संसाधनप्रदाता();
    try {
      return await उपयोगकर्ता(संसाधनइंस्टेंस.मूल्य());
    } finally {
      await संसाधनइंस्टेंस.निपटाना();
    }
  }
}

// Stream Operations (प्रवाह संचालन)
export const प्रवाह = {
  // Create read stream from file (पठनप्रवाह - pathanPravah)
  async पठनप्रवाह(पथ: string): Promise<NodeJS.ReadableStream> {
    const { createReadStream } = await import('fs');
    try {
      return createReadStream(पथ);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`पठन प्रवाह बनाने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Create write stream to file (लेखनप्रवाह - lekhanPravah)
  async लेखनप्रवाह(पथ: string): Promise<NodeJS.WritableStream> {
    const { createWriteStream } = await import('fs');
    try {
      return createWriteStream(पथ);
    } catch (त्रुटि) {
      throw new आगमत्रुटि(`लेखन प्रवाह बनाने में त्रुटि: ${त्रुटि}`);
    }
  },

  // Pipe streams (पाइप - pipe)
  पाइप(स्रोत: NodeJS.ReadableStream, गंतव्य: NodeJS.WritableStream): NodeJS.WritableStream {
    return स्रोत.pipe(गंतव्य);
  }
};

// File Watcher (फ़ाइल निगरानी)
export class फ़ाइलनिगरानी {
  private निगरानी;
  
  constructor(पथ: string, कॉलबैक: (प्रकार: string, फ़ाइलनाम: string) => void) {
    const { watch } = require('fs');
    this.निगरानी = watch(पथ, (प्रकार: string, फ़ाइलनाम: string) => {
      कॉलबैक(प्रकार, फ़ाइलनाम);
    });
  }

  // Close watcher (बंद - band)
  बंद(): void {
    this.निगरानी.close();
  }
}

// Temp file management (अस्थायी फ़ाइल प्रबंधन)
export const अस्थायी = {
  // Create temp file (फ़ाइल - file)
  async फ़ाइल(उपसर्ग: string = 'tmp-', विस्तार: string = ''): Promise<{ पथ: string, हटाना: () => Promise<void> }> {
    const { tmpdir } = await import('os');
    const { v4: uuidv4 } = await import('uuid');
    
    const अस्थायीपथ = path.join(tmpdir(), `${उपसर्ग}${uuidv4()}${विस्तार}`);
    
    // Create empty file
    await fs.writeFile(अस्थायीपथ, '');
    
    return {
      पथ: अस्थायीपथ,
      हटाना: async () => {
        try {
          await fs.unlink(अस्थायीपथ);
        } catch {
          // Ignore errors during cleanup
        }
      }
    };
  },
  
  // Create temp directory (निर्देशिका - directory)
  async निर्देशिका(उपसर्ग: string = 'tmp-'): Promise<{ पथ: string, हटाना: () => Promise<void> }> {
    const { tmpdir } = await import('os');
    const { v4: uuidv4 } = await import('uuid');
    
    const अस्थायीपथ = path.join(tmpdir(), `${उपसर्ग}${uuidv4()}`);
    
    // Create directory
    await fs.mkdir(अस्थायीपथ);
    
    return {
      पथ: अस्थायीपथ,
      हटाना: async () => {
        try {
          await fs.rm(अस्थायीपथ, { recursive: true, force: true });
        } catch {
          // Ignore errors during cleanup
        }
      }
    };
  }
};

// System paths (तंत्र पथ)
export const तंत्रपथ = {
  // Home directory (मुख्य - mukhya)
  async मुख्य(): Promise<string> {
    const { homedir } = await import('os');
    return homedir();
  },
  
  // Temp directory (अस्थायी - asthayi)
  async अस्थायी(): Promise<string> {
    const { tmpdir } = await import('os');
    return tmpdir();
  },
  
  // Current working directory (वर्तमान - vartaman)
  वर्तमान(): string {
    return process.cwd();
  }
};