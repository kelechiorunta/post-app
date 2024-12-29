document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const moverightbtn = document.querySelector('.addright');
    const  moveleftbtn = document.querySelector('.addleft');
    const inputTodo = document.getElementById('input_todo');
    const addTodo = document.querySelector('.addtodo');
    // display.textContent = "Hello Kelechi"
    let val = 0;
    let newtask = '';
    let id_entry = 0
    let productStack = []//[{id:0, todo:"Get home on time"}];

    const todoList = (arr) => {
        const newArray = arr.map(item => 
            `<div key=${item.id}>
                <input type="checkbox" ${item.completed ? 'checked' : ''} />
                ${item.todo}
            </div>`
        );
        return newArray.join('');
    };

    // display.innerHTML = todoList(productStack);

    /**Button to add value to the beginining of the array */
    moveleftbtn.addEventListener('click', () => {
        display.textContent = //moveLeft([0], val).toString(); 
        val++})

    /**Input element */
        inputTodo.addEventListener('input', function(){
        newtask = this.value.trim();
        console.log(newtask)
    })

    /**Add todo button to add todos to the todo array */
    addTodo.addEventListener('click', () => {
        id_entry ++
        const addedTasks = addtoStack(productStack, {id: id_entry, todo: newtask, completed:false})
        display.innerHTML = `<ul>${todoList(addedTasks)}</ul>`
        inputTodo.value = "";
    })
        let newarr = [];
    const moveLeft = (arr, n) => {
        if (n < 0) {
            return arr; // Base case: When `n` is zero or less, return the modified array.
        } else {
            arr.push(-(n - 1)); // Add the element to the left of the array.
            return moveLeft(arr, n - 1); // Recursive call with updated `n`.
        }
    };

    const addtoStack = (arr, task) => {
        if (arr.length >= 5) {
            return arr
        } else {
            arr.push(task)
            return arr//addtoStack([task, ...arr], task )
        }
    }

    const removefromStack = (arr, id) => {

    }

    //     let newarr = [];
    // const moveleft = (arr, n) => {
    //     if (arr.length === 0) {
    //         return false
    //     }else if (n==0) {
    //         newarr.unshift(n-1)
    //         // arr.unshift(n-1)
    //         return  [...newarr, moveleft([...newarr], n-1)]
    //     }else if (n>=arr.length) {
    //         arr.push(n+1)
    //         return  moveleft([n-1, ...arr], n+1) 
    //     }else{
    //         return n--
    //         // return  [ moveleft([n-1, ...arr], n-1), ...arr]
    //     }
    // }

})