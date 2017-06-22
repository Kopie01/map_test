var map

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


google.maps.event.addDomListener(window, 'load', init);

