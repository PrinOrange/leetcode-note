# 链表

## 编程实现

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct
{
    struct LinkNode *next;
    int data;
} LinkNode;

LinkNode *createNode()
{
    LinkNode *node = (LinkNode *)malloc(sizeof(LinkNode));
    node->next = NULL;
    return node;
}

void insert(LinkNode *head, int data)
{
    LinkNode *currentNode = head;
    LinkNode *newNode = createNode();
    newNode->data = data;
    while (currentNode->next != NULL)
    {
        currentNode = currentNode->next;
    }
    currentNode->next = newNode;
}

void delete(LinkNode **head, int index)
{
    if (*head == NULL || index < 1)
    {
        return;
    }

    LinkNode *currentNode = *head;
    if (index == 1)
    {
        *head = currentNode->next;
    }
    else
    {
        LinkNode *prev = NULL;
        for (int i = 1; i < index && currentNode != NULL; i++)
        {
            prev = currentNode;
            currentNode = currentNode->next;
        }
        if (currentNode == NULL)
        {
            return;
        }
        prev->next = currentNode->next;
    }
    destroyNode(currentNode);
}

void traverse(LinkNode *head)
{
    LinkNode *currentNode = head;
    while (currentNode != NULL)
    {
        printf("%d ", currentNode->data);
        currentNode = currentNode->next;
    }
    printf("\nTraverse END...\n");
}

void destroy(LinkNode *head)
{
    LinkNode *currentNode = head;
    while (currentNode != NULL)
    {
        LinkNode *nextNode = currentNode->next;
        free(currentNode);
        currentNode = nextNode;
    }
}

int getLength(LinkNode *head)
{
    int len = 0;
    LinkNode *currentNode = head;
    while (currentNode != NULL)
    {
        len++;
        currentNode = currentNode->next;
    }
    return len;
}

void destroyNode(LinkNode *node)
{
    free(node);
}

int get(LinkNode *head, int index)
{
    if (head == NULL || index < 1)
    {
        return -1;
    }

    LinkNode *currentNode = head;
    int currentIndex = 1;
    while (currentNode != NULL && currentIndex < index)
    {
        currentNode = currentNode->next;
        currentIndex++;
    }

    if (currentNode != NULL)
    {
        return currentNode->data;
    }
    else
    {
        return -1;
    }
}

int main()
{
    int data[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    int len = (sizeof(data) / sizeof(int));
    LinkNode *prevNode = NULL;
    LinkNode *currentNode = NULL;
    LinkNode *head = NULL;
    for (int i = 0; i < len; i++)
    {
        currentNode = createNode();
        if (head == NULL)
        {
            head = currentNode;
        }
        if (prevNode != NULL)
        {
            prevNode->next = currentNode;
        }
        currentNode->data = data[i];
        prevNode = currentNode;
    }
    traverse(head);
    insert(head, 10);
    traverse(head);
    printf("The length is %d\n", getLength(head));
    traverse(head);
    delete (head, 11);
    traverse(head);
    printf("The %d th data is %d", 5, get(head, 5));
    destroy(head);

    return 0;
}

```
