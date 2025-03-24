// Soochee (Array/List) Operations
// Shows both Devanagari and Romanized Sanskrit versions

import { सूची } from '../../src/stdlib/aadhaara';

// ---------------- Devanagari Version ----------------
class सूचीसंचालक {
    private सूची: Array<any>;

    constructor(आरंभिकमान: Array<any> = []) {
        this.सूची = आरंभिकमान;
    }

    जोड़ें(मान: any): void {
        this.सूची.push(मान);
    }

    निकालें(): any {
        return this.सूची.pop();
    }

    खोजें(मान: any): number {
        return this.सूची.indexOf(मान);
    }

    क्रमबदलें(): void {
        this.सूची.reverse();
    }

    आकार(): number {
        return this.सूची.length;
    }
}

// ---------------- Romanized Version ----------------
class SoocheeSanchalak {
    private soochee: Array<any>;

    constructor(arambhikMaan: Array<any> = []) {
        this.soochee = arambhikMaan;
    }

    joden(maan: any): void {
        this.soochee.push(maan);
    }

    nikalen(): any {
        return this.soochee.pop();
    }

    khojen(maan: any): number {
        return this.soochee.indexOf(maan);
    }

    kramBadlen(): void {
        this.soochee.reverse();
    }

    aakar(): number {
        return this.soochee.length;
    }
}

// ---------------- Usage Examples ----------------

// Devanagari usage
console.log("देवनागरी उदाहरण:");
const फलसूची = new सूचीसंचालक(["सेब", "केला", "संतरा"]);
फलसूची.जोड़ें("आम");
console.log("आकार:", फलसूची.आकार());        // Size: 4
console.log("खोज 'केला':", फलसूची.खोजें("केला")); // Find 'banana': 1
फलसूची.क्रमबदलें();
console.log("अंतिम फल:", फलसूची.निकालें());  // Last fruit: "सेब"

// Romanized usage
console.log("\nRomanized Examples:");
const phalSoochee = new SoocheeSanchalak(["Seb", "Kela", "Santra"]);
phalSoochee.joden("Aam");
console.log("Aakar:", phalSoochee.aakar());        // Size: 4
console.log("Khoj 'Kela':", phalSoochee.khojen("Kela")); // Find 'Kela': 1
phalSoochee.kramBadlen();
console.log("Antim Phal:", phalSoochee.nikalen());  // Last fruit: "Seb"

/* 
Explanation of Sanskrit Terms:
----------------------------
सूची (Soochee) - Array/List
संचालक (Sanchalak) - Handler/Manager
जोड़ें (Joden) - Add/Push
निकालें (Nikalen) - Remove/Pop
खोजें (Khojen) - Search/Find
क्रमबदलें (KramBadlen) - Reverse order
आकार (Aakar) - Size/Length

Data Structure Terms:
-------------------
क्रम (Kram) - Order/Sequence
मान (Maan) - Value
सूचकांक (Soochkank) - Index
आरंभिक (Arambhik) - Initial
अंतिम (Antim) - Last/Final
*/ 