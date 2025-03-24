// नमस्ते संसार (Hello World)
// This example shows basic console output in Sanskrit Language

// Sanskrit Version (देवनागरी)
function नमस्ते() {
    console.log("नमस्ते संसार!");
}

// Romanized Version (रोमन)
function namaste() {
    console.log("Namaste Sansaar!");
}

// Using string formatting
const नाम = "राम";
console.log(`नमस्ते ${नाम}!`);  // Outputs: नमस्ते राम!

// Multiple language support
const स्वागत = {
    संस्कृत: "नमस्ते",
    हिंदी: "नमस्कार",
    अंग्रेजी: "Hello"
};

// Print greetings in different languages
Object.entries(स्वागत).forEach(([भाषा, अभिवादन]) => {
    console.log(`${भाषा}: ${अभिवादन}`);
}); 