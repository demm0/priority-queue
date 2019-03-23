const MaxHeap = require('./max-heap.js');

class PriorityQueue {
constructor(maxSize = 30) {
this.maxSize = maxSize;
this.heap = new MaxHeap();

}

push(data, priority) {
if(this.size() == this.maxSize) {
throw "";
}

this.heap.push(data, priority);

// if(this.items != 0) {
// for(let i = 0; i < this.items.length ; i++ ) {
// if(this.items[i][0] == priority)
// {
// this.items[i].push(data);
// return;
// }
// }
// }



// this.items.push([priority, data]);

}

shift() {
if(this.isEmpty()) {
throw "";
}
return this.heap.pop();
// let max_priority = -1;
// let index = -1;

// for(let i = 0; i < this.items.length; i++) {
// if(this.items[i][0] > max_priority) {
// max_priority = this.items[i][0];
// index = i;
// }
// }

// let element = this.items[index].splice(1, 1);

// if(this.items[index].length == 1) {
// this.items.splice(index, 1);
// }

// return element;	
}

size() {
return this.heap != null ? this.heap.size() : 0;
// let length = 0;

// if(this.items.length != 0) {
// for(let i = 0; i < this.items.length; i++) {
// length += this.items[i].length - 1;
// }
// }

// return length;
}

isEmpty() {
return this.size() == 0;	
}
}

module.exports = PriorityQueue;
