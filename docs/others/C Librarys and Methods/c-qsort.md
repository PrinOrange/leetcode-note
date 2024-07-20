# C 语言内置快速排序算法-qsort

## 函数签名

```c
void qsort(void *base, size_t nitems, size_t size, int (*compar)(const void *, const void*))
```

### 参数说明

- \*base : 目标数组的指针
- nitems: 目标数组内元素的数量
- size : 数组单位元素的大小，例如对于`int`数组，则应当填写为`sizeof(int)`
- compar : 辅助比较函数的指针。这个函数接收数组内两个连续元素的指针，如果返回值大于 0，则从小到大排序，否则从大到小排序。

### Example

```c
#include <stdio.h>
#include <stdlib.h>

// 比较函数，用于从大到小排序
int compare_descending(const void* a, const void* b) {
    int num1 = *(const int*)a;
    int num2 = *(const int*)b;
    return num2-num1;
}

// 比较函数，用于从小到大排序
int compare_ascending(const void* a, const void* b) {
    int num1 = *(const int*)a;
    int num2 = *(const int*)b;
    return num1-num2;
}

int main() {
    int numbers[] = {5, 2, 8, 1, 9, 3};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("原始数组：");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");

    // 从大到小排序
    qsort(numbers, size, sizeof(int), compare_descending);
    printf("从大到小排序后：");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");

    // 从小到大排序
    qsort(numbers, size, sizeof(int), compare_ascending);
    printf("从小到大排序后：");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");

    return 0;
}

```
