import Dictionary, { ValuePair } from "../dictionary/Dictionary.js";

export default class HashTable extends Dictionary {
  constructor() {
    super();
  }

  hashCode(key) {
    if (typeof key !== 'number') {
      let hash = 0;
      
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }

      return hash % 37;
    };

    return key;
  }

  set(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);

      this.table[position] = new ValuePair(key, value);
      return true;
    }

    return false;
  }

  get(key) {
    if (key != undefined) {
      const hash = this.hashCode(key);

      if (this.table[hash]) {
      return this.table[hash].value;
      }
    }

    return undefined;
  }

  remove(key) {
    if (key != null) {
      const hash = this.hashCode(key);
      const value = this.table[hash];

      if (value != null) {
        delete this.table[hash];
        return true;
      }
    }

    return false;
  }
}