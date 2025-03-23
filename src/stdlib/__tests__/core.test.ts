import { sanrachana, DataStructures, गणित } from '../core';

describe('Sanrachana (Data Structures)', () => {
  describe('Stoop (Stack)', () => {
    let stack: InstanceType<DataStructures['Stoop']>;

    beforeEach(() => {
      stack = new sanrachana.Stoop<number>();
    });

    test('should create an empty stack', () => {
      expect(stack.rikt()).toBe(true);
      expect(stack.lambai()).toBe(0);
    });

    test('should push and pop elements correctly', () => {
      stack.dhakk(1);
      stack.dhakk(2);
      expect(stack.lambai()).toBe(2);
      expect(stack.nikaal()).toBe(2);
      expect(stack.nikaal()).toBe(1);
      expect(stack.rikt()).toBe(true);
    });
  });

  describe('Pankti (Queue)', () => {
    let queue: InstanceType<DataStructures['Pankti']>;

    beforeEach(() => {
      queue = new sanrachana.Pankti<string>();
    });

    test('should create an empty queue', () => {
      expect(queue.rikt()).toBe(true);
      expect(queue.lambai()).toBe(0);
    });

    test('should enqueue and dequeue elements correctly', () => {
      queue.yojay('a');
      queue.yojay('b');
      expect(queue.lambai()).toBe(2);
      expect(queue.nishkas()).toBe('a');
      expect(queue.nishkas()).toBe('b');
      expect(queue.rikt()).toBe(true);
    });
  });

  describe('Shrinkhala (Linked List)', () => {
    let list: InstanceType<DataStructures['Shrinkhala']>;

    beforeEach(() => {
      list = new sanrachana.Shrinkhala<number>();
    });

    test('should create an empty list', () => {
      expect(list.rikt()).toBe(true);
      expect(list.lambai()).toBe(0);
    });

    test('should add and remove elements correctly', () => {
      list.yojay(1);
      list.yojay(2);
      list.adiyojay(0);
      expect(list.lambai()).toBe(3);
      expect(list.soochikaran()).toEqual([0, 1, 2]);
      expect(list.nikaal(1)).toBe(true);
      expect(list.soochikaran()).toEqual([0, 2]);
    });
  });

  describe('Vriksha (Tree)', () => {
    let tree: InstanceType<DataStructures['Vriksha']>;

    beforeEach(() => {
      tree = new sanrachana.Vriksha<number>();
    });

    test('should create an empty tree', () => {
      expect(tree.rikt()).toBe(true);
      expect(tree.lambai()).toBe(0);
    });

    test('should add nodes correctly', () => {
      tree.yojay(1);
      tree.yojay(2, 1);
      tree.yojay(3, 1);
      expect(tree.lambai()).toBe(3);
      expect(tree.khoj(2)).toBeTruthy();
      expect(tree.khoj(3)).toBeTruthy();
    });
  });

  describe('Kosh (Hash Table)', () => {
    let hashTable: InstanceType<DataStructures['Kosh']>;

    beforeEach(() => {
      hashTable = new sanrachana.Kosh<string, number>();
    });

    test('should handle basic operations', () => {
      hashTable.set("eka", 1);
      hashTable.set("dwi", 2);
      expect(hashTable.get("eka")).toBe(1);
      expect(hashTable.has("dwi")).toBe(true);
      expect(hashTable.size()).toBe(2);
      hashTable.delete("eka");
      expect(hashTable.has("eka")).toBe(false);
    });
  });

  describe('Dwayee (Binary Search Tree)', () => {
    let bst: InstanceType<DataStructures['Dwayee']>;

    beforeEach(() => {
      bst = new sanrachana.Dwayee<number>();
    });

    test('should maintain sorted order', () => {
      bst.yojay(5);
      bst.yojay(3);
      bst.yojay(7);
      bst.yojay(1);
      bst.yojay(9);
      expect(bst.kramit()).toEqual([1, 3, 5, 7, 9]);
    });

    test('should handle search operations', () => {
      bst.yojay(5);
      bst.yojay(3);
      bst.yojay(7);
      expect(bst.khoj(3)).toBe(true);
      expect(bst.khoj(6)).toBe(false);
    });

    test('should handle deletion', () => {
      bst.yojay(5);
      bst.yojay(3);
      bst.yojay(7);
      expect(bst.nikaal(3)).toBe(true);
      expect(bst.khoj(3)).toBe(false);
      expect(bst.kramit()).toEqual([5, 7]);
    });
  });

  describe('गणित (Mathematics)', () => {
    test('क्रमगुणन (Factorial)', () => {
      expect(गणित.क्रमगुणन(0)).toBe(1);
      expect(गणित.क्रमगुणन(5)).toBe(120);
      expect(() => गणित.क्रमगुणन(-1)).toThrow();
    });

    test('घात (Power)', () => {
      expect(गणित.घात(2, 3)).toBe(8);
      expect(गणित.घात(3, 2)).toBe(9);
      expect(गणित.घात(5, 0)).toBe(1);
    });

    test('मूल (Root)', () => {
      expect(गणित.मूल(16)).toBe(4);
      expect(गणित.मूल(27, 3)).toBe(3);
      expect(गणित.मूल(100, 2)).toBe(10);
    });

    test('द्विघात (Quadratic)', () => {
      const [x1, x2] = गणित.द्विघात(1, -5, 6);
      expect(x1).toBe(3);
      expect(x2).toBe(2);
    });

    test('आवृत्ति (Frequency)', () => {
      const data = [1, 2, 2, 3, 3, 3];
      const freq = गणित.आवृत्ति(data);
      expect(freq.get(1)).toBe(1);
      expect(freq.get(2)).toBe(2);
      expect(freq.get(3)).toBe(3);
    });

    test('माध्य और मध्यका (Mean and Median)', () => {
      const data = [1, 2, 3, 4, 5];
      expect(गणित.माध्य(data)).toBe(3);
      expect(गणित.मध्यका(data)).toBe(3);
      
      const evenData = [1, 2, 3, 4];
      expect(गणित.माध्य(evenData)).toBe(2.5);
      expect(गणित.मध्यका(evenData)).toBe(2.5);
    });

    test('विचलन (Standard Deviation)', () => {
      const data = [2, 4, 4, 4, 5, 5, 7, 9];
      expect(गणित.विचलन(data)).toBeCloseTo(2.0, 1);
    });
  });
});