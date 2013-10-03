		// Wait for Cordova to load
		//
		function init(){
			document.addEventListener("deviceready", onDeviceReady, false);
		}
			
		function Verifica(){
		if(window.localStorage.getItem("id") === null){
				navigator.notification.alert(
					'Voce nao esta autenticado no sistema!',  // message
									                   null,
								  'Usuario nao autenticado',  // title
					                                   'Ok'   // buttonName
				);
				e.preventDefault();
				$.mobile.changePage( "#basic_map");
				return 0;
			}else{
				return 1;
			}
		}
		
		function VerificaSessao(){
			if(window.localStorage.getItem("id") !== null){
				$.mobile.changePage( "#basic_map");
			}
		}
		
		// Cordova is ready
		//
		function onDeviceReady() {
			// Empty
		}
		
		function sair(){
			window.location.href="index.html";
				$("select option").remove();
					window.localStorage.removeItem("id");
		}
				
		function bloqueio(){
			if($("input[id=senhaBloqueio]").val() == window.localStorage.getItem("senha"))	
			{		
			var postData = "user="+window.localStorage.getItem("id")+"&cod="+window.localStorage.getItem("deviceId")+"&Senha="+window.localStorage.getItem("senha");
		alert(postData);
			/*$.ajax({  
					 type       : 'GET',  
					 data		: postData,
					 url        : "http://gps.tmw.net.br/mobile/parar.php",  
					 contentType: "application/json",  
					 dataType   : 'jsonp',  
					 crossDomain: true, 
					 beforeSend : function() {$.mobile.loading('show')},
					 complete   : function() {$.mobile.loading('hide')},					 
					 success: function(res) {  
					}, 
					 error: function(e) {  
						navigator.notification.alert(
							'Verifique se o pacote de dados do seu aparelho esta ativado!',  // message
																					  null,  // callback
																	 'Problema de conexao',  // title
																		              'Ok'   // buttonName
						);
					},  
				  });*/
			
				alert('carro bloqueado!');
				$("input[id=senhaBloqueio]").val("");
			}else{
				alert('Senha incorreta!');
				$("input[id=senhaBloqueio]").val("");
			}	
	
		$( "#positionLogin" ).popup( "close" );
		}
				
		function chamaBloqueio(){
		
			var tipo = window.localStorage.getItem("tipo").toUpperCase();

			if($("#select-choice-0").val() != null)
			{
				if(window.localStorage.getItem("plano") == 3 && tipo == "T")
				{
					$('#positionLogin').popup('open');
				}
				else if(window.localStorage.getItem("admin") == 1 && tipo == "T")
				{
					$('#positionLogin').popup('open');
				}else
				{
						navigator.notification.alert(
																				   'Alerta!',  // message
							                                                          null,  // callback
							                  'Funcao indisponivel para esse dispositivo.',  // title
							                                                          'Ok'   // buttonName
						);
				}	
			}else
			{
				navigator.notification.alert(
																				   'Alerta!',  // message
							                                                            null,  // callback
							                  					 'Selecione um dispositivo.',  // title
							                                                            'Ok'   // buttonName
						);
			}				
					
		}
				
		function sair(){
			window.location.href="index.html";
				$("select option").remove();
					window.localStorage.removeItem("id");
		}
		
	$(document).ready(function() {
		
			$("#enviar").click(function(){

				$.ajax({  
					 type       : 'GET',  
					 url        : "http://gps.tmw.net.br/mobile/autentica.php",  
					 contentType: "application/json",  
					 dataType   : 'jsonp',  
					 crossDomain: true, 
					 beforeSend : function() {$.mobile.loading('show')},
					 complete   : function() {$.mobile.loading('hide')},					 
					 success: function(res) {  
						  var obj = res;
							var i = 1;
						  
							 $.each(obj, function() 
							{
							   if(this['login'] == $('input[id=login]').val() && this['password'] == $('input[id=senha]').val())
							   {
									window.localStorage.setItem("id", this['id']);
									window.localStorage.setItem("senha", this['password']);
									window.localStorage.setItem("admin", this['Frotista']);

										i = 0;
											$.mobile.changePage( "#basic_map", { transition: "slideup", reverse: false });
							   }
							});
							if(i == 1)
							{
								navigator.notification.alert(
											 'Dados incorretos!',  // message
									                        null,  // callback
									'Login ou senha incorretos.',  // title
									                        'Ok'   // buttonName
								);
							}
					}, 
					 error: function(e) {  
						navigator.notification.alert(
							'Verifique se o pacote de dados do seu aparelho esta ativado!',  // message
							                                                          null,  // callback
							                                         'Problema de conexao',  // title
							                                                          'Ok'   // buttonName
						);
					}  
				});
			});
			
			$( window ).on( "orientationchange", function( event ) {
				if(event.orientation == "portrait" || event.orientation == "landscape"){
					$('[data-role="content"]').height(getRealContentHeight());
		    		$('#map_canvas').height($(".bottom").height()-38);
		    	}
			});			
	});