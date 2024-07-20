# KMP 字符串匹配算法

## 相关概念

- 主串：用于需要从中获取匹配内容的字符串，用符号记为 $S$。
- 模式串：匹配目标的字符串，用符号记为 $P$ 。
- NEXT 数组：一个一维数组，用于计算下一步“跳”过比较元素的步数。

## NEXT 数组的计算

NEXT 数组的第 $i$ 个元素 $next[i]$ 表示模式串 $P_{0}$ 到 $P_{i}$ 中使得前 $k$ 个字符等于后 $k$ 个字符的最大 $k$ 值。

比如对于字符串 $ABCADABC$

注意：在这里，索引从 1 开始。

| index | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- |
| char  | A   | B   | C   | A   | D   | A   | B   | C   |
| next  | 0   | 1   | 1   | 1   | 2   | 1   | 2   | 3   |

注意：$k<=i+1$

## “跳跃”与匹配

1. 首先主串与模式串均从 $i=0$ 处开始比较。比如 $S[0]$ 与 $P[0]$ 比较，若匹配，则开始 $S[1]$ 与 $P[1]$ 比较，以此类推。
2. 遇到不匹配的字符时则中止，设之前匹配的数量为 $n$ 。此时可以跳过 $m=n-next[n-1]$步。
3. 此时主串从 $i=m$ 处与模式串 $i=0$ 处开始新一轮比较。若仍有不匹配字符，则跳到第 2 步，否则到第 4 步。
4. 若没有遇到不匹配的字符，即全匹配时，返回 $m$ 值。

## 自然语言表述

输入：文本串 $text$ 和模式串 $pattern$

1. 初始化两个指针 $i$ 和 $j$ ，分别指向文本串和模式串的起始位置。
2. 构造 $next$ 数组，用于快速跳过不匹配的部分：
   - 初始化 $next[0] = -1$。
   - 当 $i < len(text)$ 时执行以下步骤：
     - 如果 $j = -1$ 或者 $text[i] = pattern[j]$ ，则递增 $i$ 和 $j$ ，并设置 $next[i] = j$。
     - 否则，更新 $j$ 为 $next[j]$ ，继续比较 $text[i]$ 和 $pattern[j]$ 。
3. 在循环中，进行模式匹配：

   - 当 $i < len(text)$ 且 $j < len(pattern)$ 时执行以下步骤：
     - 如果 $j = -1$ 或者 $text[i] = pattern[j]$ ，则递增 $i$ 和 $j$。
     - 否则，更新 $j$ 为 $next[j]$，继续比较 $text[i]$ 和 $pattern[j]$ 。
   - 如果 $j = len(pattern)$，表示模式串完全匹配，返回当前匹配位置 $i - j$。
   - 否则，表示匹配失败，返回匹配失败的标记（例如$-1$）。

4. 结束算法。

## next 数组的改进：nextval

`next`数组和`nextval`数组都是在 KMP 算法中用于优化匹配过程的辅助数组，它们的区别在于在不匹配时的回溯位置不同。他俩的使用方法是一样的，只是计算方法不同，`next`数组进行进一步计算可以生成`nextval`数组。

- `next`数组：`next`数组用于在不匹配时确定模式字符串的下一次比较位置。`next[j]`表示当模式字符串中的第`j`个字符与主字符串不匹配时，模式字符串应该回溯到的位置。具体而言，`next[j]`表示模式字符串中从开头到第`j-1`个字符形成的子串的前缀和后缀的最长公共部分的长度。在匹配过程中，如果当前字符不匹配，就根据`next`数组的值来更新模式字符串的比较位置。

- `nextval`数组：`nextval`数组是对`next`数组的一种改进。它在不匹配时的回溯位置的选择上更加灵活。具体而言，`nextval[j]`表示当模式字符串中的第`j`个字符与主字符串不匹配时，模式字符串应该回溯到的位置。与`next`数组不同的是，`nextval[j]`的计算过程中，如果模式字符串的当前字符和下一个字符相等，则可以直接跳过一些不必要的比较操作，而不是回溯到`nextval[j]`的位置。

在实际应用中，`nextval`数组相对于`next`数组可以进一步减少比较次数，提高匹配效率。然而，计算`nextval`数组的过程相对复杂一些，需要额外的判断和操作。因此，在实现 KMP 算法时，可以根据具体情况选择使用`next`数组或`nextval`数组。

计算`nextval`数组的算法如下：

1. 设 $nextval[1] = 0$ ，$i=2$
2. 依次判断 $pattern[i] == pattern[next[i]]$ ，若否，则 $nextval[i] = next[i]$；若是，则 $nextval[i] == next[next[i]]$
3. 重复以上步骤，直至遍历完 $next$ 数组。

## C 语言代码的实现

```c
#include <stdio.h>
#include <string.h>

// 计算 next 数组
void computeNext(const char *pattern, int next[])
{
    int i, j;
    int m = strlen(pattern);

    next[0] = -1;
    i = 0;
    j = -1;

    while (i < m)
    {
        while (j >= 0 && pattern[i] != pattern[j])
            j = next[j];
        i++;
        j++;
        next[i] = j;
    }
}

// 计算 nextval 数组
void computeNextVal(const char *pattern, int nextval[])
{
    int i, j;
    int m = strlen(pattern);

    nextval[0] = -1;
    i = 0;
    j = -1;

    while (i < m)
    {
        while (j >= 0 && pattern[i] != pattern[j])
            j = nextval[j];
        i++;
        j++;
        if (pattern[i] == pattern[j])
            nextval[i] = nextval[j];
        else
            nextval[i] = j;
    }
}

// KMP 算法匹配字符串
int KMP(const char *text, const char *pattern)
{
    int n = strlen(text);
    int m = strlen(pattern);

    int *next = (int *)malloc(sizeof(int) * m);
    computeNext(pattern, next);

    int i = 0; // text 中的当前位置
    int j = 0; // pattern 中的当前位置

    while (i < n)
    {
        while (j >= 0 && text[i] != pattern[j])
            j = next[j];
        i++;
        j++;
        if (j == m)
        {
            free(next);
            return i - j; // 匹配成功，返回匹配的起始位置
        }
    }

    free(next);
    return -1; // 匹配失败，返回 -1
}

// KMP 算法匹配字符串（使用 nextval 数组）
int KMPWithNextVal(const char *text, const char *pattern)
{
    int n = strlen(text);
    int m = strlen(pattern);

    int *nextval = (int *)malloc(sizeof(int) * m);
    computeNextVal(pattern, nextval);

    int i = 0; // text 中的当前位置
    int j = 0; // pattern 中的当前位置

    while (i < n)
    {
        while (j >= 0 && text[i] != pattern[j])
            j = nextval[j];
        i++;
        j++;
        if (j == m)
        {
            free(nextval);
            return i - j; // 匹配成功，返回匹配的起始位置
        }
    }

    free(nextval);
    return -1; // 匹配失败，返回 -1
}

int main()
{
    const char *text = "ABABABABCABABABABCABABABABC";
    const char *pattern = "ABCADABC";

    int pos = KMP(text, pattern);
    if (pos != -1)
        printf("Pattern found at position: %d\n", pos);
    else
        printf("Pattern not found!\n");

    int pos2 = KMPWithNextVal(text, pattern);
    if (pos2 != -1)
        printf("Pattern found at position: %d\n", pos2);
    else
        printf("Pattern not found!\n");

    return 0;
}
```
