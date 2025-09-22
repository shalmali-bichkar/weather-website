#include <iostream>
using namespace std;
int main(){
    int size, n, num,mid;
    
    cout<< "enter size" << endl;
    cin >> size;

    cout<< "enter element in sorted order" << endl;
    cin >> num;

    int arr[size];
    int start = 0, end = size-1,count =0;

    for(int i =0;i<size;i++){
        cout << "enter digit" << endl;
        cin >> n;
        arr[i] = n;
    }

    while(start <= end){
        mid = start+(end-start)/2;
        if(num> arr[mid]){
            end = mid-1;
        }
        else if(num < arr[mid]){
            start = mid+1;
        }
        else{
            cout << "number found at index " << mid << endl;
            count++;
            break;
        }
        
    }
     
    if(count == 0){
        cout<<"not found";
    }
    return 0;
}
