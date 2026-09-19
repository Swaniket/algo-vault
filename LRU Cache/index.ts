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
    return { value }
}

class LRUCache<K, V> {
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
        let node = this.lookup.get(key);

        // If it doesn't, we need to create & insert
        if (!node) {
            node = createNode(value)
            //  - Check the capacity, evict elements if over.
            this.prepend(node);
            this.trimCache();

            // Add the newly added node in the lookup and reverse lookup
            this.lookup.set(key, node)
            this.reverseLookup.set(node, key)
        } else {
            // If it does exists, we need to update to the front of the list and update the value
            this.detach(node)
            this.prepend(node)

            node.value = value;
        }
    }

    get(key: K): V | undefined {
        // Check if it exists in the cache
        const node = this.lookup.get(key);
        if (!node) return undefined;

        // Update the value we found and move it to the front (As it's now most recently used)
        this.detach(node) // Removed from LL, but still on lookup and reverseLookup
        this.prepend(node) // Adds the node to the front.  

        // Return out the value found or undefined if not exists
        return node.value
    }

    private detach(node: LRUNode<V>) {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev
        }

        node.prev = undefined;
        node.next = undefined;
    }

    private prepend(node: LRUNode<V>) {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head
        this.head.prev = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) return

        // Remove the tail
        const tail = this.tail as LRUNode<V>// Hold on to a ref of the tail
        this.detach(this.tail as LRUNode<V>)

        // Remove the tail from the lookup - Trim the cache
        const key = this.reverseLookup.get(tail) as K;

        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}