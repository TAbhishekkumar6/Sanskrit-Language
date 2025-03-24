// Ganaka (Calculator) - Basic arithmetic operations
// Shows both Devanagari and Romanized Sanskrit versions

// ---------------- Devanagari Version ----------------
class गणक {
    योग(क: number, ख: number): number {
        return क + ख;
    }

    अंतर(क: number, ख: number): number {
        return क - ख;
    }

    गुणन(क: number, ख: number): number {
        return क * ख;
    }

    भाग(क: number, ख: number): number {
        if (ख === 0) {
            throw new Error("शून्य से भाग नहीं कर सकते");
        }
        return क / ख;
    }
}

// ---------------- Romanized Version ----------------
class Ganaka {
    yoga(ka: number, kha: number): number {
        return ka + kha;
    }

    antara(ka: number, kha: number): number {
        return ka - kha;
    }

    gunana(ka: number, kha: number): number {
        return ka * kha;
    }

    bhaga(ka: number, kha: number): number {
        if (kha === 0) {
            throw new Error("Shunya se bhag nahi kar sakte");
        }
        return ka / kha;
    }
}

// ---------------- Usage Examples ----------------

// Devanagari usage
const देवगणक = new गणक();
console.log("देवनागरी उदाहरण:");
console.log("योग:", देवगणक.योग(10, 5));      // Addition: 15
console.log("अंतर:", देवगणक.अंतर(10, 5));    // Subtraction: 5
console.log("गुणन:", देवगणक.गुणन(10, 5));    // Multiplication: 50
console.log("भाग:", देवगणक.भाग(10, 5));      // Division: 2

// Romanized usage
const romGanaka = new Ganaka();
console.log("\nRomanized Examples:");
console.log("Yoga:", romGanaka.yoga(10, 5));      // Addition: 15
console.log("Antara:", romGanaka.antara(10, 5));  // Subtraction: 5
console.log("Gunana:", romGanaka.gunana(10, 5));  // Multiplication: 50
console.log("Bhaga:", romGanaka.bhaga(10, 5));    // Division: 2

/* 
Explanation of Sanskrit Terms:
----------------------------
गणक (Ganaka) - Calculator
योग (Yoga) - Addition
अंतर (Antara) - Subtraction
गुणन (Gunana) - Multiplication
भाग (Bhaga) - Division
क (Ka), ख (Kha) - Variables (following Sanskrit alphabetical order)

Mathematical Terms in Sanskrit:
----------------------------
संख्या (Sankhya) - Number
धन (Dhana) - Positive
ऋण (Rna) - Negative
शून्य (Shunya) - Zero
पूर्णांक (Purnaank) - Integer
दशमलव (Dashamalava) - Decimal
*/ 