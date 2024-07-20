# 森林和二叉树

## Python 实现

### 森林转二叉树

```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class ForestNode:
    def __init__(self, val):
        self.val = val
        self.children = []

def forest_to_binary_tree(forest):
    if not forest:
        return None

    def convert(root):
        if not root:
            return None

        # 将当前节点转换为二叉树节点
        node = TreeNode(root.val)

        # 处理左孩子：第一个子节点
        if root.children:
            node.left = convert(root.children[0])

        # 处理右孩子：后续子节点链表
        current = node.left
        for child in root.children[1:]:
            current.right = convert(child)
            current = current.right

        return node

    # 将森林中的每棵树都转换为二叉树节点，并将它们连接起来
    dummy = TreeNode(None)  # 创建一个虚拟节点，作为多个树根的父节点
    current = dummy
    for tree in forest:
        current.right = convert(tree)
        current = current.right

    return dummy.right

def binary_tree_to_forest(root):
    if not root:
        return []

    def convert(node):
        if not node:
            return None

        # 将当前二叉树节点转换为森林节点
        forest_node = ForestNode(node.val)

        # 处理左孩子：森林节点的第一个子节点
        if node.left:
            forest_node.children.append(convert(node.left))

        # 处理右孩子：链表的其余节点
        current = node.left
        while current and current.right:
            forest_node.children.append(convert(current.right))
            current = current.right

        return forest_node

    # 将二叉树的每棵子树都转换为森林节点，并将它们放入列表中
    forest = []
    current = root
    while current:
        forest.append(convert(current))
        current = current.right

    return forest
```
