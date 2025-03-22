import { Token, TokenType } from '../types';

export class Lexer {
  private source: string;
  private tokens: Token[] = [];
  private start = 0;
  private current = 0;
  private line = 1;

  private keywords: Map<string, TokenType> = new Map([
    // Program Structure
    ['karya', TokenType.KARYA],     // function
    ['varga', TokenType.VARGA],     // class
    ['yadi', TokenType.YADI],       // if
    ['anyatha', TokenType.ANYATHA], // else
    
    // Control Flow
    ['aavrit', TokenType.AAVRIT],   // loop
    ['viram', TokenType.VIRAM],     // break
    ['agrim', TokenType.AGRIM],     // continue
    ['pratifel', TokenType.PRATIFEL], // return
    
    // Data Types
    ['sankhya', TokenType.SANKHYA],   // number
    ['vakya', TokenType.VAKYA],       // string
    ['satyata', TokenType.SATYATA],   // boolean
    ['satya', TokenType.SATYA],       // true
    ['asatya', TokenType.ASATYA],     // false
    ['shunya', TokenType.SHUNYA],     // null/void
    ['soochi', TokenType.SOOCHI],     // array
    ['shabdkosh', TokenType.SHABDKOSH], // object/dictionary
    
    // Error Handling
    ['prayatna', TokenType.PRAYATNA], // try
    ['dosh', TokenType.DOSH],         // catch
    ['antim', TokenType.ANTIM],       // finally
    
    // Access Modifiers
    ['sarvajanik', TokenType.SARVAJANIK], // public
    ['nijee', TokenType.NIJEE],           // private
    ['rakshit', TokenType.RAKSHIT],       // protected
  ]);

  constructor(source: string) {
    this.source = source;
  }

  scanTokens(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push({
      type: TokenType.EOF,
      lexeme: "",
      literal: null,
      line: this.line
    });

    return this.tokens;
  }

  private scanToken(): void {
    const c = this.advance();
    switch (c) {
      case '(': this.addToken(TokenType.LEFT_PAREN); break;
      case ')': this.addToken(TokenType.RIGHT_PAREN); break;
      case '{': this.addToken(TokenType.LEFT_BRACE); break;
      case '}': this.addToken(TokenType.RIGHT_BRACE); break;
      case '+':
        if (this.match('=')) {
          this.addToken(TokenType.SAMAAN_YOGA);
        } else {
          this.addToken(TokenType.YOGA);
        }
        break;
      case '-':
        if (this.match('=')) {
          this.addToken(TokenType.SAMAAN_VIYOGA);
        } else {
          this.addToken(TokenType.VIYOGA);
        }
        break;
      case '*':
        if (this.match('=')) {
          this.addToken(TokenType.SAMAAN_GUNA);
        } else {
          this.addToken(TokenType.GUNA);
        }
        break;
      case '/':
        if (this.match('=')) {
          this.addToken(TokenType.SAMAAN_BHAGA);
        } else {
          this.addToken(TokenType.BHAGA);
        }
        break;
      case '=':
        if (this.match('=')) {
          this.addToken(TokenType.SAMAAN);
        } else {
          this.addToken(TokenType.EQUALS);
        }
        break;
      case ';': this.addToken(TokenType.SEMICOLON); break;
      case '%':
        if (this.match('=')) {
          this.addToken(TokenType.SAMAAN_SHESH);
        } else {
          this.addToken(TokenType.SHESH);
        }
        break;
      case '&':
        if (this.match('&')) {
          this.addToken(TokenType.AUR);
        } else {
          this.addToken(TokenType.BIT_YOGA);
        }
        break;
      case '|':
        if (this.match('|')) {
          this.addToken(TokenType.YA);
        } else {
          this.addToken(TokenType.BIT_VIYOGA);
        }
        break;
      case '!': this.addToken(TokenType.NA); break;
      case '^': this.addToken(TokenType.BIT_XOR); break;
      case '<':
        if (this.match('<')) {
          this.addToken(TokenType.BIT_VAM);
        } else {
          this.addToken(TokenType.NYOON);
        }
        break;
      case '>':
        if (this.match('>')) {
          this.addToken(TokenType.BIT_DAKSHIN);
        } else {
          this.addToken(TokenType.ADHIK);
        }
        break;
      
      // Ignore whitespace
      case ' ':
      case '\r':
      case '\t':
        break;
      case '\n':
        this.line++;
        break;

      // String literals
      case '"': this.string(); break;

      default:
        if (this.isDigit(c)) {
          this.number();
        } else if (this.isAlpha(c)) {
          this.identifier();
        } else {
          throw new Error(`Unexpected character at line ${this.line}`);
        }
        break;
    }
  }

  private string(): void {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n') this.line++;
      this.advance();
    }

    if (this.isAtEnd()) {
      throw new Error(`Unterminated string at line ${this.line}`);
    }

    // Consume the closing "
    this.advance();

    // Get the string value without the quotes
    const value = this.source.substring(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, value);
  }

  private number(): void {
    while (this.isDigit(this.peek())) this.advance();

    // Look for decimal numbers
    if (this.peek() === '.' && this.isDigit(this.peekNext())) {
      this.advance();
      while (this.isDigit(this.peek())) this.advance();
    }

    const value = parseFloat(this.source.substring(this.start, this.current));
    this.addToken(TokenType.NUMBER, value);
  }

  private identifier(): void {
    while (this.isAlphaNumeric(this.peek())) this.advance();

    const text = this.source.substring(this.start, this.current);
    let type = this.keywords.get(text.toLowerCase());
    if (!type) type = TokenType.IDENTIFIER;
    this.addToken(type);
  }

  private isDigit(c: string): boolean {
    return c >= '0' && c <= '9';
  }

  private isAlpha(c: string): boolean {
    return (c >= 'a' && c <= 'z') ||
           (c >= 'A' && c <= 'Z') ||
           c === '_';
  }

  private isAlphaNumeric(c: string): boolean {
    return this.isAlpha(c) || this.isDigit(c);
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  private advance(): string {
    return this.source.charAt(this.current++);
  }

  private peek(): string {
    if (this.isAtEnd()) return '\0';
    return this.source.charAt(this.current);
  }

  private peekNext(): string {
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source.charAt(this.current + 1);
  }

  private addToken(type: TokenType, literal: any = null): void {
    const text = this.source.substring(this.start, this.current);
    this.tokens.push({
      type,
      lexeme: text,
      literal,
      line: this.line
    });
  }

  private match(expected: string): boolean {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) !== expected) return false;

    this.current++;
    return true;
  }
}