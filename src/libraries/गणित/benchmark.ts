import { उन्नतगणित } from './index';
import { निष्पादनमापक } from '../benchmark';

export async function गणितनिष्पादनपरीक्षण() {
    // Prime number calculation benchmark
    console.log('अभाज्य संख्या परीक्षण:');
    const अभाज्यपरिणाम = await निष्पादनमापक.माप(
        () => उन्नतगणित.अंकगणित.अभाज्यसंख्याएँ(1000),
        [],
        { स्मृतिमाप: true }
    );
    console.log(निष्पादनमापक.प्रतिवेदन({ 'अभाज्य_संख्याएँ': अभाज्यपरिणाम }));

    // Matrix multiplication benchmark
    console.log('\nआव्यूह गुणन परीक्षण:');
    const मैट्रिक्स१ = Array(50).fill(0).map(() => Array(50).fill(0).map(() => Math.random()));
    const मैट्रिक्स२ = Array(50).fill(0).map(() => Array(50).fill(0).map(() => Math.random()));
    
    const आव्यूहपरिणाम = await निष्पादनमापक.माप(
        () => उन्नतगणित.आव्यूहगुणन(मैट्रिक्स१, मैट्रिक्स२),
        [],
        { पुनरावृत्ति: 100, स्मृतिमाप: true }
    );
    console.log(निष्पादनमापक.प्रतिवेदन({ 'आव्यूह_गुणन': आव्यूहपरिणाम }));

    // Vector operations benchmark
    console.log('\nसदिश संक्रिया परीक्षण:');
    const सदिश१ = Array(1000).fill(0).map(() => Math.random());
    const सदिश२ = Array(1000).fill(0).map(() => Math.random());

    const सदिशपरिणाम = await निष्पादनमापक.तुलना(
        [
            () => उन्नतगणित.सदिश.बिंदुगुणन(सदिश१, सदिश२),
            () => उन्नतगणित.सदिश.योग(सदिश१, सदिश२),
            () => उन्नतगणित.सदिश.एकांक(सदिश१)
        ],
        [],
        {
            नाम: ['बिंदुगुणन', 'योग', 'एकांक'],
            स्मृतिमाप: true
        }
    );
    console.log(निष्पादनमापक.प्रतिवेदन(सदिशपरिणाम));

    // Statistical functions benchmark
    console.log('\nसांख्यिकीय कार्य परीक्षण:');
    const डेटा = Array(10000).fill(0).map(() => Math.random() * 1000);

    const सांख्यिकीपरिणाम = await निष्पादनमापक.तुलना(
        [
            () => उन्नतगणित.सांख्यिकी.माध्य(डेटा),
            () => उन्नतगणित.सांख्यिकी.माध्यिका(डेटा),
            () => उन्नतगणित.सांख्यिकी.मानकविचलन(डेटा)
        ],
        [],
        {
            नाम: ['माध्य', 'माध्यिका', 'मानकविचलन'],
            स्मृतिमाप: true
        }
    );
    console.log(निष्पादनमापक.प्रतिवेदन(सांख्यिकीपरिणाम));

    // Trigonometric functions benchmark
    console.log('\nत्रिकोणमितीय कार्य परीक्षण:');
    const कोण = Array(1000).fill(0).map(() => Math.random() * 2 * Math.PI);

    const त्रिकोणमितिपरिणाम = await निष्पादनमापक.माप(
        () => कोण.forEach(क => उन्नतगणित.त्रिकोणमिति.त्रिकोणमितीयअनुपात(क)),
        [],
        { स्मृतिमाप: true }
    );
    console.log(निष्पादनमापक.प्रतिवेदन({ 'त्रिकोणमितीय_अनुपात': त्रिकोणमितिपरिणाम }));
}

// Add specific benchmarks for different mathematical operations
export async function विशेषगणनापरीक्षण(कार्य: keyof typeof उन्नतगणित, मापदंड: any[] = []) {
    console.log(`${कार्य} का निष्पादन परीक्षण:`);
    const परिणाम = await निष्पादनमापक.माप(
        () => (उन्नतगणित as any)[कार्य](...मापदंड),
        [],
        { स्मृतिमाप: true }
    );
    console.log(निष्पादनमापक.प्रतिवेदन({ [कार्य]: परिणाम }));
}

// Example usage:
// await गणितनिष्पादनपरीक्षण();
// await विशेषगणनापरीक्षण('महत्तमसमापवर्तक', [48, 18]);