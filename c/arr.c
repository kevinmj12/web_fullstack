#include <stdio.h>

// void func(int *pArr){
//     for (int i = 0; i < 5; i++){
//         printf("%d \n", *(pArr + i));
//     }
// }

// int main(){
//     int arr[5] = {1, 2, 3, 4, 5};

//     func(arr);
// }

// output
// 1 
// 2 
// 3
// 4
// 5

// int plus(int a, int b){
//     return a + b;
// }

// int main(){
//     int (*fPtr)(int pa, int pb); // 함수 포인터
//     fPtr = plus;

//     printf("%d", fPtr(3, 5)); // 8
// }

int add(int a, int b);
int minus(int a, int b);
int multiple(int a, int b);
int divide(int a, int b);

int main(){
    add(1, 2);
    minus(4, 3);
    multiple(5, 6);
    divide(8, 3);
}