class Queue<T> { 
    items: T[];

    constructor(){ this.items = []; } 
    
    IsEmpty: () => boolean = () => this.items.length == 0;

    Enqueue(element: T): void {
        this.items.push(element); 
    } 

    Dequeue(): T | null {
        if (this.IsEmpty()) return null; 
        const r = this.items.shift()
        return r? r: null;  
    } 

    Front(): T | null {  
        if (this.IsEmpty()) return null; 
        return this.items[0]; 
    } 

    Rear(): T | null { 
        if (this.IsEmpty()) return null; 
        return this.items[this.items.length - 1]; 
    } 

    Clear(): void {
        this.items = [];
    }

    toString(): string{ 
        var str = `[\n`; 
        for (var i = 0; i < this.items.length; i++) 
            str += `{Elem: ${this.items[i]}},\n`; 
        return str+"\n]"; 
    } 
} 

export default PriorityQueue;