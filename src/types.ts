// Token types for Sanskrit language constructs
export enum TokenType {
  // Keywords for Program Structure
  KARYA = 'KARYA',     // function (कार्य - work/action)
  VARGA = 'VARGA',     // class (वर्ग - category/class)
  YADI = 'YADI',       // if (यदि - if)
  ANYATHA = 'ANYATHA', // else (अन्यथा - otherwise)
  
  // Control Flow
  AAVRIT = 'AAVRIT',   // loop (आवृत्त - repetition)
  VIRAM = 'VIRAM',     // break (विराम - stop)
  AGRIM = 'AGRIM',     // continue (अग्रिम - next)
  PRATIFEL = 'PRATIFEL', // return (प्रतिफल - result)
  
  // Data Types
  SANKHYA = 'SANKHYA',   // number (संख्या - number)
  VAKYA = 'VAKYA',       // string (वाक्य - sentence)
  SATYATA = 'SATYATA',   // boolean (सत्यता - truth value)
  SATYA = 'SATYA',       // true (सत्य - true)
  ASATYA = 'ASATYA',     // false (असत्य - false)
  SHUNYA = 'SHUNYA',     // null/void (शून्य - void/empty)
  SOOCHI = 'SOOCHI',     // array (सूची - list)
  SHABDKOSH = 'SHABDKOSH', // object/dictionary (शब्दकोश - dictionary)
  
  // Error Handling
  PRAYATNA = 'PRAYATNA', // try (प्रयत्न - attempt)
  DOSH = 'DOSH',         // catch error (दोष - error)
  ANTIM = 'ANTIM',       // finally (अंतिम - final)
  
  // Access Modifiers
  SARVAJANIK = 'SARVAJANIK', // public (सार्वजनिक - public)
  NIJEE = 'NIJEE',           // private (निजी - private)
  RAKSHIT = 'RAKSHIT',       // protected (रक्षित - protected)
  
  // Operators (already defined, adding more)
  YOGA = 'YOGA',         // addition (+)
  VIYOGA = 'VIYOGA',     // subtraction (-)
  GUNA = 'GUNA',         // multiplication (*)
  BHAGA = 'BHAGA',       // division (/)
  SHESH = 'SHESH',       // modulus (%)
  SAMAAN = 'SAMAAN',     // equal to (==)
  ASAMAAN = 'ASAMAAN',   // not equal (!=)
  ADHIK = 'ADHIK',       // greater than (>)
  NYOON = 'NYOON',       // less than (<)

  // Logical Operators
  AUR = 'AUR',           // Logical AND (&&)
  YA = 'YA',            // Logical OR (||)
  NA = 'NA',            // Logical NOT (!)

  // Bitwise Operators
  BIT_YOGA = 'BIT_YOGA',       // Bitwise AND (&)
  BIT_VIYOGA = 'BIT_VIYOGA',   // Bitwise OR (|)
  BIT_XOR = 'BIT_XOR',         // Bitwise XOR (^)
  BIT_VAM = 'BIT_VAM',         // Left shift (<<)
  BIT_DAKSHIN = 'BIT_DAKSHIN', // Right shift (>>)

  // Assignment Operators
  SAMAAN_YOGA = 'SAMAAN_YOGA',     // +=
  SAMAAN_VIYOGA = 'SAMAAN_VIYOGA', // -=
  SAMAAN_GUNA = 'SAMAAN_GUNA',     // *=
  SAMAAN_BHAGA = 'SAMAAN_BHAGA',   // /=
  SAMAAN_SHESH = 'SAMAAN_SHESH',   // %=

  // Syntax (keeping existing ones)
  IDENTIFIER = 'IDENTIFIER',
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  SEMICOLON = 'SEMICOLON',
  LEFT_PAREN = 'LEFT_PAREN',
  RIGHT_PAREN = 'RIGHT_PAREN',
  LEFT_BRACE = 'LEFT_BRACE',
  RIGHT_BRACE = 'RIGHT_BRACE',
  EQUALS = 'EQUALS',
  COMMA = 'COMMA',
  EOF = 'EOF',

  // Extend ASTNode types
  FUNCTION_CALL = 'FUNCTION_CALL',  // Function call expression
  ARGUMENTS = 'ARGUMENTS',          // Function arguments list
}

export interface Token {
  type: TokenType;
  lexeme: string;
  literal: any;
  line: number;
}

export interface ASTNode {
  type: string;
  name?: string;
  value?: any;
  methods?: ASTNode[];
  parameters?: string[];
  body?: ASTNode;
  statements?: ASTNode[];
  expression?: ASTNode;
  condition?: ASTNode;
  thenBranch?: ASTNode;
  elseBranch?: ASTNode | null;
  left?: ASTNode;
  right?: ASTNode;
  operator?: TokenType;
  callee?: ASTNode;        // For function calls: the function being called
  arguments?: ASTNode[];   // For function calls: the arguments being passed
  [key: string]: any;
}