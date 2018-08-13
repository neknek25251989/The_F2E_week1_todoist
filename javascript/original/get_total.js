window.onload = function() {
	
	var oBt = document.getElementById('getNumber');
	oBt.onclick = function() {
		getTotal('https://www.thef2e.com/api/signUpTotal',fnWrite);
	}
	function getTotal(url, cFunction) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
				cFunction(this);
			}
		}
		xhttp.open('GET', url, true);
		xhttp.send();
	}

	function fnWrite(xhttp) {
		var totalPeople = JSON.parse(xhttp.responseText);
		document.getElementById('demo').innerHTML = totalPeople.total;
	}		
}	
