#include <iostream>
using namespace std;

class Plus{
public:
    void plus(int a, int b){
        cout << a + b << endl;
    }

    void plus(int a, int b, int c){
        cout << a + b + c << endl;
    }
};

int main(){
    Plus p;

    p.plus(1, 2); // 3
    p.plus(1, 2, 3); // 6
}