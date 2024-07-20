# 递归快速求幂算法

## 依据

当使用递归实现快速求幂算法时，可以使用 KaTeX 表示递归公式如下：

$$
\text{power}(x, n) = \begin{cases}
1 & \text{if } n = 0 \\
\text{power}(x, \frac{n}{2}) \cdot \text{power}(x, \frac{n}{2}) & \text{if } n > 0 \text{ and } n \text{ is even} \\
x \cdot \text{power}(x, \frac{{n-1}}{2}) \cdot \text{power}(x, \frac{{n-1}}{2}) & \text{if } n > 0 \text{ and } n \text{ is odd}
\end{cases}
$$

在上述公式中，我们使用 $\text{power}(x, n)$ 表示计算 $x$ 的 $n$ 次幂的函数。根据不同的情况，公式给出了不同的计算方式。当 $n$ 等于 $0$ 时，幂值为 $1$，这是递归的终止条件。当 $n$ 为偶数时，我们将幂值分解为 $\text{power}(x, \frac{n}{2})$ 的平方。当 $n$ 为奇数时，我们将幂值分解为 $x$ 乘以 $\text{power}(x, \frac{{n-1}}{2})$ 的平方。

通过递归地应用这些规则，我们可以在每一步将幂值减半，并最终得到最终的幂值结果。

请注意，上述公式提供了快速求幂算法的基本思想和递归结构。在实际的编程实现中，我们通常会添加边界条件和处理一些特殊情况的代码来增加程序的健壮性和效率。

## 编程实现

在 C 语言中，可以使用递归或迭代的方式实现快速求幂算法。下面是两种方法的示例代码：

1. 递归实现：

```c
#include <stdio.h>

double power(double x, int n) {
    if (n == 0) {
        return 1;
    }
    if (n % 2 == 0) {
        double temp = power(x, n / 2);
        return temp * temp;
    } else {
        double temp = power(x, (n - 1) / 2);
        return x * temp * temp;
    }
}

int main() {
    double base = 2.0;
    int exponent = 10;
    double result = power(base, exponent);
    printf("%.2f^%d = %.2f\n", base, exponent, result);
    return 0;
}
```

在上述代码中，我们定义了一个名为 `power` 的函数，它接受一个浮点数 `x` 和一个整数 `n`，并返回 `x` 的 `n` 次幂。在递归实现中，我们首先处理递归终止条件，即当 `n` 等于 0 时，返回 1。然后，我们根据 `n` 的奇偶性递归计算幂值，通过调用 `power` 函数并将参数适当地减半。最后，我们根据递归结果进行乘法操作并返回最终结果。

在示例中，我们计算 2 的 10 次幂，并将结果打印输出。

2. 迭代实现：

```c
#include <stdio.h>

double power(double x, int n) {
    double result = 1.0;
    while (n > 0) {
        if (n % 2 == 1) {
            result *= x;
        }
        x *= x;
        n /= 2;
    }
    return result;
}

int main() {
    double base = 2.0;
    int exponent = 10;
    double result = power(base, exponent);
    printf("%.2f^%d = %.2f\n", base, exponent, result);
    return 0;
}
```

在迭代实现中，我们使用一个循环来计算幂值。我们初始化结果为 1，然后在每次循环中，根据 `n` 的奇偶性更新结果和底数 `x`。具体而言，如果 `n` 是奇数，我们将结果乘以 `x`；如果 `n` 是偶数，我们将 `x` 自乘。然后，我们将 `n` 除以 2，继续循环直到 `n` 变为 0。最后，我们返回最终结果。

在示例中，我们计算 2 的 10 次幂，并将结果打印输出。

这两种实现方法都可以高效地计算幂值，并且在时间空间复杂度上都为 $O(log n)$。
