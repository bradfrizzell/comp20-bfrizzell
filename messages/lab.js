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
		console.log(message);
		console.log(message.content);
		console.log(message.username);
		phrase= message.content +" "+ message.username;	
		console.log(phrase);
		messages.innerHTML = messages.innerHTML+ '</br>' + phrase;
	    }
	}
    }
}
