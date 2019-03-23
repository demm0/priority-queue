const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];	
	}


	size() {
		return this.countNodes(this.root, 0);
	}

	push(data, priority) {
		let pushedNode = new Node(data, priority); 
		this.insertNode(pushedNode);
		this.shiftNodeUp(pushedNode);

	}

	pop() {
		if(this.root == null) {
			return;
		}

		let removedNode = this.detachRoot();

		this.removeFromParentNodes(removedNode);
		
		return removedNode.data;
	}

	detachRoot() {
		let thisRoot = this.root;

		if(this.root != null) {
			let leftNode = this.root.left;
			let rightNode = this.root.right;

			if(leftNode == null && rightNode == null) {
				this.clear();
				return thisRoot;
			}

			if(leftNode == null) {
				rightNode.remove();
				this.root = rightNode;

				this.removeFromParentNodes(thisRoot);

				return thisRoot;
			} 

			if(rightNode == null || (rightNode.priority < leftNode.priority)) {
				leftNode.remove();
				this.root = leftNode;

				this.removeFromParentNodes(thisRoot);

				return thisRoot;
			}

			if(rightNode.priority > leftNode.priority) {
				leftNode.remove();
				rightNode.remove();
				this.root = rightNode;
				rightNode.left.remove();
				rightNode.appendChild(leftNode);

				this.removeFromParentNodes(thisRoot);
			}
		}
		
		return {};
	}

	restoreRootFromLastInsertedNode(detached) {
		let thisRoot = this.root;
		detached.appendChild(thisRoot);
		this.parentNodes.unshift(detached);
	}

	isEmpty() {
		return this.root == null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if(this.root == null) {
			this.root = node;
		}
		else {
			let parentNode = this.parentNodes[0]; ///
			parentNode.appendChild(node);

			if(parentNode.left != null && parentNode.right != null) {
				this.removeFromParentNodes(parentNode);
			}
		}
		
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if(node != null) {
			let parentNode = node.parent;
			
			if(parentNode != null && node.priority > parentNode.priority ) {
				
				if(this.parentNodes.length != 0) {
					let nodeIndex = this.parentNodes.findIndex(this.findNodeIndex, node);
					let parentNodeIndex = this.parentNodes.findIndex(this.findNodeIndex, parentNode);
					
					if(nodeIndex != -1) {
						this.parentNodes[nodeIndex] = parentNode;
					}
					
					if(parentNodeIndex != -1) {
						this.parentNodes[parentNodeIndex] = node;
					}
				}
				
				node.swapWithParent();

				if(this.root == parentNode) {
					this.root = node;	
				}

				this.shiftNodeUp(node);
			}
		}
	}

	shiftNodeDown(node) {
		if(node != null) {
			if((node.left != null && node.left.priority > node.priority ) || (node.right != null && node.right.priority > node.priority )) {
				let childNode = null;

				if(node.left == null) {
					childNode = node.right;
				} else if(node.right == null) {
					childNode = node.left;
				} else if(node.left.priority > node.right.priority) {
					childNode = node.left;
				} else {
					childNode = node.right;
				}

				if(this.parentNodes.length != 0) {
					let childNodeIndex = this.parentNodes.findIndex(this.findNodeIndex, childNode);
					let nodeIndex = this.parentNodes.findIndex(this.findNodeIndex, node);
					
					if(childNodeIndex != -1) {
						this.parentNodes[childNodeIndex] = node;
					}
					
					if(nodeIndex != -1) {
						this.parentNodes[nodeIndex] = childNode;
					}
				}

				if(this.root == node) {
					this.root = childNode;	
				}
				
				childNode.swapWithParent();
	
				this.shiftNodeDown(node);
			}
		}
	}

	findNodeIndex(element, index, array) {
		if(this.priority == element.priority && this.data == element.data){
			return true;
		} else {
			return false;
		}
	}

	countNodes(node, currentAmount) {
		if(node == null) {
			return currentAmount;
		}
		else {
			++currentAmount;
			
			if(node.left != null) {
				currentAmount += this.countNodes(node.left , currentAmount);
			}

			if(node.right != null) {
				currentAmount += this.countNodes(node.right , currentAmount);
			}

			return currentAmount;
		}
	}

	removeFromParentNodes(removedNode) {
		let removedIndex = this.parentNodes.findIndex(this.findNodeIndex,removedNode);
		if(removedIndex != -1) {
			this.parentNodes.splice(removedIndex, 1);
		}
	}
}

module.exports = MaxHeap;
