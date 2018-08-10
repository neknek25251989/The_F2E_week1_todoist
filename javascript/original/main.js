window.onload = function () {
	var oTitle = document.getElementsByClassName('header')[0];
	var aNav = oTitle.getElementsByTagName('a');
	var taskInProgress = document.getElementsByClassName('in-progress');
	var taskCompleted = document.getElementsByClassName('task-completed');
	var oEditTaskDetail = document.getElementsByClassName('new-note-detail')[0];

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
	var oaddNewNote = document.getElementsByClassName('add-new-note')[0];
  var oBtAdd = document.getElementsByClassName('add-task')[0];
  var oNewTitle = oaddNewNote.getElementsByTagName('input')[0];
	
	var oBtCancel = document.getElementsByClassName('cancel')[0];
	
	oNewTitle.onfocus = function() {
		oEditTaskDetail.style.display = 'block';
	}

	oBtCancel.onclick = function() {
		oEditTaskDetail.style.display = 'none';
		
	}


  // add a new task
	var oTaskListImpo = document.getElementsByClassName('task-list-important')[0];
	var oTaskListComp = document.getElementsByClassName('task-list-completed')[0];
  var oTaskList = document.getElementsByClassName('task-list')[0];
  var oTaskCount = document.getElementsByClassName('task');
  var oTotalTask = document.getElementsByClassName('total-task')[0];
	var oDeadLine = document.getElementsByClassName('time-input')[0];

  oBtAdd.onclick = function () {
		// hadle bar template
		var source   = document.getElementById("entry-template").innerHTML;
		var template = Handlebars.compile(source);

		var context = {
			content:oNewTitle.value,
			deadline:oDeadLine.value,
		};
		var oTask = template(context);
		var newTask = document.createElement('div')
		newTask.className = 'task';
		newTask.innerHTML = oTask;
		oTaskList.insertBefore(newTask, oTaskList.childNodes[0]);	
		
		oDeadLine.value = null;
		oNewTitle.value = null;

		var oStarIcon = document.getElementsByClassName('star-icon')[0];
		oStarIcon.isImportant = false;

	// label important
		
    oStarIcon.onclick = function () {
			
			oStarIcon.isImportant = !oStarIcon.isImportant;
			console.log(oStarIcon.isImportant);
      this.className = this.isImportant ? 'fas fa-star fa-lg' : 'far fa-star fa-lg';
      this.style.color = this.isImportant ? '#f5a623' : '#000';
			newTask.style.backgroundColor = this.isImportant ? '#fff2dc' : '#f2f2f2';	

			if (oStarIcon.isImportant == true) {
				oTaskListImpo.insertBefore(newTask, oTaskListImpo.childNodes[0]);
			} else if (oStarIcon.isImportant == true && oTaskCheckboxIcon.isCheck == true) {
				oTaskListComp.insertBefore(newTask, oTaskListComp.childNodes[0]);
			} else if (oTaskCheckboxIcon.isCheck == true)	{
				oTaskListComp.appendChild(newTask);
			}	else {
				oTaskList.appendChild(newTask);
			}

		}

		var oTaskCheckboxIcon = document.getElementsByClassName('check-box-icon')[0];
		var oTaskText = document.getElementsByClassName('task-text')[0];
		oTaskCheckboxIcon.isImportant = false;

	// label completed

    oTaskCheckboxIcon.onclick = function () {
      this.isCheck = !this.isCheck
      this.className = this.isCheck ? 'far fa-check-square fa-lg check-box-icon' : 'far fa-square fa-lg check-box-icon'
      this.style.color = this.isCheck ? '#c8c8c8' : '#000';
      oTaskText.style.textDecoration = this.isCheck ? 'line-through' : 'none';
      oTaskText.style.color = this.isCheck ? '#c8c8c8' : '#000';
			newTask.className = this.isCheck ? 'task task-completed' : 'task in-progress';

			if (oTaskCheckboxIcon.isCheck == true) {
				oTaskListComp.appendChild(newTask);
			} else if (oTaskCheckboxIcon.isCheck == false && oStarIcon.isImportant == true) {
				oTaskListImpo.appendChild(newTask);
			}	else {
				oTaskList.appendChild(newTask);
			}

		}

	
	// delete this task

		var oXIcon = document.getElementsByClassName('x-icon')[0];


		oXIcon.onclick = function () {
			this.parentNode.parentNode.parentNode.removeChild(newTask);
			oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';
		}

		oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';

  }

	oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';

}
