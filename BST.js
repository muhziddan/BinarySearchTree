class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        const newNode = new Node(value)

        if (!this.root) {
            this.root = newNode
            // return this
        } else {
            let currentNode = this.root

            while (true) {
                if (value > currentNode.value) {
                    if (!currentNode.right) {
                        currentNode.right = newNode
                        return this
                    }
                    currentNode = currentNode.right
                } else if (value < currentNode.value) {
                    if (!currentNode.left) {
                        currentNode.left = newNode
                        return this
                    }
                    currentNode = currentNode.left
                } else {
                    return 'Cannot add same number'
                }
            }
        }
        return this
    }
    

    lookUp(value) {
        if (!this.root) {
            return false
        } else {
            let currentNode = this.root

            while(currentNode) {
                if (currentNode.value === value) {
                    return true
                } else if (value > currentNode.value) {
                    currentNode = currentNode.right
                } else {
                    currentNode = currentNode.left
                }
            }
        }
        return false
    }

    remove(value) {
        if (!this.root) {
            return 'empty'
        } else if (this.root.value === value) {
            const childCount = this.childChecker(this.root)

            switch(childCount) {
                case 0:
                    this.root = null
                    break
                case 1:
                    const replaceNode = this.bypass(this.root)
                    this.root = replaceNode
                    break
                case 2:
                    const successorNode = this.succesor(this.root)
                    const otherNode = this.root.left
                    const successorParent = this.succesorParent(this.root)

                    if (this.root.right.value != successorNode.value) {
                        if (successorNode.right) {
                            const succesorChild =  successorNode.right
                            successorParent.left = succesorChild
                        } else {
                            successorParent.left = null
                        }
                        successorNode.right = this.root.right
                    }

                    successorNode.left = otherNode
                    this.root = successorNode
                    break
            }
            return this
        } else {
            let leadNode = this.root

            while(true) {
                if (leadNode.right && leadNode.right.value === value) {
                    let currentNode = leadNode.right
                    const childCount = this.childChecker(currentNode)

                    switch(childCount) {
                        case 0:
                            leadNode.right = null
                            break
                        case 1:
                            const replaceNode = this.bypass(currentNode)
                            leadNode.right = replaceNode
                            break
                        case 2:
                            const successorNode = this.succesor(currentNode)
                            const otherNode = currentNode.left
                            const successorParent = this.succesorParent(currentNode)

                            if (currentNode.right.value != successorNode.value) {
                                if (successorNode.right) {
                                    const succesorChild =  successorNode.right
                                    successorParent.left = succesorChild
                                } else {
                                    successorParent.left = null
                                }
                                successorNode.right = currentNode.right
                            }

                            successorNode.left = otherNode
                            leadNode.right = successorNode
                            break
                    }
                    return this
                } else if (leadNode.left && leadNode.left.value === value) {
                    let currentNode = leadNode.left
                    const childCount = this.childChecker(currentNode)
                    
                    switch(childCount) {
                        case 0:
                            leadNode.left = null
                            break
                        case 1:
                            const replaceNode = this.bypass(currentNode)
                            leadNode.left = replaceNode
                            break
                        case 2:
                            const successorNode = this.succesor(currentNode)
                            const otherNode = currentNode.left
                            const successorParent = this.succesorParent(currentNode)

                            if (currentNode.right.value != successorNode.value) {
                                if (successorNode.right) {
                                    const succesorChild =  successorNode.right
                                    successorParent.left = succesorChild
                                } else {
                                    successorParent.left = null
                                }
                                successorNode.right = currentNode.right
                            }

                            successorNode.left = otherNode
                            leadNode.left = successorNode
                            break
                    }
                    return this
                } else if (value > leadNode.value) {
                    leadNode = leadNode.right
                } else if (value < leadNode.value) {
                    leadNode = leadNode.left
                } else {
                    return 'value not found'
                }
            }
        }
    }

    childChecker(node) {
        if (node.right && node.left) {// if 2 child
            return 2
        } else if (node.right || node.left) {// if 1 child
            return 1
        } else { // if leaf node
            return 0
        }
    }

    succesor(node) {
        let successorNode = node.right

        while (successorNode) {
            if (successorNode.left) {
                successorNode = successorNode.left
            } else {
                return successorNode
            }
        }
    }

    succesorParent(node) {
        let successorParent = node
        let successorNode = node.right

        while (successorNode) {
            if (successorNode.left) {
                successorParent = successorNode
                successorNode = successorNode.left
            } else {
                return successorParent
            }
        }
    }

    bypass(node) {
        let currentNode = node

        if (currentNode.right) {
            currentNode = currentNode.right
            return currentNode
        } else {
            currentNode = currentNode.left
            return currentNode
        }
    }
}

const newBST = new BinarySearchTree()
newBST.insert(70)
newBST.insert(3)
newBST.insert(90)
newBST.insert(81)
newBST.insert(98)
newBST.insert(79)
newBST.insert(50)
newBST.insert(30)
newBST.insert(69)
newBST.insert(5)
newBST.insert(40)
newBST.insert(55)
newBST.insert(51)
newBST.insert(56)
newBST.insert(13)
newBST.insert(35)
newBST.insert(47)
newBST.insert(10)
newBST.insert(33)
newBST.insert(34)
newBST.insert(49)
newBST.insert(60)
newBST.insert(57)

newBST.remove(30)
newBST.remove(55)
newBST.remove(51)
newBST.remove(70)

console.log(newBST)
