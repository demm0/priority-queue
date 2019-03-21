const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];	
	}

	push(data, priority) {
		this.insertNode(new Node(data, priority));
		this.shiftNodeUp(new Node(data, priority));
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		return this.size() == 0;
	}

	clear() {

	}

	insertNode(node) {
		if(this.root == null) {
			this.root = node;
		}
		else {
			let element = this.root;
			while(element != null) {
				if(element.left == null) {
					element.left = node;
					return;
				}
				else if(element.right == null) {
					element.right = node;
					return;
				}
				else {
					element = element.left;
				}
			}
		}
		
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;