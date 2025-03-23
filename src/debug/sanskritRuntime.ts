import { EventEmitter } from 'events';
import { readFileSync } from 'fs';
import { Lexer } from '../lexer/lexer';
import { Parser } from '../parser/parser';
import { Transpiler } from '../transpiler/transpiler';

interface स्तरचरण {
    क्रम: number;
    नाम: string;
    फ़ाइल: string;
    पंक्ति: number;
    स्तंभ: number;
}

interface चर {
    नाम: string;
    प्रकार: string;
    मान: string;
}

export class संस्कृतकार्यान्वयन extends EventEmitter {
    private वर्तमानफ़ाइल: string | undefined;
    private वर्तमानपंक्ति: number = 0;
    private विराम: Map<string, number[]> = new Map();
    private चर: Map<string, Map<string, any>> = new Map();
    private कार्यस्तर: स्तरचरण[] = [];
    private चलरहाहै: boolean = false;

    constructor() {
        super();
        this.चर.set('वैश्विक', new Map());
        this.चर.set('स्थानीय', new Map());
    }

    // English method aliases for compatibility with debug adapter
    public async start(कार्यक्रम: string, प्रवेशपरविराम: boolean): Promise<void> {
        return this.प्रारंभ(कार्यक्रम, प्रवेशपरविराम);
    }

    public continue(): void {
        return this.जारी();
    }

    public step(): void {
        return this.कदम();
    }

    public stack(): स्तरचरण[] {
        return this.स्तर();
    }

    public getVariables(दायरा: string): चर[] {
        return this.चरप्राप्तकरें(दायरा);
    }

    public evaluate(अभिव्यक्ति: string): string {
        return this.मूल्यांकन(अभिव्यक्ति);
    }

    public async प्रारंभ(कार्यक्रम: string, प्रवेशपरविराम: boolean): Promise<void> {
        this.वर्तमानफ़ाइल = कार्यक्रम;
        this.वर्तमानपंक्ति = 0;
        this.चलरहाहै = true;

        try {
            const स्रोतकोड = readFileSync(कार्यक्रम, 'utf8');
            const lexer = new Lexer(स्रोतकोड);
            const tokens = lexer.शब्दविश्लेषण();
            const parser = new Parser(tokens);
            const ast = parser.विश्लेषण();
            
            this.स्तरधकेलें({
                क्रम: 0,
                नाम: 'मुख्य',
                फ़ाइल: कार्यक्रम,
                पंक्ति: 1,
                स्तंभ: 1
            });

            if (प्रवेशपरविराम) {
                this.emit('stopOnEntry');
            } else {
                this.जारी();
            }
        } catch (त्रुटि) {
            this.emit('output', `त्रुटि: ${त्रुटि instanceof Error ? त्रुटि.message : String(त्रुटि)}`);
            this.emit('end');
        }
    }

    public जारी(): void {
        this.चलरहाहै = true;
        this.चलाएं();
    }

    public कदम(): void {
        this.पंक्तिचलाएं();
        this.emit('stopOnStep');
    }

    public स्तर(): स्तरचरण[] {
        return this.कार्यस्तर;
    }

    public चरप्राप्तकरें(दायरा: string): चर[] {
        const चर: चर[] = [];
        const दायराचर = this.चर.get(दायरा);
        
        if (दायराचर) {
            for (const [नाम, मान] of दायराचर.entries()) {
                चर.push({
                    नाम,
                    प्रकार: typeof मान,
                    मान: String(मान)
                });
            }
        }
        
        return चर;
    }

    public मूल्यांकन(अभिव्यक्ति: string): string {
        try {
            const lexer = new Lexer(अभिव्यक्ति);
            const tokens = lexer.शब्दविश्लेषण();
            const parser = new Parser(tokens);
            const ast = parser.विश्लेषण();
            const transpiler = new Transpiler();
            const परिणाम = transpiler.रूपांतर(ast);
            return eval(परिणाम);
        } catch (त्रुटि) {
            return `त्रुटि: ${त्रुटि instanceof Error ? त्रुटि.message : String(त्रुटि)}`;
        }
    }

    private स्तरधकेलें(स्तर: स्तरचरण): void {
        this.कार्यस्तर.push(स्तर);
    }

    private स्तरहटाएं(): स्तरचरण | undefined {
        return this.कार्यस्तर.pop();
    }

    private चलाएं(): void {
        while (this.चलरहाहै && this.वर्तमानपंक्ति < this.कुलपंक्तियां()) {
            const विरामपरहिट = this.विरामजांच();
            if (विरामपरहिट) {
                this.emit('stopOnBreakpoint');
                break;
            }
            this.पंक्तिचलाएं();
        }

        if (this.वर्तमानपंक्ति >= this.कुलपंक्तियां()) {
            this.emit('end');
        }
    }

    private पंक्तिचलाएं(): void {
        this.वर्तमानपंक्ति++;
        if (this.कार्यस्तर.length > 0) {
            const स्तर = this.कार्यस्तर[this.कार्यस्तर.length - 1];
            स्तर.पंक्ति = this.वर्तमानपंक्ति;
        }
    }

    private विरामजांच(): boolean {
        const विराम = this.विराम.get(this.वर्तमानफ़ाइल || '');
        return विराम ? विराम.includes(this.वर्तमानपंक्ति) : false;
    }

    private कुलपंक्तियां(): number {
        if (!this.वर्तमानफ़ाइल) return 0;
        const सामग्री = readFileSync(this.वर्तमानफ़ाइल, 'utf8');
        return सामग्री.split('\n').length;
    }
}