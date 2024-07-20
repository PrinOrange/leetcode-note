# 基本二叉树遍历

## 二叉树的表示方法

### 孩子兄弟法

```c
// 树节点的定义
typedef struct TreeNode {
    int data;
    struct TreeNode *firstChild;
    struct TreeNode *nextSibling;
} TreeNode;

// 创建树节点
TreeNode* createTreeNode(int data) {
    TreeNode *newNode = (TreeNode*)malloc(sizeof(TreeNode));
    newNode->data = data;
    newNode->firstChild = NULL;
    newNode->nextSibling = NULL;
    return newNode;
}

// 在 parent 节点下插入一个新的孩子节点
void insertChild(TreeNode *parent, TreeNode *child) {
    if (parent->firstChild == NULL) {
        parent->firstChild = child;
    } else {
        TreeNode *sibling = parent->firstChild;
        while (sibling->nextSibling != NULL) {
            sibling = sibling->nextSibling;
        }
        sibling->nextSibling = child;
    }
}

// 先序遍历打印树
void preorderTraversal(TreeNode *root) {
    if (root == NULL) {
        return;
    }
    printf("%d ", root->data);
    preorderTraversal(root->firstChild);
    preorderTraversal(root->nextSibling);
}
```

## 二叉树的遍历

二叉树的遍历方法，根据根节点在遍历一颗子树中的顺序位置来区分有三种：

- 先序遍历：**根**-左 - 右
- 后序遍历：左 - 右-**根**
- 中序遍历：左-**根**-右

二叉树的遍历有递归方式和迭代方式来实现。其中，迭代方式本质上也是递归方式的一种，只是需要自主完成递归的调用栈管理和操作。

假设二叉树的结构体定义如下：

```c
// 二叉树节点结构
struct TreeNode {
    int data;
    struct TreeNode* left;
    struct TreeNode* right;
};
```

### 遍历（递归方法）

三种遍历方法的实现代码分别如下：

```c
// 前序遍历
void preorderTraversal(struct TreeNode* root) {
    if (root != NULL) {
        printf("%d ", root->data);  // 先访问根节点
        preorderTraversal(root->left);  // 再遍历左子树
        preorderTraversal(root->right);  // 最后遍历右子树
    }
}

// 中序遍历
void inorderTraversal(struct TreeNode* root) {
    if (root != NULL) {
        inorderTraversal(root->left);  // 先遍历左子树
        printf("%d ", root->data);  // 再访问根节点
        inorderTraversal(root->right);  // 最后遍历右子树
    }
}

// 后序遍历
void postorderTraversal(struct TreeNode* root) {
    if (root != NULL) {
        postorderTraversal(root->left);  // 先遍历左子树
        postorderTraversal(root->right);  // 再遍历右子树
        printf("%d ", root->data);  // 最后访问根节点
    }
}
```

### 遍历（非递归方法）

当使用非递归方式遍历二叉树时，我们使用栈数据结构来辅助遍历过程。栈是一种后进先出（LIFO）的数据结构，可以用来保存待访问的节点。

下面是对三种非递归遍历算法的自然语言描述：

#### 前序遍历（Preorder Traversal）：

- 创建一个空栈，并将根节点入栈。
- 进入循环，直到栈为空：
  - 弹出栈顶节点，并访问该节点的数据。
  - 如果该节点有右子节点，将右子节点入栈。
  - 如果该节点有左子节点，将左子节点入栈。
- 遍历结束。

前序遍历的顺序是先访问根节点，然后遍历左子树，最后遍历右子树。

```c
void preorderTraverse(TreeNode *node)
{
  TreeNode *currentNode = node;
  TreeNode *stack[100] = {currentNode};
  int top = 0;
  while (top != -1)
  {
    currentNode = stack[top];
    printf("%d ", currentNode->data);
    stack[top--] = NULL;
    if (currentNode->right != NULL)
    {
      stack[++top] = currentNode->right;
    }
    if (currentNode->left != NULL)
    {
      stack[++top] = currentNode->left;
    }
  }
}
```

#### 中序遍历（Inorder Traversal）

- 创建一个空栈，并将根节点置为当前节点。
- 进入循环，直到当前节点为空且栈为空：
  - 如果当前节点不为空，将当前节点入栈，并将当前节点更新为其左子节点。
  - 如果当前节点为空，弹出栈顶节点，并访问该节点的数据。然后将当前节点更新为弹出节点的右子节点。
- 遍历结束。

```c
void inorderTraverse(TreeNode *node)
{
  TreeNode *currentNode = node;
  TreeNode *stack[100];
  int top = -1;
  while (currentNode != NULL || top != -1)
  {
    while (currentNode != NULL)
    {
      stack[++top] = currentNode;
      currentNode = currentNode->left;
    }
    if (top != -1)
    {
      currentNode = stack[top--];
      printf("%d ", currentNode->data);
      currentNode = currentNode->right;
    }
  }
}
```

中序遍历的顺序是先遍历左子树，然后访问根节点，最后遍历右子树。

#### 后序遍历（Postorder Traversal）

- 创建一个空栈，并将根节点置为当前节点。
- 进入循环，直到当前节点为空且栈为空：
  - 如果当前节点不为空，将当前节点入栈，并将当前节点更新为其左子节点。
  - 如果当前节点为空，查看栈顶节点的右子节点：
    - 如果右子节点为空或者已经访问过（即上一个访问的节点是右子节点），弹出栈顶节点，并访问该节点的数据。
    - 如果右子节点不为空且未访问过，将当前节点更新为右子节点。
- 遍历结束。

后序遍历的顺序是先遍历左子树，然后遍历右子树，最后访问根节点。

```c
void postorderTraverse(TreeNode *node)
{
  TreeNode *currentNode = node;
  TreeNode *stack[100] = {currentNode};
  int top = 0;

  while (top != -1)
  {
    if (currentNode->left != NULL)
    {
      stack[++top] = currentNode->left;
    }
    if (currentNode->right != NULL)
    {
      stack[++top] = currentNode->right;
    }
    currentNode = stack[top];
    printf("%d ", currentNode->data);
    stack[top--] = NULL;
  }
}
```

这些非递归遍历算法利用栈的特性，通过循环遍历二叉树的节点，并根据遍历顺序将节点入栈或出栈，并访问节点的数据。通过适时地更新当前节点的指向，实现了非递归方式的二叉树遍历。
