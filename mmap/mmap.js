var myLat=0;
var myLng=0;
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
    zoom: 13, // The larger the zoom number, the bigger the zoom
    center: me,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;

Number.prototype.toRadians = function() {
   return this * Math.PI / 180;
}


function init(){
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    getMyLocation();
    get_location();

}


function addMyMarker(myPosition){
/* addMyMarker

 @Parameters@ - myPosition, a google.maps.LatLng object
 @Returns@ - nothing

 Adds the custom marker, a picture of Carmen Sandiego, onto the map at the location
 given by myPosition. The marker is given an infoWindow of "CameronGregory"

*/
    marker = new google.maps.Marker({
	position: myPosition,
	title: name,
	icon: new google.maps.MarkerImage('Carmen_Sandiego.png', null, null, null,
			       		  new google.maps.Size(120, 120))
    });
    marker.setMap(map);
    
    google.maps.event.addListener(marker, 'click', function() {
	infowindow.open(map,this);
	infowindow.setContent("CameronGregory");
    });
}


function get_location(){
/* get_location

 @Parameters@ - None
 @Returns@ - None

 This is the function that does the heavy lifting. It gets the location of the browser
 requesting this page, and then sends that off to the dataStore, to get back all of the
 json. Then, when the request returns, the parseResponseCallback is triggered, which
 parses the returned json, and calls addMarker for each individual user. 

*/
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
	navigator.geolocation.getCurrentPosition(function(position) {
	    myLat = position.coords.latitude;
	    myLng = position.coords.longitude;
	});
	params = ("login=CameronGregory&lat=" + myLat + "&lng=" + myLng); 
	myRequest = new XMLHttpRequest();
	myRequest.open("POST", "https://powerful-spire-5717.herokuapp.com/sendLocation", true);
	myRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	myRequest.onreadystatechange = parseResponseCallback;
	myRequest.send(params);
	
	function parseResponseCallback() {
	    if(myRequest.readyState == 4 && myRequest.status == 200){
		jsonData = JSON.parse(myRequest.responseText);
		for(i=0; i<jsonData.length; i++) {
		    addMarker(jsonData[i]["lat"], jsonData[i]["lng"], jsonData[i]["login"]); 
		}
	    }
	}
    }
}

function getMyLocation() {
/* getMyLocation

 @Parameters@ - None
 @Return@ - None

 Gets the browser's location, and pans to that location on the map. Then, calls addMyMarker
 on that position. 
*/
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
	navigator.geolocation.getCurrentPosition(function(position) {
	    myLat = position.coords.latitude;
	    myLng = position.coords.longitude;
	    myPosition = new google.maps.LatLng(myLat, myLng);
	    map.panTo(myPosition);
	    addMyMarker(myPosition);
	});
    }
    else {
	alert("Geolocation is not supported by your web browser.  What a shame!");
    }
}


function addMarker(lat, lng, name){
/* addMarker
 @Parameters@
 lat - latitude to add marker at
 lng - longitude to add marker at
 name - name to put on marker

 @Return@ - None

 Adds a new marker at (lat, lng) with the information in the infoWindow being 'name'
 and the distance from this given browser session, to this specific marker
*/
    person = new google.maps.LatLng(lat, lng);
    marker = new google.maps.Marker({
	position: person,
	title: name
    });
    marker.setMap(map);
    
    google.maps.event.addListener(marker, 'click', function() {
	infowindow.open(map,this);
	var distance = get_distance(lat, lng);
	d = distance.toString();
	infowindow.setContent(this.title+" is "+d+" miles away");
    });
}


function get_distance(lat, lng){
/* get_distance

 @Parameters@ 
 lat - latitude of point of interest
 lng - longitude of point of interest

 @Return@ distance from point of interest to this browser session in miles
*/
    var R = 6371000; // metres
    var φ1 = lat.toRadians();
    var φ2 = myLat.toRadians();
    var Δφ = (myLat-lat).toRadians();
    var Δλ = (myLng-lng).toRadians();
    
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    var d = R * c;
    d = (d/1000) * 0.61;
    d = d.toFixed(4);
    return d;
}