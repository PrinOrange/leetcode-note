# Floyd 算法

## 算法描述

弗洛伊德算法用于求图中所有两点对中的最短路径距离。使用的是动态规划的思想。下面是该算法的算法步骤：

1. 初始化：创建一个大小为 $n$ 的二维矩阵 $dist$ ，其中 $n$ 为图中节点的个数。将矩阵中的所有元素初始化为无穷大，表示节点之间的距离为无穷大。同时，将矩阵主对角线上的元素初始化为 $0$ ，表示节点到自身的距离为 $0$ 。

2. 遍历图中的每个节点：对于每个节点 $i$ ，遍历图中的每个节点 $j$ ，并检查是否存在节点 $k$ ，满足 $dist[i][k] + dist[k][j] < dist[i][j]$ 。如果存在这样的节点 $k$ ，则更新 $dist[i][j]$ 的值为 $dist[i][k] + dist[k][j]$ 。

3. 重复步骤 2 直到所有节点对之间的最短路径都计算完毕。最终， $dist$ 矩阵中的值就是图中任意两个节点之间的最短路径。

4. 如果需要，可以根据 $dist$ 矩阵计算出最短路径的具体路径。对于每对节点 $i$ 和 $j$ ，初始化一个空路径数组 $path$ ，并循环遍历节点 $k$ ，如果 $dist[i][j] == dist[i][k] + dist[k][j]$ ，则将节点 k 添加到路径数组 $path$ 中。最终，$path$ 数组中的值就是节点 $i$ 到节点 $j$ 的最短路径。

以上就是弗洛伊德算法的算法步骤。这个算法的时间复杂度为 $O(n^3)$ ，其中 $n$ 为图中节点的个数。该算法适用于求解密集图的最短路径问题。

## 编程实现

下面是一个用 C 语言实现的弗洛伊德算法的示例：

```c
#include <stdio.h>
#define INF 99999
#define V 4

void floydWarshall(int graph[][V])
{
    int dist[V][V], i, j, k;

    for (i = 0; i < V; i++)
        for (j = 0; j < V; j++)
            dist[i][j] = graph[i][j];

    for (k = 0; k < V; k++)
    {
        for (i = 0; i < V; i++)
        {
            for (j = 0; j < V; j++)
            {
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }

    printf("最短路径矩阵：\n");
    for (i = 0; i < V; i++)
    {
        for (j = 0; j < V; j++)
        {
            if (dist[i][j] == INF)
                printf("%7s", "INF");
            else
                printf("%7d", dist[i][j]);
        }
        printf("\n");
    }
}

int main()
{
    int graph[V][V] = {{0, 5, INF, 10},
                       {INF, 0, 3, INF},
                       {INF, INF, 0, 1},
                       {INF, INF, INF, 0}};

    floydWarshall(graph);

    return 0;
}
```

这个程序实现了一个图的弗洛伊德算法。在主函数中，我们定义了一个 $4x4$ 的矩阵表示图的邻接矩阵。然后调用 $floydWarshall$ 函数来计算图中任意两个顶点之间的最短路径。

在 $floydWarshall$ 函数中，我们首先初始化一个大小为 $V*V$ 的距离矩阵，将其赋值为图的邻接矩阵。然后通过三重循环来计算
