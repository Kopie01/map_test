var map, marker, infoBox, userLocation, markers = [];

// Array of some objects of markers
var AllMarkers = [
		{
			lat:-41.295674,
			lng:174.780395,
			title:"Moore Wilsons",
			description:"Botique Supermarket"
		},
		{

			lat:-41.294317,
			lng:174.784058,
			title:"Embassy Theatre",
			description:"Movie Theatre"
		},
		{

			lat:-41.293186,
			lng:174.780579,
			title:"Dragonfly",
			description:"Restaurant & bar serving Asian dishes & cocktails"
		},
		{

			lat:-41.294198,
			lng:174.783181,
			title:"Sweet Mother's Kitchen",
			description:"Laid-back, eclectic cafe serving New Orleans eats, plus some Mexican dishes"
		},



];



function init(){

	var mapOptions = {
		// Set where the Map starts
		center:{
			lat: -41.2950008,
			lng: 174.7814311
		},
		zoom: 17,
		// Turn off the user interface
		disableDefaultUI:false,
		disableDoubleClickZoom: false,
		scrollwheel: true,
		draggable: true,
		draggableCursor: "pointer",
		draggingCursor:"crosshair",
		fullscreenControl:true,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER
		},

		// Array of styles for differenct map features
		styles: [
					{
						stylers: [

									{ hue: "#4286f4" },
									{ saturation: -20 }
							
								]
					},
					{
						featureType: "road",
						elementType: "geometry",
						stylers: [
									{lightness:0 },
									{visability: "simplified"},
									{hue: "#e03aa0"}
									
								]
					},
					{
						featureType: "water",
						stylers: [
									{color: "#99d8a7" },
									
									
								]
					},
					// {
     //          			featureType: 'road',
     //          			elementType: 'geometry',
     //          			stylers: [{color: '#38414e'}]
     //        		},
     				{
				              featureType: 'poi.park',
				              elementType: 'geometry',
				              stylers: [{color: '#ab75ba'}]
            		},
            		{
              				  featureType: 'poi',
				              elementType: 'labels.text.fill',
				              stylers: [
				              		{color: '#4f245b'},
				              
				              		]
            		},
				]

	}

	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	findUser();
	// addSingleMarker();
	addAllMarkers();
	// marker.addListener("click",toggleBounce);
	// infoBox();
	map.addListener("click", addMarker);
}

google.maps.event.addDomListener(window, 'load', init);

function addAllMarkers(){
	for (var i = 0; i < AllMarkers.length; i++) {
		marker = new google.maps.Marker({
			position:{
				lat: AllMarkers[i].lat,
				lng: AllMarkers[i].lng
			},
			map: map,
			animation: google.maps.Animation.DROP,
			icon:"images/pin.png",
			title: AllMarkers[i].title,
			description: AllMarkers[i].description
		});
		allinfoBox(marker);
	}
}

// function addSingleMarker(){
// 	marker = new google.maps.Marker({
// 		position:{
// 			lat: -41.295005,
// 			lng: 174.78362
// 		},
// 		map: map,
// 		animation: google.maps.Animation.DROP,
// 		icon: "images/pin.png",
// 		title: "Yoobee School of Design",
// 		description:"Description for Yoobee School of Design"


	// })

	// }

function toggleBounce(){
	if(marker.getAnimation()===null){
		marker.setAnimation(google.maps.Animation.BOUNCE);

	}else{ 
		marker.setAnimation(null);

	}
}

function infoBox(){
	infoBox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker,"click", function(){
		infoBox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>");
		infoBox.open(map, marker);
	});

}

function allinfoBox(marker){
	// if(infoBox){
	// 	// infoBox.close();
	// };
	infoBox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker,"click", function(){
		infoBox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>");
		infoBox.open(map, marker);
	});


}
// var button = true;
// function button(){
// 	for (var i = 0; i <markers.length; i++) {
// 		if(button === true){
// 			markers[i].setMap(null);
// 		}else{
// 			markers[i].setMap(map);
// 		}
	
// 	};
// 	if (button === true){
// 		button = false;
// 	}else{
// 		button = true;
// 	}







// }

function findUser(){
	if(navigator.geolocation){

		navigator.geolocation.getCurrentPosition(function(position){
			userLocation = new google.maps.Marker({
				position:{
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				map: map,
				icon: "images/pin.png"
				

			});
			markers.push(userLocation);
			map.panTo(userLocation.position);
		})

	}
}




function addMarker(event){
	var location = event.latLng;
	var clickmarker = new google.maps.Marker({
		position: location,
		map: map
	});
	markers.push(clickmarker);

	showDirection(location);

}

// Making a direction function she when a place is clicked it shows the direction from current location
function showDirection(location){
	var directionService = new google.maps.DirectionsService();
	var directionDisplay = new google.maps.DirectionsRenderer();

	directionDisplay.setMap(map);

	directionService.route({
		origin: userLocation.position,
		destination: {location},
		travelMode: google.maps.TravelMode.DRIVING,
	}, function(response, status){
		if(status == "OK"){
			directionDisplay.setDirections(response);

		}else if(status == "NOT_FOUND"){

		}else if(status == "ZERO_RESULTS"){


	}

		
	});
}



