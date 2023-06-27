import LinkedList, { Node } from "../linkedList/LinkedList.js";
import defaultEqualsFn from "../../../utils/defaultEqualsFn.js";

export default class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEqualsFn) {
    super(equalsFn);
  }

  push(element) {
    const node = new Node(element);

    if (!this.head) this.head = node;
    else {
      const current = this.getElementAt(this.count - 1);
      current.next = node;
    }

    node.next = this.head;
    this.count++;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);

      if (index === 0) {
        if (!this.head) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = this.head;
          this.head = node;
          this.getElementAt(this.size()).next = node;
        }
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

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        if (this.size() === 1) this.head = undefined;
      else {
          const last = this.getElementAt(this.size() - 1);
          current = this.head;
          this.head = this.head.next;
          last.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }

      this.count--;
      return current.element;
    }

    return undefined;
  }
}
