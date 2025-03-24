// डेटा सत्यापन उदाहरण (Data Validation Example)
import { प्रमाणक, प्रमाणयोजना } from '../../src/stdlib/pramaana';

// ---------------- Devanagari Version ----------------
async function उपयोगकर्तासत्यापन() {
    // Define schema (योजना परिभाषित करें)
    const योजना: प्रमाणयोजना = {
        प्रकार: "वस्तु",
        गुण: {
            नाम: { 
                प्रकार: "स्ट्रिंग", 
                आवश्यक: true,
                न्यूनतम: 2,
                अधिकतम: 50
            },
            आयु: { 
                प्रकार: "संख्या",
                न्यूनतम: 0,
                अधिकतम: 150
            },
            ईमेल: {
                प्रकार: "स्ट्रिंग",
                प्रारूप: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            },
            रुचियां: {
                प्रकार: "सूची",
                सदस्य: { प्रकार: "स्ट्रिंग" },
                न्यूनतम: 1
            }
        }
    };

    // Create validator (सत्यापक बनाएं)
    const सत्यापक = new प्रमाणक(योजना);

    // Test data (परीक्षण डेटा)
    const वैधउपयोगकर्ता = {
        नाम: "देवदत्त",
        आयु: 25,
        ईमेल: "devdatt@sanskrit.com",
        रुचियां: ["योग", "संगीत", "काव्य"]
    };

    const अवैधउपयोगकर्ता = {
        नाम: "र",  // Too short
        आयु: 200,  // Too high
        ईमेल: "invalid-email",  // Invalid format
        रुचियां: []  // Empty array
    };

    try {
        // Validate valid user
        const वैधपरिणाम = await सत्यापक.जाँच(वैधउपयोगकर्ता);
        console.log("वैध उपयोगकर्ता सत्यापन:", वैधपरिणाम.मान्य);
        
        // Validate invalid user
        const अवैधपरिणाम = await सत्यापक.जाँच(अवैधउपयोगकर्ता);
        console.log("अवैध उपयोगकर्ता सत्यापन:", अवैधपरिणाम.मान्य);
        console.log("त्रुटियाँ:", अवैधपरिणाम.त्रुटियाँ);
    } catch (त्रुटि) {
        console.error("सत्यापन त्रुटि:", त्रुटि);
    }
}

// ---------------- Romanized Version ----------------
async function upayogakartaSatyapan() {
    // Define schema
    const yojana: प्रमाणयोजना = {
        प्रकार: "वस्तु",  // Using Devanagari keys as they are part of the type
        गुण: {
            नाम: { 
                प्रकार: "स्ट्रिंग", 
                आवश्यक: true,
                न्यूनतम: 2,
                अधिकतम: 50
            },
            आयु: { 
                प्रकार: "संख्या",
                न्यूनतम: 0,
                अधिकतम: 150
            },
            ईमेल: {
                प्रकार: "स्ट्रिंग",
                प्रारूप: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            },
            रुचियां: {
                प्रकार: "सूची",
                सदस्य: { प्रकार: "स्ट्रिंग" },
                न्यूनतम: 1
            }
        }
    };

    // Create validator
    const satyapak = new प्रमाणक(yojana);

    // Test data
    const vaidhUpayogakarta = {
        नाम: "Devdatt",
        आयु: 25,
        ईमेल: "devdatt@sanskrit.com",
        रुचियां: ["Yoga", "Sangeet", "Kavya"]
    };

    const avaidhUpayogakarta = {
        नाम: "R",  // Too short
        आयु: 200,  // Too high
        ईमेल: "invalid-email",  // Invalid format
        रुचियां: []  // Empty array
    };

    try {
        // Validate valid user
        const vaidhParinam = await satyapak.जाँच(vaidhUpayogakarta);
        console.log("Valid User Validation:", vaidhParinam.मान्य);
        
        // Validate invalid user
        const avaidhParinam = await satyapak.जाँच(avaidhUpayogakarta);
        console.log("Invalid User Validation:", avaidhParinam.मान्य);
        console.log("Errors:", avaidhParinam.त्रुटियाँ);
    } catch (truti) {
        console.error("Validation Error:", truti);
    }
}

// Run both versions
console.log("देवनागरी उदाहरण:");
उपयोगकर्तासत्यापन();

console.log("\nRomanized Example:");
upayogakartaSatyapan();

/* 
Explanation of Sanskrit Terms:
----------------------------
सत्यापन/Satyapan - Validation
योजना/Yojana - Schema
प्रकार/Prakar - Type
गुण/Gun - Properties
आवश्यक/Avashyak - Required
न्यूनतम/Nyunatam - Minimum
अधिकतम/Adhikatam - Maximum
मान्य/Many - Valid
त्रुटि/Truti - Error

Data Types:
----------
वस्तु/Vastu - Object
स्ट्रिंग/String - String
संख्या/Sankhya - Number
सूची/Soochee - Array
*/ 