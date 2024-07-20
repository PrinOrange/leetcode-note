# 枚举指定范围内的所有质数

## 算法描述

要枚举 n 以内的所有质数，可以使用以下算法：

1. 创建一个布尔数组 $isPrime$，大小为 $n+1$，并将所有元素初始化为 $true$。
2. 将 $isPrime[0]$ 和 $isPrime[1]$ 设置为 false，因为它们不是质数。
3. 从 $2$ 开始，遍历数组中的每个元素 $i$，如果 $isPrime[i]$ 为 $true$，则将 $i$ 输出为一个质数，并将 $isPrime$ 数组中 $i$ 的倍数（除了 $i$ 本身）设置为 $false$，因为它们不是质数。
4. 继续步骤 3，直到遍历完整个数组。
5. 结束算法。

这个算法的基本思路是，从 $2$ 开始，逐个检查每个数是否为质数。如果是质数，则将其输出，并将其倍数标记为非质数。通过遍历整个数组，我们可以找到 $n$ 以内的所有质数。

其中最关键的是素数的判定。下面是一个简单的 `isPrime` 函数的实现方法：

```c
bool isPrime(int number) {
    if (number < 2) {
        return false;
    }

    for (int i = 2; i * i <= number; i++) {
        if (number % i == 0) {
            return false;
        }
    }

    return true;
}
```

这个 `isPrime` 函数接受一个整数 `number` 作为参数，并返回一个布尔值，表示该数是否为质数。

函数首先检查 `number` 是否小于 2，如果是，则直接返回 false，因为质数定义为大于等于 2 的正整数。

然后，使用一个循环从 2 开始，逐个检查从 2 到 `number` 的平方根之间的数是否能整除 `number`。如果找到一个能整除 `number` 的数，就返回 false，说明 `number` 不是质数。

如果循环结束后仍然没有找到能整除 `number` 的数，就返回 true，说明 `number` 是质数。

你可以在之前的代码中调用这个 `isPrime` 函数来判断每个数是否为质数。例如，在 `enumeratePrimes` 函数的内部循环中，可以使用 `if (isPrime[i])` 来判断 `i` 是否为质数。

## 编程实现

```c
#include <stdio.h>
#include <stdbool.h>

bool isPrime(int number) {
    if (number < 2) {
        return false;
    }

    for (int i = 2; i * i <= number; i++) {
        if (number % i == 0) {
            return false;
        }
    }

    return true;
}

void enumeratePrimes(int n) {
    bool isPrime[n+1];

    // 将所有元素初始化为 true
    for (int i = 0; i <= n; i++) {
        isPrime[i] = true;
    }

    isPrime[0] = false;
    isPrime[1] = false;

    // 枚举质数
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            printf("%d ", i);

            // 将 i 的倍数标记为非质数
            for (int j = i * 2; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
}

int main() {
    int n;

    printf("请输入一个正整数：");
    scanf("%d", &n);

    printf("n 以内的所有质数为：");
    enumeratePrimes(n);

    return 0;
}
```

在上面的代码中，我们定义了一个名为 `enumeratePrimes` 的函数，它接受一个正整数 $n$ 作为参数，并枚举出 n 以内的所有质数。

函数首先创建一个布尔数组 $isPrime$，大小为 $n+1$，并将所有元素初始化为 true。

然后，将数组中的 $isPrime[0]$ 和 $isPrime[1]$ 设置为 false，因为它们不是质数。

接下来，使用一个循环从 2 开始遍历数组中的每个元素 $i$。如果 $isPrime[i]$ 为 $true$，则将 $i$ 输出为一个质数，并将 $isPrime$ 数组中 $i$ 的倍数（除了 $i$ 本身）设置为 $false$，因为它们不是质数。

最后，在 `main` 函数中，我们从用户输入读取一个正整数，并调用 `enumeratePrimes` 函数来枚举出 $n$ 以内的所有质数。
