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
	
		var oTask = document.createElement('div');
		oTask.className = 'task in-progress';
    var oTaskNote = document.createElement('div')
    oTaskNote.className = 'task-note';
    var oTaskCheckbox = document.createElement('a');
    oTaskCheckbox.className = 'task-checkbox';
    // oTaskCheckbox.href = '#';
    var oTaskCheckboxIcon = document.createElement('i');
    oTaskCheckboxIcon.className = 'far fa-square fa-lg check-box-icon';
    oTaskCheckbox.appendChild(oTaskCheckboxIcon);
    var oTaskText = document.createElement('div');
    oTaskText.className = 'task-text';
    oTaskText.innerHTML = oNewTitle.value;
    oTaskNote.appendChild(oTaskCheckbox);
    oTaskNote.appendChild(oTaskText);
		oTask.appendChild(oTaskNote);
		

		var oTaskDetail = document.createElement('div');
		oTaskDetail.className = 'task-detail';
		var oTaskDate = document.createElement('div');
		oTaskDate.className = 'task-date';
		var oCalenderIcon = document.createElement('i');
		oCalenderIcon.className = 'far fa-calendar-alt fa-sm';
		var oDate = document.createElement('span')
		oDate.innerHTML = oDeadLine.value;
		
		// add Deadline

		if (oDeadLine.value != []) {
			oTaskDate.appendChild(oCalenderIcon);
			oTaskDate.appendChild(oDate);
			oTaskDetail.appendChild(oTaskDate);
			oTask.appendChild(oTaskDetail);
			oDeadLine.value = null;			
		} 

		

    var oTaskIcon = document.createElement('div');
    oTaskIcon.className = 'task-icon';
    var oStarIcon = document.createElement('i');
		oStarIcon.className = 'far fa-star fa-lg';
		var oXIcon = document.createElement('i');
		oXIcon.className = 'fas fa-times fa-lg';
		oTaskIcon.appendChild(oStarIcon);
		oTaskIcon.appendChild(oXIcon);
    oTask.appendChild(oTaskIcon);
    oTaskList.insertBefore(oTask, oTaskList.childNodes[0]);
		

		
		oNewTitle.value = null;
		
		oTaskCheckboxIcon.isCheck = false;
		oStarIcon.isImportant = false;

	// label important

    oStarIcon.onclick = function () {
			
			oStarIcon.isImportant = !oStarIcon.isImportant;
      this.className = this.isImportant ? 'fas fa-star fa-lg' : 'far fa-star fa-lg';
      this.style.color = this.isImportant ? '#f5a623' : '#000';
			oTask.style.backgroundColor = this.isImportant ? '#fff2dc' : '#f2f2f2';	

			if (oStarIcon.isImportant == true) {
				oTaskListImpo.insertBefore(oTask, oTaskListImpo.childNodes[0]);
			} else if (oStarIcon.isImportant == true && oTaskCheckboxIcon.isCheck == true) {
				oTaskListComp.insertBefore(oTask, oTaskListComp.childNodes[0]);
			} else if (oTaskCheckboxIcon.isCheck == true)	{
				oTaskListComp.appendChild(oTask);
			}	else {
				oTaskList.appendChild(oTask);
			}

		}

	// label completed

    oTaskCheckboxIcon.onclick = function () {
      this.isCheck = !this.isCheck
      this.className = this.isCheck ? 'far fa-check-square fa-lg check-box-icon' : 'far fa-square fa-lg check-box-icon'
      this.style.color = this.isCheck ? '#c8c8c8' : '#000';
      oTaskText.style.textDecoration = this.isCheck ? 'line-through' : 'none';
      oTaskText.style.color = this.isCheck ? '#c8c8c8' : '#000';
			oTask.className = this.isCheck ? 'task task-completed' : 'task in-progress';

			if (oTaskCheckboxIcon.isCheck == true) {
				oTaskListComp.appendChild(oTask);
			} else if (oTaskCheckboxIcon.isCheck == false && oStarIcon.isImportant == true) {
				oTaskListImpo.appendChild(oTask);
			}	else {
				oTaskList.appendChild(oTask);
			}

		}

	
	// delete this task

		oXIcon.onclick = function () {
			this.parentNode.parentNode.parentNode.removeChild(oTask);
		}

		oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';

  }

	oTotalTask.innerHTML = oTaskCount.length + ' ' + 'task left';

}
