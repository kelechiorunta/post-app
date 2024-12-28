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

//Search for a number within a list
const recursive_binary_search = (list, len) => {
    if (list.length === 0) {
        return false
    }else{
        let midpoint = Math.floor(list.length / 2)
        if (list[midpoint] === len) {
            return midpoint
        }
           
          else if (list[midpoint] < len) {
            return recursive_binary_search(list.slice(midpoint+1), len)
           }
           else {
            return recursive_binary_search(list.slice(0, midpoint), len)
           }
        }
        
    }
const numbers = [1,2,3,4,5,6,7,8]
// console.log(recursive_binary_search(numbers, 9))

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
