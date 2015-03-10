function parse(){
    request = new XMLHttpRequest();
    request.open("get", "data.json", true);
    request.onreadystatechange = myCallbackFunction;
    request.send();
    function myCallbackFunction() {
	if (request.readyState == 4 && request.status == 200) {
	    data = JSON.parse(request.responseText);
	    for(i=0;i<2;i++) {
		phrase= data[i].content +" "+ data[i].username;
					
		document.getElementById("messages").innerHTML = document.getElementById("messages").innerHTML+ '</br>' + phrase;
					
	    }
	}
    }
}