#include<iostream>
using namespace std;
int main(){
    int rows,cols, count = 0, num;
    cout << "enter number of rows" << endl;
    cin >> rows;

    cout << "enter number of columns" << endl;
    cin >> cols;

    int arr[rows][cols];
    for(int i = 0;i<rows;i++){
        for(int j =0;j<cols;j++){
            cout<< "enter element" <<endl;
            cin >> arr[i][j];
        }
    }

    cout << "enter number to be searched" << endl;
    cin >> num;

    int i=0,j=cols-1;
    while(i>=0 && i<rows && j>=0 && j<cols){
        if(arr[i][j] == num){
            cout<< "the row is "<< i<<endl;
            cout<< "the column is " << j <<endl;
            count++;
            break;
        }
        else if(arr[i][j]>num){
            j--;
        }
        else{
            i++;
        }
    }

    if(count==0){
        cout<<"the number is not found"<<endl;
    }

}