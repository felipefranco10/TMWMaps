function deleteAllMarkers(markers) {
				$.each(markers, function(index) {
					deleteMarker(markers[index])
				});
			}
			
function deleteMarker(marker) {
	marker.setMap(null); 
}	

function buscar(){

	var busca = "id="+$("#select-choice-0").val();

			$.ajax({  
					 type       : 'GET',  
					 data		: busca,
					 url        : "http://gps.tmw.net.br/mobile/buscar.php",  
					 contentType: "application/json",  
					 dataType   : 'jsonp',  
					 crossDomain: true, 
					 beforeSend : function() {$.mobile.loading('show')},
					 complete   : function() {$.mobile.loading('hide')},					 
					 success: function(res) {

						deleteAllMarkers(markers);
						
					  var marker = new google.maps.Marker({
							  position: new google.maps.LatLng(res[0],res[1]),
							  map: map,
							  title: 'Dispositivo'
						  });
						  markers.push(marker);
						map.setCenter(new google.maps.LatLng(res[0],res[1]));
						
							window.localStorage.setItem("tipo", res[2]);
							window.localStorage.setItem("plano", res[3]);
							window.localStorage.setItem("deviceId", res[4]);	

					}		
			}); 
			
			setTimeout(buscar, 20000);
}



			 