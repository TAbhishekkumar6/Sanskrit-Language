// Sanskrit version number utilities
const संस्कृतअंक = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const अरबीअंक = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export class संस्करणउपयोगिता {
    // Convert Sanskrit numerals to Arabic numerals
    static संस्कृतसेअरबी(संस्कृत: string): string {
        let अरबी = संस्कृत;
        for (let i = 0; i < संस्कृतअंक.length; i++) {
            const regex = new RegExp(संस्कृतअंक[i], 'g');
            अरबी = अरबी.replace(regex, अरबीअंक[i]);
        }
        return अरबी;
    }

    // Convert Arabic numerals to Sanskrit numerals
    static अरबीसेसंस्कृत(अरबी: string): string {
        let संस्कृत = अरबी;
        for (let i = 0; i < अरबीअंक.length; i++) {
            const regex = new RegExp(अरबीअंक[i], 'g');
            संस्कृत = संस्कृत.replace(regex, संस्कृतअंक[i]);
        }
        return संस्कृत;
    }

    // Compare two version numbers
    static तुलना(व१: string, व२: string): number {
        const [मुख्य१, गौण१, पैच१] = this.संस्कृतसेअरबी(व१).split('.').map(Number);
        const [मुख्य२, गौण२, पैच२] = this.संस्कृतसेअरबी(व२).split('.').map(Number);

        if (मुख्य१ !== मुख्य२) return मुख्य१ - मुख्य२;
        if (गौण१ !== गौण२) return गौण१ - गौण२;
        return पैच१ - पैच२;
    }

    // Check if version is compatible (satisfies minimum version requirement)
    static संगतहै(वर्तमान: string, न्यूनतम: string): boolean {
        return this.तुलना(वर्तमान, न्यूनतम) >= 0;
    }

    // Generate next version number based on update type
    static अगलासंस्करण(वर्तमान: string, प्रकार: 'मुख्य' | 'गौण' | 'पैच'): string {
        const [मुख्य, गौण, पैच] = this.संस्कृतसेअरबी(वर्तमान).split('.').map(Number);

        let नयामुख्य = मुख्य;
        let नयागौण = गौण;
        let नयापैच = पैच;

        switch (प्रकार) {
            case 'मुख्य':
                नयामुख्य++;
                नयागौण = 0;
                नयापैच = 0;
                break;
            case 'गौण':
                नयागौण++;
                नयापैच = 0;
                break;
            case 'पैच':
                नयापैच++;
                break;
        }

        return this.अरबीसेसंस्कृत(`${नयामुख्य}.${नयागौण}.${नयापैच}`);
    }

    // Validate version format
    static मान्यप्रारूप(संस्करण: string): boolean {
        return /^[१२३४५६७८९०]+\.[१२३४५६७८९०]+\.[१२३४५६७८९०]+$/.test(संस्करण);
    }
}