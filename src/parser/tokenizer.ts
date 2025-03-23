import { Token, TokenType } from '../types';

// Define string literals for custom token types
const TEMPLATE_LITERAL_TOKEN = "TEMPLATE_LITERAL";
const PATTERN_MATCH_TOKEN = "PATTERN_MATCH";
const CASE_TOKEN = "CASE";
const DEFAULT_TOKEN = "DEFAULT"; 
const ARROW_TOKEN = "ARROW";
const BACKTICK_TOKEN = "BACKTICK";
const LEFT_BRACKET_TOKEN = "LEFT_BRACKET";
const RIGHT_BRACKET_TOKEN = "RIGHT_BRACKET";
const UNDERSCORE_TOKEN = "UNDERSCORE";

// Sanskrit keywords
const संस्कृतकीवर्ड: Record<string, TokenType> = {
    // Control flow
    'यदि': TokenType.YADI,
    'तब': TokenType.TABA,
    'अन्यथा': TokenType.ANYATHA,
    'जबतक': TokenType.AAVRIT,
    'करें': TokenType.KARYA,
    'प्रत्येक': TokenType.IDENTIFIER,
    
    // Classes
    'वर्ग': TokenType.VARGA,
    'निर्माता': TokenType.IDENTIFIER,
    'विस्तारित': TokenType.IDENTIFIER,
    'स्थिर': TokenType.NIYATA,
    'अमूर्त': TokenType.IDENTIFIER,
    
    // Variables
    'चल': TokenType.IDENTIFIER,
    'स्थिर_१': TokenType.NIYATA,
    'चर': TokenType.IDENTIFIER,
    'मान': TokenType.MANA,
    'नियत': TokenType.NIYATA,
    
    // Exception handling
    'कोशिश': TokenType.PRAYATNA,
    'पकड़ें': TokenType.DOSH,
    'फेंकें': TokenType.IDENTIFIER,
    'प्रयत्न': TokenType.PRAYATNA,
    'दोष': TokenType.DOSHA,
    'अंतिम': TokenType.ANTIMA,
    
    // Types
    'है': TokenType.IDENTIFIER,
    
    // Functions
    'कार्य': TokenType.KARYA,
    'प्रतिदा': TokenType.PRATIFEL,
    'फल': TokenType.PHALA,
    
    // Logical operators
    'तथा': TokenType.AUR,
    'या': TokenType.YA,
    
    // Return values
    'प्रतिफल': TokenType.PRATIFEL,

    // Add new keywords for pattern matching
    'मिलान': TokenType.IDENTIFIER,
    'केस': TokenType.IDENTIFIER,
    'डिफॉल्ट': TokenType.IDENTIFIER
};

// Romanized keywords 
const रोमनकीवर्ड: Record<string, TokenType> = {
    // Control flow
    'yadi': TokenType.YADI,
    'tab': TokenType.TABA,
    'anyatha': TokenType.ANYATHA,
    'jabtak': TokenType.AAVRIT,
    'karen': TokenType.KARYA,
    'pratyeka': TokenType.IDENTIFIER,
    
    // Classes
    'varg': TokenType.VARGA,
    'nirmaata': TokenType.IDENTIFIER,
    'vistarit': TokenType.IDENTIFIER,
    'sthir': TokenType.NIYATA,
    'amoort': TokenType.IDENTIFIER,
    
    // Variables
    'chal': TokenType.IDENTIFIER,
    'sthir_alt': TokenType.NIYATA,
    'char': TokenType.IDENTIFIER,
    'maan': TokenType.MANA,
    'niyat': TokenType.NIYATA,
    
    // Exception handling
    'koshish': TokenType.PRAYATNA,
    'pakden': TokenType.DOSH,
    'phenken': TokenType.IDENTIFIER,
    'prayatna': TokenType.PRAYATNA,
    'dosh': TokenType.DOSHA,
    'antim': TokenType.ANTIMA,
    
    // Types
    'hai': TokenType.IDENTIFIER,
    
    // Functions
    'karya': TokenType.KARYA,
    'pratida': TokenType.PRATIFEL,
    'phal': TokenType.PHALA,
    
    // Logical operators
    'tatha': TokenType.AUR,
    'ya': TokenType.YA,
    
    // Return values
    'pratifel': TokenType.PRATIFEL
};

// Symbolic operators
const संकेतचिन्ह: Record<string, TokenType> = {
    'YOGA': TokenType.YOGA,
    'VIYOGA': TokenType.VIYOGA,
    'GUNA': TokenType.GUNA,
    'BHAGA': TokenType.BHAGA,
    'SHESH': TokenType.SHESH,
    'TULYA': TokenType.SAMAAN,
    'ATULYA': TokenType.ASAMAAN,
    'ADHIK': TokenType.ADHIK,
    'NYUN': TokenType.NYOON
};

export function tokenize(sourceCode: string): Token[] {
    let line = 1;
    let column = 1;
    let position = 0;
    const tokens: Token[] = [];

    const isAlpha = (c: string): boolean => /[a-zA-Zऀ-ॿ]/.test(c);
    const isDigit = (c: string): boolean => /[0-9]/.test(c);
    const isAlphaNumeric = (c: string): boolean => isAlpha(c) || isDigit(c);
    
    const advance = (): string => {
        position++;
        column++;
        return sourceCode[position - 1];
    };
    
    const peek = (): string => sourceCode[position] || '';
    const peekNext = (): string => sourceCode[position + 1] || '';
    
    while (position < sourceCode.length) {
        const char = advance();
        
        // Handle whitespace
        if (/\s/.test(char)) {
            if (char === '\n') {
                line++;
                column = 1;
            }
            continue;
        }
        
        // Handle comments
        if (char === '/' && peek() === '/') {
            // Skip to the end of the line
            while (peek() !== '\n' && position < sourceCode.length) {
                advance();
            }
            continue;
        }
        
        // Handle operators and punctuation
        switch (char) {
            case '(': 
                tokens.push(createToken(TokenType.LEFT_PAREN, char, null, line, column - 1));
                break;
            case ')': 
                tokens.push(createToken(TokenType.RIGHT_PAREN, char, null, line, column - 1));
                break;
            case '{': 
                tokens.push(createToken(TokenType.LEFT_BRACE, char, null, line, column - 1));
                break;
            case '}': 
                tokens.push(createToken(TokenType.RIGHT_BRACE, char, null, line, column - 1));
                break;
            case ';': 
                tokens.push(createToken(TokenType.SEMICOLON, char, null, line, column - 1));
                break;
            case ',': 
                tokens.push(createToken(TokenType.COMMA, char, null, line, column - 1));
                break;
            case '.': 
                tokens.push(createToken(TokenType.DOT, char, null, line, column - 1));
                break;
            case ':': 
                tokens.push(createToken(TokenType.COLON, char, null, line, column - 1));
                break;
            case '+': 
                tokens.push(createToken(TokenType.YOGA, char, null, line, column - 1));
                break;
            case '-': 
                if (peek() === '>') {
                    advance(); // Consume the '>'
                    tokens.push(createToken(TokenType.ARROW, "->", null, line, column - 2));
                } else {
                    tokens.push(createToken(TokenType.VIYOGA, char, null, line, column - 1));
                }
                break;
            case '*': 
                tokens.push(createToken(TokenType.GUNA, char, null, line, column - 1));
                break;
            case '/': 
                tokens.push(createToken(TokenType.BHAGA, char, null, line, column - 1));
                break;
            case '%': 
                tokens.push(createToken(TokenType.SHESH, char, null, line, column - 1));
                break;
            case '=': 
                if (peek() === '=') {
                    advance(); // Consume the second '='
                    tokens.push(createToken(TokenType.SAMAAN, "==", null, line, column - 2));
                } else {
                    tokens.push(createToken(TokenType.EQUALS, char, null, line, column - 1));
                }
                break;
            case '!': 
                if (peek() === '=') {
                    advance(); // Consume the '='
                    tokens.push(createToken(TokenType.ASAMAAN, "!=", null, line, column - 2));
                } else {
                    tokens.push(createToken(TokenType.NA, char, null, line, column - 1));
                }
                break;
            case '<': 
                if (peek() === '=') {
                    advance();
                    tokens.push(createToken(TokenType.NYUNTULYA, "<=", null, line, column - 2));
                } else {
                    tokens.push(createToken(TokenType.NYOON, char, null, line, column - 1));
                }
                break;
            case '>': 
                if (peek() === '=') {
                    advance();
                    tokens.push(createToken(TokenType.ADHIKTULYA, ">=", null, line, column - 2));
                } else {
                    tokens.push(createToken(TokenType.ADHIK, char, null, line, column - 1));
                }
                break;
            case '&': 
                if (peek() === '&') {
                    advance();
                    tokens.push(createToken(TokenType.AUR, "&&", null, line, column - 2));
                } else {
                    tokens.push(createToken(TokenType.BIT_YOGA, char, null, line, column - 1));
                }
                break;
            case '|': 
                if (peek() === '|') {
                    advance();
                    tokens.push(createToken(TokenType.YA, "||", null, line, column - 2));
                } else {
                    tokens.push(createToken(TokenType.BIT_VIYOGA, char, null, line, column - 1));
                }
                break;
            case '`':
            case '"':
            case "'":
                const { value, endPos } = parseString(sourceCode, position - 1);
                position = endPos;
                column += (endPos - (position - 1));
                tokens.push(createToken(TokenType.STRING, value, value, line, column - value.length - 2));
                break;
            default:
                // Handle identifiers and keywords
                if (isAlpha(char)) {
                    let identifierName = char;
                    
                    while (position < sourceCode.length && (isAlphaNumeric(peek()) || peek() === '_')) {
                        identifierName += advance();
                    }
                    
                    // Check for Sanskrit keywords
                    if (संस्कृतकीवर्ड[identifierName]) {
                        const keywordType = संस्कृतकीवर्ड[identifierName];
                        tokens.push(createToken(keywordType, identifierName, null, line, column - identifierName.length));
                    } 
                    // Check for romanized keywords
                    else if (रोमनकीवर्ड[identifierName]) {
                        const keywordType = रोमनकीवर्ड[identifierName];
                        tokens.push(createToken(keywordType, identifierName, null, line, column - identifierName.length));
                    }
                    // Check for symbolic operators
                    else if (संकेतचिन्ह[identifierName]) {
                        const operatorType = संकेतचिन्ह[identifierName];
                        tokens.push(createToken(operatorType, identifierName, null, line, column - identifierName.length));
                    }
                    // Handle boolean literals
                    else if (identifierName === 'सत्य' || identifierName === 'satya') {
                        tokens.push(createToken(TokenType.SATYA, identifierName, true, line, column - identifierName.length));
                    }
                    else if (identifierName === 'असत्य' || identifierName === 'asatya') {
                        tokens.push(createToken(TokenType.ASATYA, identifierName, false, line, column - identifierName.length));
                    }
                    // Regular identifier
                    else {
                        tokens.push(createToken(TokenType.IDENTIFIER, identifierName, null, line, column - identifierName.length));
                    }
                }
                // Handle numbers
                else if (isDigit(char)) {
                    let numberString = char;
                    
                    while (position < sourceCode.length && isDigit(peek())) {
                        numberString += advance();
                    }
                    
                    // Handle decimal point
                    if (peek() === '.' && isDigit(peekNext())) {
                        numberString += advance(); // Consume the '.'
                        
                        while (position < sourceCode.length && isDigit(peek())) {
                            numberString += advance();
                        }
                    }
                    
                    tokens.push(createToken(TokenType.NUMBER, numberString, parseFloat(numberString), line, column - numberString.length));
                }
                // Check for template literals (backticks)
                else if (char === '`') {
                    const startCol = column - 1;  // Remember starting column
                    const result = parseString(sourceCode, position - 1);
                    tokens.push(createToken(TEMPLATE_LITERAL_TOKEN as unknown as TokenType, result.value, result.value, line, startCol));
                    position = result.endPos;
                    column = position + 1;
                }
                // Add support for brackets used in pattern matching
                else if (char === '[') {
                    tokens.push(createToken(TokenType.LEFT_BRACE, "[", null, line, column));
                }
                else if (char === ']') {
                    tokens.push(createToken(TokenType.RIGHT_BRACE, "]", null, line, column));
                }
                // Add support for underscore (wildcard in pattern matching)
                else if (char === '_') {
                    tokens.push(createToken(TokenType.IDENTIFIER, "_", null, line, column));
                }
                // Arrow operator for pattern matching (=>)
                else if (char === '=' && peekNext() === '>') {
                    advance(); // Consume the '>'
                    tokens.push(createToken(TokenType.EQUALS, "=>", null, line, column));
                }
                else {
                    // Unrecognized character
                    console.error(`Unexpected character: ${char} at line ${line}, column ${column - 1}`);
                }
        }
    }
    
    tokens.push(createToken(TokenType.EOF, "", null, line, column));
    return tokens;
}

function createToken(type: TokenType | string, lexeme: string, literal: any, line: number, column: number): Token {
    return {
        type: type as TokenType,
        lexeme,
        literal,
        line
    };
}

// Add string interpolation support
function parseString(source: string, startPos: number): { value: string, endPos: number } {
    // Support for template literals with ${} interpolation
    const isTemplateLiteral = source[startPos] === '`';
    let value = "";
    let position = startPos + 1;
    
    while (position < source.length) {
        if (isTemplateLiteral && source[position] === '$' && source[position + 1] === '{') {
            // Mark for interpolation processing
            value += "${";
            position += 2;
            
            // Skip until closing }
            let braceDepth = 1;
            while (position < source.length && braceDepth > 0) {
                if (source[position] === '{') braceDepth++;
                if (source[position] === '}') braceDepth--;
                value += source[position];
                position++;
            }
            continue;
        }
        
        if ((isTemplateLiteral && source[position] === '`') || 
            (!isTemplateLiteral && source[position] === source[startPos])) {
            position++;
            break;
        }
        
        // Handle escape sequences
        if (source[position] === '\\') {
            position++;
            if (position < source.length) {
                switch (source[position]) {
                    case 'n': value += '\n'; break;
                    case 't': value += '\t'; break;
                    case 'r': value += '\r'; break;
                    case '\'': value += '\''; break;
                    case '"': value += '"'; break;
                    case '`': value += '`'; break;
                    case '\\': value += '\\'; break;
                    default: value += source[position];
                }
                position++;
            }
            continue;
        }
        
        value += source[position];
        position++;
    }
    
    return { value, endPos: position };
} 