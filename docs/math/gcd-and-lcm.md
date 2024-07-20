# 求解最大公因数和最小公倍数

## 算法实现

`GCD` 和 `LCM` 函数分别是求最大公因数、最小公倍数的函数。

`GCD` 函数的 C 语言实现如下：

```c
int gcd(int a, int b)
{
    while (b != 0)
    {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```

`LCM` 是求两个数的最小公倍数的函数。**根据数学知识，两个数的最小公倍数，等于这两个数的乘积除以这两个数的最大公因数。**

```c
int lcm(int a,int b)
{
    return (a * b) / gcd(a, b);
}
```

## 扩展：数组内的最大公因数和最小公倍数

### 数组的最大公因数

要求一个数组的最大公因数，可以使用欧几里得算法（辗转相除法）来求解。以下是一个求解数组最大公因数的函数实现：

```c
#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

int arrayGCD(int arr[], int size) {
    int result = arr[0];
    for (int i = 1; i < size; i++) {
        result = gcd(result, arr[i]);
    }
    return result;
}

int main() {
    int arr[] = {12, 18, 24, 36};
    int size = sizeof(arr) / sizeof(arr[0]);

    int maxGCD = arrayGCD(arr, size);

    printf("数组的最大公因数为：%d\n", maxGCD);

    return 0;
}
```

在上述代码中，我们定义了两个函数：`gcd` 和 `arrayGCD`。

- `gcd` 函数是欧几里得算法的实现，用于计算两个数的最大公因数。它接受两个整数 `a` 和 `b` 作为参数，并使用递归方式来计算它们的最大公因数。当 `b` 等于 0 时，返回 `a`；否则，返回 `gcd(b, a % b)`，其中 `%` 表示取模运算。

- `arrayGCD` 函数用于计算一个整数数组的最大公因数。它接受一个整数数组 `arr` 和数组大小 `size` 作为参数。函数首先将数组的第一个元素赋值给 `result` 变量，然后使用循环遍历数组的剩余元素。对于每个元素，使用 `gcd` 函数计算当前元素与 `result` 的最大公因数，并将结果更新到 `result` 变量中。最终，返回 `result` 作为数组的最大公因数。

在 `main` 函数中，我们定义了一个整数数组 `arr`，并计算数组的大小。然后，调用 `arrayGCD` 函数来求解数组的最大公因数，并将结果打印输出。

### 数组的最小公倍数

如果已知一个数组的最大公因数，我们可以使用以下公式来计算数组的最小公倍数（LCM）：

```
LCM = (a * b) / GCD(a, b)
```

其中，`a` 和 `b` 是两个数，`GCD(a, b)` 是它们的最大公因数。

同理，对于一个数组，我们可以使用迭代的方式来计算多个数的最小公倍数。以下是一个求解数组最小公倍数的函数实现：

```c
#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

int lcm(int a, int b) {
    return (a * b) / gcd(a, b);
}

int arrayLCM(int arr[], int size) {
    int result = arr[0];
    for (int i = 1; i < size; i++) {
        result = lcm(result, arr[i]);
    }
    return result;
}

int main() {
    int arr[] = {3, 6, 9, 12};
    int size = sizeof(arr) / sizeof(arr[0]);

    int minLCM = arrayLCM(arr, size);

    printf("数组的最小公倍数为：%d\n", minLCM);

    return 0;
}
```

在上述代码中，我们定义了两个函数：`gcd` 和 `lcm`。

- `gcd` 函数是欧几里得算法的实现，用于计算两个数的最大公因数，与之前提到的函数相同。

- `lcm` 函数用于计算两个数的最小公倍数。它接受两个整数 `a` 和 `b` 作为参数，并使用公式 `(a * b) / gcd(a, b)` 来计算它们的最小公倍数。

- `arrayLCM` 函数用于计算一个整数数组的最小公倍数。它的实现与之前提到的 `arrayGCD` 函数类似，使用循环遍历数组的元素，并使用 `lcm` 函数计算当前元素与 `result` 的最小公倍数。

在 `main` 函数中，我们定义了一个整数数组 `arr`，并计算数组的大小。然后，调用 `arrayLCM` 函数来求解数组的最小公倍数，并将结果打印输出。
