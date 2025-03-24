// filepath: src/stdlib/pralekhana.ts
// प्रलेखन (pralekhana) - Documentation generation

import * as fs from 'fs/promises';
import * as path from 'path';
import { त्रुटि } from './core';

export class प्रलेखनत्रुटि extends त्रुटि {
  constructor(संदेश: string) {
    super(संदेश);
    this.name = 'प्रलेखनत्रुटि';
  }
}

// Documentation generator interfaces and types
export interface प्रलेखनविकल्प {
  स्रोतपथ?: string;
  लक्ष्यपथ?: string;
  शीर्षक?: string;
  वर्णन?: string;
  रूपरेखा?: string; // Markdown, HTML, PDF, etc.
  लेखक?: string;
  संस्करण?: string;
  असंगति?: boolean; // Include private members?
  छवियांपथ?: string;
  थीम?: प्रलेखनथीम;
}

export interface प्रलेखनथीम {
  प्राथमिकरंग?: string;
  द्वितीयकरंग?: string;
  पाठरंग?: string;
  पृष्ठभूमिरंग?: string;
  शीर्षलेखरंग?: string;
  फ़ॉन्ट?: string;
  कोडफ़ॉन्ट?: string;
}

export interface कोडप्रलेखन {
  नाम: string;
  प्रकार: 'फ़ंक्शन' | 'क्लास' | 'इंटरफेस' | 'प्रकार' | 'चर' | 'मॉड्यूल';
  फ़ाइलपथ: string;
  रेखाक्रमांक: number;
  वर्णन?: string;
  टैग: टैगप्रलेखन[];
  सदस्य: कोडप्रलेखन[];
  विशिष्टताएँ: Record<string, any>;
}

export interface टैगप्रलेखन {
  नाम: 'param' | 'returns' | 'throws' | 'example' | 'see' | 'deprecated' | 'since' | 'author' | 'version' | string;
  वर्णन: string;
  अतिरिक्त?: Record<string, string>;
}

// Basic documentation parser
export class प्रलेखनपार्सर {
  private स्रोतपथ: string;
  private विकल्प: प्रलेखनविकल्प;

  constructor(स्रोतपथ: string, विकल्प: प्रलेखनविकल्प = {}) {
    this.स्रोतपथ = स्रोतपथ;
    this.विकल्प = विकल्प;
  }

  // Parse code (कोडपार्स - kodeParser)
  async कोडपार्स(): Promise<कोडप्रलेखन[]> {
    try {
      const फ़ाइलें = await this.स्रोतफ़ाइलेंखोजें(this.स्रोतपथ);
      const प्रलेखनसूची: कोडप्रलेखन[] = [];

      for (const फ़ाइल of फ़ाइलें) {
        const फ़ाइलसामग्री = await fs.readFile(फ़ाइल, 'utf-8');
        const फ़ाइलप्रलेखन = this.फ़ाइलप्रलेखनपार्स(फ़ाइलसामग्री, फ़ाइल);
        प्रलेखनसूची.push(...फ़ाइलप्रलेखन);
      }

      return प्रलेखनसूची;
    } catch (त्रुटि) {
      throw new प्रलेखनत्रुटि(`कोड का पार्स करने में त्रुटि: ${त्रुटि}`);
    }
  }

  // Find source files (स्रोतफ़ाइलेंखोजें - srotFileenKhojen)
  private async स्रोतफ़ाइलेंखोजें(निर्देशिका: string): Promise<string[]> {
    const फ़ाइलें: string[] = [];
    const निर्देशिकासामग्री = await fs.readdir(निर्देशिका, { withFileTypes: true });

    for (const आइटम of निर्देशिकासामग्री) {
      const पूरापथ = path.join(निर्देशिका, आइटम.name);

      if (आइटम.isDirectory()) {
        const उपनिर्देशिकाफ़ाइलें = await this.स्रोतफ़ाइलेंखोजें(पूरापथ);
        फ़ाइलें.push(...उपनिर्देशिकाफ़ाइलें);
      } else if (
        आइटम.isFile() &&
        (आइटम.name.endsWith('.ts') || आइटम.name.endsWith('.js') || आइटम.name.endsWith('.sam'))
      ) {
        फ़ाइलें.push(पूरापथ);
      }
    }

    return फ़ाइलें;
  }

  // Parse file documentation (फ़ाइलप्रलेखनपार्स - fileParlekhanaParser)
  private फ़ाइलप्रलेखनपार्स(सामग्री: string, फ़ाइलपथ: string): कोडप्रलेखन[] {
    const प्रलेखनसूची: कोडप्रलेखन[] = [];
    const लाइनें = सामग्री.split('\n');

    // Simple JSDoc-style comment parsing
    for (let i = 0; i < लाइनें.length; i++) {
      const लाइन = लाइनें[i].trim();

      // Look for JSDoc-style comments
      if (लाइन.startsWith('/**')) {
        let टिप्पणी = लाइन;
        let j = i + 1;

        // Collect the entire comment block
        while (j < लाइनें.length && !लाइनें[j].trim().endsWith('*/')) {
          टिप्पणी += '\n' + लाइनें[j];
          j++;
        }

        if (j < लाइनें.length) {
          टिप्पणी += '\n' + लाइनें[j].trim();
          i = j;
        }

        // Look for the code after the comment
        let कोडलाइन = '';
        let कोडलाइनिंडेक्स = i + 1;

        while (
          कोडलाइनिंडेक्स < लाइनें.length &&
          लाइनें[कोडलाइनिंडेक्स].trim() === ''
        ) {
          कोडलाइनिंडेक्स++;
        }

        if (कोडलाइनिंडेक्स < लाइनें.length) {
          कोडलाइन = लाइनें[कोडलाइनिंडेक्स].trim();
        }

        const प्रलेखन = this.टिप्पणीप्रलेखनपार्स(टिप्पणी, कोडलाइन, फ़ाइलपथ, कोडलाइनिंडेक्स + 1);
        if (प्रलेखन) {
          प्रलेखनसूची.push(प्रलेखन);
        }
      }
    }

    return प्रलेखनसूची;
  }

  // Parse JSDoc comment (टिप्पणीप्रलेखनपार्स - tippaniParlekhanaParser)
  private टिप्पणीप्रलेखनपार्स(
    टिप्पणी: string,
    कोडलाइन: string,
    फ़ाइलपथ: string,
    रेखाक्रमांक: number
  ): कोडप्रलेखन | null {
    // Extract description and tags from JSDoc comment
    const लाइनें = टिप्पणी
      .replace(/\/\*\*|\*\//g, '')
      .split('\n')
      .map(line => line.replace(/^\s*\*\s?/, '').trim())
      .filter(line => line !== '');

    let वर्णन = '';
    const टैग: टैगप्रलेखन[] = [];
    let वर्तमानटैग: टैगप्रलेखन | null = null;

    for (const लाइन of लाइनें) {
      if (लाइन.startsWith('@')) {
        if (वर्तमानटैग) {
          टैग.push(वर्तमानटैग);
        }

        const टैगमिलान = लाइन.match(/@(\w+)(?:\s+{([^}]+)})?(?:\s+(\w+))?(?:\s+(.+))?/);
        if (टैगमिलान) {
          वर्तमानटैग = {
            नाम: टैगमिलान[1],
            वर्णन: टैगमिलान[4] || '',
            अतिरिक्त: {}
          };

          if (टैगमिलान[2]) {
            वर्तमानटैग.अतिरिक्त!['प्रकार'] = टैगमिलान[2];
          }

          if (टैगमिलान[3]) {
            वर्तमानटैग.अतिरिक्त!['नाम'] = टैगमिलान[3];
          }
        } else {
          const सरलटैगमिलान = लाइन.match(/@(\w+)(?:\s+(.+))?/);
          if (सरलटैगमिलान) {
            वर्तमानटैग = {
              नाम: सरलटैगमिलान[1],
              वर्णन: सरलटैगमिलान[2] || ''
            };
          }
        }
      } else if (वर्तमानटैग) {
        वर्तमानटैग.वर्णन += ' ' + लाइन;
      } else {
        वर्णन += (वर्णन ? ' ' : '') + लाइन;
      }
    }

    if (वर्तमानटैग) {
      टैग.push(वर्तमानटैग);
    }

    // Detect the code type from the line after the comment
    let नाम = '';
    let प्रकार: 'फ़ंक्शन' | 'क्लास' | 'इंटरफेस' | 'प्रकार' | 'चर' | 'मॉड्यूल' = 'फ़ंक्शन';
    const विशिष्टताएँ: Record<string, any> = {};

    if (कोडलाइन.startsWith('export ')) {
      if (कोडलाइन.includes('class ')) {
        प्रकार = 'क्लास';
        const मिलान = कोडलाइन.match(/class\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (कोडलाइन.includes('interface ')) {
        प्रकार = 'इंटरफेस';
        const मिलान = कोडलाइन.match(/interface\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (कोडलाइन.includes('type ')) {
        प्रकार = 'प्रकार';
        const मिलान = कोडलाइन.match(/type\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (कोडलाइन.includes('function ')) {
        प्रकार = 'फ़ंक्शन';
        const मिलान = कोडलाइन.match(/function\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (कोडलाइन.includes('const ') || कोडलाइन.includes('let ') || कोडलाइन.includes('var ')) {
        प्रकार = 'चर';
        const मिलान = कोडलाइन.match(/(?:const|let|var)\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (कोडलाइन.includes('namespace ') || कोडलाइन.includes('module ')) {
        प्रकार = 'मॉड्यूल';
        const मिलान = कोडलाइन.match(/(?:namespace|module)\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      }
    } else {
      // Similar parsing for non-export items
      if (कोडलाइन.startsWith('class ')) {
        प्रकार = 'क्लास';
        const मिलान = कोडलाइन.match(/class\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (कोडलाइन.startsWith('interface ')) {
        प्रकार = 'इंटरफेस';
        const मिलान = कोडलाइन.match(/interface\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (कोडलाइन.startsWith('type ')) {
        प्रकार = 'प्रकार';
        const मिलान = कोडलाइन.match(/type\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (कोडलाइन.startsWith('function ')) {
        प्रकार = 'फ़ंक्शन';
        const मिलान = कोडलाइन.match(/function\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      } else if (
        कोडलाइन.startsWith('const ') ||
        कोडलाइन.startsWith('let ') ||
        कोडलाइन.startsWith('var ')
      ) {
        प्रकार = 'चर';
        const मिलान = कोडलाइन.match(/(?:const|let|var)\s+(\w+)/);
        if (मिलान) नाम = मिलान[1];
      }
    }

    if (!नाम) {
      return null;
    }

    // Find parameters for functions/methods
    if (प्रकार === 'फ़ंक्शन') {
      const पैरामीटरमैच = कोडलाइन.match(/\(([^)]*)\)/);
      if (पैरामीटरमैच) {
        विशिष्टताएँ['पैरामीटर्स'] = पैरामीटरमैच[1]
          .split(',')
          .map(param => param.trim())
          .filter(param => param !== '');
      }
    }

    return {
      नाम,
      प्रकार,
      फ़ाइलपथ,
      रेखाक्रमांक,
      वर्णन,
      टैग,
      सदस्य: [],
      विशिष्टताएँ
    };
  }
}

// Markdown documentation generator
export class माकडाउनप्रलेखनजनरेटर {
  private प्रलेखन: कोडप्रलेखन[];
  private विकल्प: प्रलेखनविकल्प;

  constructor(प्रलेखन: कोडप्रलेखन[], विकल्प: प्रलेखनविकल्प = {}) {
    this.प्रलेखन = प्रलेखन;
    this.विकल्प = विकल्प;
  }

  // Generate markdown (माकडाउनउत्पन्न - markdownUtpanna)
  async माकडाउनउत्पन्न(): Promise<string> {
    const शीर्षक = this.विकल्प.शीर्षक || 'प्रलेखन';
    const वर्णन = this.विकल्प.वर्णन || '';
    const लेखक = this.विकल्प.लेखक ? `\n\n**लेखक:** ${this.विकल्प.लेखक}` : '';
    const संस्करण = this.विकल्प.संस्करण ? `\n\n**संस्करण:** ${this.विकल्प.संस्करण}` : '';

    let माकडाउन = `# ${शीर्षक}\n\n${वर्णन}${लेखक}${संस्करण}\n\n## विषय-सूची\n\n`;

    // Generate table of contents
    const प्रकारद्वारावर्गीकृत = this.प्रकारद्वारावर्गीकृतप्रलेखन();

    for (const [प्रकार, आइटम] of Object.entries(प्रकारद्वारावर्गीकृत)) {
      if (आइटम.length === 0) continue;

      माकडाउन += `- [${this.प्रकारकाहिंदीनाम(प्रकार)}](#${this.प्रकारकाहिंदीनाम(प्रकार).toLowerCase()})\n`;
      
      for (const प्रलेखन of आइटम) {
        माकडाउन += `  - [${प्रलेखन.नाम}](#${प्रलेखन.नाम.toLowerCase()})\n`;
      }
    }

    // Generate documentation by type
    for (const [प्रकार, आइटम] of Object.entries(प्रकारद्वारावर्गीकृत)) {
      if (आइटम.length === 0) continue;

      माकडाउन += `\n## ${this.प्रकारकाहिंदीनाम(प्रकार)}\n\n`;

      for (const प्रलेखन of आइटम) {
        माकडाउन += this.आइटमप्रलेखनमाकडाउन(प्रलेखन);
      }
    }

    return माकडाउन;
  }

  // Group documentation by type (प्रकारद्वारावर्गीकृतप्रलेखन - prakarDwaraVargeekritPralekhana)
  private प्रकारद्वारावर्गीकृतप्रलेखन(): Record<string, कोडप्रलेखन[]> {
    const वर्गीकृत: Record<string, कोडप्रलेखन[]> = {
      'क्लास': [],
      'इंटरफेस': [],
      'प्रकार': [],
      'फ़ंक्शन': [],
      'चर': [],
      'मॉड्यूल': []
    };

    for (const प्रलेखन of this.प्रलेखन) {
      वर्गीकृत[प्रलेखन.प्रकार].push(प्रलेखन);
    }

    // Sort each category by name
    for (const प्रकार in वर्गीकृत) {
      वर्गीकृत[प्रकार].sort((a, b) => a.नाम.localeCompare(b.नाम));
    }

    return वर्गीकृत;
  }

  // Convert type to Hindi name (प्रकारकाहिंदीनाम - prakarKaHindiNaam)
  private प्रकारकाहिंदीनाम(प्रकार: string): string {
    const नामकोश: Record<string, string> = {
      'क्लास': 'वर्ग',
      'इंटरफेस': 'अंतरापृष्ठ',
      'प्रकार': 'प्रकार',
      'फ़ंक्शन': 'फलन',
      'चर': 'चर',
      'मॉड्यूल': 'मॉड्यूल'
    };

    return नामकोश[प्रकार] || प्रकार;
  }

  // Generate markdown for a single item (आइटमप्रलेखनमाकडाउन - itemParlekhanaMarkdown)
  private आइटमप्रलेखनमाकडाउन(प्रलेखन: कोडप्रलेखन): string {
    let माकडाउन = `### ${प्रलेखन.नाम}\n\n`;

    // Add description
    if (प्रलेखन.वर्णन) {
      माकडाउन += `${प्रलेखन.वर्णन}\n\n`;
    }

    // Add file information
    माकडाउन += `**फ़ाइल:** \`${path.relative(
      this.विकल्प.स्रोतपथ || '.',
      प्रलेखन.फ़ाइलपथ
    )}\`\n\n`;

    // Add parameters for functions
    if (प्रलेखन.प्रकार === 'फ़ंक्शन' && प्रलेखन.विशिष्टताएँ.पैरामीटर्स) {
      माकडाउन += `**पैरामीटर्स:**\n\n`;

      const पैरामटैग = प्रलेखन.टैग.filter(tag => tag.नाम === 'param');
      
      for (const पैराम of प्रलेखन.विशिष्टताएँ.पैरामीटर्स) {
        const पैरामप्रलेखन = पैरामटैग.find(
          tag => tag.अतिरिक्त && tag.अतिरिक्त.नाम === पैराम.split(':')[0].trim()
        );

        माकडाउन += `- \`${पैराम}\``;
        
        if (पैरामप्रलेखन) {
          माकडाउन += ` - ${पैरामप्रलेखन.वर्णन}`;
        }
        
        माकडाउन += '\n';
      }

      माकडाउन += '\n';
    }

    // Add return information
    const रिटर्नटैग = प्रलेखन.टैग.find(tag => tag.नाम === 'returns');
    if (रिटर्नटैग) {
      माकडाउन += `**वापसी:** ${रिटर्नटैग.वर्णन}\n\n`;
    }

    // Add examples
    const उदाहरणटैग = प्रलेखन.टैग.filter(tag => tag.नाम === 'example');
    if (उदाहरणटैग.length > 0) {
      माकडाउन += `**उदाहरण:**\n\n`;
      
      for (const उदाहरण of उदाहरणटैग) {
        माकडाउन += '```typescript\n' + उदाहरण.वर्णन + '\n```\n\n';
      }
    }

    // Add deprecated notice
    const अप्रचलितटैग = प्रलेखन.टैग.find(tag => tag.नाम === 'deprecated');
    if (अप्रचलितटैग) {
      माकडाउन += `> **अप्रचलित:** ${अप्रचलितटैग.वर्णन}\n\n`;
    }

    माकडाउन += '---\n\n';
    return माकडाउन;
  }

  // Write to file (फ़ाइलमेंलिखें - fileMeinLikhen)
  async फ़ाइलमेंलिखें(फ़ाइलपथ: string): Promise<void> {
    try {
      const निर्देशिका = path.dirname(फ़ाइलपथ);
      
      // Create directory if it doesn't exist
      await fs.mkdir(निर्देशिका, { recursive: true });
      
      const सामग्री = await this.माकडाउनउत्पन्न();
      await fs.writeFile(फ़ाइलपथ, सामग्री, 'utf-8');
    } catch (त्रुटि) {
      throw new प्रलेखनत्रुटि(`फ़ाइल में लिखने में त्रुटि: ${त्रुटि}`);
    }
  }
}

// HTML documentation generator
export class HTMLप्रलेखनजनरेटर {
  private प्रलेखन: कोडप्रलेखन[];
  private विकल्प: प्रलेखनविकल्प;

  constructor(प्रलेखन: कोडप्रलेखन[], विकल्प: प्रलेखनविकल्प = {}) {
    this.प्रलेखन = प्रलेखन;
    this.विकल्प = विकल्प;
  }

  // Generate HTML (HTMLउत्पन्न - HTMLUtpanna)
  async HTMLउत्पन्न(): Promise<string> {
    const शीर्षक = this.विकल्प.शीर्षक || 'प्रलेखन';
    const वर्णन = this.विकल्प.वर्णन || '';
    const थीम = this.विकल्प.थीम || {};
    
    const स्टाइल = `
      :root {
        --primary-color: ${थीम.प्राथमिकरंग || '#4527a0'};
        --secondary-color: ${थीम.द्वितीयकरंग || '#7953d2'};
        --text-color: ${थीम.पाठरंग || '#333'};
        --background-color: ${थीम.पृष्ठभूमिरंग || '#fff'};
        --heading-color: ${थीम.शीर्षलेखरंग || '#2c2c2c'};
        --font-family: ${थीम.फ़ॉन्ट || 'Arial, sans-serif'};
        --code-font-family: ${थीम.कोडफ़ॉन्ट || 'Consolas, monospace'};
      }
      * { box-sizing: border-box; }
      body {
        font-family: var(--font-family);
        color: var(--text-color);
        background-color: var(--background-color);
        line-height: 1.6;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      header { 
        padding: 20px 0;
        margin-bottom: 30px;
        border-bottom: 1px solid var(--secondary-color);
      }
      h1, h2, h3, h4 { 
        color: var(--heading-color);
      }
      h1 { 
        color: var(--primary-color);
        font-size: 2.5em;
      }
      h2 {
        padding-bottom: 10px;
        border-bottom: 1px solid var(--secondary-color);
        margin-top: 40px;
      }
      h3 {
        color: var(--primary-color);
        margin-top: 30px;
      }
      code {
        font-family: var(--code-font-family);
        background-color: #f5f5f5;
        padding: 2px 4px;
        border-radius: 3px;
      }
      pre {
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
        overflow-x: auto;
      }
      pre code {
        background-color: transparent;
        padding: 0;
      }
      .toc {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 30px;
      }
      .toc ul {
        padding-left: 20px;
      }
      .item {
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 5px;
        background-color: #fefefe;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      }
      .deprecated {
        background-color: #fff8f8;
        border-left: 4px solid #e74c3c;
        padding: 10px 15px;
        margin-bottom: 20px;
      }
      .meta {
        font-size: 0.9em;
        color: #666;
        margin-bottom: 15px;
      }
      .params-list {
        list-style-type: none;
        padding-left: 0;
      }
      .params-list li {
        padding: 5px 0;
      }
      .divider {
        height: 1px;
        background-color: #eee;
        margin: 30px 0;
      }
      .tag {
        display: inline-block;
        background-color: var(--secondary-color);
        color: white;
        padding: 2px 8px;
        border-radius: 3px;
        font-size: 0.8em;
        margin-right: 5px;
      }
    `;

    let html = `<!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${शीर्षक}</title>
      <style>${स्टाइल}</style>
    </head>
    <body>
      <header>
        <h1>${शीर्षक}</h1>
        <p>${वर्णन}</p>
        ${this.विकल्प.लेखक ? `<p><strong>लेखक:</strong> ${this.विकल्प.लेखक}</p>` : ''}
        ${this.विकल्प.संस्करण ? `<p><strong>संस्करण:</strong> ${this.विकल्प.संस्करण}</p>` : ''}
      </header>
      
      <div class="toc">
        <h2>विषय-सूची</h2>
        <ul>`;

    // Generate table of contents
    const प्रकारद्वारावर्गीकृत = this.प्रकारद्वारावर्गीकृतप्रलेखन();

    for (const [प्रकार, आइटम] of Object.entries(प्रकारद्वारावर्गीकृत)) {
      if (आइटम.length === 0) continue;

      html += `<li>
        <a href="#${this.प्रकारकाहिंदीनाम(प्रकार).toLowerCase()}">${this.प्रकारकाहिंदीनाम(प्रकार)}</a>
        <ul>`;
      
      for (const प्रलेखन of आइटम) {
        html += `<li><a href="#${प्रलेखन.नाम.toLowerCase()}">${प्रलेखन.नाम}</a></li>`;
      }

      html += `</ul>
      </li>`;
    }

    html += `</ul>
      </div>
      
      <main>`;

    // Generate documentation by type
    for (const [प्रकार, आइटम] of Object.entries(प्रकारद्वारावर्गीकृत)) {
      if (आइटम.length === 0) continue;

      html += `<section id="${this.प्रकारकाहिंदीनाम(प्रकार).toLowerCase()}">
        <h2>${this.प्रकारकाहिंदीनाम(प्रकार)}</h2>`;

      for (const प्रलेखन of आइटम) {
        html += this.आइटमप्रलेखनHTML(प्रलेखन);
      }

      html += `</section>`;
    }

    html += `</main>
      
      <footer>
        <p>इस प्रलेखन को स्वचालित रूप से संस्कृत भाषा प्रलेखन टूल द्वारा उत्पन्न किया गया था</p>
      </footer>
    </body>
    </html>`;

    return html;
  }

  // Group documentation by type (प्रकारद्वारावर्गीकृतप्रलेखन - prakarDwaraVargeekritPralekhana)
  private प्रकारद्वारावर्गीकृतप्रलेखन(): Record<string, कोडप्रलेखन[]> {
    const वर्गीकृत: Record<string, कोडप्रलेखन[]> = {
      'क्लास': [],
      'इंटरफेस': [],
      'प्रकार': [],
      'फ़ंक्शन': [],
      'चर': [],
      'मॉड्यूल': []
    };

    for (const प्रलेखन of this.प्रलेखन) {
      वर्गीकृत[प्रलेखन.प्रकार].push(प्रलेखन);
    }

    // Sort each category by name
    for (const प्रकार in वर्गीकृत) {
      वर्गीकृत[प्रकार].sort((a, b) => a.नाम.localeCompare(b.नाम));
    }

    return वर्गीकृत;
  }

  // Convert type to Hindi name (प्रकारकाहिंदीनाम - prakarKaHindiNaam)
  private प्रकारकाहिंदीनाम(प्रकार: string): string {
    const नामकोश: Record<string, string> = {
      'क्लास': 'वर्ग',
      'इंटरफेस': 'अंतरापृष्ठ',
      'प्रकार': 'प्रकार',
      'फ़ंक्शन': 'फलन',
      'चर': 'चर',
      'मॉड्यूल': 'मॉड्यूल'
    };

    return नामकोश[प्रकार] || प्रकार;
  }

  // Generate HTML for a single item (आइटमप्रलेखनHTML - itemParlekhanaHTML)
  private आइटमप्रलेखनHTML(प्रलेखन: कोडप्रलेखन): string {
    let html = `<div class="item" id="${प्रलेखन.नाम.toLowerCase()}">
      <h3>${प्रलेखन.नाम}</h3>`;

    // Add description
    if (प्रलेखन.वर्णन) {
      html += `<p>${प्रलेखन.वर्णन}</p>`;
    }

    // Add deprecated notice
    const अप्रचलितटैग = प्रलेखन.टैग.find(tag => tag.नाम === 'deprecated');
    if (अप्रचलितटैग) {
      html += `<div class="deprecated">
        <strong>अप्रचलित:</strong> ${अप्रचलितटैग.वर्णन}
      </div>`;
    }

    // Add file information
    html += `<div class="meta">
      <strong>फ़ाइल:</strong> <code>${path.relative(
        this.विकल्प.स्रोतपथ || '.',
        प्रलेखन.फ़ाइलपथ
      )}</code> (रेखा: ${प्रलेखन.रेखाक्रमांक})
    </div>`;

    // Add parameters for functions
    if (प्रलेखन.प्रकार === 'फ़ंक्शन' && प्रलेखन.विशिष्टताएँ.पैरामीटर्स) {
      html += `<div>
        <h4>पैरामीटर्स:</h4>
        <ul class="params-list">`;

      const पैरामटैग = प्रलेखन.टैग.filter(tag => tag.नाम === 'param');
      
      for (const पैराम of प्रलेखन.विशिष्टताएँ.पैरामीटर्स) {
        const पैरामप्रलेखन = पैरामटैग.find(
          tag => tag.अतिरिक्त && tag.अतिरिक्त.नाम === पैराम.split(':')[0].trim()
        );

        html += `<li>
          <code>${पैराम}</code>`;
        
        if (पैरामप्रलेखन) {
          html += ` - ${पैरामप्रलेखन.वर्णन}`;
          
          if (पैरामप्रलेखन.अतिरिक्त && पैरामप्रलेखन.अतिरिक्त.प्रकार) {
            html += ` <span class="tag">${पैरामप्रलेखन.अतिरिक्त.प्रकार}</span>`;
          }
        }
        
        html += `</li>`;
      }

      html += `</ul>
      </div>`;
    }

    // Add return information
    const रिटर्नटैग = प्रलेखन.टैग.find(tag => tag.नाम === 'returns');
    if (रिटर्नटैग) {
      html += `<div>
        <h4>वापसी:</h4>
        <p>${रिटर्नटैग.वर्णन}</p>
      </div>`;
    }

    // Add examples
    const उदाहरणटैग = प्रलेखन.टैग.filter(tag => tag.नाम === 'example');
    if (उदाहरणटैग.length > 0) {
      html += `<div>
        <h4>उदाहरण:</h4>`;
      
      for (const उदाहरण of उदाहरणटैग) {
        html += `<pre><code>${this.escapeHTML(उदाहरण.वर्णन)}</code></pre>`;
      }

      html += `</div>`;
    }

    html += `<div class="divider"></div>
    </div>`;

    return html;
  }

  // Escape HTML (escapeHTML)
  private escapeHTML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Write to file (फ़ाइलमेंलिखें - fileMeinLikhen)
  async फ़ाइलमेंलिखें(फ़ाइलपथ: string): Promise<void> {
    try {
      const निर्देशिका = path.dirname(फ़ाइलपथ);
      
      // Create directory if it doesn't exist
      await fs.mkdir(निर्देशिका, { recursive: true });
      
      const सामग्री = await this.HTMLउत्पन्न();
      await fs.writeFile(फ़ाइलपथ, सामग्री, 'utf-8');
    } catch (त्रुटि) {
      throw new प्रलेखनत्रुटि(`फ़ाइल में लिखने में त्रुटि: ${त्रुटि}`);
    }
  }
}

// Main documentation generator (मुख्यप्रलेखनजनरेटर - mukhyaParlekhanaGenerator)
export async function मुख्यप्रलेखनजनरेटर(
  स्रोतपथ: string,
  लक्ष्यपथ: string,
  विकल्प: प्रलेखनविकल्प = {}
): Promise<void> {
  try {
    // Parse code
    const पार्सर = new प्रलेखनपार्सर(स्रोतपथ, विकल्प);
    const प्रलेखन = await पार्सर.कोडपार्स();

    // Determine output format
    const रूपरेखा = विकल्प.रूपरेखा?.toLowerCase() || 'markdown';
    const पूरालक्ष्यपथ = path.resolve(लक्ष्यपथ);

    // Generate documentation
    switch (रूपरेखा) {
      case 'html':
        const htmlजनरेटर = new HTMLप्रलेखनजनरेटर(प्रलेखन, { ...विकल्प, स्रोतपथ });
        
        // If target path doesn't have an extension, add .html
        const htmlपथ = !लक्ष्यपथ.endsWith('.html') ? `${पूरालक्ष्यपथ}.html` : पूरालक्ष्यपथ;
        await htmlजनरेटर.फ़ाइलमेंलिखें(htmlपथ);
        break;

      case 'markdown':
      case 'md':
      default:
        const mdजनरेटर = new माकडाउनप्रलेखनजनरेटर(प्रलेखन, { ...विकल्प, स्रोतपथ });
        
        // If target path doesn't have an extension, add .md
        const mdपथ = !लक्ष्यपथ.endsWith('.md') ? `${पूरालक्ष्यपथ}.md` : पूरालक्ष्यपथ;
        await mdजनरेटर.फ़ाइलमेंलिखें(mdपथ);
        break;
    }
  } catch (त्रुटि) {
    throw new प्रलेखनत्रुटि(`प्रलेखन उत्पन्न करने में त्रुटि: ${त्रुटि}`);
  }
}

// Generate documentation for multiple source paths (बहुस्रोतप्रलेखनजनरेटर - bahuSrotParlekhanaGenerator)
export async function बहुस्रोतप्रलेखनजनरेटर(
  स्रोतपथ: string[],
  लक्ष्यपथ: string,
  विकल्प: प्रलेखनविकल्प = {}
): Promise<void> {
  try {
    // Parse all source paths
    let सभीप्रलेखन: कोडप्रलेखन[] = [];
    
    for (const पथ of स्रोतपथ) {
      const पार्सर = new प्रलेखनपार्सर(पथ, विकल्प);
      const प्रलेखन = await पार्सर.कोडपार्स();
      सभीप्रलेखन = [...सभीप्रलेखन, ...प्रलेखन];
    }

    // Determine output format
    const रूपरेखा = विकल्प.रूपरेखा?.toLowerCase() || 'markdown';
    const पूरालक्ष्यपथ = path.resolve(लक्ष्यपथ);

    // Generate documentation
    switch (रूपरेखा) {
      case 'html':
        const htmlजनरेटर = new HTMLप्रलेखनजनरेटर(सभीप्रलेखन, { ...विकल्प, स्रोतपथ: स्रोतपथ[0] });
        
        // If target path doesn't have an extension, add .html
        const htmlपथ = !लक्ष्यपथ.endsWith('.html') ? `${पूरालक्ष्यपथ}.html` : पूरालक्ष्यपथ;
        await htmlजनरेटर.फ़ाइलमेंलिखें(htmlपथ);
        break;

      case 'markdown':
      case 'md':
      default:
        const mdजनरेटर = new माकडाउनप्रलेखनजनरेटर(सभीप्रलेखन, { ...विकल्प, स्रोतपथ: स्रोतपथ[0] });
        
        // If target path doesn't have an extension, add .md
        const mdपथ = !लक्ष्यपथ.endsWith('.md') ? `${पूरालक्ष्यपथ}.md` : पूरालक्ष्यपथ;
        await mdजनरेटर.फ़ाइलमेंलिखें(mdपथ);
        break;
    }
  } catch (त्रुटि) {
    throw new प्रलेखनत्रुटि(`प्रलेखन उत्पन्न करने में त्रुटि: ${त्रुटि}`);
  }
}

// Generate documentation for a package (पैकेजप्रलेखनजनरेटर - packageParlekhanaGenerator)
export async function पैकेजप्रलेखनजनरेटर(
  पैकेजपथ: string,
  लक्ष्यपथ: string,
  विकल्प: प्रलेखनविकल्प = {}
): Promise<void> {
  try {
    const पैकेजजेसनपथ = path.join(पैकेजपथ, 'package.json');
    
    // Read package.json
    const पैकेजजेसन = JSON.parse(await fs.readFile(पैकेजजेसनपथ, 'utf-8'));
    
    // Set default options based on package.json
    विकल्प.शीर्षक = विकल्प.शीर्षक || पैकेजजेसन.name;
    विकल्प.वर्णन = विकल्प.वर्णन || पैकेजजेसन.description;
    विकल्प.लेखक = विकल्प.लेखक || पैकेजजेसन.author;
    विकल्प.संस्करण = विकल्प.संस्करण || पैकेजजेसन.version;
    
    // Determine source paths
    const स्रोतपथ = पैकेजजेसन.main ? path.dirname(path.join(पैकेजपथ, पैकेजजेसन.main)) : पैकेजपथ;
    
    // Generate documentation
    await मुख्यप्रलेखनजनरेटर(स्रोतपथ, लक्ष्यपथ, विकल्प);
  } catch (त्रुटि) {
    throw new प्रलेखनत्रुटि(`पैकेज प्रलेखन उत्पन्न करने में त्रुटि: ${त्रुटि}`);
  }
}

// Create README from documentation (रीडमीबनाओ - readmeBanao)
export async function रीडमीबनाओ(
  स्रोतपथ: string,
  लक्ष्यपथ: string = 'README.md',
  विकल्प: प्रलेखनविकल्प = {}
): Promise<void> {
  try {
    // Set format to Markdown
    विकल्प.रूपरेखा = 'markdown';
    
    // Generate documentation
    await मुख्यप्रलेखनजनरेटर(स्रोतपथ, लक्ष्यपथ, विकल्प);
  } catch (त्रुटि) {
    throw new प्रलेखनत्रुटि(`README बनाने में त्रुटि: ${त्रुटि}`);
  }
}