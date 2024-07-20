# C 语言处理字符串的一些方法

## char 与 int 互换

首先可以用 `char` 类型的 **单个数字** 减去单字符 `0` 的 ASCII 码，实现 `char` 转为 `int`.

```c
char c = '9';
int num = c - '0'; // 现在 num 是 int 类型的 9.
```

同理，**只有个位的数字** 的 `int` 加上 `0` 字符的 ASCII 码，也可以实现 `int` 到 `char` 的转换。

```c
int num = 9;
char c = num + '0'; // 现在 c 是 char 类型的 '9'.
```

## 字符数组与数字类型互换

- `itoa()`：将整型值转换为字符串。相应的还有 `atoi()` 方法。下面的也可等同。
- `ltoa()`：将长整型值转换为字符串。
- `ultoa()`：将无符号长整型值转换为字符串。
- `gcvt()`：将浮点型数转换为字符串，取四舍五入。
- `ecvt()`：将双精度浮点型值转换为字符串，转换结果中不包含十进制小数点。
- `fcvt()`：指定位数为转换精度，其余同 `ecvt()` 。

## ctype.h 中的常用方法

- `int isalnum(int c)`
  该函数检查所传的字符是否是字母和数字。
- `int isalpha(int c)`
  该函数检查所传的字符是否是字母。
- `int isdigit(int c)`
  该函数检查所传的字符是否是十进制数字。
- `int islower(int c)`
  该函数检查所传的字符是否是小写字母。
- `int ispunct(int c)`
  该函数检查所传的字符是否是标点符号字符。
- `int isspace(int c)`
  该函数检查所传的字符是否是空白字符。
- `int isupper(int c)`
  该函数检查所传的字符是否是大写字母。
- `int isxdigit(int c)`
  该函数检查所传的字符是否是十六进制数字。
- `int tolower(int c)`
  该函数把大写字母转换为小写字母。
- `int toupper(int c)`
  该函数把小写字母转换为大写字母。

## string.h 的一些方法

- `void *memchr(const void *str, int c, size_t n)`
  在参数 str 所指向的字符串的前 n 个字节中搜索第一次出现字符 c（一个无符号字符）的位置。
- `int memcmp(const void *str1, const void *str2, size_t n)`
  把 str1 和 str2 的前 n 个字节进行比较。
- `void *memcpy(void *dest, const void *src, size_t n)`
  从 src 复制 n 个字符到 dest。
- `void *memmove(void *dest, const void *src, size_t n)`
  另一个用于从 src 复制 n 个字符到 dest 的函数。
- `void *memset(void *str, int c, size_t n)`
  复制字符 c（一个无符号字符）到参数 str 所指向的字符串的前 n 个字符。
- `char *strcat(char *dest, const char *src)`
  把 src 所指向的字符串追加到 dest 所指向的字符串的结尾。
- `char *strncat(char *dest, const char *src, size_t n)`
  把 src 所指向的字符串追加到 dest 所指向的字符串的结尾，直到 n 字符长度为止。
- `char *strchr(const char *str, int c)`
  在参数 str 所指向的字符串中搜索第一次出现字符 c（一个无符号字符）的位置。
- `int strcmp(const char *str1, const char *str2)`
  把 str1 所指向的字符串和 str2 所指向的字符串进行比较。
- `int strncmp(const char *str1, const char *str2, size_t n)`
  把 str1 和 str2 进行比较，最多比较前 n 个字节。
- `int strcoll(const char *str1, const char *str2)`
  把 str1 和 str2 进行比较，结果取决于 LC_COLLATE 的位置设置。
- `char *strcpy(char *dest, const char *src)`
  把 src 所指向的字符串复制到 dest。
- `char *strncpy(char *dest, const char *src, size_t n)`
  把 src 所指向的字符串复制到 dest，最多复制 n 个字符。
- `size_t strcspn(const char *str1, const char *str2)`
  检索字符串 str1 开头连续有几个字符都不含字符串 str2 中的字符。
- `char *strerror(int errnum)`
  从内部数组中搜索错误号 errnum，并返回一个指向错误消息字符串的指针。
- `size_t strlen(const char *str)`
  计算字符串 str 的长度，直到空结束字符，但不包括空结束字符。
- `char *strpbrk(const char *str1, const char *str2)`
  检索字符串 str1 中第一个匹配字符串 str2 中字符的字符，不包含空结束字符。也就是说，依次检验字符串 str1 中的字符，当被检验字符在字符串 str2 中也包含时，则停止检验，并返回该字符位置。
- `char *strrchr(const char *str, int c)`
  在参数 str 所指向的字符串中搜索最后一次出现字符 c（一个无符号字符）的位置。
- `size_t strspn(const char *str1, const char *str2)`
  检索字符串 str1 中第一个不在字符串 str2 中出现的字符下标。
- `char *strstr(const char *haystack, const char *needle)`
  在字符串 haystack 中查找第一次出现字符串 needle（不包含空结束字符）的位置。
- `char *strtok(char *str, const char *delim)`
  分解字符串 str 为一组字符串，delim 为分隔符。
