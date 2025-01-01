document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const moverightbtn = document.querySelector('.addright');
    const  moveleftbtn = document.querySelector('.addleft');
    const inputTodo = document.getElementById('input_todo');
    const addTodo = document.querySelector('.addtodo');
    const deleteTodo = document.querySelector('.deletetodo');
    const appendTodo = document.querySelector('.appendtodo');
    const appendDisplay = document.querySelector('.append_display');
    const timerdisplay = document.querySelector('.timer_display');
    const score = document.querySelector('.score');
    const container = document.querySelector('.container');
    const documentation = document.querySelector('.documentation');
    const game = document.querySelector('.game');
    const settings = document.querySelector('.settings');
    const player = document.querySelector('.player');
    const statistics = document.querySelector('.statistics');
    const board = document.querySelector('.board');
    const boardBtn = document.querySelector('.boardBtn');
    var timer = parseInt(timerdisplay.textContent);

    let val = 0;
    let newtask = '';
    var id_entry = 0 ;
    var id = 0;
    var addedTasks = [];
    let shuffledArr = [];
    let newArray = [];
    let trials = 0;
    var currentid;
    let productStack = []//[{id:0, todo:"Get home on time"}];
    var intervalId;
    var timeoutId;
    var currentSlide = -1;

    display.style.backgroundImage = `url(${'imgs/reflection.jpg'})`
    timerdisplay.style.color = 'red'
    timerdisplay.style.fontWeight = 'bold'

    const todoList = (arr) => {
        if (arr.length <= 0) {
            return arr
        }
        newArray = []
        newArray = arr.map((item, index) => 
            `<div>
                <input id=${index} class="task" type="checkbox" ${item.completed ? 'checked' : ''} />
                ${item.todo}
             </div>
            `
        );
        return newArray.join('');
    };

    /**Button to add value to the beginining of the array */
    moveleftbtn.addEventListener('click', () => {
        //display.textContent = //moveLeft([0], val).toString(); 
        //val++
        // appendDisplay.innerHTML = ""
    })

    /**Input element to input new task*/
        inputTodo.addEventListener('input', function(){
        newtask = this.value.trim();
        console.log(newtask)
    })

    /**Add todo button to add todos to the todo array */
    addTodo.addEventListener('click', () => {
        /**
         * Return an updated addedTaks array from the addtoStack algorithm
         */
        addedTasks = addtoStack(addedTasks, {id, todo: newtask, completed:false})
        /**
         * Displays the result in the dispaly element
         * Resets the inputTodo element to empty field
         * console logs the mapped elements of the task elements
         */
        display.innerHTML = `<ul>${todoList(addedTasks)}</ul>`
        inputTodo.value = "";
        console.log(document.querySelectorAll('ul div .task'))

        /**
         * if the task element exists, then assign a change event handler to register a 
         * callback that toggles the selected task element completed property to true or false
         * and returns the updated addedTaks array
         */
        if ( document.querySelectorAll('ul .task') && document.querySelectorAll('ul .task').length > 0) {
            document.querySelectorAll('ul .task').forEach((checkbox, index) => {
                checkbox.addEventListener('change', (event) => {
                    if (event.target.checked) {
                        currentid = checkbox.id-1;
                        addedTasks[index].completed =  true
                        // addedTasks[checkbox.id].completed = true
                        console.log(`Checkbox with ID: ${checkbox.id} is Selected`);
                    } else {
                        addedTasks[index].completed =  false
                        console.log(`Checkbox with ID: ${checkbox.id} is Deselected`);
                    }
                    return addedTasks
                });
            });
        }
        
    })

    /**Delete todo button to delete todos from the todo array */
    deleteTodo.addEventListener('click', () => {
        /**
         * Return a filteredTasks that filters the incompleted tasks of addedTasks array 
         */
        const filteredTasks = removefromStack(addedTasks);
        /**
         * Displays the result and updates the addedTasks
         */
        display.innerHTML = `<ul>${todoList(filteredTasks)}</ul>`
        addedTasks = filteredTasks
        
        // console log the updated addedTasks
        console.log(addedTasks)
        console.log(document.querySelectorAll('ul div .task'))

        /**
         * if the task element exists, then assign a change event handler to register a 
         * callback that toggles the selected task element completed property to true or false
         * and returns the updated addedTaks array
         */
        if ( document.querySelectorAll('ul .task') && document.querySelectorAll('ul .task').length > 0) {
            document.querySelectorAll('ul .task').forEach((checkbox, index) => {
                checkbox.addEventListener('change', (event) => {
                    if (event.target.checked) {
                        currentid = checkbox.id-1;
                        addedTasks[index].completed =  true
                        // addedTasks[checkbox.id].completed = true
                        console.log(`Checkbox with ID: ${checkbox.id} is Selected`);
                    } else {
                        addedTasks[index].completed =  false
                        console.log(`Checkbox with ID: ${checkbox.id} is Deselected`);
                    }
                    return addedTasks
                });
            });
        }
    })

    player.addEventListener('click', () => {
        container.remove();
        // container.style.display = 'none';
        document.body.append(statistics)
        statistics.style.display = 'block';
        settings.style.display = 'none'; 
        // const xml = new XMLHttpRequest();

        // xml.onload = function(){
        //     if (this.readyState === 4) {
        //         container.innerHTML = this.responseText;
        //     }
        // }
        // xml.open('GET', './Introduction.html');
        // xml.send();
    });

    documentation.addEventListener('click', () => {
        container.remove();
        // container.style.display = 'none';
        document.body.append(settings)
        settings.style.display = 'block';
        statistics.style.display = 'none';
        // const xml = new XMLHttpRequest();

        // xml.onload = function(){
        //     if (this.readyState === 4) {
        //         container.innerHTML = this.responseText;
        //     }
        // }
        // xml.open('GET', './Introduction.html');
        // xml.send();
    });

    game.addEventListener('click', async() => {
        
        // settings.style.display = 'none'; 
        settings.remove();
        statistics.remove();
        document.body.append(container)
        // container.style.display = 'block' 
        // const xml = new XMLHttpRequest();

        // xml.onload = function(){
        //     if (this.readyState === 4) {
        //         container.innerHTML = this.responseText;
        //         container.style.width = '50%';
        //     }
        // }
        // xml.open('GET', './algorithm.html');
        // xml.send();
    })

    const shuffle = () => {
        /**Reinitialize the appendDisplay and the shuffledArr toi be empty fields */
        appendDisplay.innerHTML = ''
        shuffledArr = []
        /**Append the updated shuffled Tasks array to the appendDisplay element */
        const shuffledTasks = shuffleArr(addedTasks);
        console.log(shuffledTasks);
        appendDisplay.innerHTML = `<ul>${todoList(shuffledTasks)}</ul>`;
        
        
        /**Compares the addedTasks and shuffledTasks Array. If they match, the player wins */
        if (compareList(addedTasks, shuffledTasks).isMatched) {
            appendDisplay.style.backgroundColor = 'green';
            clearInterval(intervalId);
            appendTodo.disabled=true;
            let result = parseInt(score.textContent);
            
            timeoutId = setTimeout(()=>{console.log("Bingo");
            alert(`Congratulations, you finally made it after \n${compareList(addedTasks, shuffledTasks).trials - 1} attempts and ${10 - parseInt(timerdisplay.textContent)} secs`);
             trials=0; timerdisplay.textContent='10'; result += 5; score.textContent = result; activateTimer(); shuffle()}, 1000);
        }
        else if (timer <= 0 && (timerdisplay.textContent==='0')) {
            appendDisplay.style.backgroundColor = 'red';
            appendTodo.disabled=true
        }
        else{
            timer = 10
            appendDisplay.style.backgroundColor = 'black';
            appendTodo.disabled=false
            clearTimeout(timeoutId);
            if (!intervalId && (timerdisplay.textContent==='10')){
                activateTimer();
            }
        }
    }

    /**Shuffles the shuffledTasks */
    appendTodo.addEventListener('click', shuffle)

    const activateTimer = () => {
        let result = parseInt(score.textContent);
        intervalId = setInterval(() => {
            timer = parseInt(timerdisplay.textContent);
            timer --; 
            timerdisplay.textContent = timer;

            if (timer==0){
                appendDisplay.style.backgroundColor = 'red';
            }

            if (timer < 0) {
                appendDisplay.style.backgroundColor = 'red';
                clearInterval(intervalId);
                alert("Sorry, time's up!");
                result -= 5;
                score.textContent = result;
                timer=10;
                appendDisplay.style.backgroundColor = 'black';
                appendTodo.disabled=false;
                trials = 0;
                timerdisplay.textContent='10';
                activateTimer();
                shuffle();
            }
        }, 1000)
    }

    const slides = ["0", "1", "2"
        // {id: 0, slide: './imgs/Logo9.png'},
        // {id: 1, slide: './imgs/Logo14.png'},
        // {id: 2, slide: './imgs/Logo15.png'},
    ]

    const createSlides = (arr_slides) => {
        currentSlide = (currentSlide + 1) 
        let result = currentSlide % (arr_slides.length);
        console.log(result)
            // Get the slider element
    let slider = document.querySelector('.slider');
    if (slider) {
        // Get all <img> elements inside the slider
        let images = slider.querySelectorAll('img');
        if (images && images[result]) {
            // Scroll the targeted image into view
            console.log("Found")
            images[result].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        } else {
            console.error('Target image not found!');
        }
    } else {
        console.error('Slider element not found!');
    }
        return recycleArr(arr_slides, result)
    } 

    boardBtn.addEventListener('click', () => {
        //  currentSlide++
        const slides = [
            {id: 0, slide: './imgs/Logo9.png'},
            {id: 1, slide: './imgs/Logo14.png'},
            {id: 2, slide: './imgs/Logo15.png'},
        ]
        
        let slideArray = createSlides(slides)
        board.innerHTML = "";
        board.innerHTML = `<div class='slider'>${slideArray.map(item => (`<img src=${item.slide} alt=${item.id} width=${100} height=${100}/>`))}</div>`
        
    })


    /**
     * ALGORITHM SECTION
     */

        let newarr = [];
    const moveLeft = (arr, n) => {
        if (n < 0) {
            return arr; // Base case: When `n` is zero or less, return the modified array.
        } else {
            arr.push(-(n - 1)); // Add the element to the left of the array.
            return moveLeft(arr, n - 1); // Recursive call with updated `n`.
        }
    };

    /**addtoStack algorithm that adds a task to the list of tasks and can only accept a maximum of five tasks */
    const addtoStack = (arr, task) => {
        if (arr.length >= 5) {
            return arr
        } else {
            id_entry ++
            const { id, todo, completed } = task
            arr.push({id:id_entry, todo, completed})
            return arr//addtoStack([task, ...arr], task )
        }
    }

    /** removefromStack algorithm that filters an array of all incompleted tasks*/
    const removefromStack = (arr) => {
        if (arr.length <= 0){
            return arr
        }else{
            const filteredarr = arr.filter(item => item.completed===false);
            return filteredarr;
        }
    }

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

    /**Compare array and return if they are in similar makeup */

    const compareList = (arr1, arr2) => {
        if (arr2.length <= 0 || arr1.length <= 0) {
            return arr2
        } else {
            trials ++
            let isMatched = arr2.every((item, index)=>item.id===arr1[index].id);
            console.log(isMatched.toString());
            return {isMatched, trials} 
        }

    }

    /**Recycles the array like a slide */

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
})
