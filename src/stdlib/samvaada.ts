// filepath: src/stdlib/samvaada.ts
// संवाद (samvaada) - Networking and communications

import { त्रुटि } from './core';
import * as http from 'http';
import * as https from 'https';
import * as net from 'net';
import * as dgram from 'dgram';
import * as ws from 'ws';
import { WebSocket } from 'ws';

export class संवादत्रुटि extends त्रुटि {
  constructor(संदेश: string) {
    super(संदेश);
    this.name = 'संवादत्रुटि';
  }
}

// HTTP Client (HTTP ग्राहक)
export const HTTPग्राहक = {
  // GET request
  async प्राप्त(url: string, विकल्प: http.RequestOptions = {}): Promise<{ डेटा: any; स्थिति: number }> {
    try {
      const client = url.startsWith('https') ? https : http;
      return new Promise((resolve, reject) => {
        const request = client.get(url, विकल्प, (response) => {
          let डेटा = '';
          response.on('data', (chunk) => डेटा += chunk);
          response.on('end', () => {
            try {
              resolve({
                डेटा: JSON.parse(डेटा),
                स्थिति: response.statusCode || 500
              });
            } catch {
              resolve({
                डेटा,
                स्थिति: response.statusCode || 500
              });
            }
          });
        });
        request.on('error', reject);
      });
    } catch (त्रुटि) {
      throw new संवादत्रुटि(`HTTP GET अनुरोध में त्रुटि: ${त्रुटि}`);
    }
  },

  // POST request
  async भेज(url: string, डेटा: any, विकल्प: http.RequestOptions = {}): Promise<{ डेटा: any; स्थिति: number }> {
    try {
      const client = url.startsWith('https') ? https : http;
      const डेटाString = JSON.stringify(डेटा);
      
      const डिफॉल्टविकल्प = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(डेटाString)
        }
      };

      return new Promise((resolve, reject) => {
        const request = client.request(url, { ...डिफॉल्टविकल्प, ...विकल्प }, (response) => {
          let प्रतिक्रिया = '';
          response.on('data', (chunk) => प्रतिक्रिया += chunk);
          response.on('end', () => {
            try {
              resolve({
                डेटा: JSON.parse(प्रतिक्रिया),
                स्थिति: response.statusCode || 500
              });
            } catch {
              resolve({
                डेटा: प्रतिक्रिया,
                स्थिति: response.statusCode || 500
              });
            }
          });
        });
        request.on('error', reject);
        request.write(डेटाString);
        request.end();
      });
    } catch (त्रुटि) {
      throw new संवादत्रुटि(`HTTP POST अनुरोध में त्रुटि: ${त्रुटि}`);
    }
  }
};

// HTTP Server (HTTP सर्वर)
export class HTTPसर्वर {
  private सर्वर: http.Server;
  
  constructor(मार्गनिर्देश: Record<string, (req: http.IncomingMessage, res: http.ServerResponse) => void>) {
    this.सर्वर = http.createServer((req, res) => {
      const मार्ग = req.url || '/';
      const हैंडलर = मार्गनिर्देश[मार्ग];
      
      if (हैंडलर) {
        try {
          हैंडलर(req, res);
        } catch (त्रुटि) {
          res.writeHead(500);
          res.end('Internal Server Error');
        }
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });
  }
  
  // Start server (प्रारंभ - prarambh)
  प्रारंभ(पोर्ट: number = 3000): Promise<void> {
    return new Promise((resolve, reject) => {
      this.सर्वर.listen(पोर्ट, () => resolve());
      this.सर्वर.on('error', reject);
    });
  }
  
  // Stop server (बंद - band)
  बंद(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.सर्वर.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

// WebSocket Client (WebSocket ग्राहक)
export class WebSocketग्राहक {
  private कनेक्शन: WebSocket | null = null;
  
  constructor(private url: string) {}
  
  // Connect (जुड़ें - juden)
  जुड़ें(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.कनेक्शन = new WebSocket(this.url);
        this.कनेक्शन!.on('open', () => resolve());
        this.कनेक्शन!.on('error', reject);
      } catch (त्रुटि) {
        reject(त्रुटि);
      }
    });
  }
  
  // Send message (भेजें - bhejen)
  भेजें(संदेश: string | Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.कनेक्शन) {
        reject(new संवादत्रुटि('WebSocket कनेक्शन नहीं है'));
        return;
      }
      
      this.कनेक्शन.send(संदेश, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
  
  // Listen for messages (सुनें - sunen)
  सुनें(कॉलबैक: (संदेश: string | Buffer) => void): void {
    if (!this.कनेक्शन) {
      throw new संवादत्रुटि('WebSocket कनेक्शन नहीं है');
    }
    
    this.कनेक्शन.on('message', कॉलबैक);
  }
  
  // Close connection (बंद - band)
  बंद(): Promise<void> {
    return new Promise((resolve) => {
      if (this.कनेक्शन) {
        this.कनेक्शन.close();
        this.कनेक्शन = null;
      }
      resolve();
    });
  }
}

// WebSocket Server (WebSocket सर्वर)
export class WebSocketसर्वर {
  private सर्वर: ws.Server;
  
  constructor(पोर्ट: number = 8080) {
    this.सर्वर = new ws.Server({ port: पोर्ट });
  }
  
  // On connection (कनेक्शनपर - connectionPar)
  कनेक्शनपर(कॉलबैक: (socket: ws) => void): void {
    this.सर्वर.on('connection', कॉलबैक);
  }
  
  // Close server (बंद - band)
  बंद(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.सर्वर.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

// TCP Client (TCP ग्राहक)
export class TCPग्राहक {
  private कनेक्शन: net.Socket | null = null;
  
  // Connect (जुड़ें - juden)
  जुड़ें(होस्ट: string, पोर्ट: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.कनेक्शन = new net.Socket();
      
      this.कनेक्शन.connect(पोर्ट, होस्ट, () => resolve());
      this.कनेक्शन.on('error', reject);
    });
  }
  
  // Send data (भेजें - bhejen)
  भेजें(डेटा: string | Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.कनेक्शन) {
        reject(new संवादत्रुटि('TCP कनेक्शन नहीं है'));
        return;
      }
      
      this.कनेक्शन.write(डेटा, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
  
  // Listen for data (सुनें - sunen)
  सुनें(कॉलबैक: (डेटा: Buffer) => void): void {
    if (!this.कनेक्शन) {
      throw new संवादत्रुटि('TCP कनेक्शन नहीं है');
    }
    
    this.कनेक्शन.on('data', कॉलबैक);
  }
  
  // Close connection (बंद - band)
  बंद(): Promise<void> {
    return new Promise((resolve) => {
      if (this.कनेक्शन) {
        this.कनेक्शन.end();
        this.कनेक्शन = null;
      }
      resolve();
    });
  }
}

// UDP Client (UDP ग्राहक)
export class UDPग्राहक {
  private सॉकेट: dgram.Socket;
  
  constructor() {
    this.सॉकेट = dgram.createSocket('udp4');
  }
  
  // Send message (भेजें - bhejen)
  भेजें(संदेश: string | Buffer, पोर्ट: number, होस्ट: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const बफर = Buffer.isBuffer(संदेश) ? संदेश : Buffer.from(संदेश);
      
      this.सॉकेट.send(बफर, पोर्ट, होस्ट, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
  
  // Listen for messages (सुनें - sunen)
  सुनें(कॉलबैक: (संदेश: Buffer) => void): void {
    this.सॉकेट.on('message', कॉलबैक);
  }
  
  // Close socket (बंद - band)
  बंद(): void {
    this.सॉकेट.close();
  }
}

// UDP Server (UDP सर्वर)
export class UDPसर्वर {
  private सर्वर: dgram.Socket;
  
  constructor() {
    this.सर्वर = dgram.createSocket('udp4');
  }
  
  // Start listening (सुनें - sunen)
  सुनें(पोर्ट: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.सर्वर.on('error', reject);
      this.सर्वर.bind(पोर्ट, () => resolve());
    });
  }
  
  // On message (संदेशपर - sandeshPar)
  संदेशपर(कॉलबैक: (संदेश: Buffer) => void): void {
    this.सर्वर.on('message', कॉलबैक);
  }
  
  // Close server (बंद - band)
  बंद(): void {
    this.सर्वर.close();
  }
}