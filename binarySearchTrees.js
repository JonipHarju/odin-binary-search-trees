const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }

  // holy fuck tää oli raivostuttavin asia ikinä
  buildTree(array, startPoint, endPoint) {
    if (startPoint > endPoint) return null;

    let mid = Math.floor((startPoint + endPoint) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array, startPoint, mid - 1);
    root.right = this.buildTree(array, mid + 1, endPoint);
    return root;
  }

  insert(value, root = this.root) {
    // if root  is null assign the value into the root
    if (root === null) {
      return (root = new Node(value));
    }
    // if value is larger than the data in the current root
    if (root.data < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    // prettyPrint(this.root);
    return root;
  }

  find(value, root = this.root) {
    if (root == null) return false;

    if (root.data === value) return root;

    if (root.data > value) {
      // call itself over and over again goin down the left side  becase we are looking for a value that is less than current data value
      return this.find(value, root.left);
    } else if (root.data < value) {
      return this.find(value, root.right);
    }

    return root;
  }
}
//  find the smallest value
function minValue(root) {
  let min = root.data;
  // while root has value run down the left side of the tree until the smallest value is found
  while (root != null) {
    min = root.data;
    root = root.left;
  }
  return min;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 44, 1599, 3939];

let newTree = new Tree(array);

newTree.insert(666);
newTree.insert(777);
newTree.insert(240);
newTree.insert(8); // hmmm
newTree.insert(12);
newTree.insert(6);
newTree.insert(6);
newTree.insert(6);

newTree.insert(3);
newTree.insert(0);

// newTree.delete(10);
console.log(newTree.find(8));
prettyPrint(newTree.root);
