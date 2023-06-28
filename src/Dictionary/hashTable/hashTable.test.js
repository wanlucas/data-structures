import 'mocha';
import { expect } from 'chai';
import HashTable from './HashTable.js';
import MyObj from '../../../utils/myObj.js';

describe('HashTable', () => {
  it('starts empty', () => {
    const hashTable = new HashTable();
    expect(hashTable.size()).to.equal(0);
    expect(hashTable.isEmpty()).to.equal(true);
  });

  it('generates hashcode', () => {
    let hashTable = new HashTable();
    expect(hashTable.hashCode(1)).to.equal(1);
    expect(hashTable.hashCode(10)).to.equal(10);
    expect(hashTable.hashCode(100)).to.equal(100);
    expect(hashTable.hashCode(1000)).to.equal(1000);
  
    hashTable = new HashTable();
    expect(hashTable.hashCode('1')).to.equal(12);
    expect(hashTable.hashCode('10')).to.equal(23);
    expect(hashTable.hashCode('100')).to.equal(34);
    expect(hashTable.hashCode('1000')).to.equal(8);
    expect(hashTable.hashCode('a')).to.equal(23);
    expect(hashTable.hashCode('A')).to.equal(28);
    expect(hashTable.hashCode('Aba')).to.equal(1);
  });

  it('puts undefined and null keys and values', () => {
    const hashTable = new HashTable();
    expect(hashTable.set('undefined', undefined)).to.equal(false);
    expect(hashTable.get('undefined')).to.equal(undefined);
    expect(hashTable.set('undefined', 1)).to.equal(true);
    expect(hashTable.get('undefined')).to.equal(1);
    expect(hashTable.set('null', null)).to.equal(false);
    expect(hashTable.get('null')).to.equal(undefined);
    expect(hashTable.set('null', 1)).to.equal(true);
    expect(hashTable.get('null')).to.equal(1);
    hashTable.clear();
    expect(hashTable.set(undefined, undefined)).to.equal(false);
    expect(hashTable.get(undefined)).to.equal(undefined);
    expect(hashTable.set(undefined, 1)).to.equal(false);
    expect(hashTable.get(undefined)).to.equal(undefined);
    expect(hashTable.set(null, null)).to.equal(false);
    expect(hashTable.get(null)).to.equal(undefined);
    expect(hashTable.set(null, 1)).to.equal(false);
    expect(hashTable.get(null)).to.equal(undefined);
  });

  it('puts values with number key', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTable();
    for (let i = min; i <= max; i++) {
      expect(hashTable.set(i, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size);
    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      expect(table[i].key).to.equal(i);
      expect(table[i].value).to.equal(i);
    }
  });

  it('puts values with string key', () => {
    const hashTable = new HashTable();
    expect(hashTable.set('1', 1)).to.equal(true);
    expect(hashTable.set('10', 10)).to.equal(true);
    expect(hashTable.set('100', 100)).to.equal(true);
    expect(hashTable.set('1000', 1000)).to.equal(true);
    const table = hashTable.getTable();
    expect(table[12].key).to.equal('1');
    expect(table[12].value).to.equal(1);
    expect(table[23].key).to.equal('10');
    expect(table[23].value).to.equal(10);
    expect(table[34].key).to.equal('100');
    expect(table[34].value).to.equal(100);
    expect(table[8].key).to.equal('1000');
    expect(table[8].value).to.equal(1000);
  });

  it('does NOT handle collision, replaces values', () => {
    const hashTable = new HashTable();
    for (let i = 0; i < 5; i++) {
      expect(hashTable.set(1, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(1);
  });

  it('removes elements', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTable();
    for (let i = min; i <= max; i++) {
      expect(hashTable.set(i, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size);
    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).to.equal(true);
    }

    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).to.equal(false);
    }
    expect(hashTable.isEmpty()).to.equal(true);
  });
});
