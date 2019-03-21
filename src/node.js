class Node {
	constructor(data, priority) {
		this.parent = null;
		this.left = null;
		this.right = null;
		this.data = data;
		this.priority = priority;
	}

	appendChild(node) {
		if(node == null) {
			return;
		}

		if(this.left == null) {
			this.left = node;
			node.parent = this;
		}
		else if(this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(node == null) {
			return;
		}

		if(this.left != null && this.left.priority == node.priority && this.left.data == node.data) {
			this.left.parent = null;
			this.left = null;
		} else if(this.right != null && this.right.priority == node.priority && this.right.data == node.data) {
			this.right.parent = null;
			this.right = null;
		}
		else {
			throw "";
		}

	}

	remove() {
		if(this.parent != null) {
			this.parent.removeChild(new Node(this.data, this.priority));
		}
		
	}

	swapWithParent() {
		if(this.parent == null) {
			return;
		}

		let leftNode = this.left;
		let rightNode = this.right;
		let parentNode = this.parent;

		let parentLeftNode = this.parent.left;
		let parentRightNode = this.parent.right;
		let parentParentNode = this.parent.parent;

		parentNode.removeChild(parentLeftNode);
		parentNode.removeChild(parentRightNode);
		
		if(parentParentNode != null)
		{
			parentParentNode.removeChild(parentNode);	
		}

		this.removeChild(leftNode);
		this.removeChild(rightNode);
		
		parentNode.appendChild(leftNode);
		parentNode.appendChild(rightNode);

		if(parentParentNode != null)
		{
			parentParentNode.appendChild(this);
		}

		if(parentLeftNode == this)
		{
			this.appendChild(parentNode);
			this.appendChild(parentRightNode);	
		}
		else
		{
			this.appendChild(parentLeftNode);
			this.appendChild(parentNode);
		}
	}
}

module.exports = Node;