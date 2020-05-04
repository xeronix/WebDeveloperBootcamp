function average(arr) {
    var sum = 0;
    for (var i=0;i<arr.length;i++) {
        sum += arr[i];
    }
    
    console.log(Math.round(sum/arr.length));
}

var score1 = [34,45,67,89,100];
var score2 = [45,55,44,22,44,11,33,44];
average(score1);
average(score2);