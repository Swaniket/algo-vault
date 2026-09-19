/**
 * Lets say we have the data stored like this:
 * v0 <-> v1 <-> v2 <-> v3 <-> v4 <-> ...
 * Now the user asks if we have v2, and we check and return the value for v2
 * So the updated structure becomes:
 * v2 (most recently used) <-> v0 <-> v1 <-> v3 <-> v4 <-> ... (least recently used)
 */

/**
 * Now looking at this example we can say that we want to store the data in terms of a doubly linked list
 * But the query will be based on a key, so we also need to have a key value pair.
 * So the ideal data sturcture should have the properties for both "doubly linked list" and "hashmap".
 * So the ideal data structure would be like
 * Hashmap<key, value>; where "key" is the query key and the value needs to be a "node in the linkedlist", so that we can instatly jump to that node.
 */

type LRUNode<T> = {
    value: T,
    next?: LRUNode<T>,
    prev?: LRUNode<T>
}

function createNode<V>(value: V): LRUNode<V> {
    return {value}
}

class LRUCache<K,V> {
    private length: number;
    private head?: LRUNode<V>
    private tail?: LRUNode<V>

    private lookup: Map<K, LRUNode<V>>; // This is our hashmap lookup 
    private reverseLookup: Map<LRUNode<V>, K>; // This will help to to get a key for the node

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, LRUNode<V>>();
        this.reverseLookup = new Map<LRUNode<V>, K>();
    }

    update(key: K, value: V): void {
        // Does it exists?

        // If it doesn't, we need to insert
        //  - Check the capacity, evict elements if over.
        // If it does exists, we need to update to the front of the list and update the value
    }

    get(key: K): V | undefined {
        // Check if it exists in the cache
        const node = this.lookup.get(key);
        if (!node) return undefined;

        // Update the value we found and move it to the front (As it's now most recently used)



        // Return out the value found or undefined if not exists
    }

    private detach(node: LRUNode<V>) {}

    private prepend(node: LRUNode<V>) {}
}