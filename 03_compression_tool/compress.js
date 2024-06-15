const fs = require('fs');
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.frequency = 1;
  }
}

class LetterTree {
  constructor() {
    this.root = null;
    this.d = 0;
    this.lines = 0;
    this.table = [];
  }
  insert(data) {
    var newNode = new Node(data);
    if(this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if(newNode.value == node.value) {
      node.frequency += 1;
    } else if(newNode.value < node.value) {
      if(node.left === null) {
        node.left = newNode;
      }
      else {
        this.insertNode(node.left, newNode);
      }
    }
    else {
      if(node.right === null) {
        node.right = newNode;
      }
      else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  depth(node) {
    if(!node.left) {
      if(node.right){
        this.d += 1;
        this.depth(node.right);
      }
    }
    if(!node.right) {
      if(node.left){
        this.d += 1;
        this.depth(node.left);
      }
    }
    if(node.left || node.right) {
      this.d += 1;
      this.depth(node.left);
    }
    return this.d;
  }

  preorder(node) {
    if(node !== null) {
      if (this.lines == 0) {
        //console.log("  letter | frequency");
      }
      this.lines = this.lines + 1;
      if (this.lines >=20) {
        this.lines = 0;
      }
      //console.log('   ', node.value, "   |   ", node.frequency);
      this.table.push({letter: node.value, value: node.frequency});
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }
  nodeTable(node) {
    let sorted = this.table.sort((a,b) => a.value - b.value);
    return this.table;
  }
}

class huffBaseNode {
    constructor(value=null, l=null, r=null) {
        this.value = value;
        this.left = l;
        this.right = r;
    }
    weight() {}
    isLeaf() {}
}

class huffTree {
    constructor(data) {
        this.data = data;
        this.root = null;
    }
    compare(a, b) {
        if(a <= b) {
            return 1;
        }
        return 0;
    }
    buildTree(data) {
        if(data.length <=1) return;
        let tmp1 = data.shift();
        let tmp2 = data.shift();
        let tmp = tmp1.value + tmp2.value;
        this.root = new huffBaseNode(tmp, tmp1, tmp2);
        data.push(this.root);
        data.sort((a,b) => a.value - b.value);
        if (this.compare(tmp1.value, tmp2.value)) {
            this.root.left = tmp1;
            this.root.right = tmp2;
        } else {
            this.root.left = tmp2;
            this.root.right = tmp1;
        }
        this.buildTree(data);
    }
    weight() {
        return this.root;
    }

}
const file = process.argv[2];
try {
  if (fs.existsSync( file )) {
    // IF FILE EXISTS
    console.log("File exists.");
  } else {
    // IF FILE DOESN'T EXISTS
    console.log("Your input is invalid");
    return;
    process.exit();
  }
} catch(err) {
  console.error(err);
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const dataArray = data.split("");
  //var charFrequency
  let lTree = new LetterTree();
  dataArray.forEach(letter => {
    lTree.insert(letter);
    //console.log("frequency ", lTree.preorder(lTree.root));
  })
  lTree.preorder(lTree.root);
  let treeData = lTree.nodeTable(lTree.root);
  let huff = new huffTree(treeData);
  huff.buildTree(treeData);
  console.log(huff.weight());
});
