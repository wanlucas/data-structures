import defaultEqualsFn from "../../utils/defaultEqualsFn.js";

export class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

export default class linkedList {
  constructor(equalsFn = defaultEqualsFn) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  getHead() {
    return this.head;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;

      for (let i = 0; i < index && current.next; i++) {
        current = current.next;
      }

      return current;
    }

    return undefined;
  }

  push(element) {
    const node = new Node(element);

    if (!this.head) this.head = node;
    else {
      let current = this.head;

      while(current.next) current = current.next;
      current.next = node;
    }

    this.count++;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
        
      }

      this.count++;
      return true;
    }

    return false;
  }
}