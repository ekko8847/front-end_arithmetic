/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
 var deleteNode = function(node) {
   node.val=node.next.val;
   node.next=node.next.next;
};
//思想：1.将要删除的节点替换为下一个节点的值
//2.将指针指向下下个节点