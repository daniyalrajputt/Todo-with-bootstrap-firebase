var database = firebase.database().ref('/')
var getInput = document.getElementById('demo')
var parent = document.getElementById('parent')

function submitFunc() {
    var item = getInput.value;
    var user = {
        name: item
    }
    if(item !== ""){
    database.child('todo').push(user);
    getInput.value = "";
    getInput.focus();
}
else{
    alert("You have to Write Something")
}
    // database.child('todo').on("child_added",function(snap){
    //     var info = snap.val()
    //     info.key = snap.key
    //     console.log(info)
    // })
}
database.child('todo').on("child_added", function (snapshot) {
    var obj = snapshot.val();
    obj.id = snapshot.key;
    console.log(obj)
    render(obj)
})
function render(data) {
    // dom rendering
    var li = document.createElement("li")
    var liText = document.createTextNode(data.name)
    li.appendChild(liText)
    li.setAttribute("class", "list-group-item list-group-item-action");
    li.setAttribute("id", data.id);

// creating delete BUTTON
 var deleteBtn = document.createElement("BUTTON");
    var btnText = document.createTextNode("Delete");
    deleteBtn.appendChild(btnText);
    deleteBtn.setAttribute("class", "btn btn-danger float-right");
    deleteBtn.onclick = function() {
        remove(data.id);
    }

    li.appendChild(deleteBtn);

// creating edit BUTTON
    var editBtn = document.createElement("BUTTON");
    var editText = document.createTextNode("Edit");
    editBtn.appendChild(editText);
    editBtn.setAttribute("class", "btn btn-info float-right");
    editBtn.onclick = function() {
        edit(data.id, data.name);
    }
    li.appendChild(editBtn);

    parent.appendChild(li)

}
function remove(key){
    database.child("todo/" + key).remove();
}
database.child("todo").on("child_removed", function(data){
    var deletedList = document.getElementById(data.key);
    deletedList.remove();
})

// for creating edit function
function edit(key, text){
    var newText = prompt("New Text", text); // taking new value from user
    var newData = {
        name: newText
    }
    database.child("todo/" + key).update(newData); // updating data at database
}
database.child("todo").on("child_changed", function(data){    // updating at ui
    var deletedLi = document.getElementById(data.key);
    var textSpan =  deletedLi.firstChild;
    textSpan.innerText = data.val().name;
})
// database.child("todo").on("child_changed", function(data){
//     var itemToChange = document.getElementById(data.key);
//     deletedList.remove();
// })