# 并查集

并查集是一种用于管理元素所属集合的数据结构，实现为一个森林，其中每棵树表示一个集合，树中的节点表示对应集合中的元素。

顾名思义，并查集支持两种操作：

- 合并（Union）：合并两个元素所属集合（合并对应的树）
- 查询（Find）：查询某个元素所属集合（查询对应的树的根节点），这可以用于判断两个元素是否属于同一集合

并查集在经过修改后可以支持单个元素的删除、移动；使用动态开点线段树还可以实现可持久化并查集。

## 代码实现

```python
class UnionSet:
    parent: list[int] = []

    def __init__(self, capacity: int):
        for i in range(capacity):
            self.parent.append(i)
    # 寻找 val 所在的根节点
    def find(self, val: int):
        # parent[val] 指的是 val 的根节点。任何根节点的根节点就是本身。
        if self.parent[val] != val:
            # 如果父节点不是根节点，那就让它的父节点等于祖父节点。
            # 递归下去，最终父节点等于根节点。
            self.parent[val] = self.find(self.parent[val])
        return self.parent[val]
    # 把 a 的根节点设为 b 的根节点，这样 a 和 b 就在同一个根节点下，即同一集合
    def union(self, a: int, b: int):
        self.parent[self.find(a)] = self.find(b)
```
