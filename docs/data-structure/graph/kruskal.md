# 克鲁斯卡尔算法

## 算法描述

1. 将图 $G$ 看做一个森林，每个顶点为一棵独立的树
2. 将所有的边加入集合 $S$ ，即一开始 $S = E$
3. 从 S 中拿出一条最短的边 $(u,v)$ ，如果 $(u,v)$ 不在同一棵树内，则连接 $u,v$ 合并这两棵树，同时将 $(u,v)$ 加入生成树的边集 $E'$
4. 重复 3 直到所有点属于同一棵树，边集 $E'$ 就是一棵最小生成树

## 编程实现

```c
#include <stdio.h>

#define MAXEDGE 100
#define MAXVERTEX 100
typedef struct Edge
{
  int begin; // 边的起点
  int end;   // 边的终点
  int wight; // 边的权值
} Edge;

typedef struct Graph
{
  char vertex[MAXVERTEX];  // 顶点
  Edge edges[MAXEDGE];     // 边
  int numvertex, numedges; // 顶点和边的个数
} MGraph;

void CreateGraph(MGraph *G)
{
  printf("请输入顶点和边的个数：\n");
  scanf("%d%d", &G->numvertex, &G->numedges);
  printf("请输入顶点：\n");
  getchar(); // 利用该函数除去上一系我们在输入结束时按得回车符
  for (int i = 0; i < G->numvertex; i++)
  {
    scanf("%c", &G->vertex[i]);
  }
  printf("按权值从小到大输入边（vi,vj）对应的起点和终点的下标，begin，end 以及权值 wight:\n");
  for (int k = 0; k < G->numedges; k++)
  {
    Edge e;
    scanf("%d%d%d", &e.begin, &e.end, &e.wight);
    G->edges[k] = e;
  }
}

int Find(int *parent, int f)
{
  while (parent[f] > 0)
  {
    f = parent[f];
  }
  return f;
}

// 最小生成树，克鲁斯卡尔算法
void Kruskal(MGraph *G)
{

  int parent[MAXVERTEX]; // 存放最小生成树的顶点
  for (int i = 0; i < G->numvertex; i++)
  {
    parent[i] = 0;
  }
  int m, n;
  for (int i = 0; i < G->numedges; i++)
  {
    n = Find(parent, G->edges[i].begin);
    m = Find(parent, G->edges[i].end);
    if (n != m)
    { // m=n 说明有环
      parent[n] = m;
      printf("(%d,%d) %d\t", G->edges[i].begin, G->edges[i].end, G->edges[i].wight); // 打印边和权值
    }
  }
}

int main()
{
  MGraph G;
  CreateGraph(&G);
  Kruskal(&G);

  return 0;
}
```
