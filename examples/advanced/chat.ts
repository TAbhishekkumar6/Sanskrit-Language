// वार्तालाप अनुप्रयोग (Chat Application)
import { WebSocketसर्वर, WebSocketग्राहक } from '../../src/stdlib/samvaada';
import { एन्क्रिप्शन } from '../../src/stdlib/surakshaa';

// ---------------- Devanagari Version ----------------
class वार्तालापसर्वर {
    private सर्वर: WebSocketसर्वर;
    private ग्राहकसूची: Set<WebSocketग्राहक>;
    private एन्क्रिप्टर: एन्क्रिप्शन;

    constructor(पोर्ट: number = 8080) {
        this.सर्वर = new WebSocketसर्वर(पोर्ट);
        this.ग्राहकसूची = new Set();
        this.एन्क्रिप्टर = new एन्क्रिप्शन(process.env.ENCRYPTION_KEY || 'default-key');
        
        // Handle new connections
        this.सर्वर.कनेक्शनपर(this.नयाग्राहक.bind(this));
    }

    private async नयाग्राहक(ग्राहक: WebSocketग्राहक) {
        this.ग्राहकसूची.add(ग्राहक);
        console.log("नया ग्राहक जुड़ा");

        // Handle messages
        ग्राहक.सुनें(async (संदेश: string | Buffer) => {
            try {
                // Encrypt message before broadcasting
                const एन्क्रिप्टेडडेटा = this.एन्क्रिप्टर.एन्क्रिप्ट(
                    Buffer.isBuffer(संदेश) ? संदेश : Buffer.from(संदेश)
                );
                const एन्क्रिप्टेडस्ट्रिंग = JSON.stringify(एन्क्रिप्टेडडेटा);
                
                // Broadcast to all clients except sender
                for (const अन्यग्राहक of this.ग्राहकसूची) {
                    if (अन्यग्राहक !== ग्राहक) {
                        const एन्क्रिप्टेडऑब्जेक्ट = JSON.parse(एन्क्रिप्टेडस्ट्रिंग);
                        const मूलसंदेश = this.एन्क्रिप्टर.डिक्रिप्ट(
                            एन्क्रिप्टेडऑब्जेक्ट.एन्क्रिप्टेड,
                            एन्क्रिप्टेडऑब्जेक्ट.iv,
                            एन्क्रिप्टेडऑब्जेक्ट.टैग
                        );
                        await अन्यग्राहक.भेजें(मूलसंदेश);
                    }
                }
            } catch (त्रुटि) {
                console.error("संदेश प्रसारण त्रुटि:", त्रुटि);
            }
        });

        // Handle disconnection
        ग्राहक.बंद().catch(त्रुटि => {
            console.error("ग्राहक डिस्कनेक्ट त्रुटि:", त्रुटि);
        });
        this.ग्राहकसूची.delete(ग्राहक);
        console.log("ग्राहक डिस्कनेक्ट हुआ");
    }

    async बंद(): Promise<void> {
        await this.सर्वर.बंद();
    }
}

// ---------------- Romanized Version ----------------
class VartalapServer {
    private server: WebSocketसर्वर;
    private grahakaSet: Set<WebSocketग्राहक>;
    private encryptor: एन्क्रिप्शन;

    constructor(port: number = 8080) {
        this.server = new WebSocketसर्वर(port);
        this.grahakaSet = new Set();
        this.encryptor = new एन्क्रिप्शन(process.env.ENCRYPTION_KEY || 'default-key');
        
        this.server.कनेक्शनपर(this.nayaGrahak.bind(this));
    }

    private async nayaGrahak(grahak: WebSocketग्राहक) {
        this.grahakaSet.add(grahak);
        console.log("New client connected");

        grahak.सुनें(async (sandesh: string | Buffer) => {
            try {
                const encryptedData = this.encryptor.एन्क्रिप्ट(
                    Buffer.isBuffer(sandesh) ? sandesh : Buffer.from(sandesh)
                );
                const encryptedString = JSON.stringify(encryptedData);
                
                for (const anyaGrahak of this.grahakaSet) {
                    if (anyaGrahak !== grahak) {
                        const encryptedObject = JSON.parse(encryptedString);
                        const moolSandesh = this.encryptor.डिक्रिप्ट(
                            encryptedObject.एन्क्रिप्टेड,
                            encryptedObject.iv,
                            encryptedObject.टैग
                        );
                        await anyaGrahak.भेजें(moolSandesh);
                    }
                }
            } catch (truti) {
                console.error("Message broadcast error:", truti);
            }
        });

        // Handle disconnection
        grahak.बंद().catch(truti => {
            console.error("Client disconnect error:", truti);
        });
        this.grahakaSet.delete(grahak);
        console.log("Client disconnected");
    }

    async band(): Promise<void> {
        await this.server.बंद();
    }
}

// ---------------- Usage Examples ----------------
async function मुख्य() {
    // Start server
    const सर्वर = new वार्तालापसर्वर(8080);
    console.log("सर्वर शुरू हुआ पोर्ट 8080 पर");

    // Handle server shutdown
    process.on('SIGINT', async () => {
        await सर्वर.बंद();
        process.exit(0);
    });
}

async function main() {
    // Start server
    const server = new VartalapServer(8080);
    console.log("Server started on port 8080");

    // Handle server shutdown
    process.on('SIGINT', async () => {
        await server.band();
        process.exit(0);
    });
}

// Run both versions (choose one based on preference)
मुख्य().catch(console.error);
// main().catch(console.error);

/* 
Explanation of Sanskrit Terms:
----------------------------
वार्तालाप/Vartalap - Chat/Conversation
सर्वर/Server - Server
ग्राहक/Grahak - Client
संदेश/Sandesh - Message
गुप्त/Gupt - Encrypted
मूल/Mool - Original
बंद/Band - Close/Stop

Connection Terms:
---------------
कनेक्शन/Connection - Connection
जुड़ा/Juda - Connected
डिस्कनेक्ट/Disconnect - Disconnected
पोर्ट/Port - Port number
*/ 