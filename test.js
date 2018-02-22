const assert = require("assert");
const LRU = require("./index");

describe("LRU cache", () => {
  it("should return the size of the cache", () => {
    const myLRU = new LRU(1);
    assert.equal(0, myLRU.size());
  });
  it("should add an item to the cache", () => {
    const myLRU = new LRU(1);
    myLRU.set("a", "a1");
    assert.equal(1, myLRU.size());
  });
  it("should retrieve an item from the cache", () => {
    const myLRU = new LRU(1);
    myLRU.set("a", "a1");
    assert.equal("a1", myLRU.get("a"));
  });
  it("should limit the number of items in the cache", () => {
    const myLRU = new LRU(1);
    myLRU.set("a", "a1");
    myLRU.set("b", "b1");
    assert.equal(1, myLRU.size());
  });
  it("should not eliminate an item that has been recently retrieved from the cache", () => {
    const myLRU = new LRU(2);
    myLRU.set("a", "a1");
    myLRU.set("b", "b1");
    myLRU.get("a");
    myLRU.set("c", "c1");
    assert.equal("a1", myLRU.get("a"));
  });
  it("should eliminate an item that has not been recently retrieved from the cache", () => {
    const myLRU = new LRU(1);
    myLRU.set("a", "a1");
    myLRU.set("b", "b1");
    assert.equal(undefined, myLRU.get("a"));
  });
  it("should work on larger scales", () => {
    const myLRU = new LRU(10);
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"].forEach(
      (item, index) => myLRU.set(item, `${item}${index}`)
    );
    assert.equal(10, myLRU.size());

    myLRU.get("c");
    myLRU.set("should remove head", "which is b");
    assert.equal("c2", myLRU.get("c"));
    assert.equal(undefined, myLRU.get("b"));
  });
  it("should return a string representation of the queue", () => {
    const myLRU = new LRU(2);
    myLRU.set("a", "a1");
    myLRU.set("b", "b1");
    assert.deepEqual([["a", "a1"], ["b", "b1"]], myLRU.toString());
  });
});
