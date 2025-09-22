#include <iostream>
using namespace std;
int main(){
    int size, n, num,mid, next,prev,ans;
    
    cout<< "enter size" << endl;
    cin >> size;
        
    int arr[size];
    int start = 0, end = size-1,count =0,smallest;

    cout<<"enter number to be searched" <<endl;
    cin>>num;

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
            smallest = mid;
            break;
        }
        else if(arr[mid]>start){
            start = mid+1;
        }
        else{
            end = mid-1;
        }
    }
    start = 0, end = smallest-1;

    while(start<=end){
        mid = start+(end-start)/2;
        if(arr[mid]==num){
            ans = mid;
            break;
        }
        else if(arr[mid]<num){
            start = mid+1;

        }
        else{
            end = mid-1;
        }
    }
    start = smallest, end = size-1;

    while(start<=end){
        mid = start+(end-start)/2;
        if(arr[mid]==num){
            ans = mid;
            break;
        }
        else if(arr[mid]<num){
            start= start+1;
        }
        else{
            end = end-1;
        }
    }

    cout << "tne index of element to be searched is "<<ans <<endl;
    
    return 0;
}