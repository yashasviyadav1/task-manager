
let taskTitleEle = document.getElementById('title-input-field');
let taskDescEle = document.getElementById('desc-input-field');
let taskDueDateEle = document.getElementById('date-input-field');
let savedTaskDisplayDiv = document.getElementById('saved-task-display-div');
let completedTasksDisplayDiv = document.getElementById('completed-tasks-display-div');


// --------------------------------------------------
// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    displayTasksFromLocalStorage();
});

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const pendingTasks = savedTaskDisplayDiv.innerHTML; // fetch saved tasks and store them in loc storage
    localStorage.setItem('pendingTasks', pendingTasks);
    const completedTasks = completedTasksDisplayDiv.innerHTML; // fetch completed tasks and store them in loc storage 
    localStorage.setItem('completedTasks',completedTasks);
}

// Display tasks from local storage
function displayTasksFromLocalStorage() {  // fetch 
    if(localStorage.getItem('pendingTasks')){
        savedTaskDisplayDiv.innerHTML = localStorage.getItem('pendingTasks');
    }
    if(localStorage.getItem('completedTasks')){
        completedTasksDisplayDiv.innerHTML = localStorage.getItem('completedTasks');
    }
}

//-------------------------------------------

// Saving a task 
document.getElementById('task-save-btn').addEventListener('click',function(){

    let taskTitleValue = taskTitleEle.value;
    let taskDescValue = taskDescEle.value;
    let taskDueDateValue = taskDueDateEle.value;

    if(taskTitleValue.trim() == ''){
        alert('Task Title cant be empty');
    }
    
    else if(taskDescValue.trim() == ''){
        alert('Task Desciption cant be empty');
    }

    else if(taskDueDateValue.trim() == ''){
        alert('Task Due Date cant be empty');
    }

    else{
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
                </button>
                <button class="saved-task-btns saved-task-delete-btn" > Delete 
                </button>
            </div>

        `

        /* initially i used these 'bin' and 'tick' icons in the pending task buttons, but i removed them coz i dont like them now

            <img class="saved-task-done-icon" src="./assets/images/lightmode-done-icon.png" alt="" height="70%"> 
            <img class="saved-task-delete-icon" src="./assets/images/lightmode-delete-icon.png" alt="" height="70%">  
        */

        // alert('working line 32');

        savedTaskDisplayDiv.appendChild(newTaskDiv);

        saveTasksToLocalStorage(); // Save tasks to local storage after adding a new task

        taskTitleEle.value = "";
        taskDescEle.value = "";
        taskDueDateEle.value = "";
    }

})

// Delete tasks 
savedTaskDisplayDiv.addEventListener('click',function(event){

    if(event.target.classList.contains('saved-task-delete-btn')){
        let taskToBeDeleted = event.target.closest('.each-task-div');
        if(taskToBeDeleted){
            taskToBeDeleted.remove();
            
            saveTasksToLocalStorage(); // Save tasks to local storage after deletion
        }
    }
});



// Function to move pending task to completed tasks
function movePendingToCompleted(taskToBeCompleted) {
    if (taskToBeCompleted) {
        let newCompletedTaskDiv = document.createElement('div');
        newCompletedTaskDiv.className = `each-completed-task-div`;

        // Extract task details
        let taskTitleValue = taskToBeCompleted.querySelector(".saved-task-title").textContent;
        let taskDescValue = taskToBeCompleted.querySelector(".saved-task-desc").textContent;
        let taskDueDateValue = taskToBeCompleted.querySelector(".saved-task-due-date").textContent;

        // Fetch current date
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const completionDate = `${month}-${day}-${year}`;

        newCompletedTaskDiv.innerHTML = `
            <div class="completed-task-left-div">
                <h3 class="completed-tasks-title">${taskTitleValue}</h3>
                <p class="completed-tasks-desc">${taskDescValue}</p>
                <p class="completion-date"> Completion Date : ${completionDate}</p>
                <p class="due-date">${taskDueDateValue}</p>
            </div>
            <div class="completed-task-right-div">
                <img class="completed-task-erase-img" src="./assets/images/trash-can-icon.svg" height="25px" alt="" style="cursor: pointer;">
            </div>
        `;

        completedTasksDisplayDiv.appendChild(newCompletedTaskDiv);
        taskToBeCompleted.remove();
        saveTasksToLocalStorage(); // Save changes to local storage
    }
}

// Move pending tasks to completed tasks
savedTaskDisplayDiv.addEventListener('click', function (event) {
    if (event.target.classList.contains('saved-task-done-btn')) {
        let taskToBeCompleted = event.target.closest('.each-task-div');
        movePendingToCompleted(taskToBeCompleted);
    }
});


// function to erase a task from completed list
completedTasksDisplayDiv.addEventListener('click',function(event){

    // check if 'erase/remove' img is clicked for a task or not
    if(event.target.classList.contains('completed-task-erase-img')){

        // fetch closed completed task to that image, if there is one then remove it
        let taskToBeErased = event.target.closest('.each-completed-task-div');
        if(taskToBeErased){
            taskToBeErased.remove();

            saveTasksToLocalStorage(); // Save changes to local storage
        }
    }
})



