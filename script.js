//0-Definir array
const taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
const todoList = document.querySelector("#todoList");



// Função das tarefas
function showTasks(clearTasks = false) {
  document.getElementsByClassName("content")[0].innerHTML = '';
  
  //Os valores falsy são: 0, undefined,null,"",NaN,false
  
  // Limpar o conteudo quando for adicionado uma nova tarefa
  taskArray.forEach((task, index) => {
    const taskDiv = document.createElement("div")
    taskDiv.classList.add("list-adjust")
    taskDiv.setAttribute("id","task-custom")
    taskDiv.innerHTML = 
    `
      <input type="checkbox" class="checkbox">
      <h3>${task}</h3>
      <button type="button" class="button-style">X</button>
    `
    //Colocar a line-through quando clicar no check-box
    taskDiv.getElementsByClassName("checkbox")[0].onclick= ()=>{
      const checkboxValue = taskDiv.getElementsByClassName("checkbox")[0].checked
      //console.log(checkboxValue)
      const taskText = taskDiv.getElementsByTagName("h3")[0]
      if (checkboxValue) {
        taskText.classList.add("overline-decoration")
      }
      else{
        taskText.classList.remove("overline-decoration")
      } 
  }
  //Retirar Task
    taskDiv.getElementsByTagName("button")[0].onclick = () =>{
      taskArray.splice(index,1)
      localStorage.setItem("tasks",JSON.stringify(taskArray))
      showTasks()
    }
    document.getElementsByClassName("content")[0].appendChild(taskDiv)
  });
  
}

//Associar o botão com  a tarefa


//Função mostra o formulario
function showAddTasks() {
  todoList.style = "display: flex";
}

//adiciona evento para pegar dados do formulario

todoList.addEventListener("submit", (event) => {
  event.preventDefault();

  let task = document.querySelector("#task").value;
  const alertMessage = document.querySelector(".alert");

  // Checar se o form esta vazio
  if (task.trim() === "") {
    //Mostrar mensagens caso esteja vazio
    alertMessage.innerHTML = "Por favor, preencha a tarefa";
    alertMessage.style = "display: block; color:red";
  } else {
    //adicionar informações no array e no localStorage
    taskArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    //função chamar as tasks
    showTasks(true);
    //-Mostrar mensagem de sucesso
    alertMessage.innerHTML = "Tarefa Adicionada com Sucesso";
    alertMessage.style = "display:block; color: green";
    // Remover mensagem e resetar os dados do formulario
    setTimeout(() => {
      //Retirar o conteudo do alert
      alertMessage.innerHTML = "";
      //setar o formulario para desaparecer com display none
      todoList.style = "display: none";
      //resetar os valores do formulario
      todoList.reset();
    }, 100);
  }
});
//Chamar a função ao carregar a página

window.onload = function () {
  showTasks();
};

//https://devdocs.io/css/text-decoration