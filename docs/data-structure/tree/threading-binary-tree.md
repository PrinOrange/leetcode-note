# 线索二叉树

## 线索二叉树的定义

```c
typedef struct TBNode
{
 char data;
 int ltag,rtag;
 struct TBNode *lchild;
 struct TBNode *rchild;
}TBNode;
```

## 二叉树的线索化

通过中序遍历对二叉树进行线索化

```c
// 通过中序遍历对二叉树线索化的递归算法：
void InThreadInOrder(TBNode *p, TBNode *&pre)
{
  if (p != NULL)
  {
    InThreadInOrder(p->lchild, pre); // 递归，左子树线索化
  }
  if (p->lchild == NULL)
  {
    p->lchild = pre;
    p->ltag = 1;
  }
  if (pre != NULL && pre->rchild == NULL)
  {
    // 建立前驱节点的后继线索
    pre->rchild = p;
    pre->rtag = 1;
  }

  pre = p; // pre 指向当前的 p，作为 p 将要指向的下一个节点的前驱节点提示指针

  InThreadInOrder(p->rchild, pre);
}
```
