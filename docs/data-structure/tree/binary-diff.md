# 二叉树的 diff 算法

二叉树的 diff 算法是一种比较两棵二叉树之间差异的算法，它可以找出两棵二叉树之间节点的新增、删除和修改等操作。

## 自然语言表达

具体描述二叉树的 diff 算法如下：

1. 首先比较两棵二叉树的根节点，如果根节点的值不相等，则认为根节点需要修改。
2. 如果根节点的值相等，则递归比较两棵二叉树的左子树和右子树。
3. 递归比较左子树和右子树时，也按照上述步骤进行操作，即先比较根节点的值，再递归比较左子树和右子树。
4. 在比较左子树和右子树时，根据节点的情况进行相应的操作：

   - 如果左子树为空，右子树不为空，则认为右子树中的节点是新增节点。
   - 如果左子树不为空，右子树为空，则认为左子树中的节点是删除节点。
   - 如果左子树和右子树都不为空，则继续递归比较左子树和右子树中的节点。

5. 在递归比较左子树和右子树的过程中，根据节点的情况进行相应的操作：

   - 如果节点的值不相等，则认为节点需要修改。
   - 如果节点在左子树中存在，在右子树中不存在，则认为节点是删除节点。
   - 如果节点在右子树中存在，在左子树中不存在，则认为节点是新增节点。

6. 递归比较的终止条件是左子树和右子树都为空。
7. 最后，将所有的新增、删除和修改操作记录下来，得到两棵二叉树之间的差异。

二叉树的 diff 算法可以帮助我们了解两棵二叉树之间的差异，可以用于比较两棵二叉树的结构和内容，从而实现二叉树的同步和更新等操作。

## Python 代码实现

```python
class TreeNode:
    right: "TreeNode"
    left: "TreeNode"

    def __init__(self, val: str):
        self.val = val
        self.right = None
        self.left = None


def diff(after: TreeNode | None, before: TreeNode | None):
    if after is None and before is None:
        return
    elif after is None and before is not None:
        print(f"删除节点：{before.val}")
    elif after is not None and before is None:
        print(f"新增节点：{after.val}")
    else:
        if after.val != before.val:
            print(f"修改节点： {before.val}->{after.val}")
        diff(after.left, before.left)
        diff(after.right, before.right)
```
