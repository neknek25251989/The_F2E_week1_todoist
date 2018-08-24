window.onload = function () {
	var oTitle = document.getElementsByClassName('header')[0];
	var aNav = oTitle.getElementsByTagName('a');
	var taskInProgress = document.getElementsByClassName('in-progress');
	var taskCompleted = document.getElementsByClassName('task-completed');
	var oEditTaskDetail = document.getElementsByClassName('new-note-detail')[0];

	var oaddNewNote = document.getElementsByClassName('add-new-note')[0];
  var oBtAdd = document.getElementsByClassName('add-task')[0];
  var oNewTitle = oaddNewNote.getElementsByTagName('input')[0];
	
	var oBtCancel = document.getElementsByClassName('cancel')[0];

	var oTaskListComp = document.getElementsByClassName('task-list-completed')[0];
  var oTaskList = document.getElementsByClassName('task-list')[0];
  var oTaskCount = document.getElementsByClassName('task');
  var oTotalTask = document.getElementsByClassName('total-task')[0];
	var oDeadLine = document.getElementsByClassName('time-input')[0];
	// check local storage.
	// if it is empty，make a empty array in it.
	// else, asing a array that equal to array in local storage.

	if (localStorage.getItem('item') === null) {
		var storageArray = [];
	} else {		
		var storageArray = JSON.parse(localStorage.getItem('item'));
		console.log(storageArray)	
		var jsonArray = JSON.parse(localStorage.getItem('item'));
		console.log(jsonArray);
		
		jsonArray.forEach(function (item) {

			var newTask = document.createElement('div')

			// hadle bar template
			var source   = document.getElementById("entry-template").innerHTML;
			var template = Handlebars.compile(source);

			var context = {
				content:item.content,
				deadline:item.deadline,
			};

			var oTask = template(context);
			newTask.className = 'task';
			newTask.innerHTML = oTask;

			oTaskList.insertBefore(newTask, oTaskList.childNodes[0]);

		// delete this task

		var oXIcon = document.getElementsByClassName('x-icon')[0];	
		var oTaskText = document.getElementsByClassName('task-text')[0];

		oXIcon.onclick = function () {

			var jsonArray = JSON.parse(localStorage.getItem('item'));
			console.log(jsonArray);

			var deleteItem = jsonArray.find(function(obj){
				return obj.content == oTaskText.innerHTML ;				
			})
			console.log(deleteItem);
			deleteItem.isDelete = true;	

			oXIcon.parentNode.parentNode.parentNode.removeChild(newTask);				
			
			storageArray = jsonArray.filter(function(e){
				return e.isDelete !== true;
			});
			
			localStorage.setItem('item', JSON.stringify(storageArray));
				
			oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';
		
		}
			
	});				
	}
	
	localStorage.clear();

	

	// default
  aNav[0].className = 'active';
	aNav[1].className = "inactive";
	aNav[2].className = "inactive";
	
	// switch tab 

	function navActive(tabName) {
		for (var j = 0; j < aNav.length; j++) {

			aNav[j].className = 'inactive';
			
		}
		
		document.getElementById(tabName).className = 'active';	

	}

	function addNewNoteShow (tabName) {
		if (tabName == 'myTask') {
			oaddNewNote.style.display = 'block';
		} else {
			oaddNewNote.style.display = 'none'
		}
	}

	function taskShow(tabName) {
		if (tabName == 'inProgress') {
			
			oEditTaskDetail.style.display = 'none';

			for (var j = 0; j < taskCompleted.length; j++) {
				taskCompleted[j].style.display = 'none';
			}
	
			for (var j = 0; j < taskInProgress.length; j++) {
				taskInProgress[j].style.display = 'flex';
			}
		} else if (tabName == 'completed') {

			oEditTaskDetail.style.display = 'none';
		
			for (var j = 0; j < taskCompleted.length; j++) {
				taskCompleted[j].style.display = 'flex';
			}
	
			for (var j = 0; j < taskInProgress.length; j++) {
				taskInProgress[j].style.display = 'none';
			}
	
		} else {

			oEditTaskDetail.style.display = 'none';
			
			for (var j = 0; j < taskCompleted.length; j++) {
				taskCompleted[j].style.display = 'flex';
			}
	
			for (var j = 0; j < taskInProgress.length; j++) {
				taskInProgress[j].style.display = 'flex';
			}
		}
	}

	for(var i = 0; i < aNav.length; i++) {
		aNav[i].onclick = function() {
			navActive(this.id);
			addNewNoteShow(this.id);
			taskShow(this.id);
		}
	}

	// onfocus & onblur

	
	
	oNewTitle.onfocus = function() {
		oEditTaskDetail.style.display = 'block';
	}

	oBtCancel.onclick = function() {
		oEditTaskDetail.style.display = 'none';
		
	}


  // add a new task

	

  oBtAdd.onclick = function () {

		
		oTaskList.innerHTML = '';
		oTaskListComp.innerHTML = '';
					
		var source   = document.getElementById("entry-template").innerHTML;
		var template = Handlebars.compile(source);

		var context = {
			content:oNewTitle.value,
			deadline:oDeadLine.value,
		};

		inputObject = {content: context.content, deadline: context.deadline, isDelete: false};

		storageArray.push(inputObject);
		stringJson = JSON.stringify(storageArray);
		localStorage.setItem('item', stringJson);
		
		makeNewTask()		

		oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';

	}

		function makeNewTask() {		

			var jsonArray = JSON.parse(localStorage.getItem('item'));
			console.log(jsonArray);
			
			jsonArray.forEach(function (item) {

				var newTask = document.createElement('div')

				// hadle bar template
				var source   = document.getElementById("entry-template").innerHTML;
				var template = Handlebars.compile(source);

				var context = {
					content:item.content,
					deadline:item.deadline,
				};

				var oTask = template(context);
				newTask.className = 'task';
				newTask.innerHTML = oTask;

				oTaskList.insertBefore(newTask, oTaskList.childNodes[0]);

			// delete this task
	
			var oXIcon = document.getElementsByClassName('x-icon')[0];	
			var oTaskText = document.getElementsByClassName('task-text')[0];

			oXIcon.onclick = function () {

				var jsonArray = JSON.parse(localStorage.getItem('item'));
				console.log(jsonArray);

				var deleteItem = jsonArray.find(function(obj){
					return obj.content == oTaskText.innerHTML ;				
				})
				console.log(deleteItem);
				deleteItem.isDelete = true;	
	
				oXIcon.parentNode.parentNode.parentNode.removeChild(newTask);				
				
				storageArray = jsonArray.filter(function(e){
					return e.isDelete !== true;
				});
				
				localStorage.setItem('item', JSON.stringify(storageArray));
					
				oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';
			
			}
				
		});		
			oDeadLine.value = null;
			oNewTitle.value = null;
	
		}

	// var oTaskCheckboxIcon = document.getElementsByClassName('check-box-icon');

	// oTaskCheckboxIcon.addEventListener('click',test);

	// function test() {
	// 	console.log(1);
	// }

	// oTaskCheckboxIcon.onclick = function(e) {
	// 	console.log(1);

	// 	var oTaskCheckboxIcon1 = document.getElementsByClassName('check-box-icon');
	// 	labelArray = Array.from(oTaskCheckboxIcon1);
	// 	var getIndex = labelArray.indexOf(e.target);
	// 	console.log(getIndex);
	// 	var arrayCheck = JSON.parse(localStorage.getItem('item'));
	// 	storageArray[getIndex]['isCheck'] = !storageArray[getIndex]['isCheck'];
	// 	arrayCheck[getIndex]['isCheck'] = !arrayCheck[getIndex]['isCheck'];		

	// 	// oTaskCheckboxIcon.className = item.isCheck ? 'far fa-check-square fa-lg check-box-icon' : 'far fa-square fa-lg check-box-icon'
	// 	// oTaskCheckboxIcon.style.color = item.isCheck ? '#c8c8c8' : '#000';
	// 	// oTaskText.style.textDecoration = item.isCheck ? 'line-through' : 'none';
	// 	// oTaskText.style.color = item.isCheck ? '#c8c8c8' : '#000';
	// 	// newTask.className = item.isCheck ? 'task task-completed' : 'task in-progress';


	// 	stringCheck = JSON.stringify(arrayCheck);
	// 	localStorage.setItem('item', stringCheck);
	// 	makeNewTask();
	// 	console.log(localStorage);
	// }	

	oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';
}
