const SERVER = "http://localhost:3000"

$(document).ready(function(){
    const token = localStorage.getItem("token")
    if(token){
        $("#register-page").hide()
        $("#login-page").hide()
        $("#homepage").show()
        $("#add-todo").show()
        listTodo()
        $("#show-footer").show()
    }else{
        $("#homepage").hide()
        $("#add-todo").hide()
        $("#list-todo").hide()
        $("#register-page").hide()
        $("#login-page").show()
        $("#show-footer").hide()
    }
})

//handle click here di login page
function showRegisterPage(){
    $("#register-page").show()
    $("#login-email").val("")
    $("#login-password").val("")
    $("#login-page").hide()
    
}

function register(e){
    e.preventDefault()
    const email = $("#register-email").val()
    const password = $("#register-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
            email,
            password
        }
    })
    .done(response=>{
        swal("Good Job!", "Your account has created", "success")
        $("#register-page").hide()
        $("#login-page").show()
    })
    .fail(err=>{
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

//handle click here di register page 
function showLoginPage(){
    $("#register-page").hide()
    $("#register-email").val("")
    $("#register-password").val("")
    $("#login-page").show()
}

function login(e){
    e.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email,
            password
        }
    })
    .done(response=>{
        swal("Login Success!", "You has signed in", "success")
        localStorage.setItem("token",response.access_token)
        $("#login-page").hide()
        $("#homepage").show()
        $("#getTodoById").hide()
        $("#add-todo").show()
        $("#add-title").val("")
        $("#add-description").val("")
        $("#due-date").val("")
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:'POST',
        url: SERVER + "/googleLogin",
        data:{
            id_token
        }
    })
    .done(response=>{
        swal("Login Success!", "You has signed in", "success")
        localStorage.setItem("token",response.access_token)
        $("#login-page").hide()
        $("#register-page").hide()
        $("#searchpage").hide()
        $("#homepage").show()
        $("#add-todo").show()
        $("#add-title").val("")
        $("#add-description").val("")
        $("#due-date").val("")
        $("#list-todo").empty()
        listTodo()
        $("#show-footer").show()
    })
    .fail(err=>{
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function listTodo(){
    const token = localStorage.getItem('token')
    $.ajax({
        method: "GET",
        url: `${SERVER}/todos`,
        headers:{
            token
        }
    })
    .done(response=>{
        response.data.forEach((todo, index)=>{
            $("#list-todo").append(`
            <div class="col-lg-3 mt-4">
                <div class="card bg-dark shadow-sm rounded">
                    <div class="card-header border-bottom border-info text-info">
                        <input type="checkbox" ${!todo.status?"":"checked"} id="todo-${todo.id}" class="checkbox" onclick="patchTodoById(${todo.id})">
                        <label for="todo-${todo.id}" id="todo-${todo.id}" class="card-title">    
                            <strong>#${index + 1} ${todo.title}</strong>
                        </label>
                    </div>
                    <div class="card-body text-light">
                        <p id="todo-${todo.id}" class="card-text">${todo.description}</p>
                        <a id="todo-${todo.id}" class="btn btn-outline-info" onclick="getTodoById(${todo.id})">Detail</a>
                        <a id="todo-${todo.id}" class="btn btn-outline-danger" onclick="deleteTodoById(${todo.id})">Delete</a>
                    </div>
                </div>
            </div>`)
            if(!todo.status) {
                $(`label#todo-${todo.id}.card-title`).css({"text-decoration":"none"});
                $(`p#todo-${todo.id}.card-text`).css({"text-decoration":"none"});
            }else{
                $(`label#todo-${todo.id}.card-title`).css({"text-decoration":"line-through"});
                $(`p#todo-${todo.id}.card-text`).css({"text-decoration":"line-through"});
            }
        })
        $("#list-todo").show()
    })
    .fail(err=>{
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function deleteTodoById(id){
    const token = localStorage.getItem('token')
    $.ajax({
        method: "DELETE",
        url: `${SERVER}/todos/${id}`,
        headers:{
            token
        }
    })
    .done(response=>{
        swal("Good job!", response.message, "success");
        $("#homepage").show()
        $("#add-todo").show()
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function patchTodoById(id){
    const token = localStorage.getItem('token')
    let status
    $(`#todo-${id}.checkbox`).change(function() {
        if(this.checked) {
            status = true
            $(`label#todo-${id}.card-title`).css({"text-decoration":"line-through"});
            $(`p#todo-${id}.card-text`).css({"text-decoration":"line-through"});
        }else{
            status = false
            $(`label#todo-${id}.card-title`).css({"text-decoration":"none"});
            $(`p#todo-${id}.card-text`).css({"text-decoration":"none"});
        }
        $.ajax({
            method: 'PATCH',
            url: `${SERVER}/todos/${id}`,
            data:{
                status
            },
            headers:{
                token
            }
        })
        .done(response=>{
            swal("Good Job!", `"${response.title}" has been updated to ${status?'done':'on going'}`, "success")
            $("#homepage").show()
            $("#add-todo").show()
            $("#list-todo").show()
        })
        .fail(err=>{
            swal("Oh no!", err.responseJSON.error, "error")
        })
    });
    
    
}

function getTodoById(id){
    const token = localStorage.getItem('token')
    $.ajax({
        method: "GET",
        url: `${SERVER}/todos/${id}`,
        headers:{
            token
        }
    })
    .done(response=>{
        console.log(response)
        $("#login-page").hide()
        $("#register-page").hide()
        $("#list-todo").hide()
        $("#add-todo").hide()
        $("#getTodoById").empty()
        $("#getTodoById").append(`
        <div class="d-flex justify-content-center align-items-center">
            <div class="p-2 shadow bg-light" style="height: 460px; width: 407px; border-radius: 10px;">
                <h2 align="center">Edit Todo</h2>
                <form class="" onsubmit="putTodo(event,${id})">
                    <div class="form-group">
                        <label for="title">Title</label><br>
                        <input class="form-control" type="text" value="${response.data.title}" id="edit-title">
                    </div>
                    <div class="form-group">    
                        <label for="description">Description</label><br>
                        <input class="form-control" type="text" value="${response.data.description}" id="edit-description">
                    </div>
                    <div class="form-group">
                        <label for="edit-status">Status</label><br>
                        <select class="custom-select" id="edit-status">
                        <option ${!response.data.status?"":"selected"} value="true">Done</option>
                        <option ${!response.data.status?"selected":""} value="false">On Going</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="due_date">Due date</label><br>
                        <input class="form-control" type="date" value="${new Date(response.data.due_date).toISOString().slice(0,10)}" id="edit-date">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-block btn-dark">Update</button>
                    </div>
                </form>
            </div>
        </div>
        `)
        $("#homepage").show()
        $("#getTodoById").show()
    })
    .fail(err=>{
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function putTodo(e, id){
    e.preventDefault()
    const token = localStorage.getItem("token")
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const due_date = $("#edit-date").val()
    const status = $("#edit-status").val()
    $.ajax({
        method: "PUT",
        url: `${SERVER}/todos/${id}`,
        data:{
            title,
            description,
            due_date,
            status
        },
        headers:{
            token
        }
    })
    .done(response=>{
        swal("Good Job!", `Your Todo has been updated`, "success")
        $("#getTodoById").hide()
        $("#homepage").show()
        $("#add-todo").show()
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function addTodo(e){
    e.preventDefault()
    const token = localStorage.getItem("token")
    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const due_date = $("#due-date").val()
    $.ajax({
        method: "POST",
        url: `${SERVER}/todos`,
        data:{
            title,
            description,
            due_date
        },
        headers:{
            token
        }
    })
    .done(response=>{
        swal("Good Job!", `"${response.data.title}" success added to your todo list`, "success")
        $("#add-title").val("")
        $("#add-description").val("")
        $("#due-date").val("")
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function signOut() {
    $("#homepage").hide()
    $("#add-todo").hide();
    $("#list-todo").hide();
}

//handle logout di navbar
function logout(e){
    //e.preventDefault();
    localStorage.clear();
    $("#homepage").hide();
    $("#add-todo").hide();
    $("#list-todo").hide();
    $("#login-page").show();
    $("#getTodoById").hide();
    $("#login-email").val("")
    $("#login-password").val("")
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        swal("Logout Success!", "You has signed out.", "success")
    });
}