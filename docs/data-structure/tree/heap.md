# 二叉堆

## 介绍

二叉堆是一种完全二叉树，且父结点元素大于（小于）或等于全部子结点。从堆顶依次弹出元素后的序列均有序。

二叉堆可以使用一个数组来储存。

索引为 $i$ 的元素，其左孩子为 $2i+1$、右孩子为 $2i+2$，父结点为 $\lfloor{\frac{i-1}{2}}\rfloor$

## 构造二叉堆

建立二叉堆有两种策略：

- 把所有元素都一次填入堆中再调整，也被称为「下沉」
- 边加入元素边调整。加入元素时，放在堆的最后一个位置，然后再向上调整，也被称为「上浮」

## 堆调整方法

- **下滤：** 从最后一个非叶子结点开始，对途中每一个结点，依次访问其父结点。如果该结点比父结点大（或小），则与父结点替换位置，直到满足调整后的父结点都大于（或小于所有子结点）。再对每一个后续子结点进行同样的操作。

- **上滤：** 从第一个非根结点出发，对途中的每一个结点，依次访问其父结点。调整父结点、该结点的位置，满足调整后父结点都大于（或小于所有子结点）。再对后续祖父结点进行同样的操作。

## 插入元素

将新结点插入到最后一棵结点之后，再对该元素进行上滤操作。

## 删除元素

将根结点移除，堆中最后一棵结点放到根结点位置，再从根节点开始，进行下滤调整。

## 编程实现

当涉及到二叉堆的实现和基本操作时，通常有两种类型的二叉堆：大根堆（Max Heap）和小根堆（Min Heap）。现在使用 C 语言实现堆的基本操作，以大根堆为的示例，包括插入元素、删除堆顶元素和打印堆元素的基本操作。

```python
def buildBigHeapByPercolateDown(input: list[int], index: int):
    n = len(input)
    # 从最后一个非叶子节点开始，依次向上进行下滤操作
    for i in range(n // 2 - 1, -1, -1):
        percolateDown(input, i)

def buildMaxHeapByPercolateUp(input: list[int]):
    n = len(input)
    # 从第一个非根节点开始，依次向上进行上滤操作
    for i in range(1, n):
        percolateUp(input, i)

def percolateDown(input: list[int], curIndex: int):
    size = len(input)
    largest = curIndex
    left_child = 2 * curIndex + 1
    right_child = 2 * curIndex + 2

    # 如果左子节点存在且大于当前节点，则更新 largest
    if left_child < size and input[largest] < input[left_child]:
        largest = left_child

    # 如果右子节点存在且大于当前 largest 节点，则更新 largest
    if right_child < size and input[largest] < input[right_child]:
        largest = right_child

    # 如果 largest 不等于 index，说明子节点中有比父节点大的
    # 需要进行交换，并递归进行下滤操作
    if largest != curIndex:
        input[curIndex], input[largest] = input[largest], input[curIndex]
        percolateDown(input, largest)


def percolateUp(input: list[int], curIndex: int):
    parent = (curIndex - 1) // 2

    # 如果父节点存在且小于当前节点，则进行交换，并递归进行上滤操作
    if parent >= 0 and input[parent] < input[curIndex]:
        input[parent], input[curIndex] = input[curIndex], input[parent]
        percolateUp(input, parent)

def insert(input: list[int], value: int):
    input.append(value)
    percolateUp(input,len(input) - 1)

def delete(input: list[int]):
    if len(input) == 0:
        return None
    root = input[0]
    input[0] = input[-1]
    input.pop()
    if len(input) > 0:
        percolateDown(input, 0)
    return root
```
