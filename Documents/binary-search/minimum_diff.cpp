#include<iostream>
using namespace std;
int main(){
    int size, n, num,mid, diff, diff_indx;
    
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

    while(start<=end){
        mid = (start)+((end-start)/2);
        if(arr[mid]==num){
            diff = 0;
            diff_indx = mid;
            count++;
            break;
        }
        else if(arr[mid]<num){
            start = mid+1;
        }
        else{
            end = mid-1;
        }
    }

    if(count!=0){
        if((start-num)>(num-end)){
            diff = start-num;
            diff_indx = start;
        }
        else{
            diff = num-end;
            diff_indx = end;
        }
    }

    cout << diff << endl;
    cout << diff_indx << endl

    
    
}
