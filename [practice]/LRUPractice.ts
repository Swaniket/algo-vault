type LRUNode<T> = {
    value: T,
    next?: LRUNode<T>,
    prev?: LRUNode<T>
}

function createNode<V>(value: V): LRUNode<V> {
    return { value }
}

class LRUCache<K,V> {
    private length: number;
    private head?: LRUNode<V>
    private tail?: LRUNode<V>

    private lookup: Map<K, LRUNode<V>>;
    private reverseLookup: Map<LRUNode<V>, K>

    constructor(private capacity: number = 10) {
        this.length = 0
        this.head = this.tail = undefined;
        this.lookup = new Map<K, LRUNode<V>>()
        this.reverseLookup = new Map<LRUNode<V>, K>()
    }

    // Exposed functions
    update(key: K, value: V): void {
        // Check if the node exists in the lookup
        let node = this.lookup.get(key)

        if(!node) {
            // If node doesn't exists, create it, and prepend
            node = createNode(value)

            this.prepend(node)
            this.trimCache()

            // Set the lookup and reverse lookup
            this.lookup.set(key, node)
            this.reverseLookup.set(node, key)
        } else {
            // If the node exists, move it to the front & update with the given value
            this.detach(node)
            this.prepend(node)

            node.value = value
        }
    }

    get(key: K): V | number {
        // Check if the node exists in the lookup
        const node = this.lookup.get(key)

        if (!node) return -1

        this.detach(node)
        this.prepend(node)

        return node.value
    }

    // Helpers
    private detach(node: LRUNode<V>) {
        // If the node is in the middle
        if(node.next) {
            node.next.prev = node.prev
        }

        if (node.prev) {
            node.prev.next = node.next
        }

        // When the node is at the head / tail
        if(this.head === node) {
            this.head = this.head.next
        }

        if(this.tail === node) {
            this.tail = this.tail.prev
        }

        // Removing the head and tail pointers
        node.next = undefined
        node.prev = undefined
    }

    private prepend(node: LRUNode<V>) {
        // When there is no head
        if(this.head === undefined) {
            this.head = this.tail = node
        }

        node.next = this.head
        this.head.prev = node
        this.head = node;

    }

    private trimCache() {
        if (this.length <= this.capacity) return

        // Remove the tail
        const tail = this.tail as LRUNode<V> // Hold on to the ref of the tail
        this.detach(this.tail as LRUNode<V>)

        // Remove the tail from the lookup; for that we need the key from lookup
        const keyOfTail = this.reverseLookup.get(tail) as K;

        this.lookup.delete(keyOfTail)
        this.reverseLookup.delete(tail)
        this.length--;
    }
}