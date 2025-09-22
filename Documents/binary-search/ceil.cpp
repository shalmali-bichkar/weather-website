
#include <iostream>
using namespace std;
int main(){
    int size, n, num,mid,ans;
    
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

    while(start <= end){
        mid = start+(end-start)/2;
        if(arr[mid]==num){
            ans = mid;
            break;
        }
        else if(arr[mid]>num){
            ans = mid;
            end = mid-1;
        }
        else{
            start = mid;
        }
        
        
    }
     
    cout<<"the element is" << arr[ans]<endl;
    return 0;
}