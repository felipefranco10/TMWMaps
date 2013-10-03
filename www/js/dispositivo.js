$('#basic_map').on('pagebeforeshow', function() {
		var postData = "id="+window.localStorage.getItem("id");
		
			$.ajax({  
					 type       : 'GET',  
					 data		: postData,
					 url        : "http://gps.tmw.net.br/mobile/dispositivos.php",  
					 contentType: "application/json",  
					 dataType   : 'jsonp',  
					 crossDomain: true, 
					 beforeSend : function() {$.mobile.loading('show')},
					 complete   : function() {$.mobile.loading('hide')},					 
					 success: function(res) {  

					if($('#select-choice-0 option').size() == 1){						
						$.each(res, function() 
						{
							$("#select-choice-0").append("<option value='"+this['id']+"'>"+this['name']+"</option>");
						});
					}
					
					}, 
					 error: function(e) {  
						navigator.notification.alert(
							'Verifique se o pacote de dados do seu aparelho esta ativado!',  // message
																					  null,  // callback
																	 'Problema de conexao',  // title
																		              'Ok'   // buttonName
						);
					},  
				  });

});