function parse(){
    myRequest = new XMLHttpRequest();
    myRequest.open("get", "data.json", true);
    myRequest.onreadystatechange = writeMessageCallback;
    myRequest.send();
    function writeMessageCallback() {
	messages = document.getElementById("messages");
	if (myRequest.readyState == 4 && myRequest.status == 200) {
	    jsonData = JSON.parse(myRequest.responseText);
	    for(message in jsonData) {
		phrase= message.content +" "+ message.username;				
		messages.innerHTML = messages.innerHTML+ '</br>' + phrase;
	    }
	}
    }
}
