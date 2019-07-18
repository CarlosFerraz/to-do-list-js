const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes
const CHECK = "fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

// get itens from local storage
let data = localStorage.getItem("TODO");

// Will check if data is not empty
if(data){
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);
}else{
	// then if data isn't empty
	LIST = [];
	id = 0;
}

// load itens to the user's interface
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

// clear data from local storage
clear.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
});

// Show todays date in details
const options = {weekday: "long", month:"long", day:"numeric", hour: "numeric", minute: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function

function addToDo(toDo, id, done, trash){

	if(trash) { return; }

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

	const item = `<li class="item">
					<i class="fa ${DONE} co" job="complete" id="${id}"></i>
					<p class="text ${LINE}">${toDo}</p>
					<i class="fa fa-trash-o de" job="remove" id="${id}"></i>
				  </li>
				`;
				
	const position = "beforeend";
 
	list.insertAdjacentHTML(position, item);
}

addToDo("Make to-do list", "1", true, false);
addToDo("Develop a responsive HTML", "2", true, false);
addToDo("Find a nice css style", "3", true, false);
addToDo("Develop a Javascript", "4", true, false);
addToDo("Test functions", "5", true, false);
addToDo("Save data in local storage", "6", true, false);

// add an item to the list using the enter key
document.addEventListener("keyup",function(even){
	if(event.keyCode == 13){
		const toDo = input.value;

		// if the input ins't empty
		if(toDo){
			addToDo(toDo, id, false, false);

			LIST.push({
				name : toDo,
				id : id,
				done: false,
				trash: false
			});
			// adding item to local storage, don't forget to add this code where the array is updated
	localStorage.setItem("TODO", JSON.stringify(LIST));
			id++;
		}
		input.value = "";
	}
});


function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);

	LIST[element.id].trash = true;
}

// target the itens created dynamically

list.addEventListener("click", function(event){
	const element = event.target; //return the clicked element inside list
	const elementJob = element.attributes.job.value; //complete or delete

	if(elementJob == "complete"){
		completeToDo(element);
	}else if(elementJob == "remove"){
		removeToDo(element);
	}
	// adding item to local storage, don't forget to add this code where the array is updated
	localStorage.setItem("TODO", JSON.stringify(LIST));
});