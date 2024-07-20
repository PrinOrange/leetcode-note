# 快速排序

## 算法描述

快速排序是一种分治算法，它通过将数组分成较小的子数组来实现排序。具体步骤如下：

1. 选择一个元素作为分区点（通常选择数组的最后一个元素）。
2. 遍历数组，将小于分区点的元素放在分区点的左侧，将大于分区点的元素放在分区点的右侧。这样，分区点的位置就确定了。
3. 对分区点左侧和右侧的子数组分别递归地进行快速排序。
4. 重复上述步骤，直到子数组的大小为 1 或 0，即已经排序完成。

具体描述如下：

1. 选择分区点：从数组中选择一个元素作为分区点（通常选择最后一个元素）。
2. 分区操作：遍历数组，将小于分区点的元素放在分区点的左侧，将大于分区点的元素放在分区点的右侧。可以使用两个指针，一个从数组的起始位置开始，一个从数组的末尾开始。比较指针所指向的元素与分区点的值，并根据大小进行交换，直到两个指针相遇。
3. 递归排序：对分区点左侧和右侧的子数组分别进行递归排序。即对左侧子数组进行快速排序，再对右侧子数组进行快速排序。
4. 合并结果：递归排序完成后，数组就被划分为多个有序的子数组。不需要合并操作，因为每个子数组本身已经有序。
5. 重复以上步骤，直到所有子数组的大小为 1 或 0，即已经排序完成。

快速排序的核心思想是通过不断地将数组分区，将较小的元素移动到分区点的左侧，较大的元素移动到分区点的右侧，从而实现排序。通过递归地对子数组进行排序，最终完成整个数组的排序。快速排序的平均时间复杂度为 $O(nlogn)$ ，是一种高效的排序算法。

## 编程实现

```c
#include <stdio.h>

// 交换数组中两个元素的位置
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 将数组分区，并返回分区点的索引
int partition(int arr[], int low, int high) {
    int pivot = arr[high];  // 选择最后一个元素作为分区点
    int i = (low - 1);

    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// 快速排序递归函数
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = partition(arr, low, high);  // 获取分区点的索引

        // 递归地对分区点左侧和右侧的子数组进行排序
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
}

// 打印数组元素
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int size = sizeof(arr) / sizeof(arr[0]);

    printf("原始数组：");
    printArray(arr, size);

    quickSort(arr, 0, size - 1);

    printf("排序后的数组：");
    printArray(arr, size);

    return 0;
}

```
