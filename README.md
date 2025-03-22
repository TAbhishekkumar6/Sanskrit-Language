# Sanskrit Programming Language

A Sanskrit-inspired programming language for web, Android, and iOS development. This language combines the elegance of Sanskrit with modern programming paradigms.

## Features

- Sanskrit-inspired syntax for better readability
- Built-in data structures with Sanskrit names
  - Stoop (Stack)
  - Pankti (Queue)
  - Shrinkhala (Linked List)
- TypeScript-based implementation
- Transpiles to JavaScript

## Installation

```bash
npm install samskrit
```

## Usage

### Basic Example

```typescript
import { SamskritCompiler } from 'samskrit';

const code = `
varga KriyaVinyasa {
  nijee soochi items;
  
  karya nirmata() {
    items = [];
  }
  
  sarvajanik karya dhakk(vastu) {
    items.yojay(vastu);
  }
}
`;

const compiler = new SamskritCompiler();
const jsCode = compiler.compile(code);
```

### Data Structures

1. Stack (Stoop):
```typescript
import { sanrachana } from 'samskrit';

const stack = new sanrachana.Stoop<number>();
stack.dhakk(1);      // push
stack.nikaal();      // pop
stack.rikt();        // isEmpty
stack.lambai();      // length
```

2. Queue (Pankti):
```typescript
const queue = new sanrachana.Pankti<string>();
queue.yojay('a');    // enqueue
queue.nishkas();     // dequeue
```

3. Linked List (Shrinkhala):
```typescript
const list = new sanrachana.Shrinkhala<number>();
list.yojay(1);       // add
list.adiyojay(0);    // addFirst
list.nikaal(1);      // remove
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/samskrit.git
cd samskrit
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details