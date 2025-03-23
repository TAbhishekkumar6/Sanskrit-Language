# संस्कृत प्रोग्रामिंग भाषा विनिर्देश
# Sanskrit Programming Language Specification

## परिचय | Introduction

संस्कृत प्रोग्रामिंग भाषा एक अभिनव प्रोग्रामिंग भाषा है जो प्राचीन संस्कृत भाषा के सिद्धांतों को आधुनिक कंप्यूटर प्रोग्रामिंग के साथ जोड़ती है। इस दस्तावेज़ में भाषा के मूल सिद्धांत, वाक्य-रचना नियम और सुविधाएँ विस्तार से वर्णित हैं।

Sanskrit Programming Language is an innovative programming language that combines principles from ancient Sanskrit with modern computer programming. This document provides detailed specifications of the language's core concepts, syntax rules, and features.

## मूलभूत तत्व | Core Elements

### डेटा प्रकार | Data Types

संस्कृत प्रोग्रामिंग भाषा में निम्नलिखित आधारभूत डेटा प्रकार हैं:

Sanskrit Programming Language supports the following primitive data types:

| संस्कृत नाम (Sanskrit Name) | रोमनीकृत नाम (Romanized Name) | अंग्रेजी समकक्ष (English Equivalent) | विवरण (Description) |
|------------------------------|-------------------------------|-----------------------------------|----------------------|
| `पूर्णांक` | `purnanank` | Integer | पूर्ण संख्याएँ (Whole numbers) |
| `दशमलव` | `dashamlav` | Float | दशमलव संख्याएँ (Decimal numbers) |
| `पाठ्य` | `pathya` | String | अक्षर श्रृंखला (Text) |
| `बूलीयन` | `boolean` | Boolean | सत्य/असत्य (True/False) |
| `शून्य` | `shunya` | Null | शून्य मान (Null value) |
| `अनिर्धारित` | `anirdharit` | Undefined | अनिर्धारित मान (Undefined value) |
| `वस्तु` | `vastu` | Object | वस्तु (Object) |
| `सूची` | `soochi` | Array | सूची (Array) |

### वेरिएबल | Variables

देवनागरी (Devanagari):
```sanskrit
चल नाम = "राम";
नियत पाई = 3.14159;
पूर्णांक आयु = 25;
दशमलव मूल्य = 10.5;
बूलीयन सक्रिय = सत्य;
```

रोमनीकृत (Romanized):
```sanskrit
chal naam = "Ram";
niyat pai = 3.14159;
purnanank aayu = 25;
dashamlav mulya = 10.5;
boolean sakriya = satya;
```

### कार्य | Functions

देवनागरी (Devanagari):
```sanskrit
कार्य जोड़(क, ख) {
    प्रतिदा क + ख;
}

कार्य अभिवादन(नाम) {
    प्रतिदा "नमस्ते " + नाम;
}
```

रोमनीकृत (Romanized):
```sanskrit
karya jod(ka, kha) {
    pratida ka + kha;
}

karya abhivadan(naam) {
    pratida "Namaste " + naam;
}
```

### प्रकार संकेत | Type Annotations

देवनागरी (Devanagari):
```sanskrit
कार्य जोड़(क: पूर्णांक, ख: पूर्णांक): पूर्णांक {
    प्रतिदा क + ख;
}

चल नाम: पाठ्य = "राम";
चल आयु: पूर्णांक = 25;
```

रोमनीकृत (Romanized):
```sanskrit
karya jod(ka: purnanank, kha: purnanank): purnanank {
    pratida ka + kha;
}

chal naam: pathya = "Ram";
chal aayu: purnanank = 25;
```

## नियंत्रण प्रवाह | Control Flow

### शर्ती कथन | Conditional Statements

देवनागरी (Devanagari):
```sanskrit
यदि (आयु >= 18) {
    प्रिंट("वयस्क");
} अन्यथा यदि (आयु >= 13) {
    प्रिंट("किशोर");
} अन्यथा {
    प्रिंट("बच्चा");
}
```

रोमनीकृत (Romanized):
```sanskrit
yadi (aayu >= 18) {
    print("Vayask");
} anyatha yadi (aayu >= 13) {
    print("Kishor");
} anyatha {
    print("Bachcha");
}
```

### मिलान | Pattern Matching

देवनागरी (Devanagari):
```sanskrit
मिलान (फल) {
    प्रतिरूप "आम": प्रिंट("यह आम है");
    प्रतिरूप "केला": प्रिंट("यह केला है");
    प्रतिरूप "सेब": प्रिंट("यह सेब है");
    प्रतिरूप _: प्रिंट("अज्ञात फल");
}
```

रोमनीकृत (Romanized):
```sanskrit
milaan (phal) {
    pratiroop "aam": print("Yah aam hai");
    pratiroop "kela": print("Yah kela hai");
    pratiroop "seb": print("Yah seb hai");
    pratiroop _: print("Agyaat phal");
}
```

### लूप | Loops

देवनागरी (Devanagari):
```sanskrit
// जबतक लूप
जबतक (शर्त) {
    // कोड...
}

// के लिए लूप
के_लिए (चल i = 0; i < 10; i++) {
    प्रिंट(i);
}

// प्रत्येक लूप
प्रत्येक (चल वस्तु में सूची) {
    प्रिंट(वस्तु);
}
```

रोमनीकृत (Romanized):
```sanskrit
// jabtak loop
jabtak (shart) {
    // code...
}

// ke_liye loop
ke_liye (chal i = 0; i < 10; i++) {
    print(i);
}

// pratyeka loop
pratyeka (chal vastu mein soochi) {
    print(vastu);
}
```

## वर्ग और ऑब्जेक्ट | Classes and Objects

देवनागरी (Devanagari):
```sanskrit
वर्ग व्यक्ति {
    निर्माता(नाम, आयु) {
        यह.नाम = नाम;
        यह.आयु = आयु;
    }

    कार्य विवरण() {
        प्रतिदा `${यह.नाम}, ${यह.आयु} वर्ष`;
    }
}

चल राम = नया व्यक्ति("राम", 30);
प्रिंट(राम.विवरण());
```

रोमनीकृत (Romanized):
```sanskrit
varg vyakti {
    nirmaata(naam, aayu) {
        yah.naam = naam;
        yah.aayu = aayu;
    }

    karya vivaran() {
        pratida `${yah.naam}, ${yah.aayu} varsh`;
    }
}

chal ram = naya vyakti("Ram", 30);
print(ram.vivaran());
```

## विशेष सुविधाएँ | Special Features

### स्ट्रिंग इंटरपोलेशन | String Interpolation

देवनागरी (Devanagari):
```sanskrit
चल नाम = "राम";
चल आयु = 30;
चल संदेश = `${नाम} की आयु ${आयु} वर्ष है।`;
प्रिंट(संदेश);
```

रोमनीकृत (Romanized):
```sanskrit
chal naam = "Ram";
chal aayu = 30;
chal sandesh = `${naam} ki aayu ${aayu} varsh hai.`;
print(sandesh);
```

### डिफॉल्ट पैरामीटर्स | Default Parameters

देवनागरी (Devanagari):
```sanskrit
कार्य अभिवादन(नाम: पाठ्य = "मित्र", औपचारिक: बूलीयन = असत्य) {
    यदि (औपचारिक) {
        प्रतिदा `नमस्कार, ${नाम}।`;
    } अन्यथा {
        प्रतिदा `नमस्ते, ${नाम}!`;
    }
}

प्रिंट(अभिवादन());  // "नमस्ते, मित्र!"
प्रिंट(अभिवादन("राम"));  // "नमस्ते, राम!"
प्रिंट(अभिवादन("श्री शर्मा", सत्य));  // "नमस्कार, श्री शर्मा।"
```

रोमनीकृत (Romanized):
```sanskrit
karya abhivadan(naam: pathya = "mitra", aupcharik: boolean = asatya) {
    yadi (aupcharik) {
        pratida `Namaskar, ${naam}.`;
    } anyatha {
        pratida `Namaste, ${naam}!`;
    }
}

print(abhivadan());  // "Namaste, mitra!"
print(abhivadan("Ram"));  // "Namaste, Ram!"
print(abhivadan("Shri Sharma", satya));  // "Namaskar, Shri Sharma."
```

### तर्कमूलक ऑपरेटर | Logical Operators

देवनागरी (Devanagari):
```sanskrit
चल क = सत्य;
चल ख = असत्य;

प्रिंट(क && ख);  // असत्य
प्रिंट(क || ख);  // सत्य
प्रिंट(!क);      // असत्य
```

रोमनीकृत (Romanized):
```sanskrit
chal ka = satya;
chal kha = asatya;

print(ka && kha);  // asatya
print(ka || kha);  // satya
print(!ka);        // asatya
```

## आयात और निर्यात | Imports and Exports

देवनागरी (Devanagari):
```sanskrit
// मॉड्यूल.संस्कृत
निर्यात कार्य जोड़(क, ख) {
    प्रतिदा क + ख;
}

निर्यात नियत पाई = 3.14159;

// मुख्य.संस्कृत
आयात { जोड़, पाई } से "./मॉड्यूल.संस्कृत";

प्रिंट(जोड़(5, 7));
प्रिंट(पाई);
```

रोमनीकृत (Romanized):
```sanskrit
// module.sanskrit
niryaat karya jod(ka, kha) {
    pratida ka + kha;
}

niryaat niyat pai = 3.14159;

// mukhya.sanskrit
aayaat { jod, pai } se "./module.sanskrit";

print(jod(5, 7));
print(pai);
```

## त्रुटि प्रबंधन | Error Handling

देवनागरी (Devanagari):
```sanskrit
प्रयास {
    // कोड जो त्रुटि उत्पन्न कर सकता है
    चल परिणाम = 10 / 0;
} पकड़ें (त्रुटि) {
    प्रिंट(`त्रुटि उत्पन्न हुई: ${त्रुटि.संदेश}`);
} अंत में {
    प्रिंट("प्रक्रिया पूरी हुई");
}
```

रोमनीकृत (Romanized):
```sanskrit
prayaas {
    // code jo truti utpanna kar sakta hai
    chal parinam = 10 / 0;
} pakden (truti) {
    print(`Truti utpanna hui: ${truti.sandesh}`);
} ant mein {
    print("Prakriya poori hui");
}
```

## समझौते एवं नियम | Conventions and Rules

1. **नामकरण प्रथाएँ** | Naming Conventions:
   - चर और कार्य नाम कैमलकेस में लिखे जाते हैं: `मेराचरनाम`, `मेराकार्य`
   - वर्ग नाम पास्कलकेस में लिखे जाते हैं: `मेरावर्ग`
   - नियतांक (constants) सभी अपरकेस में लिखे जाते हैं: `मेरानियतांक`

2. **वाक्यविन्यास नियम** | Syntax Rules:
   - हर कथन सेमिकोलन (`;`) के साथ समाप्त होना चाहिए
   - ब्लॉक की शुरुआत और समाप्ति के लिए कर्ली ब्रेसेज (`{}`) का उपयोग किया जाता है
   - अनुक्रमित ब्लॉक्स के लिए 4 स्पेस या 1 टैब इंडेंटेशन का उपयोग करें

## उदाहरण | Examples

### पूर्ण उदाहरण: फिबोनाची अनुक्रम | Complete Example: Fibonacci Sequence

देवनागरी (Devanagari):
```sanskrit
कार्य फिबोनाची(संख्या: पूर्णांक) -> पूर्णांक {
    यदि (संख्या <= 1) {
        प्रतिदा संख्या;
    }
    प्रतिदा फिबोनाची(संख्या - 1) + फिबोनाची(संख्या - 2);
}

कार्य मुख्य() {
    के_लिए (चल i = 0; i < 10; i++) {
        प्रिंट(फिबोनाची(i));
    }
}

मुख्य();
```

रोमनीकृत (Romanized):
```sanskrit
karya fibonacci(sankhya: purnanank) -> purnanank {
    yadi (sankhya <= 1) {
        pratida sankhya;
    }
    pratida fibonacci(sankhya - 1) + fibonacci(sankhya - 2);
}

karya mukhya() {
    ke_liye (chal i = 0; i < 10; i++) {
        print(fibonacci(i));
    }
}

mukhya();
```

### पूर्ण उदाहरण: छात्र प्रबंधन प्रणाली | Complete Example: Student Management System

देवनागरी (Devanagari):
```sanskrit
वर्ग छात्र {
    निर्माता(नाम: पाठ्य, अनुक्रमांक: पूर्णांक, अंक: सूची) {
        यह.नाम = नाम;
        यह.अनुक्रमांक = अनुक्रमांक;
        यह.अंक = अंक;
    }

    कार्य औसत() -> दशमलव {
        यदि (यह.अंक.लंबाई === 0) {
            प्रतिदा 0;
        }
        
        चल योग = 0;
        प्रत्येक (चल अंक में यह.अंक) {
            योग += अंक;
        }
        
        प्रतिदा योग / यह.अंक.लंबाई;
    }

    कार्य स्थिति() -> पाठ्य {
        चल औसतअंक = यह.औसत();
        
        मिलान (औसतअंक) {
            प्रतिरूप औसतअंक >= 90: प्रतिदा "उत्कृष्ट";
            प्रतिरूप औसतअंक >= 80: प्रतिदा "बहुत अच्छा";
            प्रतिरूप औसतअंक >= 70: प्रतिदा "अच्छा";
            प्रतिरूप औसतअंक >= 60: प्रतिदा "संतोषजनक";
            प्रतिरूप _: प्रतिदा "सुधार की आवश्यकता";
        }
    }

    कार्य विवरण() -> पाठ्य {
        प्रतिदा `नाम: ${यह.नाम}, अनुक्रमांक: ${यह.अनुक्रमांक}, औसत: ${यह.औसत()}, स्थिति: ${यह.स्थिति()}`;
    }
}

कार्य मुख्य() {
    चल छात्रसूची = [
        नया छात्र("राम शर्मा", 101, [85, 90, 78, 92, 88]),
        नया छात्र("सीता वर्मा", 102, [95, 92, 98, 97, 99]),
        नया छात्र("अरुण कुमार", 103, [65, 70, 68, 72, 62])
    ];

    प्रत्येक (चल छात्र में छात्रसूची) {
        प्रिंट(छात्र.विवरण());
    }
}

मुख्य();
```

रोमनीकृत (Romanized):
```sanskrit
varg chhatr {
    nirmaata(naam: pathya, anukramank: purnanank, ank: soochi) {
        yah.naam = naam;
        yah.anukramank = anukramank;
        yah.ank = ank;
    }

    karya ausaat() -> dashamlav {
        yadi (yah.ank.lambai === 0) {
            pratida 0;
        }
        
        chal yog = 0;
        pratyeka (chal ank mein yah.ank) {
            yog += ank;
        }
        
        pratida yog / yah.ank.lambai;
    }

    karya sthiti() -> pathya {
        chal ausatAnk = yah.ausaat();
        
        milaan (ausatAnk) {
            pratiroop ausatAnk >= 90: pratida "Utkrisht";
            pratiroop ausatAnk >= 80: pratida "Bahut Achcha";
            pratiroop ausatAnk >= 70: pratida "Achcha";
            pratiroop ausatAnk >= 60: pratida "Santoshjanak";
            pratiroop _: pratida "Sudhaar ki Avashyakta";
        }
    }

    karya vivaran() -> pathya {
        pratida `Naam: ${yah.naam}, Anukramank: ${yah.anukramank}, Ausaat: ${yah.ausaat()}, Sthiti: ${yah.sthiti()}`;
    }
}

karya mukhya() {
    chal chhatrSoochi = [
        naya chhatr("Ram Sharma", 101, [85, 90, 78, 92, 88]),
        naya chhatr("Sita Verma", 102, [95, 92, 98, 97, 99]),
        naya chhatr("Arun Kumar", 103, [65, 70, 68, 72, 62])
    ];

    pratyeka (chal chhatr mein chhatrSoochi) {
        print(chhatr.vivaran());
    }
}

mukhya();
```

## निष्कर्ष | Conclusion

संस्कृत प्रोग्रामिंग भाषा एक अद्वितीय और शक्तिशाली भाषा है जो प्राचीन संस्कृत की सुंदरता और आधुनिक प्रोग्रामिंग की कार्यक्षमता का संगम है। यह भाषा देवनागरी और रोमनीकृत दोनों रूपों में कोडिंग का समर्थन करती है, जिससे यह भारतीय और विश्व भर के डेवलपर्स के लिए सुलभ हो जाती है।

The Sanskrit Programming Language is a unique and powerful language that combines the beauty of ancient Sanskrit with the functionality of modern programming. The language supports coding in both Devanagari and Romanized forms, making it accessible to developers in India and around the world. 