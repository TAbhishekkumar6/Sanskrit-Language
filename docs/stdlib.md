# संस्कृत भाषा मानक पुस्तकालय (Sanskrit Language Standard Library)

## मॉड्यूल सूची (Module List)

1. [आधार (Aadhaara)](#आधार-aadhaara) - Core Data Structures
2. [आगम (Aagama)](#आगम-aagama) - Input/Output Operations
3. [संवाद (Samvaada)](#संवाद-samvaada) - Networking
4. [परीक्षण (Pareekshana)](#परीक्षण-pareekshana) - Testing Framework
5. [प्रमाण (Pramaana)](#प्रमाण-pramaana) - Validation
6. [सुरक्षा (Surakshaa)](#सुरक्षा-surakshaa) - Security
7. [प्रलेखन (Pralekhana)](#प्रलेखन-pralekhana) - Documentation

## विस्तृत विवरण (Detailed Description)

### आधार (Aadhaara)

Core data structures and fundamental operations.

#### मुख्य वर्ग (Main Classes)
- `सूची` (Soochee) - Array/List operations
  ```typescript
  const सूची = new सूची([1, 2, 3]);
  सूची.जोड़ें(4);  // Add element
  सूची.निकालें();  // Remove element
  ```

- `मानचित्र` (Maanchitra) - Map/Dictionary
  ```typescript
  const मानचित्र = new मानचित्र();
  मानचित्र.सेट("कुंजी", "मूल्य");  // Set value
  मानचित्र.प्राप्त("कुंजी");        // Get value
  ```

### आगम (Aagama)

Input/Output operations for file handling and system interactions.

#### मुख्य कार्य (Main Functions)
- `पढ़ें` (Padhen) - Read file
  ```typescript
  const डेटा = await आगम.पढ़ें("फ़ाइल.txt");
  ```

- `लिखें` (Likhen) - Write file
  ```typescript
  await आगम.लिखें("फ़ाइल.txt", "सामग्री");
  ```

### संवाद (Samvaada)

Networking and communication operations.

#### मुख्य वर्ग (Main Classes)
- `HTTPग्राहक` (HTTPGraahak) - HTTP Client
  ```typescript
  const प्रतिक्रिया = await HTTPग्राहक.प्राप्त("https://api.example.com");
  ```

- `WebSocketग्राहक` (WebSocketGraahak) - WebSocket Client
  ```typescript
  const ग्राहक = new WebSocketग्राहक("ws://server.com");
  await ग्राहक.जुड़ें();
  ```

### परीक्षण (Pareekshana)

Testing framework for unit tests and assertions.

#### मुख्य वर्ग (Main Classes)
- `परीक्षणसमूह` (PareekshanaSmooha) - Test Suite
  ```typescript
  const परीक्षण = new परीक्षणसमूह("मेरा परीक्षण");
  परीक्षण.जोड़ें("यह काम करता है", () => {
    दावा.बराबर(2 + 2, 4);
  });
  ```

### प्रमाण (Pramaana)

Data validation and schema checking.

#### मुख्य वर्ग (Main Classes)
- `प्रमाणक` (Pramaanaka) - Validator
  ```typescript
  const योजना = {
    प्रकार: "वस्तु",
    गुण: {
      नाम: { प्रकार: "स्ट्रिंग", आवश्यक: true },
      आयु: { प्रकार: "संख्या", न्यूनतम: 0 }
    }
  };
  
  const प्रमाणक = new प्रमाणक(योजना);
  प्रमाणक.जाँच(डेटा);
  ```

### सुरक्षा (Surakshaa)

Security and cryptography operations.

#### मुख्य वर्ग (Main Classes)
- `हैश` (Hash) - Hashing operations
  ```typescript
  const हैश = new हैश("SHA-256");
  const परिणाम = हैश.बनाएं("मेरा-डेटा");
  ```

- `एन्क्रिप्शन` (Encryption) - Encryption operations
  ```typescript
  const एन्क्रिप्टर = new एन्क्रिप्शन();
  const गुप्त = await एन्क्रिप्टर.एन्क्रिप्ट("गुप्त-डेटा", "कुंजी");
  ```

### प्रलेखन (Pralekhana)

Documentation generation and management.

#### मुख्य कार्य (Main Functions)
- `दस्तावेज़बनाएं` (DastaavezBanayen) - Generate documentation
  ```typescript
  await प्रलेखन.दस्तावेज़बनाएं("./src", "./docs");
  ```

## त्रुटि प्रबंधन (Error Handling)

Each module has its own error class that extends the base `त्रुटि` (Truti) class:

```typescript
try {
  // कोड
} catch (त्रुटि) {
  if (त्रुटि instanceof संवादत्रुटि) {
    // नेटवर्क त्रुटि का प्रबंधन
  }
}
```

## उदाहरण (Examples)

### बुनियादी उदाहरण (Basic Example)
```typescript
import { सूची } from './aadhaara';
import { HTTPग्राहक } from './samvaada';

async function मुख्य() {
  // सूची बनाएं
  const फल = new सूची(["सेब", "केला", "संतरा"]);
  
  // HTTP अनुरोध
  const मौसम = await HTTPग्राहक.प्राप्त("https://api.weather.com");
  
  console.log(फल.आकार(), मौसम.डेटा);
}
```

### उन्नत उदाहरण (Advanced Example)
```typescript
import { प्रमाणक } from './pramaana';
import { एन्क्रिप्शन } from './surakshaa';

async function उपयोगकर्ताप्रमाणन() {
  // योजना परिभाषित करें
  const योजना = {
    प्रकार: "वस्तु",
    गुण: {
      उपयोगकर्तानाम: { प्रकार: "स्ट्रिंग", आवश्यक: true },
      कूटशब्द: { प्रकार: "स्ट्रिंग", न्यूनतम: 8 }
    }
  };

  const प्रमाणक = new प्रमाणक(योजना);
  const एन्क्रिप्टर = new एन्क्रिप्शन();

  // डेटा सत्यापित करें
  const मान्य = प्रमाणक.जाँच(उपयोगकर्ता);
  
  if (मान्य) {
    // कूटशब्द एन्क्रिप्ट करें
    const गुप्तकूटशब्द = await एन्क्रिप्टर.एन्क्रिप्ट(
      उपयोगकर्ता.कूटशब्द,
      प्रक्रिया.env.गुप्तकुंजी
    );
  }
}
```

## योगदान (Contributing)

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## लाइसेंस (License)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 