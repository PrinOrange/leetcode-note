# 哈夫曼树的构造

## 编程实现

要使用 Python 语言实现 Huffman 树 和基本操作，需要定义 Huffman 树 的数据结构和相应的函数。下面是一个示例代码，演示了 Huffman 树 的实现及其基本操作。

```python
class TreeNode:
    def __init__(
        self,
        val: str = "",
        weight: int = 0,
        left: "TreeNode" = None,
        right: "TreeNode" = None,
    ):
        self.val = val
        self.weight = weight
        self.left = left
        self.right = right


def buildHuffmanTree(input: list[TreeNode]):
    if len(input) == 1:
        return input[0]
    else:
        firstMinNode = min(input, key=lambda x: x.weight)
        input.remove(firstMinNode)
        secondMinNode = min(input, key=lambda x: x.weight)
        input.remove(secondMinNode)
        newNode = TreeNode(
            "", firstMinNode.weight + secondMinNode.weight, firstMinNode, secondMinNode
        )
        input.append(newNode)
        return buildHuffmanTree(input)
```
