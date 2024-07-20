# 前缀 - 后缀表达式的求值和转换

## 中缀表达式转前缀 - 后缀表达式

### 算法描述

当我们将中缀表达式转换为前缀表达式或后缀表达式时，我们可以使用栈来辅助操作。下面是对这两种转换算法的自然语言描述：

中缀表达式转后缀表达式的算法：

1. 初始化一个空栈和一个空字符串作为结果。
2. 从左到右扫描中缀表达式的每个字符。
3. 如果遇到操作数（数字或变量），将其添加到结果字符串中。
4. 如果遇到左括号，将其压入栈。
5. 如果遇到右括号，将栈中的元素弹出并添加到结果字符串，直到遇到左括号。将左括号从栈中弹出，但不将其添加到结果字符串中。
6. 如果遇到运算符，比较其与栈顶运算符的优先级：
   - 如果栈为空或栈顶是左括号，则将当前运算符压入栈。
   - 如果当前运算符的优先级高于栈顶运算符的优先级，则将当前运算符压入栈。
   - 如果当前运算符的优先级低于或等于栈顶运算符的优先级，则将栈顶运算符弹出并添加到结果字符串，然后重复此步骤，直到当前运算符的优先级大于栈顶运算符的优先级。
7. 将当前运算符压入栈。
8. 重复步骤 2-7，直到扫描完整个中缀表达式。
9. 将栈中剩余的运算符依次弹出并添加到结果字符串。

中缀表达式转前缀表达式的算法：

1. 初始化一个空栈和一个空字符串作为结果。
2. 从右到左扫描中缀表达式的每个字符。
3. 如果遇到操作数（数字或变量），将其添加到结果字符串中。
4. 如果遇到右括号，将其压入栈。
5. 如果遇到左括号，将栈中的元素弹出并添加到结果字符串，直到遇到右括号。将右括号从栈中弹出，但不将其添加到结果字符串中。
6. 如果遇到运算符，比较其与栈顶运算符的优先级：
   - 如果栈为空或栈顶是右括号，则将当前运算符压入栈。
   - 如果当前运算符的优先级高于栈顶运算符的优先级，则将当前运算符压入栈。
   - 如果当前运算符的优先级低于或等于栈顶运算符的优先级，则将栈顶运算符弹出并添加到结果字符串，然后重复此步骤，直到当前运算符的优先级大于栈顶运算符的优先级。
7. 将当前运算符压入栈。
8. 重复步骤 2-7，直到扫描完整个中缀表达式。
9. 将栈中剩余的运算符依次弹出并添加到结果字符串。
10. 反转结果字符串，即得到前缀表达式。

这些算法的关键点是遵循运算符的优先级和括号的匹配规则，并使用栈来保存运算符。通过按照上述步骤逐个处理中缀表达式的字符，我们可以将其转换为等效的前缀表达式或后缀表达式。

### 笔算技巧

以上用于程序设计思路，但对人不友好。如果在做题中，则可以使用一些技巧快速得到结果。比如，将中缀表达式 $a * (b + c) - d$ 转为前缀或者后缀表达式。

转换为前缀表达式思路如下：

1. 完善括号，为表达式中每一层级添加括号，要求每一个括号所在的层级内只能有一个运算符，成为 $((a * (b + c)) - d)$
2. 将每个括号里的运算符移到所在括号层级的外面左侧，成为 $-*(a+(b c)d)$
3. 去除括号，成为 $- * a + b c d$

转换为后缀表达式，步骤与转换为前缀的思路基本一致，只是在第二部，要把运算符移到所在括号层级的外面右侧，即成为 $((a  (b c)+) * d)-$，再去除括号称为 $a b c + * d -$

### 中缀转前缀、后缀的编程实现

```python
def is_operator(ch):
    return ch in ['+', '-', '*', '/']

def get_priority(ch):
    if ch in ['+', '-']:
        return 1
    elif ch in ['*', '/']:
        return 2
    return 0

def infix_to_postfix(infix_expression):
    stack = []
    postfix_expression = ""

    for ch in infix_expression:
        if ch == ' ':
            continue

        if ch.isalnum():
            postfix_expression += ch
        elif ch == '(':
            stack.append(ch)
        elif ch == ')':
            while stack and stack[-1] != '(':
                postfix_expression += stack.pop()
            if stack and stack[-1] == '(':
                stack.pop()
            else:
                print("非法的表达式")
                return
        elif is_operator(ch):
            while stack and get_priority(ch) <= get_priority(stack[-1]):
                postfix_expression += stack.pop()
            stack.append(ch)
        else:
            print("非法的表达式")
            return

    while stack:
        postfix_expression += stack.pop()

    return postfix_expression

def infix_to_prefix(infix_expression):
    stack = []
    prefix_expression = ""

    infix_expression = infix_expression[::-1]

    for ch in infix_expression:
        if ch == ' ':
            continue

        if ch.isalnum():
            prefix_expression += ch
        elif ch == ')':
            stack.append(ch)
        elif ch == '(':
            while stack and stack[-1] != ')':
                prefix_expression += stack.pop()
            if stack and stack[-1] == ')':
                stack.pop()
            else:
                print("非法的表达式")
                return
        elif is_operator(ch):
            while stack and get_priority(ch) < get_priority(stack[-1]):
                prefix_expression += stack.pop()
            stack.append(ch)
        else:
            print("非法的表达式")
            return

    while stack:
        prefix_expression += stack.pop()

    return prefix_expression[::-1]

# 测试代码
infix_expression = input("请输入中缀表达式：")

postfix_expression = infix_to_postfix(infix_expression)
print("后缀表达式：", postfix_expression)

prefix_expression = infix_to_prefix(infix_expression)
print("前缀表达式：", prefix_expression)

```

## 前缀、后缀表达式求值

前缀表达式和后缀表达式的求值算法都可以使用栈来实现。下面我将用自然语言描述这两种算法，并给出相应的 Python 代码实现。

1. 前缀表达式求值算法：
   - 创建一个空栈。
   - 从右到左遍历前缀表达式的每个字符：
     - 如果当前字符是数字，将其转换为整数并压入栈中。
     - 如果当前字符是运算符，从栈中弹出两个操作数，并根据当前运算符进行计算。将计算结果压入栈中。
   - 遍历结束后，栈中的唯一元素即为前缀表达式的求值结果。

下面是使用 Python 实现前缀表达式求值的代码示例：

```python
def evaluate_prefix(prefix_expression):
    stack = []

    for ch in reversed(prefix_expression):
        if ch.isdigit():
            stack.append(int(ch))
        else:
            operand1 = stack.pop()
            operand2 = stack.pop()

            if ch == '+':
                result = operand1 + operand2
            elif ch == '-':
                result = operand1 - operand2
            elif ch == '*':
                result = operand1 * operand2
            elif ch == '/':
                result = operand1 / operand2

            stack.append(result)

    return stack[0]

# 测试代码
prefix_expression = input("请输入前缀表达式：")

result = evaluate_prefix(prefix_expression)
print("求值结果：", result)
```

2. 后缀表达式求值算法：
   - 创建一个空栈。
   - 遍历后缀表达式的每个字符：
     - 如果当前字符是数字，将其转换为整数并压入栈中。
     - 如果当前字符是运算符，从栈中弹出两个操作数，并根据当前运算符进行计算。将计算结果压入栈中。
   - 遍历结束后，栈中的唯一元素即为后缀表达式的求值结果。

下面是使用 Python 实现后缀表达式求值的代码示例：

```python
def evaluate_postfix(postfix_expression):
    stack = []

    for ch in postfix_expression:
        if ch.isdigit():
            stack.append(int(ch))
        else:
            operand2 = stack.pop()
            operand1 = stack.pop()

            if ch == '+':
                result = operand1 + operand2
            elif ch == '-':
                result = operand1 - operand2
            elif ch == '*':
                result = operand1 * operand2
            elif ch == '/':
                result = operand1 / operand2

            stack.append(result)

    return stack[0]

# 测试代码
postfix_expression = input("请输入后缀表达式：")

result = evaluate_postfix(postfix_expression)
print("求值结果：", result)
```

在上述代码中，我们使用一个栈来存储操作数。遍历表达式中的每个字符，如果是数字，则将其转换为整数并压入栈中；如果是运算符，则从栈中弹出两个操作数，并根据当前运算符进行计算，将计算结果压入栈中。最后，栈中的唯一元素即为表达式的求值结果。

请注意，上述代码中假设了输入的表达式是合法的，并且没有处理除数为零的情况。在实际开发中，您可能需要添加额外的错误处理和边界情况的检查。
