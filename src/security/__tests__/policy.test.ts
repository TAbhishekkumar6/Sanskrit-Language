import { सुरक्षानीति } from '../policy';

describe('सुरक्षानीति', () => {
    let नीति: सुरक्षानीति;

    beforeEach(() => {
        नीति = सुरक्षानीति.getInstance();
    });

    describe('नीति प्रबंधन', () => {
        test('नई नीति जोड़ना', () => {
            नीति.नीतिजोड़ें({
                नाम: 'परीक्षणनीति',
                स्तर: 1,
                विवरण: 'परीक्षण के लिए नीति',
                सक्रिय: true,
                नियम: ['परीक्षण_नियम']
            });

            const प्राप्तनीति = नीति.नीतिप्राप्तकरें('परीक्षणनीति');
            expect(प्राप्तनीति).toBeDefined();
            expect(प्राप्तनीति?.नाम).toBe('परीक्षणनीति');
        });

        test('नीति हटाना', () => {
            नीति.नीतिजोड़ें({
                नाम: 'हटानेवालीनीति',
                स्तर: 1,
                विवरण: 'हटाने के लिए नीति',
                सक्रिय: true,
                नियम: []
            });

            expect(नीति.नीतिहटाएं('हटानेवालीनीति')).toBe(true);
            expect(नीति.नीतिप्राप्तकरें('हटानेवालीनीति')).toBeUndefined();
        });
    });

    describe('नीति सत्यापन', () => {
        test('असुरक्षित कार्य जांच', async () => {
            const कोड = `
                eval("console.log('खतरनाक');");
            `;

            await expect(नीति.नीतिसत्यापन(कोड)).rejects.toThrow('असुरक्षित कार्य');
        });

        test('कुंजी भंडारण जांच', async () => {
            const कोड = `
                const API_KEY = "abc123xyz789";
            `;

            await expect(नीति.नीतिसत्यापन(कोड)).rejects.toThrow('असुरक्षित कुंजी भंडारण');
        });

        test('एन्क्रिप्शन आवश्यकता', async () => {
            const कोड = `
                const संवेदनशीलडेटा = "गोपनीय";
                // बिना एन्क्रिप्शन के संग्रहण
                localStorage.setItem('डेटा', संवेदनशीलडेटा);
            `;

            await expect(नीति.नीतिसत्यापन(कोड)).rejects.toThrow('एन्क्रिप्शन का उपयोग नहीं');
        });
    });

    describe('नीति स्तर', () => {
        test('स्तर परिवर्तन', () => {
            const नीतिनाम = 'स्तरपरीक्षण';
            नीति.नीतिजोड़ें({
                नाम: नीतिनाम,
                स्तर: 1,
                विवरण: 'स्तर परीक्षण नीति',
                सक्रिय: true,
                नियम: []
            });

            नीति.सुरक्षास्तरनिर्धारित(नीतिनाम, 2);
            const अपडेटेडनीति = नीति.नीतिप्राप्तकरें(नीतिनाम);
            expect(अपडेटेडनीति?.स्तर).toBe(2);
        });
    });
});