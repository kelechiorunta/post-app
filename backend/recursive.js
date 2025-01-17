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
console.log(recycleArr(myStack, 1))

const insertNext = (arr, n) => {
    if (n<=0) {
        return arr
    }else{
        
         let newarr = arr.filter(num => num !== Math.min(...arr))
         let minmus = Math.min(...arr)
        //  console.log(newarr)
        
        return  [minmus, ...insertNext(newarr, n-1)]
    }
}
const checkNumbers = [2, 7, 1, 5, 3]
console.log(insertNext(checkNumbers, checkNumbers.length))


/**Sorry this is a different algorithm not a recursive function due to more space and more memory utilization as a result of more stacks */
const arraySubtraction = (arr) => {
    if (arr.length === 1) {
        // Base case: return the last remaining number
        return arr[0];
    }

    const maxNo = Math.max(...arr); // Find the largest number
    // Remove only one occurrence of the maximum value
    const index = arr.indexOf(maxNo);
    const newArr = [...arr.slice(0, index), ...arr.slice(index + 1)];
    console.log(`Max: ${maxNo}, New Array: ${newArr}`);

    // Subtract the next recursive result directly from maxNo
    return maxNo - newArr.reduce((sum, num) => sum + num, 0);
};

// Example usage
const arrSub = [1, 3, 7, 9]; // Expected: 10 - 7 - 5 - 3 = -5
// console.log(arraySubtraction(arrSub)); // Output: -5

/**This is a non-tail recursive version of the arraySubtraction
 * because the return value does not just make a single
 * recursive call. Time complexity becomes O(n) and auxillary
 * space is O(n) as it uses up more stacks.
 */

let result = 0;
const arraySubNR = (arr) => {
    if (arr[0] == undefined) {
        arr = [];
        console.log(arr, result, arr[0])// 
        return result - 12
    } else if (arr.length > 0) {
    
        let newArr = arr.filter(item => item !== arr[0]);
        
        if (result === undefined || result === 0) {
            result = arr[0] //- newArr[0]
        }else{
            result -= arr[0]
        }

    // console.log(newArr, result )
    
    /**This does not return a single recursive call but a 
     * series of recursive calls until the (newArr length is 0)-which is the base call.
     * This series will lead to additional stacks and auxillary space/memories
     * for the process to run to completion. Time complexity is O(n) and space auxillary is O(n);
     */
    return  (result - arraySubNR(newArr))
}
}
console.log(arraySubNR([11, 3, 7, 9]))
//  console.log(arraySubNR([12,20,34, 55, 75]))


/**Tail recursive function of arraySubtraction
 * This is because it returns a recursive call once
 * at the end of the function thereby being more optimized
 * as time and space complexity becomes 0(n) while auxillary space
 * is 0(1)- constant space and time execution like an iteration algorithm
 */
/**Optimized recursive function */
const arraySubTR = (arr, a) => {
    if (arr.length === 0) {
        return a
    } else {
        let maxValue = Math.max(...arr);
        let newArr = arr.filter(item => item !== maxValue);
        // console.log(newArr, maxValue, a)
        if (a===0) {
            a = maxValue
        } else{
            a = a-maxValue
        }
        //Recursive function called once
        return arraySubTR(newArr, a)
    }
}

const arraySub = (arr) => {
    return arraySubTR(arr, 0)
}

// console.log(arraySub([12,20,34, 55, 75]))

const argSum = (...args) => {
    if ([...args].length <= 0){
        return 0
    }
    let first = [...args][0]
    let newArr = [...args].filter(num => num != [...args][0]);
    return first + argSum(...newArr)
}

console.log(argSum(1,2,3,4,5,6))

const quickSort = (arr, low, high) => {
    if (low >= high) {
        return arr
    }
    const partition = (arr, low, high) => {
       
        let pivot = arr[Math.floor((low + high) / 2)]; // Choose the middle element as pivot
        let i = low;
        let j = high;

        while (i <= j) {
            // Find elements on the wrong side of the pivot
            while (arr[i] < pivot) i++;
            while (arr[j] > pivot) j--;
      
            // Swap elements and move pointers
            if (i <= j) {
                
              [arr[i], arr[j]] = [arr[j], arr[i]];
              console.log(arr[i],arr[j])
              i++;
              j--;
              
            }
          }
          return i; // Return the index where partitioning ends
        };
        const partitionIndex = partition(arr, low, high);

        // Recursively sort left and right subarrays
        quickSort(arr, low, partitionIndex - 1);
        quickSort(arr, partitionIndex, high);
    }
// Usage example
const array = [3, 6, 8, 10, 1, 77, 54, 23, 2, 1];
quickSort(array, 0, array.length - 1);
console.log(array); // Outputs a sorted array: [1, 1, 2, 3, 6, 8, 10]
