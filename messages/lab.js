function parse(){
    myRequest = new XMLHttpRequest();
    myRequest.open("get", "data.json", true);
    myRequest.onreadystatechange = myCallbackFunction;
    myRequest.send();
    function myCallbackFunction() {
	messages = document.getElementById("messages");
	if (myRequest.readyState == 4 && myRequest.status == 200) {
	    data = JSON.parse(myRequest.responseText);
	    for(i=0;i<2;i++) {
		phrase= data[i].content +" "+ data[i].username;
					
		messages.innerHTML = messages.innerHTML+ '</br>' + phrase;
					
	    }
	}
    }
}