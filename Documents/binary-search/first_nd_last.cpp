#include <iostream>
using namespace std;
int main(){
    int size, n, num,mid,last,first;
    
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
            start = mid+1;
        }
        else if(num < arr[mid]){
            end = mid-1;
        }
        else{
            first = mid;
            end = mid-1;
            count++;
        }
        
    }
    start = 0, end = size-1;
    int count1 =0;

    while(start <= end){
        mid = start+(end-start)/2;
        if(num> arr[mid]){
            start = mid+1;
        }
        else if(num < arr[mid]){
            end = mid-1;
        }
        else{
            last = mid;
            start = mid+1;
            count1++;
        }
        
    }
     
    if(count == 0){
        cout<<"not found";
    }
    else{
        cout << "first occurence is " << first <<endl;
    }

    if(count1 == 0){
        cout<<"not found";
    }
    else{
        cout << "last occurence is " << last <<endl;
    }

    int occurences = last-first+1;
    cout << "count is " << occurences <<endl;
    return 0;
}
