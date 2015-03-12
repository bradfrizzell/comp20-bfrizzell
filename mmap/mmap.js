function init(){
    get_location();


}

function get_location(){
    params = "login=CameronGregory&lat=0&lng=0" 
    myRequest = new XMLHttpRequest();
    myRequest.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
    myRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    myRequest.onreadystatechange = parseResponseCallback;
    myRequest.send(params);

    function parseResponseCallback() {
/*	messages = document.getElementById("messages");
	if (myRequest.readyState == 4 && myRequest.status == 200) {
	    jsonData = JSON.parse(myRequest.responseText);
	    for(i=0; i<jsonData.length; i++) {
		message = jsonData[i].content +" "+ jsonData[i].username;	
		messages.innerHTML = messages.innerHTML+ '</br>' + message;
	    }
	}
    }*/
	console.log(myRequest.responseText);
    }

}