#include <iostream>
using namespace std;

int binary_search(int arr[],int start,int end,int num){
    int mid;
    while(start<=end){
        mid = start +(end-start)/2;
        if(arr[mid]==num){
            return mid;
        }
        else if(arr[mid]>num){
            end = end-1;
        }
        else{
            start = start+1;
        }
        
    }
    return -1;
}
int main(){
    int size, n, num,mid,ans, prev, next,pos,res;
    
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
        mid =start+(end-start)/2;
        prev = mid-1;
        next = mid+1;
        if(mid >0 && mid < size-1){
            if(arr[mid]>arr[prev] && arr[mid]>arr[next]){
                ans = arr[mid];
                pos =mid;
                break;
            }
            else if(arr[prev]>arr[mid]){
                end = mid-1;
            }
            else if(arr[next]> arr[mid]){
                start = mid+1;
            }

        }
        else if(mid == 0){
            if(arr[0]>arr[1]){
                ans = arr[mid];
                pos =mid;
            }
        }
        else if(mid == size-1){
            if(arr[mid-1]<arr[mid]){
                ans = arr[mid];
                pos =mid;
            }
        }
        else{
            ans = -1;
        }
    }

    cout<<"the peak element is "<<ans<<endl;

    res = binary_search(arr,0,pos,num);
    
    if(res!=-1){
        cout<<"the element is at position" <<res<<endl;
    }
    else{
        res = binary_search(arr,pos+1,size-1,num);
        if(res!=1){
            cout<<"the element is at position"<<res<<endl;
        }
        else{
            cout<<"not found"<<endl;
        }
    }
    
    
}
