
let addBtnEl=document.getElementById("addBtn");
let todoItemsContainerEl=document.getElementById("todoItemsContainer");
let saveBtnEl=document.getElementById("SaveBtn");
function getItemFromLocalStroage(){
    let parsedList=JSON.parse(localStorage.getItem("taskList"));
    if(parsedList===null){
        return []
    }
    else{
        return parsedList
    }
}
let tasklist=getItemFromLocalStroage();


function saveListToLocalStroage(){
    localStorage.setItem("taskList",JSON.stringify(tasklist))
}
saveBtnEl.addEventListener("click",saveListToLocalStroage)

function displayTasksItems(eachItem){
    let todoId="todoItem"+eachItem.id;
    let taskId="task"+eachItem.id;
    let checkboxId="checkbox"+eachItem.id;
    let deleteItemId="delete"+eachItem.id

    let listItemContainerEl=document.createElement("li");
    listItemContainerEl.style.listStyleType="none";
    listItemContainerEl.setAttribute("id",todoId)
    todoItemsContainerEl.appendChild(listItemContainerEl);
    
    let itemContainerEl=document.createElement("div");
    itemContainerEl.classList.add("item-container");

    listItemContainerEl.appendChild(itemContainerEl);
     
    let checkboxContainerEl=document.createElement("div");
    checkboxContainerEl.classList.add("checkbox-style")
    itemContainerEl.appendChild(checkboxContainerEl);
     
    let checkboxEl=document.createElement("input");
    checkboxEl.type="checkbox";
    checkboxEl.setAttribute("id",checkboxId);
    checkboxEl.classList.add("form-control")
    checkboxContainerEl.appendChild(checkboxEl);
    

    let taskContainerEl=document.createElement("div");
    taskContainerEl.classList.add("todo-task-container");
    taskContainerEl.setAttribute("for",checkboxId);//using for attribute
    taskContainerEl.setAttribute("id",taskId);
    itemContainerEl.appendChild(taskContainerEl);

    let contentEl=document.createElement("h5");
    contentEl.textContent=eachItem.text;
    taskContainerEl.appendChild(contentEl);
    
    if(eachItem.checkboxState==="checked"){
        checkboxEl.checked=true;
        contentEl.classList.add("text-style")
    }
    else if(eachItem.checkboxState==="unchecked"){
        checkboxEl.checked=false;
        contentEl.classList.remove("text-style")
    };


    checkboxEl.addEventListener("click",()=>{
        contentEl.classList.toggle("text-style");
        if(checkboxEl.checked){
            eachItem.checkboxState="checked";
        }
        else{
            eachItem.checkboxState="unchecked"
        }
    }
    )//adding event to checkboxElement

    contentEl.addEventListener("click",(checkboxId,todoId)=>{
        
        if(checkboxEl.checked){
            checkboxEl.checked=false;
            contentEl.classList.add("text-style");
            eachItem.checkboxState="unchecked";
        }
        else{
            checkboxEl.checked=false;
            contentEl.classList.remove("text-style");
            eachItem.checkboxState="checked";
        }
        
})//Adding event to taskContainer up on click chekcbox   and content will change

    let deleteContainerEl=document.createElement("div");
    deleteContainerEl.setAttribute("id",deleteItemId);
    taskContainerEl.appendChild(deleteContainerEl);

    let deleteItemEl=document.createElement("i");
    deleteItemEl.classList.add("fa-solid","fa-trash");
    deleteContainerEl.appendChild(deleteItemEl);

    deleteContainerEl.addEventListener("click",()=>{
        todoItemsContainerEl;
        listItemContainerEl;
        todoId;
        todoItemsContainerEl.removeChild(listItemContainerEl);
        let removeItemIndex=tasklist.findIndex((eachObj)=>{
            let todoObjId="todo"+eachObj.id
            if(todoId===todoObjId){
                return true;
            }
        })
        tasklist.splice(removeItemIndex,1);
        
        
        

    })
    

}
addBtnEl.addEventListener("click",()=>{
    let userInputEl=document.getElementById("userInput");
    let newtodoInput=userInputEl.value;
    let newId=tasklist.length+1;
    if(newtodoInput===""){
        alert("Enter valid text"
        );
        return;
    }
        let newTask={
            text:newtodoInput,
            id:newId,
            checkboxState:"unchecked"
        }
    
    tasklist.push(newTask);
    displayTasksItems(newTask);
    newtodoInput="";
}

);


for(let eachTask of tasklist){
    displayTasksItems(eachTask);
}




