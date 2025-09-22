
#include <iostream>
using namespace std;
int main(){
    int size, n, num,mid;
    
    cout<< "enter size" << endl;
    cin >> size;

    cout<< "enter element to be searched" << endl;
    cin >> num;

    int arr[size];
    int start = 0, end = size-1,count =0;

    for(int i =0;i<size;i++){
        cout << "enter digit" << endl;
        cin >> n;
        arr[i] = n;
    }
// definiton includes that element which was supposed to be at i can be at i+1 or i-1 or i
    while(start<=end){
        mid = start+(end-start)/2;
        if(arr[mid]==num){
            cout << "element is at index " << mid<<endl;
            count++;
            break;
        }
        else if(arr[mid+1]==num){
            cout << "element is at index " << mid+1<<endl;
            count++;
            break;
        }
        else if(arr[mid-1]==num){
            cout << "element is at index " << mid-1<<endl;
            count++;
            break;
        }
        else if(arr[mid]<num){
            start = mid+2;
        }
        else{
            end = mid-2;
        }

    }
     
    if(count == 0){
        cout<<"not found";
    }
    return 0;
}
