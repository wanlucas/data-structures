export class ValuePair {
  constructor (key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[${this.key}: ${this.value}]`
  }
}

export default class Dictionary {
  constructor() {
    this.table = {};
  }

  hasKey(key) {
    return Boolean(this.table[key]);
  }

  keyValues() {
    return Object.values(this.table);
  }

  keys() {
    return this.keyValues().map(({ key }) => key);
  }

  values() {
    return this.keyValues().map(({ value }) => value);
  }

  size() {
    return this.keyValues().length;
  }

  isEmpty() {
    return !this.size();
  }

  clear() {
    this.table = {};
  }
  
  set(key, value) {
    if (key && value) {
      const valuePair = new ValuePair(key, value);
      this.table[key] = valuePair;

      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[key];
      return true;
    }

    return false;
  }

  get(key) {
    if (this.hasKey(key)) {
      return this.table[key].value;
    }

    return undefined;
  }

  forEach(callback) {
    const valuePairs = this.keyValues();

    for (let i = 0; i < valuePairs.length; i++) {
      const valuePair = valuePairs[i];
      const result = callback(valuePair.key, valuePair.value,  i);

      if (result === false) break;
    }
  }
}