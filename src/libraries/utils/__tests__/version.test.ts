import { संस्करणउपयोगिता } from '../version';

describe('संस्करणउपयोगिता', () => {
    describe('संस्कृतसेअरबी', () => {
        test('should convert Sanskrit numerals to Arabic numerals', () => {
            expect(संस्करणउपयोगिता.संस्कृतसेअरबी('१.०.०')).toBe('1.0.0');
            expect(संस्करणउपयोगिता.संस्कृतसेअरबी('२.३.४')).toBe('2.3.4');
        });
    });

    describe('अरबीसेसंस्कृत', () => {
        test('should convert Arabic numerals to Sanskrit numerals', () => {
            expect(संस्करणउपयोगिता.अरबीसेसंस्कृत('1.0.0')).toBe('१.०.०');
            expect(संस्करणउपयोगिता.अरबीसेसंस्कृत('2.3.4')).toBe('२.३.४');
        });
    });

    describe('तुलना', () => {
        test('should correctly compare versions', () => {
            expect(संस्करणउपयोगिता.तुलना('१.०.०', '१.०.०')).toBe(0);
            expect(संस्करणउपयोगिता.तुलना('२.०.०', '१.०.०')).toBeGreaterThan(0);
            expect(संस्करणउपयोगिता.तुलना('१.०.०', '१.१.०')).toBeLessThan(0);
        });
    });

    describe('संगतहै', () => {
        test('should check version compatibility', () => {
            expect(संस्करणउपयोगिता.संगतहै('२.०.०', '१.०.०')).toBe(true);
            expect(संस्करणउपयोगिता.संगतहै('१.०.०', '२.०.०')).toBe(false);
            expect(संस्करणउपयोगिता.संगतहै('१.१.०', '१.०.०')).toBe(true);
        });
    });

    describe('अगलासंस्करण', () => {
        test('should generate correct next version', () => {
            expect(संस्करणउपयोगिता.अगलासंस्करण('१.०.०', 'मुख्य')).toBe('२.०.०');
            expect(संस्करणउपयोगिता.अगलासंस्करण('१.०.०', 'गौण')).toBe('१.१.०');
            expect(संस्करणउपयोगिता.अगलासंस्करण('१.०.०', 'पैच')).toBe('१.०.१');
        });

        test('should reset lower version numbers', () => {
            expect(संस्करणउपयोगिता.अगलासंस्करण('१.२.३', 'मुख्य')).toBe('२.०.०');
            expect(संस्करणउपयोगिता.अगलासंस्करण('१.२.३', 'गौण')).toBe('१.३.०');
        });
    });

    describe('मान्यप्रारूप', () => {
        test('should validate version format', () => {
            expect(संस्करणउपयोगिता.मान्यप्रारूप('१.०.०')).toBe(true);
            expect(संस्करणउपयोगिता.मान्यप्रारूप('१.०')).toBe(false);
            expect(संस्करणउपयोगिता.मान्यप्रारूप('1.0.0')).toBe(false);
            expect(संस्करणउपयोगिता.मान्यप्रारूप('१.०.०.०')).toBe(false);
        });
    });
});