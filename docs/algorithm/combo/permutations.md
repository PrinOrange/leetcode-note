# 全排列（词典序排列算法）

字典排序算法的自然语言描述如下：

- 第一步：从右至左找第一个左邻小于右邻的数，记下位置 $i$，值 $list[a]$ 。若不存在这样的一个数，则说明当前的排列为所有排列方案中最大的字典排列，下一个排列不存在。
- 第二部：从右边往左找第一个右边大于 $list[a]$ 的第一个值，记下位置 $j$，值 $list[b]$
- 第三步：交换 $list[a]$ 和 $list[b]$ 的值
- 第四步：将 $i$ 以后的元素重新按从小到大的顺序排列

举例：求出 $125643$ 的下一个字典序列

- 第一步：右边值大于左边的 $3<4,4<6,6>5,$ 则 $i=2$ ，$list[a]=5$
- 第二步：从右往左找出第一个右边大于 $list[a]=5$ 的值，找到 $6>5,j=3;list[b]=6;$
- 第三步：交换 $list[a]$ 和 $list[b]$ 的值，序列 $125643=>126543$
- 第四步：将位置 $2$ 以后的元素重新排序，$126543=>126345$;
- 结束： $126345$ 即 $125643$ 的下一个序列

以下是用 C 语言实现获取某个序列的下一个词典序列的程序：

```c
#include <stdio.h>

// 交换两个元素的值
void swap(char *a, char *b) {
    char temp = *a;
    *a = *b;
    *b = temp;
}

// 反转指定区间的元素
void reverse(char *start, char *end) {
    while (start < end) {
        swap(start, end);
        start++;
        end--;
    }
}

// 获取下一个词典序列
int getNextPermutation(char *sequence, int length) {
    int i = length - 2;
    while (i >= 0 && sequence[i] >= sequence[i + 1])
        i--;

    if (i < 0) {
        // 已经是最后一个词典序列
        return 0;
    }

    int j = length - 1;
    while (sequence[j] <= sequence[i])
        j--;

    swap(&sequence[i], &sequence[j]);
    reverse(&sequence[i + 1], &sequence[length - 1]);

    return 1;
}

int main() {
    char sequence[] = "abc"; // 输入序列

    int length = sizeof(sequence) - 1; // 序列长度
    printf("当前序列：%s\n", sequence);

    // 获取下一个词典序列
    if (getNextPermutation(sequence, length)) {
        printf("下一个词典序列：%s\n", sequence);
    } else {
        printf("已经是最后一个词典序列\n");
    }

    return 0;
}
```

上述程序中，`getNextPermutation` 函数用于获取给定序列的下一个词典序列。程序首先找到序列中从右往左第一个比右边元素小的元素，然后在该元素的右边找到大于它的最小元素，交换这两个元素，并将交换点右边的元素进行反转，以得到下一个词典序列。如果已经是最后一个词典序列，则返回 0。

在 `main` 函数中，我们定义了一个示例序列 "abc"，并通过调用 `getNextPermutation` 函数来获取下一个词典序列。程序会输出当前序列和下一个词典序列。请根据需要修改输入序列以测试不同的情况。
