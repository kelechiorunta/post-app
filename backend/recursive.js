//Sum of numbers from 1 to n

// Recursion
/**A function that calls itself */
// What It Is: Solve a problem by solving smaller instances of the same problem.
// When to Use:
// Tree/graph problems.
// Problems that naturally break into smaller subproblems.

const sum = (n) => {
    return n===0? 0: n + sum(n-1)
} 

console.log(sum(2))

/**Factorial of a no */

const factorial = (n) => {
    if (n <= 1){
        return 1
    }
    else {
        return n * factorial(n-1);
    }
}

console.log(factorial(6))

const rangeRandomNum = (firstNum, endNum) => {
    if (endNum <= firstNum) {
        return []
    } else {
        const randomNum = Math.floor(Math.random() * (endNum ))
        let rangeRandomArr = rangeRandomNum(firstNum, randomNum - 1);
        rangeRandomArr.push(endNum);
        return rangeRandomArr;
    }
}

console.log(rangeRandomNum(1, 100));

/**Sort an array in ascending order */
const sortArray = (arr) => {
    if (arr.length === 0) {
        return []; // Base case: return an empty array for an empty input.
    }

    // Find the minimum value in the array.
    const minValue = Math.min(...arr);

    // Remove the minimum value from the array (first occurrence only).
    const remainingArray = arr.filter((v, idx) => v !== minValue);

    // Recursively sort the remaining array and prepend the minimum value.
    return [minValue, ...sortArray(remainingArray)];
};

// Test the function
const testArray = [54, 23, 44, 9, 12, 11];
console.log(sortArray(testArray)); // Output: [3, 5, 7, 9, 11, 12]

const numbers = [5,6,1,2,4,3,7,8]
//Search for a number within a list
const recursive_binary_search = (list, len) => {
    if (list.length === 0) {
        return false
    }else{
        let sortedList = sortArray(list)
        let midpoint = Math.floor(sortedList.length / 2)
        const position = (numbers.indexOf(len))
        if (sortedList[midpoint] === len) {
            return {searchable: true, position: position}
        }
           
          else if (sortedList[midpoint] < len) {
            return recursive_binary_search(sortedList.slice(midpoint+1), len)
           }
           else {
            return recursive_binary_search(sortedList.slice(0, midpoint), len)
           }
        }
        
    }
console.log(recursive_binary_search(numbers, 7))

let shuffledArr = [];
    /**shuffles the array based on this recursive algorithm */
    const shuffleArr = (arr) => {
        if (arr.length <= 0) {
            return arr
        } else {
            let id = Math.floor(Math.random() * arr.length);
            shuffledArr.push(arr[id])
            let filteredArr = arr.filter(item => item !== arr[id])
            if (filteredArr.length === 0){
                return shuffledArr
            }else{
                return [...shuffleArr(filteredArr)]
            }
           
        }
    }

    const nums = [97, 24, 3, 5, 9];
    // console.log(shuffleArr(nums))
/**Reverse the array buildup */
    let swappedArr = [];
    const reverseArr = (arr) => {
        if (arr.length <= 0) {
            return arr
        } else {
            let last = arr[arr.length - 1]
            swappedArr.push(last);
            
            let filteredArr = arr.filter(item => item !==last);
    
            if (filteredArr.length <= 0) {
                return swappedArr;
            }else{
                return [...reverseArr(filteredArr)]
            }
        }
    }

    console.log(reverseArr(nums))

    const swapArr = (arr) => {
        if (arr.length <=0 ){
            return arr
        }else{
            let first = arr[0];
            let last = arr[arr.length -1]
            if (arr.length === 1) {
                return [first]
            }
            let middleArr = (arr.slice(1, -1));
            
            return [last, ...swapArr(middleArr), first]
        }
    }
const swaps = [23, 45, 33, 21, 50]
    console.log(swapArr(swaps))

const recycleArr = (arr, n) => {
    if (n <= 0 || n > arr.length) {
        return arr
    }else{
        let first = arr[0]
        arr.shift()
        let newArr = [...arr, first]
        return [...recycleArr(newArr, n-1)]
    }
}

const myStack = [1, 2, 3, 4];
console.log(recycleArr(myStack, 0))