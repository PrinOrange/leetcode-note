# 堆排序

## 编程实现

```c
#include <stdio.h>

// 交换两个元素的值
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 调整堆，使其满足堆的性质
void heapify(int arr[], int n, int i) {
    int largest = i;  // 初始化最大元素为根节点
    int left = 2 * i + 1;  // 左子节点的索引
    int right = 2 * i + 2;  // 右子节点的索引

    // 如果左子节点大于根节点
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // 如果右子节点大于当前最大节点
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // 如果最大节点不是根节点，则交换它们，并继续调整堆
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

// 堆排序函数
void heapSort(int arr[], int n) {
    // 构建最大堆（初始状态）
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // 逐步取出堆顶元素（最大值）并调整堆
    for (int i = n - 1; i > 0; i--) {
        // 将当前堆顶元素（最大值）与最后一个元素交换
        swap(&arr[0], &arr[i]);

        // 调整剩余元素的堆
        heapify(arr, i, 0);
    }
}

// 打印数组元素
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Origin: ");
    printArray(arr, n);

    heapSort(arr, n);

    printf("Sorted: ");
    printArray(arr, n);

    return 0;
}
```
