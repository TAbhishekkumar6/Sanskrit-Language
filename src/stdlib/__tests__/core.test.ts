import { sanrachana, DataStructures } from '../core';

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
});