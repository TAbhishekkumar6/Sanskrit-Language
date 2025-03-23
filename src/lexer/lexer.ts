import { Token, TokenType } from '../types';
export { TokenType } from '../types';

export class शब्दविश्लेषक {
  private स्रोत: string;
  private टोकन: Token[] = [];
  private प्रारंभ = 0;
  private वर्तमान = 0;
  private पंक्ति = 1;

  private कुंजीशब्द: Map<string, TokenType> = new Map([
    // Program Structure
    ['कार्य', TokenType.KARYA],       // function
    ['वर्ग', TokenType.VARGA],       // class
    ['यदि', TokenType.YADI],         // if
    ['तब', TokenType.TABA],         // then
    ['अन्यथा', TokenType.ANYATHA],   // else
    ['प्रतिफल', TokenType.PHALA],    // return
    
    // Variable Declarations
    ['नियत', TokenType.NIYATA],     // constant
    ['मान', TokenType.MANA],         // variable
    
    // Types
    ['संख्या', TokenType.SANKHYA],   // number
    ['वाक्य', TokenType.VAKYA],      // string
    ['सूची', TokenType.SUCHI],       // array/list
    ['शून्य', TokenType.SHUNYA],     // void/null
    
    // Async
    ['अकालिक', TokenType.ASINKRON], // async
    ['प्रतीक्षा', TokenType.PRATIKSHA], // await
    
    // Error Handling
    ['प्रयत्न', TokenType.PRAYATNA], // try
    ['दोष', TokenType.DOSHA],       // catch
    ['अंतिम', TokenType.ANTIMA],     // finally
    
    // Access Modifiers
    ['सार्वजनिक', TokenType.SARVAJANIK], // public
    ['निजी', TokenType.NIJEE],          // private
    ['रक्षित', TokenType.RAKSHIT],      // protected

    // Boolean values
    ['सत्य', TokenType.SATYA],      // true
    ['असत्य', TokenType.ASATYA],    // false
  ]);

  constructor(स्रोत: string) {
    this.स्रोत = स्रोत;
  }

  शब्दविश्लेषण(): Token[] {
    while (!this.समाप्त()) {
      this.प्रारंभ = this.वर्तमान;
      this.टोकनस्कैन();
    }

    this.टोकन.push({
      type: TokenType.EOF,
      lexeme: "",
      literal: null,
      line: this.पंक्ति
    });

    return this.टोकन;
  }

  private टोकनस्कैन(): void {
    const च = this.अग्रिमप्राप्त();
    
    switch (च) {
      // Single character tokens
      case '(': this.टोकनजोड़ें(TokenType.LEFT_PAREN); break;
      case ')': this.टोकनजोड़ें(TokenType.RIGHT_PAREN); break;
      case '{': this.टोकनजोड़ें(TokenType.LEFT_BRACE); break;
      case '}': this.टोकनजोड़ें(TokenType.RIGHT_BRACE); break;
      case ',': this.टोकनजोड़ें(TokenType.COMMA); break;
      case '.': this.टोकनजोड़ें(TokenType.DOT); break;
      case ';': this.टोकनजोड़ें(TokenType.SEMICOLON); break;
      case ':': this.टोकनजोड़ें(TokenType.COLON); break;

      // Operators
      case '+': this.टोकनजोड़ें(this.मिलान('=') ? TokenType.SAMAAN_YOGA : TokenType.YOGA); break;
      case '-': this.टोकनजोड़ें(this.मिलान('=') ? TokenType.SAMAAN_VIYOGA : TokenType.VIYOGA); break;
      case '*': this.टोकनजोड़ें(this.मिलान('=') ? TokenType.SAMAAN_GUNA : TokenType.GUNA); break;
      case '/': this.टोकनजोड़ें(this.मिलान('=') ? TokenType.SAMAAN_BHAGA : TokenType.BHAGA); break;

      // Strings
      case '"': this.वाक्य('"'); break;
      case "'": this.वाक्य("'"); break;

      // Whitespace
      case ' ':
      case '\r':
      case '\t':
        break;
      case '\n':
        this.पंक्ति++;
        break;

      default:
        if (this.अंकहै(च)) {
          this.संख्या();
        } else if (this.अक्षरहै(च) || this.देवनागरीहै(च)) {
          this.पहचानकर्ता();
        } else {
          throw new Error(`अज्ञात चिह्न '${च}' पंक्ति ${this.पंक्ति} पर`);
        }
    }
  }

  private वाक्य(उद्धरण: string): void {
    while (this.झांकें() !== उद्धरण && !this.समाप्त()) {
      if (this.झांकें() === '\n') this.पंक्ति++;
      this.अग्रिमप्राप्त();
    }

    if (this.समाप्त()) {
      throw new Error(`अपूर्ण वाक्य पंक्ति ${this.पंक्ति} पर`);
    }

    // Consume the closing quote
    this.अग्रिमप्राप्त();

    // Get the string value without the quotes
    const value = this.स्रोत.substring(this.प्रारंभ + 1, this.वर्तमान - 1);
    this.टोकनजोड़ें(TokenType.STRING, value);
  }

  private संख्या(): void {
    while (this.अंकहै(this.झांकें())) this.अग्रिमप्राप्त();

    // Look for decimal numbers
    if (this.झांकें() === '.' && this.अंकहै(this.अगला())) {
      this.अग्रिमप्राप्त();
      while (this.अंकहै(this.झांकें())) this.अग्रिमप्राप्त();
    }

    const value = parseFloat(this.स्रोत.substring(this.प्रारंभ, this.वर्तमान));
    this.टोकनजोड़ें(TokenType.NUMBER, value);
  }

  private पहचानकर्ता(): void {
    while (this.अक्षरांकीय(this.झांकें()) || this.देवनागरीहै(this.झांकें())) this.अग्रिमप्राप्त();

    const text = this.स्रोत.substring(this.प्रारंभ, this.वर्तमान);
    let type = this.कुंजीशब्द.get(text.toLowerCase());
    if (!type) type = TokenType.IDENTIFIER;
    this.टोकनजोड़ें(type);
  }

  private देवनागरीहै(च: string): boolean {
    return च >= '\u0900' && च <= '\u097F';  // Devanagari Unicode range
  }

  private अंकहै(च: string): boolean {
    return च >= '0' && च <= '9';
  }

  private अक्षरहै(च: string): boolean {
    return (च >= 'a' && च <= 'z') ||
           (च >= 'A' && च <= 'Z') ||
           च === '_';
  }

  private अक्षरांकीय(च: string): boolean {
    return this.अक्षरहै(च) || this.अंकहै(च);
  }

  private समाप्त(): boolean {
    return this.वर्तमान >= this.स्रोत.length;
  }

  private अग्रिमप्राप्त(): string {
    return this.स्रोत.charAt(this.वर्तमान++);
  }

  private झांकें(): string {
    if (this.समाप्त()) return '\0';
    return this.स्रोत.charAt(this.वर्तमान);
  }

  private अगला(): string {
    if (this.वर्तमान + 1 >= this.स्रोत.length) return '\0';
    return this.स्रोत.charAt(this.वर्तमान + 1);
  }

  private मिलान(अपेक्षित: string): boolean {
    if (this.समाप्त()) return false;
    if (this.स्रोत.charAt(this.वर्तमान) !== अपेक्षित) return false;

    this.वर्तमान++;
    return true;
  }

  private टोकनजोड़ें(type: TokenType, literal: any = null): void {
    const text = this.स्रोत.substring(this.प्रारंभ, this.वर्तमान);
    this.टोकन.push({
      type,
      lexeme: text,
      literal,
      line: this.पंक्ति
    });
  }
}

// Export the Sanskrit class name as Lexer for external use
export const Lexer = शब्दविश्लेषक;