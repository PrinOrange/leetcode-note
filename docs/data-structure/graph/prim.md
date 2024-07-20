# 普利姆算法

## 语言描述

1. 输入：一个加权连通图，其中顶点集合为 $V$，边集合为 $E$ ；

2. 初始化：$V_{new} = \{ x \}$，其中 $x$ 为集合 $V$ 中的任一节点（起始点），$E_{new} = \{\}$ 为空；

3. 重复下列操作，直到$V_{new} = V$：

   - 在集合 $E$ 中选取权值最小的边 $<u, v>$ ，其中 $u$ 为集合 $V_{new}$ 中的元素，而 $v$ 不在 $V_{new}$ 集合当中，并且 $v∈V$ （如果存在有多条满足前述条件即具 有相同权值的边，则可任意选取其中之一）；
   - 将 $v$ 加入集合 $V_{new}$ 中，将 $<u, v>$ 边加入集合 $E_{new}$ 中；

4. 输出：使用集合 $V_{new}$ 和 $E_{new}$ 来描述所得到的最小生成树。

## 编程实现

```c
#define MAX 100000
#define VNUM 10 + 1 // 这里没有 ID 为 0 的点，so id 号范围 1~10

int edge[VNUM][VNUM] = {/*输入的邻接矩阵*/};
int lowcost[VNUM] = {0};  // 记录 Vnew 中每个点到 V 中邻接点的最短边
int addvnew[VNUM];        // 标记某点是否加入 Vnew
int adjecent[VNUM] = {0}; // 记录 V 中与 Vnew 最邻近的点

void prim(int start)
{
  int sumweight = 0;
  int i, j, k = 0;

  for (i = 1; i < VNUM; i++) // 顶点是从 1 开始
  {
    lowcost[i] = edge[start][i];
    addvnew[i] = -1; // 将所有点至于 Vnew 之外，V 之内，这里只要对应的为 -1，就表示在 Vnew 之外
  }

  addvnew[start] = 0; // 将起始点 start 加入 Vnew
  adjecent[start] = start;

  for (i = 1; i < VNUM - 1; i++)
  {
    int min = MAX;
    int v = -1;
    for (j = 1; j < VNUM; j++)
    {
      if (addvnew[j] != -1 && lowcost[j] < min) // 在 Vnew 之外寻找最短路径
      {
        min = lowcost[j];
        v = j;
      }
    }
    if (v != -1)
    {
      printf("%d %d %d\n", adjecent[v], v, lowcost[v]);
      addvnew[v] = 0; // 将 v 加 Vnew 中
      sumweight += lowcost[v]; // 计算路径长度之和
      for (j = 1; j < VNUM; j++)
      {
        if (addvnew[j] == -1 && edge[v][j] < lowcost[j])
        {
          lowcost[j] = edge[v][j]; // 此时 v 点加入 Vnew 需要更新 lowcost
          adjecent[j] = v;
        }
      }
    }
  }
  printf("the minmum weight is %d", sumweight);
}
```
