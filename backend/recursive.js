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