# 根据序列还原二叉树

一般来说，只需要中序遍历及前序遍历或后序遍历就可以还原出整个二叉树。

## 先序遍历还原二叉树

当然，以下是使用先序遍历顺序和中序遍历顺序还原二叉树的算法步骤：

1. **输入**：先序遍历序列和中序遍历序列。假设这两个序列的长度相同，且没有重复的元素。
2. **找到根节点**：在先序遍历序列中，第一个元素就是二叉树的根节点。
3. **划分左右子树**：在中序遍历序列中，根节点将序列划分为两部分。根节点左边的元素构成了左子树，右边的元素构成了右子树。
4. **递归构造左右子树**：我们可以递归地应用这个过程来构造左子树和右子树。对于左子树，我们使用中序遍历序列中根节点左边的部分和先序遍历序列中对应的部分；对于右子树，我们使用中序遍历序列中根节点右边的部分和先序遍历序列中对应的部分。
5. **结束条件**：如果先序遍历序列或中序遍历序列为空（即没有元素），那么返回 None，表示当前子树为空。

这个算法的时间复杂度是 $O(n)$，其中 $n$ 是二叉树的节点数。因为我们需要遍历每个节点一次来构造二叉树。

```python
def revertTreeByPreOrderSeq(inOrderSeq: list[str], preOrderSeq: list[str]):
    if len(inOrderSeq) != len(preOrderSeq):
        raise ValueError("Error Input")
    if len(inOrderSeq) == 0 and len(preOrderSeq) == 0:
        return None
    rootValue = preOrderSeq[0]
    rootIndex = inOrderSeq.index(rootValue)
    node = TreeNode(rootValue)
    node.lchild = revertTreeByPreOrderSeq(
        inOrderSeq[:rootIndex], preOrderSeq[1 : rootIndex + 1]
    )
    node.rchild = revertTreeByPreOrderSeq(
        inOrderSeq[rootIndex + 1 :], preOrderSeq[rootIndex + 1 :]
    )
    return node
```

## 后序遍历还原二叉树

当然，以下是使用先序遍历顺序和中序遍历顺序还原二叉树的算法步骤：

1. **输入**：先序遍历序列和后序遍历序列。假设这两个序列的长度相同，且没有重复的元素。
2. **找到根节点**：在先序遍历序列中，倒数第一个元素就是二叉树的根节点。
3. **划分左右子树**：在中序遍历序列中，根节点将序列划分为两部分。根节点左边的元素构成了左子树，右边的元素构成了右子树。
4. **递归构造左右子树**：我们可以递归地应用这个过程来构造左子树和右子树。对于左子树，我们使用中序遍历序列中根节点左边的部分和先序遍历序列中对应的部分；对于右子树，我们使用中序遍历序列中根节点右边的部分和先序遍历序列中对应的部分。
5. **结束条件**：如果后序遍历序列或中序遍历序列为空（即没有元素），那么返回 None，表示当前子树为空。

```python
def revertBinaryTreeByPostOrderSeq(inOrderSeq: list[str], postOrderSeq: list[str]):
    if len(inOrderSeq) != len(postOrderSeq):
        raise ValueError("Error Input")
    if len(inOrderSeq) == 0 and len(postOrderSeq) == 0:
        return None
    rootValue = postOrderSeq[-1]
    rootIndex = inOrderSeq.index(rootValue)
    node = TreeNode(rootValue)
    node.lchild = revertBinaryTreeByPostOrderSeq(
        inOrderSeq[:rootIndex], postOrderSeq[: rootIndex]
    )
    node.rchild = revertBinaryTreeByPostOrderSeq(
        inOrderSeq[rootIndex + 1 :], postOrderSeq[rootIndex :-1]
    )
    return node
```
