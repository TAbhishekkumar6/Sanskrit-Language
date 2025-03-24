# संस्कृत भाषा (Sanskrit Language)

A programming language inspired by the ancient Sanskrit language, combining classical linguistic principles with modern programming paradigms.

## About

Sanskrit Programming Language (संस्कृत) is a unique language that applies the precision, structure, and elegance of Sanskrit to computer programming. This project aims to create a programming language that is accessible to both Sanskrit scholars and modern programmers.

## Core Features

### Language Design
- **Dual-Mode Syntax**: Write code in either Devanagari or Romanized Sanskrit
- **Type System**: Strong typing with Sanskrit terminology
- **Error Handling**: Sanskrit-based error types and messages
- **Module System**: Organized library structure with Sanskrit naming

### Standard Library
- **परीक्षण (Testing)**: Test suite management with assertions and hooks
- **प्रमाण (Validation)**: Schema-based data validation with type checking
- **सुरक्षा (Security)**: Encryption, hashing, and cryptographic functions
- **संवाद (Networking)**: WebSocket and HTTP communication protocols

### Developer Tools
- **Documentation**: Bilingual documentation in Devanagari and Roman scripts
- **Examples**: Practical code samples in both writing systems
- **Type Definitions**: TypeScript type support for IDE integration
- **Error Messages**: Descriptive errors in both Sanskrit and English

### Modern Integration
- **TypeScript/JavaScript**: Built on TypeScript for modern development
- **Node.js Support**: Full compatibility with Node.js ecosystem
- **NPM Package**: Available as an npm package for easy installation
- **Web Compatible**: Works in both browser and server environments

### Developer Experience
- **Bilingual Error Messages**: Debugging assistance in both Sanskrit and English
- **Rich IDE Support**: Syntax highlighting and code completion
- **Interactive REPL**: Sanskrit-aware command-line interface
- **Hot Module Reloading**: Fast development cycle with instant feedback

### Safety and Security
- **Static Type Checking**: Catch errors at compile time
- **Memory Safety**: Automatic memory management
- **Thread Safety**: Safe concurrent programming primitives
- **Secure by Default**: Built-in security best practices

### Documentation and Learning
- **Bilingual Documentation**: Complete documentation in both Devanagari and Roman scripts
- **Code Examples**: Practical examples from basic to advanced levels
- **Standard Library Reference**: Detailed API documentation with Sanskrit terminology explanations
- **Implementation Guide**: Clear guidelines for using language features and modules

## Standard Library (मानक पुस्तकालय)

Our comprehensive standard library provides core functionality in both Devanagari and Romanized Sanskrit:

### 1. परीक्षण (Parikshan) - Testing Framework
```typescript
import { परीक्षणसमूह, दावा } from './src/stdlib/parikshan';

const परीक्षण = new परीक्षणसमूह('गणित परीक्षण');
परीक्षण.परीक्षा('जोड़', () => {
    दावा.बराबर(2 + 2, 4);
});
```

### 2. प्रमाण (Pramaana) - Validation
```typescript
import { प्रमाणक } from './src/stdlib/pramaana';

const योजना = {
    प्रकार: "वस्तु",
    गुण: {
        नाम: { प्रकार: "स्ट्रिंग", आवश्यक: true },
        आयु: { प्रकार: "संख्या", न्यूनतम: 0 }
    }
};
```

### 3. सुरक्षा (Surakshaa) - Security
```typescript
import { एन्क्रिप्शन } from './src/stdlib/surakshaa';

const एन्क्रिप्टर = new एन्क्रिप्शन('गुप्त-कुंजी');
const गुप्तडेटा = एन्क्रिप्टर.एन्क्रिप्ट('गोपनीय संदेश');
```

### 4. संवाद (Samvaada) - Networking
```typescript
import { WebSocketसर्वर } from './src/stdlib/samvaada';

const सर्वर = new WebSocketसर्वर(8080);
सर्वर.कनेक्शनपर((ग्राहक) => {
    ग्राहक.सुनें((संदेश) => console.log('प्राप्त:', संदेश));
});
```

## Code Examples

### Basic Sanskrit Program
```sanskrit
कार्य फिबोनाची(संख्या: पूर्णांक) -> पूर्णांक {
    यदि (संख्या <= 1) {
        प्रतिदा संख्या;
    }
    प्रतिदा फिबोनाची(संख्या - 1) + फिबोनाची(संख्या - 2);
}
```

### Romanized Equivalent
```sanskrit
karya fibonacci(sankhya: purnanank) -> purnanank {
    yadi (sankhya <= 1) {
        pratida sankhya;
    }
    pratida fibonacci(sankhya - 1) + fibonacci(sankhya - 2);
}
```

## Documentation

### Core Documentation
- [Language Specification](docs/language_spec.md)
- [Improved Syntax Guide](docs/improved_syntax.md)
- [Enhanced Features](docs/enhanced_features.md)

### Library and Development
- [Standard Library Documentation](docs/stdlib.md)
- [Examples Guide](examples/README.md)
- [Contributing Guidelines](docs/contributing.md)

### Project Planning
- [Future Roadmap](docs/roadmap.md)
- [Features Summary](docs/SUMMARY.md)

## Example Directory Structure

The `examples/` directory contains practical implementations:

### Basic Examples
- `namaste.ts`: Hello World program
- `calculator_romanized.ts`: Basic calculator with Romanized Sanskrit

### Intermediate Examples
- `validation.ts`: Data validation examples
- `array_romanized.ts`: Array operations

### Advanced Examples
- `chat.ts`: Real-time chat application with encryption

## Development

### Prerequisites
- Node.js (v14 or higher)
- TypeScript (v4.5 or higher)

### Installation and Setup
```bash
npm install sanskrit-language
```

### Development Commands
```bash
# Run a Sanskrit program
samskrit run myprogram.sam

# Build the project
npm run build

# Run tests
npm test
```

## Sanskrit Terms Reference

| Sanskrit Term | Romanized | English |
|--------------|-----------|----------|
| परीक्षण | Parikshan | Testing |
| प्रमाण | Pramaana | Validation |
| सुरक्षा | Surakshaa | Security |
| संवाद | Samvaada | Communication |
| दावा | Daava | Assertion |
| योजना | Yojana | Schema |
| सत्यापक | Satyapak | Validator |

## Contributing

We welcome contributions from both computer scientists and Sanskrit scholars. Please read our [contributing guidelines](docs/contributing.md) before submitting pull requests.

## Philosophy

Sanskrit is known for its precise grammar, rich vocabulary, and logical structure. This programming language applies these principles to create code that is not only functional but also linguistically elegant and philosophically sound.

## License

MIT License

## Acknowledgments

Special thanks to contributors and Sanskrit scholars who helped with terminology and concepts. 