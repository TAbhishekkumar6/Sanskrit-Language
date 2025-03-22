// Sanskrit Standard Library (Samskrit Manaka Pustakalaya)

// Error type for network operations
interface NetworkError extends Error {
  status?: number;
  response?: Response;
}

// Platform detection
export const platforma = {
  webAsti: () => typeof window !== 'undefined',
  mobileAsti: () => typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
  androidAsti: () => typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent),
  iosAsti: () => typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent)
};

// DOM Manipulation (Web Platform)
export const tattva = {
  // Get element by ID (प्राप्त - prapt)
  prapt: (id: string) => document.getElementById(id),

  // Create element (सृज् - srj)
  srj: (tag: string) => document.createElement(tag),

  // Set text content (लिख् - likh)
  likh: (element: HTMLElement, text: string) => {
    element.textContent = text;
    return element;
  },

  // Add child (योजय - yojay)
  yojay: (parent: HTMLElement, child: HTMLElement) => {
    parent.appendChild(child);
    return parent;
  },

  // Set style (रूप - roop)
  roop: (element: HTMLElement, styles: Record<string, string>) => {
    Object.assign(element.style, styles);
    return element;
  }
};

// Event Handling (घटना - ghatana)
export const ghatana = {
  // Add event listener (श्रू - shru)
  shru: (element: HTMLElement, event: string, handler: (e: Event) => void) => {
    element.addEventListener(event, handler);
    return element;
  }
};

// Mobile Platform Specific (चल - chal)
export const chalDrishya = {
  // Alert (सूचना - soochana)
  soochana: (sandesh: string) => {
    if (platforma.webAsti()) {
      alert(sandesh);
    } else {
      // For React Native implementation
      console.log('Mobile Alert:', sandesh);
    }
  },

  // Vibrate device (कम्प - kamp)
  kamp: (duration: number = 100) => {
    if (platforma.webAsti() && navigator.vibrate) {
      navigator.vibrate(duration);
    } else {
      // For React Native implementation
      console.log('Mobile Vibrate:', duration);
    }
  }
};

// Network Requests (जाल - jaal)
export const jaal = {
  // Fetch data (आहृ - aahr)
  aahr: async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`) as NetworkError;
        error.status = response.status;
        error.response = response;
        throw error;
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Network error: ${error.message}`);
      }
      throw new Error('An unknown network error occurred');
    }
  },

  // Post data (प्रेषय - preshay)
  preshay: async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`) as NetworkError;
        error.status = response.status;
        error.response = response;
        throw error;
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Network error: ${error.message}`);
      }
      throw new Error('An unknown network error occurred');
    }
  }
};

// Storage (संग्रह - sangrah)
export const sangrah = {
  // Local storage operations
  sthayi: {
    // Store (रक्ष - raksh)
    raksh: (key: string, value: any) => {
      if (platforma.webAsti()) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        // For React Native implementation
        console.log('Mobile Storage Save:', key, value);
      }
    },

    // Retrieve (स्मर - smar)
    smar: (key: string) => {
      if (platforma.webAsti()) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } else {
        // For React Native implementation
        console.log('Mobile Storage Retrieve:', key);
        return null;
      }
    }
  }
};

// Data Structures (संरचना - sanrachana)
class Granthi<T> {
  next: Granthi<T> | null = null;
  constructor(public data: T) {}
}

export interface DataStructures {
  Stoop: new<T>() => {
    dhakk(item: T): void;
    nikaal(): T | undefined;
    dekh(): T | undefined;
    rikt(): boolean;
    lambai(): number;
  };
  Pankti: new<T>() => {
    yojay(item: T): void;
    nishkas(): T | undefined;
    agra(): T | undefined;
    pasch(): T | undefined;
    rikt(): boolean;
    lambai(): number;
  };
  Shrinkhala: new<T>() => {
    yojay(data: T): void;
    adiyojay(data: T): void;
    nikaal(data: T): boolean;
    aadi(): T | undefined;
    ant(): T | undefined;
    rikt(): boolean;
    lambai(): number;
    soochikaran(): T[];
  };
}

export const sanrachana: DataStructures = {
  // Stack (स्तूप - stoop)
  Stoop: class<T> {
    #items: T[] = [];
    
    dhakk(item: T): void {
      this.#items.push(item);
    }
    
    nikaal(): T | undefined {
      return this.#items.pop();
    }
    
    dekh(): T | undefined {
      return this.#items[this.#items.length - 1];
    }
    
    rikt(): boolean {
      return this.#items.length === 0;
    }

    lambai(): number {
      return this.#items.length;
    }
  },

  // Queue (पंक्ति - pankti)
  Pankti: class<T> {
    #items: T[] = [];
    
    yojay(item: T): void {
      this.#items.push(item);
    }
    
    nishkas(): T | undefined {
      return this.#items.shift();
    }
    
    agra(): T | undefined {
      return this.#items[0];
    }
    
    pasch(): T | undefined {
      return this.#items[this.#items.length - 1];
    }
    
    rikt(): boolean {
      return this.#items.length === 0;
    }

    lambai(): number {
      return this.#items.length;
    }
  },

  // Linked List (श्रृंखला - shrinkhala)
  Shrinkhala: class<T> {
    #head: Granthi<T> | null = null;

    yojay(data: T): void {
      const node = new Granthi(data);
      if (!this.#head) {
        this.#head = node;
        return;
      }

      let current = this.#head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    adiyojay(data: T): void {
      const node = new Granthi(data);
      node.next = this.#head;
      this.#head = node;
    }
    
    nikaal(data: T): boolean {
      if (!this.#head) return false;

      if (this.#equals(this.#head.data, data)) {
        this.#head = this.#head.next;
        return true;
      }

      let current = this.#head;
      while (current.next) {
        if (this.#equals(current.next.data, data)) {
          current.next = current.next.next;
          return true;
        }
        current = current.next;
      }
      return false;
    }

    #equals(a: T, b: T): boolean {
      if (typeof a === 'object' && a !== null && 'equals' in a && typeof (a as any).equals === 'function') {
        return (a as any).equals(b);
      }
      return a === b;
    }

    aadi(): T | undefined {
      return this.#head?.data;
    }

    ant(): T | undefined {
      if (!this.#head) return undefined;
      
      let current = this.#head;
      while (current.next) {
        current = current.next;
      }
      return current.data;
    }

    rikt(): boolean {
      return this.#head === null;
    }

    lambai(): number {
      let count = 0;
      let current = this.#head;
      while (current) {
        count++;
        current = current.next;
      }
      return count;
    }

    soochikaran(): T[] {
      const result: T[] = [];
      let current = this.#head;
      while (current) {
        result.push(current.data);
        current = current.next;
      }
      return result;
    }
  }
};

// Algorithms (कलनविधि - kalanvidhi)
export const kalanvidhi = {
  // Sorting (क्रमण - kraman)
  kraman: {
    // Bubble Sort (बुद्बुद - budbud)
    budbud<T>(arr: T[]): T[] {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
      return arr;
    },
    
    // Quick Sort (द्रुत - drut)
    drut<T>(arr: T[]): T[] {
      if (arr.length <= 1) return arr;
      
      const pivot = arr[Math.floor(arr.length / 2)];
      const left = arr.filter(x => x < pivot);
      const middle = arr.filter(x => x === pivot);
      const right = arr.filter(x => x > pivot);
      
      return [...this.drut(left), ...middle, ...this.drut(right)];
    }
  },
  
  // Search (अन्वेषण - anveshan)
  anveshan: {
    // Binary Search (द्विभाज - dvibhaj)
    dvibhaj<T>(arr: T[], target: T): number {
      let left = 0;
      let right = arr.length - 1;
      
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
      }
      
      return -1;
    }
  }
};