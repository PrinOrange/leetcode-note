# 分治法寻找数组最值

## C 语言代码实现

```c
#include <stdio.h>

struct BestValue {
    int min;
    int max;
};

struct BestValue findMinMax(int arr[], int low, int high) {
    struct BestValue result, left, right, mid;
    int midIndex;

    // 当只有一个元素时，最大值和最小值都是该元素
    if (low == high) {
        result.min = arr[low];
        result.max = arr[low];
        return result;
    }

    // 当有两个元素时，比较它们的大小
    if (high == low + 1) {
        if (arr[low] < arr[high]) {
            result.min = arr[low];
            result.max = arr[high];
        } else {
            result.min = arr[high];
            result.max = arr[low];
        }
        return result;
    }

    // 当有多个元素时，递归地分割数组并找到最大值和最小值
    midIndex = (low + high) / 2;
    left = findMinMax(arr, low, midIndex);
    right = findMinMax(arr, midIndex + 1, high);

    // 比较左半部分和右半部分的最大值和最小值
    if (left.min < right.min) {
        result.min = left.min;
    } else {
        result.min = right.min;
    }

    if (left.max > right.max) {
        result.max = left.max;
    } else {
        result.max = right.max;
    }

    return result;
}

int main() {
    int arr[] = {5, 8, 3, 9, 1, 6, 2, 7, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    struct BestValue result = findMinMax(arr, 0, n - 1);

    printf("Minimum value: %d\n", result.min);
    printf("Maximum value: %d\n", result.max);

    return 0;
}

```
