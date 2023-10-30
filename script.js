

let taskTitleEle = document.getElementById('title-input-field');
let taskDescEle = document.getElementById('desc-input-field');
let taskDueDateEle = document.getElementById('date-input-field');
let savedTaskDisplayDiv = document.getElementById('saved-task-display-div');
let completedTasksDisplayDiv = document.getElementById('completed-tasks-display-div');

 
// Saving a task 
document.getElementById('task-save-btn').addEventListener('click',function(){


    let taskTitleValue = taskTitleEle.value;
    let taskDescValue = taskDescEle.value;
    let taskDueDateValue = taskDueDateEle.value;

    let newTaskDiv = document.createElement('div');
    newTaskDiv.className = 'each-task-div';

    newTaskDiv.innerHTML = `

        <div class="saved-task-left-div">
            <h2 class="saved-task-title">${taskTitleValue}</h2>
            <p class="saved-task-desc">${taskDescValue}</p>
            <p class="saved-task-due-date"> Due-date: ${taskDueDateValue}</p>
        </div>

        <div class="saved-task-right-div">
            <button class="saved-task-btns saved-task-done-btn">Done 
                <img src="./assets/images/lightmode-done-icon.png" alt="" height="70%">
            </button>
            <button class="saved-task-btns saved-task-delete-btn" > Delete 
                    <img src="./assets/images/lightmode-delete-icon.png" alt="" height="70%">
            </button>
        </div>

    `

    // alert('working line 32');

    savedTaskDisplayDiv.appendChild(newTaskDiv);

    taskTitleEle.value = "";
    taskDescEle.value = "";
    taskDueDateEle.value = "";

})

// Delete tasks 
savedTaskDisplayDiv.addEventListener('click',function(event){

    if(event.target.classList.contains('saved-task-delete-btn')){
        let taskToBeDeleted = event.target.closest('.each-task-div');
        if(taskToBeDeleted){
            taskToBeDeleted.remove();
        }
    }
});


// complete tasks 
savedTaskDisplayDiv.addEventListener('click', function(event){

    if(event.target.classList.contains('saved-task-done-btn')){

        // fetch that div element from saved tasks list (which we need to place in completed lit)
        let taskToBeCompleted = event.target.closest('.each-task-div'); 

        if(taskToBeCompleted){

            // create a new div for this completed, and append it in the completed-task-display-div
            let newCompletedTaskDiv = document.createElement('div');
            newCompletedTaskDiv.className = `each-completed-task-div`;

            // note : '.value' works only for input (for div's or paras or headings use .textContent)
            let taskTitleValue = taskToBeCompleted.querySelector(".saved-task-title").textContent;
            let taskDescValue = taskToBeCompleted.querySelector(".saved-task-desc").textContent;
            let taskDueDateValue = taskToBeCompleted.querySelector(".saved-task-due-date").textContent;

            // fetch curr date (to write in completion date )
            const currentDate = new Date();
            day = currentDate.getDate();
            month = currentDate.getMonth() + 1;
            year = currentDate.getFullYear();
            let completionDate = `${month}-${day}-${year}`;


            // set the new div (to be placed in completion list)'s inner html
            newCompletedTaskDiv.innerHTML =  `

                <div class="completed-task-left-div">
                    <h3 class="completed-tasks-title">${taskTitleValue}</h3>
                    <p class="completed-tasks-desc"> ${taskDescValue} </p>
                    <p class="completion-date"> Completion Date : ${completionDate}</p>
                    <p class="due-date"> ${taskDueDateValue}</p>
                </div>

                <div class="completed-task-right-div">
                    <img class="completed-task-erase-img" src="./assets/images/trash-can-icon.svg" height="25px" alt="" style="cursor: pointer;">
                </div>
            `

            // append in into completion list
            completedTasksDisplayDiv.appendChild(newCompletedTaskDiv); 

            // remove the task from pending tasks list now 
            taskToBeCompleted.remove();
        }
    }
})


// function to erase a task from completed list
completedTasksDisplayDiv.addEventListener('click',function(event){

    // check if 'erase/remove' img is clicked for a task or not
    if(event.target.classList.contains('completed-task-erase-img')){

        // fetch closed completed task to that image, if there is one then remove it
        let taskToBeErased = event.target.closest('.each-completed-task-div');
        if(taskToBeErased){
            taskToBeErased.remove();
        }
    }
})



// search a task 


// Get the search input element and the container of saved tasks
// const searchInput = document.getElementById('search-bar-input-field');
// const savedTasksContainer = document.getElementById('saved-task-display-div');

// // Add event listener for input event
// searchInput.addEventListener('input', () => {
//     const searchQuery = searchInput.value.toLowerCase(); // Convert input to lowercase for case-insensitive comparison
    
//     // Get all task elements
//     const taskElements = savedTasksContainer.getElementsByClassName('each-task-div');

//     // Loop through task elements and check if the title matches the search query
//     for (const taskElement of taskElements) {
//         const taskTitle = taskElement.querySelector('.saved-task-left-div h2').innerText.toLowerCase();

//         // If the search query is found in the task title, display the task; otherwise, hide it
//         if (taskTitle.includes(searchQuery)) {
//             taskElement.style.display = 'block';
//         } else {
//             taskElement.style.display = 'none';
//         }
//     }
// });

