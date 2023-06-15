import LinkedList, { Node } from "../linkedList/LinkedList.js";
import defaultEqualsFn from "../../../utils/defaultEqualsFn.js";

export class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

export default class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEqualsFn) {
    super(equalsFn);
    this.tail = undefined;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let node;

      if (index === 0) node = this.head;
      else if (index === this.count - 1) node = this.tail;
      else if (index > Math.floor(this.count / 2)) {
        let current = this.tail;

        for (let i = this.count - 1; i > index; i--) {
          current = current.prev;
        }

        node = current;
      } else node = super.getElementAt(index);
      
      return node;
    }

    return undefined;
  }

  push(element) {
    const node = new DoublyNode(element);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.count++;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);

      if (index === 0) {
        if (this.head) {
          node.next = this.head;
          this.head.prev = node;
          this.head = node; 
        } else {
          this.head = node;
          this.tail = node;
        }
      } else if (index === this.count) {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;

        current.prev = node;
        previous.next = node;
        node.next = current;
        node.prev = previous;
      }

      this.count++;
      return true;
    }

    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        current = this.head;
        this.head = current.next;
    
        if (this.count === 1) {
          this.tail = undefined;
        } else this.head.prev = undefined;
      } else if (index === this.count - 1) {
        current = this.tail;
        const previous = current.prev;

        previous.next = undefined;
        this.tail = previous;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;

        current.next.prev = previous;
        previous.next = current.next;
      }

      this.count--;
      return current.element;
    }

    return undefined;
  }
}