# संस्कृत (Sanskrit) Programming Language

A programming language inspired by the ancient Sanskrit language, combining classical linguistic principles with modern programming paradigms.

## About

Sanskrit Programming Language (संस्कृत) is a unique language that applies the precision, structure, and elegance of Sanskrit to computer programming. This project aims to create a programming language that is accessible to both Sanskrit scholars and modern programmers.

## Features

### Core Features
- **Classical Philosophy**: Based on the precise grammar and logical structures of Sanskrit
- **Modern Integration**: Compiles to JavaScript for integration with modern web technologies
- **Dual-Mode Syntax**: Write code in either Devanagari or romanized Sanskrit
- **Symbolic Operators**: Use standard mathematical symbols instead of word-based operators
- **Pattern Matching**: Elegant pattern matching for expressive conditional logic
- **String Interpolation**: Template literals for easy string formatting
- **Default Parameters**: Simplified function definitions with default values
- **Type System**: Inspired by Sanskrit's precision with types
- **Bilingual Error Messages**: Debugging assistance in both Sanskrit and English

### Advanced Features

#### Metaprogramming
- **मैक्रो (Macros)**: Compile-time code transformations with `आविर्भाव`
- **प्रतिबिंब (Reflection)**: Runtime code and object analysis with `अध्ययन`
- **कोड जनरेशन (Code Generation)**: Dynamic code generation with `सृष्टि`
- **कोड परिवर्तन (Code Transformation)**: Code manipulation capabilities

#### Concurrency
- **समानांतर (Parallel Processing)**: Write concurrent functions with `समानांतर`
- **संचार (Channels)**: Type-safe communication between concurrent tasks
- **संकेत (Signals)**: Coordinate between parallel processes
- **धागा (Thread Pool)**: Efficient management of worker threads

#### AI Integration
- **भाषा मॉडल (Language Models)**: Seamless integration with LLMs
- **छवि प्रसंस्करण (Image Processing)**: Computer vision capabilities
- **वाणी (Speech Synthesis/Recognition)**: Voice interaction features
- **प्राकृतिक भाषा समझ (NLU)**: Natural language understanding

## Example

```sanskrit
कार्य फिबोनाची(संख्या: पूर्णांक) -> पूर्णांक {
    यदि (संख्या <= 1) {
        प्रतिदा संख्या;
    }
    प्रतिदा फिबोनाची(संख्या - 1) + फिबोनाची(संख्या - 2);
}
```

## Romanized Equivalent

```sanskrit
karya fibonacci(sankhya: purnanank) -> purnanank {
    yadi (sankhya <= 1) {
        pratida sankhya;
    }
    pratida fibonacci(sankhya - 1) + fibonacci(sankhya - 2);
}
```

## Advanced Example

```sanskrit
// AI integration with concurrency
कार्य छविऔरभाषाविश्लेषण(छविपथ: पाठ्य, प्रश्न: पाठ्य) -> वस्तु {
    चल परिणाम = {};
    
    // Run two tasks in parallel
    समानांतर छविविश्लेषक() {
        चल विश्लेषक = बुद्धि.छविमॉडल("संस्कृतदृष्टि");
        प्रतिदा विश्लेषक.विश्लेषण({ स्रोत: छविपथ, प्रकार: "वर्गीकरण" });
    }
    
    समानांतर भाषाप्रोसेसर() {
        चल मॉडल = बुद्धि.भाषामॉडल("संस्कृतजीपीटी");
        प्रतिदा मॉडल.अनुमान(प्रश्न, { तापमान: 0.7 });
    }
    
    // Wait for both tasks to complete
    [परिणाम.छवि, परिणाम.भाषा] = प्रतीक्षा समानांतर.सभी([
        छविविश्लेषक(),
        भाषाप्रोसेसर()
    ]);
    
    प्रतिदा परिणाम;
}
```

## Installation

```bash
npm install samskrit
```

## Running a Program

```bash
samskrit run myprogram.sam
```

## Documentation

See the `docs/` directory for comprehensive documentation:

- [Improved Syntax Guide](docs/improved_syntax.md)
- [Enhanced Features Guide](docs/enhanced_features.md)
- [Language Specification](docs/language_spec.md)
- [Features Summary](docs/SUMMARY.md)
- [Future Roadmap](docs/roadmap.md) - See our plans for upcoming Sanskrit language features

## Philosophy

Sanskrit is known for its precise grammar, rich vocabulary, and logical structure. This programming language aims to apply those principles to create code that is not only functional but also linguistically elegant and philosophically sound.

The enhanced features further extend this philosophy by bringing modern computing capabilities into harmony with Sanskrit's traditional wisdom.

## License

MIT License

## Contributors

This project welcomes contributions from both computer scientists and Sanskrit scholars. 