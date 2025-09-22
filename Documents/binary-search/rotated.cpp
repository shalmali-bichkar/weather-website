#include <iostream>
using namespace std;
int main(){
    int size, n, num,mid, next,prev;
    
    cout<< "enter size" << endl;
    cin >> size;
        
    int arr[size];
    int start = 0, end = size-1,count =0;

    for(int i =0;i<size;i++){
        cout << "enter digit" << endl;
        cin >> n;
        arr[i] = n;
    }

    while(start <= end){
        mid = start+(end-start)/2;
        next = (mid+1)/8;
        prev = (mid-1)/8;
        if(arr[mid]<arr[next]&& arr[mid]<arr[prev]){
            cout<< arr[mid] << endl;
            break;
        }
        else if(arr[mid]>start){
            start = mid+1;
        }
        else{
            end = mid-1;
        }


        
    }
    
    return 0;
}
