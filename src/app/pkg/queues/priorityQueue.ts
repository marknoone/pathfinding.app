// Modified from: https://www.geeksforgeeks.org/implementation-priority-queue-javascript/

class QElement<T> { 
    element: T
    priority: number

    constructor(element: T, priority: number) 
    { 
        this.element = element; 
        this.priority = priority; 
    } 
} 
  

class PriorityQueue<T> { 
    items: QElement<T>[];

    constructor(){ this.items = []; } 
    
    IsEmpty: () => boolean = () => this.items.length == 0;

    Enqueue(element: T, priority: number): void {
        let qElement = new QElement(element, priority);
        for (var i = 0; i < this.items.length; i++) { 
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                return 
            } 
        } 
    
        this.items.push(qElement); 
    } 

    Dequeue(): T | null {
        if (this.IsEmpty()) return null; 
        const r = this.items.shift()
        return r? r.element: null; 
    } 

    Front(): T | null {  
        if (this.IsEmpty()) return null; 
        return this.items[0].element; 
    } 

    Rear(): T | null { 
        if (this.IsEmpty()) return null; 
        return this.items[this.items.length - 1].element; 
    } 

    Clear(): void {
        this.items = [];
    }

    toString(): string{ 
        var str = `[\n`; 
        for (var i = 0; i < this.items.length; i++) 
            str += `{Elem: ${this.items[i].element}, Priority: ${this.items[i].priority}},\n`; 
        return str+"\n]"; 
    } 
} 

export default PriorityQueue;