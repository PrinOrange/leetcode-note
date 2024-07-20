# 摩尔投票法查找多数元素

## 找出过半元素

摩尔投票法（Moore's Voting Algorithm）是一种用于在数组中查找出现次数超过一半的元素的算法。该算法的基本思想是通过不同元素之间的抵消来找到出现次数超过一半的元素。

算法步骤如下：

1. 初始化两个变量 `candidate` 和 `count`，分别表示候选元素和计数器。初始时将 `candidate` 设为数组的第一个元素，将 `count` 设为 1。
2. 遍历数组，从第二个元素开始：
   - 如果当前元素与 `candidate` 相同，则将 `count` 加 1。
   - 如果当前元素与 `candidate` 不同，则将 `count` 减 1。
     - 如果 `count` 变为 0，则将当前元素设为新的 `candidate`，并将 `count` 设为 1。
3. 最终的 `candidate` 即为可能的出现次数超过一半的元素。
4. 遍历数组，统计 `candidate` 出现的次数，确保它的出现次数确实超过一半。

下面是一个示例代码，演示如何使用摩尔投票法找到出现次数超过一半的元素：

```c
#include <stdio.h>

int findMajorityElement(int arr[], int size) {
    int candidate = arr[0];
    int count = 1;

    for (int i = 1; i < size; i++) {
        if (arr[i] == candidate) {
            count++;
        } else {
            count--;
            if (count == 0) {
                candidate = arr[i];
                count = 1;
            }
        }
    }

    // 验证 candidate 是否为出现次数超过一半的元素
    int freq = 0;
    for (int i = 0; i < size; i++) {
        if (arr[i] == candidate) {
            freq++;
        }
    }
    if (freq > size / 2) {
        return candidate;
    } else {
        return -1;  // 没有找到出现次数超过一半的元素
    }
}

int main() {
    int arr[] = {2, 4, 2, 2, 5, 2, 2, 6, 2, 2, 8};
    int size = sizeof(arr) / sizeof(arr[0]);

    int majorityElement = findMajorityElement(arr, size);

    if (majorityElement != -1) {
        printf("出现次数超过一半的元素是：%d\n", majorityElement);
    } else {
        printf("没有出现次数超过一半的元素\n");
    }

    return 0;
}
```

在上述示例中，数组 `{2, 4, 2, 2, 5, 2, 2, 6, 2, 2, 8}` 中，元素 `2` 出现的次数超过一半，因此算法输出结果为 `2`。

## 推广：找出超过总数 n 分之一的元素

摩尔投票法可以进行修改，以找到出现次数超过总数的 n 分之一的元素。修改的关键在于确定需要的计数阈值。

假设数组长度为 `size`，要找到出现次数超过总数的 n 分之一的元素，计数阈值可以设置为 `size / n`。即当某个元素的计数达到这个阈值时，即可确定它是满足条件的元素。

当需要找到出现次数超过总数的 n 分之一的元素时，可以对摩尔投票法进行修改。

1. 初始化两个数组 `candidate` 和 `count`，长度都为 n-1。`candidate` 数组用于存储候选元素，`count` 数组用于存储对应候选元素的计数器。初始时，将 `candidate` 数组的所有元素设为 -1，将 `count` 数组的所有元素设为 0。
2. 遍历数组，对于每个元素：
   - 在 `candidate` 数组中查找是否存在与当前元素相同的候选元素。
     - 如果找到相同的候选元素，则将对应的计数器加 1。
     - 如果未找到相同的候选元素，则在 `candidate` 数组中找到第一个计数器为 0 的位置，将当前元素作为新的候选元素存入该位置，并将对应的计数器设为 1。
       - 如果没有计数器为 0 的位置，说明 `candidate` 数组已满，此时将所有计数器减 1，以抵消掉一个元素。
3. 遍历 `candidate` 数组，验证每个候选元素是否出现次数超过总数的 n 分之一。具体方法是统计每个候选元素在原数组中的出现次数，如果出现次数超过 `size / n`，则输出该候选元素。
4. 如果没有候选元素出现次数超过总数的 n 分之一，则说明不存在满足条件的元素。

以上是对摩尔投票法进行修改后的算法步骤，通过遍历数组，使用候选元素和计数器进行抵消，最终找到出现次数超过总数的 n 分之一的元素。

下面是修改后的示例代码：

```c
#include <stdio.h>

int findMajorityElement(int arr[], int size, int n) {
    int candidate[n - 1];
    int count[n - 1];

    for (int i = 0; i < n - 1; i++) {
        candidate[i] = -1;
        count[i] = 0;
    }

    for (int i = 0; i < size; i++) {
        int j;
        for (j = 0; j < n - 1; j++) {
            if (arr[i] == candidate[j]) {
                count[j]++;
                break;
            }
        }
        if (j == n - 1) {
            int k;
            for (k = 0; k < n - 1; k++) {
                if (count[k] == 0) {
                    candidate[k] = arr[i];
                    count[k] = 1;
                    break;
                }
            }
            if (k == n - 1) {
                for (k = 0; k < n - 1; k++) {
                    count[k]--;
                }
            }
        }
    }

    // 验证 candidate 是否出现次数超过总数的 n 分之一
    int freq = 0;
    for (int i = 0; i < n - 1; i++) {
        int count = 0;
        for (int j = 0; j < size; j++) {
            if (arr[j] == candidate[i]) {
                count++;
            }
        }
        if (count > size / n) {
            freq++;
            printf("出现次数超过总数的 %d 分之一的元素是：%d\n", n, candidate[i]);
        }
    }

    if (freq == 0) {
        printf("没有出现次数超过总数的 %d 分之一的元素\n", n);
    }

    return 0;
}

int main() {
    int arr[] = {2, 4, 2, 2, 5, 2, 2, 6, 2, 2, 8, 3, 3, 3, 3};
    int size = sizeof(arr) / sizeof(arr[0]);
    int n = 4;

    findMajorityElement(arr, size, n);

    return 0;
}
```

在上述示例中，数组 `{2, 4, 2, 2, 5, 2, 2, 6, 2, 2, 8, 3, 3, 3, 3}` 中，元素 `2` 和 `3` 都出现的次数超过总数的 4 分之一，因此算法输出结果为：

```plaintext
出现次数超过总数的 4 分之一的元素是: 2
出现次数超过总数的 4 分之一的元素是: 3
```
