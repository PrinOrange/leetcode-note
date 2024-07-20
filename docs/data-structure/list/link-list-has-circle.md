# 检测链表是否有环

## 快慢双指针法

快慢双指针法的思路是：在链表中安置一个快指针和一个慢指针。快指针一次移动两步，慢指针一次移动一步。然后在无线循环内执行以下判断。

- 如果快指针或者慢指针指向了 `null` ，则停止程序，说明链表中无环。
- 如果快指针和慢指针在同一节点相遇，即同时指向一个节点，则停止程序，说明链表中有环。

```c
bool hasCycle(struct ListNode *head) {
    if (head == NULL) {
        return false;
    }

    struct ListNode *slowPtr, *fastPtr;
    slowPtr = head;
    fastPtr = head->next;

    while (fastPtr != NULL && fastPtr->next != NULL) {
        if (slowPtr == fastPtr) {
            return true;
        }
        slowPtr = slowPtr->next;
        fastPtr = fastPtr->next->next;
    }

    return false;
}
```

## 哈希表法

最容易想到的方法是遍历所有节点，每次遍历到一个节点时，判断该节点此前是否被访问过。

具体地，我们可以使用哈希表来存储所有已经访问过的节点。每次我们到达一个节点，如果该节点已经存在于哈希表中，则说明该链表是环形链表，否则就将该节点加入哈希表中。重复这一过程，直到我们遍历完整个链表即可。

```c
struct hashTable {
    struct ListNode* key;
    UT_hash_handle hh;
};

struct hashTable* hashtable;

struct hashTable* find(struct ListNode* ikey) {
    struct hashTable* tmp;
    HASH_FIND_PTR(hashtable, &ikey, tmp);
    return tmp;
}

void insert(struct ListNode* ikey) {
    struct hashTable* tmp = malloc(sizeof(struct hashTable));
    tmp->key = ikey;
    HASH_ADD_PTR(hashtable, key, tmp);
}

bool hasCycle(struct ListNode* head) {
    hashtable = NULL;
    while (head != NULL) {
        if (find(head) != NULL) {
            return true;
        }
        insert(head);
        head = head->next;
    }
    return false;
}
```
