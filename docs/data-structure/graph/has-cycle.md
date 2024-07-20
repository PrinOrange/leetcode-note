# 判断无向图是否有环

## 算法描述

判断一个无向图是否有环的常用算法是深度优先搜索（DFS）。下面是使用 DFS 判断无向图是否有环的算法：

1. 初始化一个空的访问列表 `visited`，用于记录已经访问过的节点。
2. 对于图中的每个节点 `v`，如果 `v` 没有被访问过，则执行以下步骤：
   - 如果在以节点 `v` 为根的子图中存在环（即执行 DFS 时返回 True），则说明整个图中存在环，返回 True。
   - 如果在以节点 `v` 为根的子图中不存在环，则将节点 `v` 标记为已访问，并继续遍历 `v` 的邻居节点。
3. 如果对于图中的所有节点都执行了步骤 2，并没有找到环，则返回 False。

## 编程实现

下面是一个使用 Python 实现 DFS 判断无向图是否有环的示例代码：

```python
def has_cycle(graph):
    visited = set()  # 记录已经访问过的节点的集合

    def dfs(node, parent):
        visited.add(node)  # 将当前节点加入到已访问集合中
        for neighbor in graph[node]:  # 遍历当前节点的邻居节点
            if neighbor not in visited:  # 如果邻居节点还未访问过
                if dfs(neighbor, node):  # 递归调用 dfs 函数，如果返回 True 表示存在环路
                    return True
            elif neighbor != parent:  # 如果邻居节点已经被访问过，并且不是当前节点的父节点，则说明存在环路
                return True
        return False  # 当前节点的所有邻居节点都遍历完，不存在环路

    for node in graph:  # 遍历图中的每个节点
        if node not in visited:  # 如果节点未被访问过
            if dfs(node, None):  # 调用 dfs 函数判断是否存在环路，如果返回 True 表示存在环路
                return True

    return False  # 所有节点都遍历完，不存在环路
```

在这个示例中，`graph` 是一个表示无向图的字典，其中键表示节点，值表示与节点相邻的节点列表。函数 `has_cycle` 返回一个布尔值，表示图中是否存在环。

你可以根据自己的需求构建无向图，并调用 `has_cycle` 函数进行判断。

需要注意的是，这个算法假设图中不存在自环（即节点与自身相连的边）。
