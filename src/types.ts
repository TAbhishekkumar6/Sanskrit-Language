// Token types for Sanskrit language constructs
export enum TokenType {
  // Keywords for Program Structure
  KARYA = 'KARYA',     // function (कार्य - work/action)
  VARGA = 'VARGA',     // class (वर्ग - category/class)
  YADI = 'YADI',       // if (यदि - if)
  ANYATHA = 'ANYATHA', // else (अन्यथा - otherwise)
  TABA = 'TABA',       // then (तब)
  PHALA = 'PHALA',     // return (फल)
  
  // Control Flow
  AAVRIT = 'AAVRIT',   // loop (आवृत्त - repetition)
  VIRAM = 'VIRAM',     // break (विराम - stop)
  AGRIM = 'AGRIM',     // continue (अग्रिम - next)
  PRATIFEL = 'PRATIFEL', // return (प्रतिफल - result)
  
  // Variable Declarations
  NIYATA = 'NIYATA',   // constant (नियत)
  MANA = 'MANA',       // variable (मान)
  
  // Data Types
  SANKHYA = 'SANKHYA',   // number (संख्या - number)
  VAKYA = 'VAKYA',       // string (वाक्य - sentence)
  SATYATA = 'SATYATA',   // boolean (सत्यता - truth value)
  SATYA = 'SATYA',       // true (सत्य - true)
  ASATYA = 'ASATYA',     // false (असत्य - false)
  SHUNYA = 'SHUNYA',     // null/void (शून्य - void/empty)
  SOOCHI = 'SOOCHI',     // array (सूची - list)
  SHABDKOSH = 'SHABDKOSH', // object/dictionary (शब्दकोश - dictionary)
  SUCHI = 'SUCHI',       // list/array (सूची)
  
  // Async Keywords
  ASINKRON = 'ASINKRON', // async (असिंक्रोन)
  PRATIKSHA = 'PRATIKSHA', // await (प्रतीक्षा)
  
  // Error Handling
  PRAYATNA = 'PRAYATNA', // try (प्रयत्न - attempt)
  DOSH = 'DOSH',         // catch error (दोष - error)
  ANTIM = 'ANTIM',       // finally (अंतिम - final)
  DOSHA = 'DOSHA',       // error/catch (दोष)
  ANTIMA = 'ANTIMA',     // finally (अंतिम)
  
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
  NYUNTULYA = 'NYUNTULYA', // less than or equal (<=)
  ADHIKTULYA = 'ADHIKTULYA', // greater than or equal (>=)

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

  // Basic Syntax
  COLON = 'COLON',           // :
  ARROW = 'ARROW',           // ->
  DOT = 'DOT',              // .

  // Pattern Matching
  CASE = 'CASE',            // case keyword
  DEFAULT = 'DEFAULT',      // default keyword
  MATCH = 'MATCH',          // match keyword
  
  // Memory Safety & Ownership
  NIYAT = 'NIYAT',       // immutable (नियत)
  MAAN = 'MAAN',         // mutable (मान)
  SWAMI = 'SWAMI',       // owner (स्वामी)
  UDHAR = 'UDHAR',       // borrow (उधार)

  // Security Modifiers
  SURAKSHIT = 'SURAKSHIT',   // secure context (सुरक्षित)
  PRAMANIT = 'PRAMANIT',     // verified (प्रमाणित)
  SANDEH = 'SANDEH',         // untrusted (संदेह)

  // Security-related tokens
  SURAKSHA = 'SURAKSHA',         // security keyword
  NISHKRIYA = 'NISHKRIYA',       // deactivate
  SAKRIYA = 'SAKRIYA',           // activate
  PRAMAN = 'PRAMAN',             // certificate
  NEETI = 'NEETI',               // policy
  SANKET = 'SANKET',             // key
  UPAKARAN = 'UPAKARAN',         // device
  SARVJANIK = 'SARVJANIK',       // public
  HASHYA = 'HASHYA',             // hash
  HASTAKSHAR = 'HASTAKSHAR',     // signature
  PRAMANIKAR = 'PRAMANIKAR',     // authenticate
  PRAMANPATRA = 'PRAMANPATRA',   // certificate
  SATYAPAN = 'SATYAPAN',         // verify
  ASPASHTA = 'ASPASHTA',         // obfuscate
  SANRAKSHIT = 'SANRAKSHIT',     // protected

  // New Metaprogramming Features
  AAVIRBHAV = 'AAVIRBHAV',   // macro (आविर्भाव - manifestation)
  ADHYAYAN = 'ADHYAYAN',     // reflection (अध्ययन - study/introspection)
  SRISHTI = 'SRISHTI',       // code generation (सृष्टि - creation)
  ANUVAD = 'ANUVAD',         // translation (अनुवाद - translation)
  
  // New Concurrency Features
  SAMANANTAR = 'SAMANANTAR', // parallel (समानांतर - parallel)
  ANSH = 'ANSH',             // thread (अंश - part/thread)
  SANCHAAR = 'SANCHAAR',     // channel (संचार - communication)
  SANKET_SIGNAL = 'SANKET_SIGNAL',         // signal (संकेत - signal)
  PARTIKSHA = 'PARTIKSHA',   // wait (प्रतीक्षा - wait)
  
  // AI Integration Features
  BUDDHI = 'BUDDHI',         // AI (बुद्धि - intelligence)
  SHIKSHA = 'SHIKSHA',       // training (शिक्षा - education)
  GYAN = 'GYAN',             // knowledge (ज्ञान - knowledge)
  ANUMAN = 'ANUMAN',         // inference (अनुमान - inference)
  CHITRA = 'CHITRA',         // image (चित्र - image)
  VAANI = 'VAANI',           // speech (वाणी - speech)
}

export interface Token {
  type: TokenType;
  lexeme: string;
  literal: any;
  line: number;
}

export interface Parameter {
  name: string;
  type?: string;
}

export interface ASTNode {
  type: string;
  name?: string;
  value?: any;
  methods?: ASTNode[];
  parameters?: Parameter[];
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
  initializer?: ASTNode;
  isConstant?: boolean;
  isAsync?: boolean;
  returnType?: string;
  tryBlock?: ASTNode;
  catchBlock?: ASTNode;
  finallyBlock?: ASTNode;
  प्रकार?: string;
  [key: string]: any;
}

// Formal verification interfaces
export interface प्रमाणपत्र {
  प्रकार: 'स्थिर' | 'गतिशील';  // static or dynamic verification
  स्तर: 'उच्च' | 'मध्यम' | 'न्यून';  // security level
  घोषणाएं: string[];  // verification assertions
}

// Memory ownership tracking
export interface स्वामित्व {
  मालिक: string;
  उधारकर्ता: string[];
  अवधि?: number;
}

// Security context metadata
export interface सुरक्षासंदर्भ {
  स्तर: number;
  अनुमतियां: string[];
  प्रतिबंध: string[];
}

export interface सुरक्षानियम {
  नाम: string;
  आवश्यकता: boolean;
  सत्यापन: (कोड: string) => Promise<boolean>;
}

export interface प्रमाणपत्र {
  जारीकर्ता: string;
  स्तर: 'उच्च' | 'मध्यम' | 'न्यून';
  घोषणाएं: string[];
  हस्ताक्षर: string;
  समयसीमा: Date;
}

export interface सुरक्षाकार्यक्षेत्र {
  कार्यक्षेत्रआईडी: string;
  कोड: string;
  प्रतिबंध: {
    कार्य: string[];
    मॉड्यूल: string[];
    पहुंच: string[];
  };
}

export interface टीईईविन्यास {
  प्रकार: 'SGX' | 'TrustZone' | 'SEV' | 'SEE';
  स्तर: number;
  नीतियां: string[];
}

export interface एचएसएमविन्यास {
  प्रकार: 'Yubico' | 'Thales' | 'Gemalto' | string;
  कुंजीप्रकार: 'RSA' | 'ECC';
  कुंजीआकार: number;
}

export interface स्मृतिसत्यापनपरिणाम {
  सफल: boolean;
  त्रुटियाँ?: string[];
  स्थान?: {
    फ़ाइल: string;
    पंक्ति: number;
    स्तंभ: number;
  }[];
}

export interface प्रकारसत्यापनपरिणाम {
  सफल: boolean;
  त्रुटियाँ?: string[];
  प्रकारमानचित्र?: Map<string, string>;
}

export interface समवर्तीसत्यापनपरिणाम {
  सफल: boolean;
  त्रुटियाँ?: string[];
  रेसकंडीशन?: {
    चर: string;
    कार्य: string[];
  }[];
}

export interface औपचारिकघोषणा {
  प्रकार: 'पूर्वस्थिति' | 'उत्तरस्थिति' | 'अभिधारणा';
  सूत्र: string;
  संदर्भ?: string;
}

export interface सुरक्षाघटना {
  प्रकार: 'उल्लंघन' | 'चेतावनी' | 'सूचना' | 'त्रुटि';
  स्रोत: string;
  संदेश: string;
  समय: Date;
  संदर्भ?: any;
}

export interface कुंजीयुग्म {
  सार्वजनिक: string;
  निजी: string;
  प्रकार: 'RSA' | 'ECC';
  आकार: number;
  उद्देश्य: 'हस्ताक्षर' | 'एन्क्रिप्शन' | 'दोनों';
}

export interface सत्यापनपरिणाम {
  सफल: boolean;
  प्रमाण?: Buffer;
  हैश?: string;
  समय: Date;
  त्रुटियाँ?: string[];
}

export interface सुरक्षालेख {
  समय: Date;
  प्रकार: 'परिवर्तन' | 'पहुंच' | 'त्रुटि';
  विवरण: string;
  स्रोत: string;
  हैश: string;
}

export type सुरक्षास्तर = 'निम्न' | 'मध्यम' | 'उच्च';

export interface सुरक्षाविकल्प {
  अस्पष्टीकरण: boolean;
  सत्यापन: boolean;
  सुरक्षा: boolean;
}

// Types for improved function parameters with default values
export interface FunctionParameter {
    name: string;
    type: string;
    defaultValue: any | null;
}

// Types for pattern matching
export interface PatternCaseNode {
    pattern?: any;
    body: any;
    isDefault?: boolean;
}

export interface PatternMatchNode {
    type: 'PATTERN_MATCH';
    patterns: PatternCaseNode[];
}

// Enhanced error handling with dual-language support
export interface SanskritError extends Error {
    संदेश: string; // Sanskrit message
    अनुवाद: string; // Translation
    पंक्ति: number; // Line
    स्तंभ: number; // Column
}

// String interpolation support
export interface TemplateLiteralNode {
    type: 'TEMPLATE_LITERAL';
    parts: (string | ExpressionNode)[];
}

// Default parameter support
export interface DefaultParameter {
    परामीटर: string; // Parameter name
    मूल्य: any; // Default value
}

// Interface for autocompletion dictionary
export interface SanskritAutoComplete {
    शब्द: string; // Sanskrit word
    अनुवाद: string; // English translation
    उदाहरण: string; // Example
    श्रेणी: 'क्रिया' | 'संज्ञा' | 'विशेषण' | 'अव्यय'; // Part of speech
}

// Add ExpressionNode interface for template literals
export interface ExpressionNode extends ASTNode {
    type: string;
    प्रकार?: string;
}

// Add new interfaces for metaprogramming features
export interface मैक्रोविवरण {
  नाम: string;
  पैरामीटर: Parameter[];
  प्रतिस्थापन: string;
  विश्लेषणयोग्य: boolean;  // Can be analyzed at compile time
}

// Add new interfaces for concurrency features
export interface समानांतरकार्य {
  नाम: string;
  प्राथमिकता: number;
  समयसीमा?: number;  // Timeout in milliseconds
  वापसीमान: any;      // Return value
}

export interface संचारचैनल {
  नाम: string;
  प्रकार: string;
  क्षमता: number;
  पठितमात्र: boolean;
}

// Add new interfaces for AI integration
export interface बुद्धिमॉडल {
  नाम: string;
  प्रकार: 'भाषा' | 'छवि' | 'ध्वनि' | 'बहुभाषी';
  स्रोत: string;
  प्रवेशप्रारूप: string[];
  निकासप्रारूप: string[];
  विकल्प: Map<string, any>;
}

export interface अनुमानविकल्प {
  तापमान: number;      // Temperature for randomness
  अधिकतमलंबाई: number; // Max output length
  सीडवाक्य?: string;    // Seed phrase
  कॉन्टेक्स्ट?: string; // Context information
}

export interface छविप्रसंस्करण {
  स्रोत: string | Buffer;
  प्रकार: 'वर्गीकरण' | 'पहचान' | 'उत्पादन' | 'परिवर्तन';
  विकल्प: Map<string, any>;
}

export interface वाणीविकल्प {
  भाषा: string;
  उच्चारणगति: number;
  स्वर: string;
  विराम: boolean;
}

// Compiler directive for natural language understanding
export interface प्राकृतिकभाषासमझ {
  इनपुट: string;
  भाषा: string;
  उद्देश्य: 'अनुवाद' | 'सारांश' | 'विश्लेषण' | 'उत्तर';
  संदर्भ?: string;
}