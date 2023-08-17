

document.getElementById('save-task-btn').addEventListener('click',function(event){

    // fetch task's data
    let taskTitle = document.getElementById('task-title-input-field').value;
    let taskDesc = document.getElementById('task-desc-input-field').value;
    let taskDate = document.getElementById('date-field').value;
    // let taskDisplayList = document.getElementById('task-display-list');
    let taskDisplayDivContainer = document.getElementById('task-display-div-container');


    // create a new list div and add this data into that and add that div item into our task-display-div-container
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute("class", "task-div");
    taskDiv.innerHTML = `
        <strong> ${taskTitle} :- </strong> <br> ${taskDesc} <br> date : ${taskDate};
    `;
    taskDisplayDivContainer.appendChild(taskDiv);
    

    // Clear form inputs
    document.getElementById('task-title-input-field').value = '';
    document.getElementById('task-desc-input-field').value = '';
    document.getElementById('date-field').value = '';



})