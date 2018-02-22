/**
 * GOAL: write an LRU cache using a hash map as a linked list
 */

const LRU = function(size) {
  this._maxSize = size;
  this._map = new Map();
  this._head = null;
  this._tail = null;

  this.size = () => {
    return this._map.size;
  };

  this.get = key => {
    const item = this._map.get(key);

    if (item) {
      this._dequeue(item);
      this._enqueue(item);
      return item.value;
    }
    return;
  };

  this.set = (key, value) => {
    const node = new Node(key, value);

    if (this._map.has(key)) {
      const existingNode = this._map.get(key);
      this._dequeue(existingNode);
    }

    this._enqueue(node);
    this._trimList();

    return value;
  };

  this._trimList = () => {
    if (this._map.size > this._maxSize) {
      this._dequeue(this._head);
    }
  };

  this._enqueue = node => {
    this._map.set(node.key, node);
    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      node.next = null;
      this._tail = node;
    }
    return node.value;
  };

  this._dequeue = node => {
    if (this._head === node) {
      const { next, key } = this._head;
      if (next) {
        this._head = next;
        this._head.prev = null;
      } else {
        this._head = null;
        this._tail = null;
      }
    } else {
      const { prev, next } = node;
      prev.next = next;
      next.prev = prev;
    }
    this._map.delete(node.key);
  };

  this.toString = () => {
    const itr = this._map.entries();
    const entries = [];
    for (let item of itr) {
      const [key, node] = item;
      const { value } = node;
      entries.push([key, value]);
    }
    return entries;
  };
};

const Node = function(key, value) {
  this.key = key;
  this.value = value;
};

module.exports = LRU;
