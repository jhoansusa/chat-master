$(function(){



	var objFirebase = new Firebase("https://chatucc2.firebaseio.com/");
	var contador = 0;
	var cantMensajes = 1;
	var imagen  = sessionStorage.getItem('profileImageURL');
	var login = sessionStorage.getItem('displayName');	
	var fecha = new Date();
	var hora = new Date();
	fecha =fecha.getDate()+"-"+(fecha.getMonth()+1)+"-"+fecha.getFullYear();
	hora = hora.getHours()+":"+hora.getMinutes()+":"+hora.getSeconds();	
	var fechaHora = fecha+" "+ hora;
	$("#btnOcultar").hide();
	$("#todo").hide(500);


	 $('#btnEnviarCom').click(clickEnvio);
	  $('#btnMostrar').click(mostrar);
	  $('#btnOcultar').click(ocultar);
	 $('#imagen').attr('src', sessionStorage.getItem('profileImageURL'));	
	 $("#usuarioLo").val(sessionStorage.getItem('displayName'));
	
	function mostrar()
	{	
				
			$("#todo").show(500);
			$("#btnMostrar").hide(500);
			$("#btnOcultar").show(500);
	}

	function ocultar()
	{	
				
			$("#todo").hide(500);
			$("#btnMostrar").show(500);
			$("#btnOcultar").hide();
	}
	
	function clickEnvio(){		
		var txtTitulo = $("#txtTitulo").val();
		var txtDescripcion = $("#txtDescripcion").val();
		var lstTema = $("#lstTema").val();

		$("#txtTitulo").val("");		
		$("#txtDescripcion").val("");
		$("#lstTema").val("");
		
		objFirebase.push({ 
				autor: login,  				
  				img: imagen,
  				fechaHora : fechaHora,
  				titulo : txtTitulo,
  				descripcion: txtDescripcion,
  				tema: lstTema

  			
		});

		console.log(mensaje);
	}

	objFirebase.on("child_added", function(data){
		var registro = data.val();
		$('.cont-mensajes-timeline').prepend(getPlantilla(registro.autor,registro.img,registro.fechaHora,registro.titulo,registro.descripcion,registro.tema));
		
	});

	function getPlantilla(autor,img,fechaHora,titulo,descripcion,tema){		
		if(autor == login){
			var plantilla = '<div id="me'+cantMensajes+'" class="divPrincipal uno">\
				<div  class="section-avatar ">\
					<figure><img  id="img'+cantMensajes+'" src="'+imagen+'" alt="Lina colorado">\
						<textarea id="usu'+cantMensajes+'" disabled="disabled" style="width: 300px;">'+ " "+autor +'</textarea>\
					</figure>\
				</div>\
				<div class="me_textarea_envia">\
					<table id="tablaComentarios">\
						<tr>\
							<td><label>Titulo:</label></td>\
							<td><input type=text  disabled="disabled" class="estiloMensaje"  id="titulo'+cantMensajes+'" value="'+titulo+'"></input></td>\
						</tr>\
						<tr>\
							<td><label>Descripcion:</label></td>\
							<td><textarea  disabled="disabled" class="estiloMensaje" id="descripcion'+cantMensajes+'">'+descripcion+'</textarea></td>\
						</tr>\
						<tr>\
							<td><label>Tema:</label></td>\
							<td><input type=text  disabled="disabled" class="estiloMensaje"  id="tema'+cantMensajes+'" value="'+tema+'"></input></td>\
						</tr>\
					</table>\
					<div>\
						<button type="submit" class="imggusta" onclick="cambiaEstrella('+cantMensajes+',1)"><img id="1'+cantMensajes+'" src="../../img/estrellaamarilla.png" alt="Imagen" /></button>\
						<button type="submit" class="imggusta" onclick="cambiaEstrella('+cantMensajes+',2)"><img id="2'+cantMensajes+'" src="../../img/estrellaamarilla.png" alt="Imagen" /></button>\
						<button type="submit" class="imggusta" onclick="cambiaEstrella('+cantMensajes+',3)"><img id="3'+cantMensajes+'" src="../../img/estrellaamarilla.png" alt="Imagen" /></button>\
						<button type="submit" class="imggusta" onclick="cambiaEstrella('+cantMensajes+',4)"><img id="4'+cantMensajes+'" src="../../img/estrellaamarilla.png" alt="Imagen" /></button>\
						<button type="submit" class="imggusta" onclick="cambiaEstrella('+cantMensajes+',5)"><img id="5'+cantMensajes+'" src="../../img/estrellaamarilla.png" alt="Imagen" /></button>\
					</div>\
					<div class="pieMensaje"><label for="" id="lblMensaje">'+ " "+fechaHora +'</label>\
					</div>\
				</div>\
				</div>';		
			
			contador = 1;
		}
		else{
			var plantilla = '<div id="me'+cantMensajes+'" class="divPrincipal dos"><div  class=" section-avatar"><figure><textarea disabled="disabled" id="usu'+cantMensajes+'">'+ autor +" "+'</textarea><img src="'+img+'" alt="Lina colorado"></figure></div><div class="me_textarea_envia"><textarea disabled="disabled" id="txt'+cantMensajes+'">'+'  '+mensaje+'</textarea><button type="submit" class="imggusta" onclick="cambiaMensaje('+cantMensajes+')"><img id="'+cantMensajes+'" src="../../img/estrellaamarilla.png" alt="Imagen" /></button></div><div class="pieMensaje"><label for="" id="lblMensaje">'+ " "+fechaHora +'</label></div></div>';
			contador = 0;
		}		
		//$('.cont-mensajes-timeline').prepend(plantilla);
		$('#inMensaje').val('');
		$("#todo").hide(500);
		cantMensajes ++;		
		return plantilla;
	}	

});

	function cambiaMensaje(id){
		var valorTxt = $("#txt"+id).val();	
		var valorUsuario = $("#usu"+id).val();
		var plantilla ='<div class="msnFavoritos" id="msnF'+id+'"><div><textarea disabled="disabled">'+valorTxt+'</textarea></div><div><label><b>'+valorUsuario+'</b></label><button id="btnNogusta'+id+'" type="submit" class="imgnogusta" onclick="eliminaFavorito('+id+')"><img src="../../img/estrellaamarilla.png" alt="Imagen"></button></div></div><br>';
		$('#'+id).attr('src', '../../img/estrellaazul.png');
		$(".favoritos").prepend(plantilla);
	}

	function eliminaFavorito(id){
		$('#'+id).attr('src', '../../img/estrellaamarilla.png');
		$("#msnF"+id).remove();		
	}

	function cambiaEstrella(id,numero){
		var numeroMayor = 0;
		//pinta las estrellas
		for(i=1; i<=numero; i++){
			$('#'+i+id).attr('src', '../../img/estrellaazul.png');
			numeroMayor = i;
		}
		//quita el color de las estrellas
		for(i=numero+1; i<6; i++){
			$('#'+i+id).attr('src', '../../img/estrellaamarilla.png');
		}		
		if(numeroMayor == 5){
			var valorUsuario = $("#usu"+id).val();
			var titulo = $("#titulo"+id).val();
			var descripcion = $("#descripcion"+id).val();
			var tema = $("#tema"+id).val();
			var imagen = $("#img"+id).val();
			var plantilla = '<div id="me'+id+'" class="divFavoritos">\
				<div  class="tituloFavorito">\
						<textarea id="usu'+id+' disabled="disabled" style="width: 300px; resize:none;" class="estiloMensaje">'+ " "+valorUsuario +'</textarea>\
				</div>\
				<div class="me_textarea_envia">\
					<table id="tablaComentarios">\
						<tr>\
							<td><label>Titulo:</label></td>\
							<td><input type=text  disabled="disabled" class="estiloMensaje"  id="titulo'+id+'" value="'+titulo+'"></input></td>\
						</tr>\
						<tr>\
							<td><label>Descripcion:</label></td>\
							<td><textarea  disabled="disabled" class="estiloMensaje" id="descripcion'+id+'" style="resize:none;">'+descripcion+'</textarea></td>\
						</tr>\
						<tr>\
							<td><label>Tema:</label></td>\
							<td><input type=text  disabled="disabled" class="estiloMensaje"  id="tema'+id+'" value="'+tema+'"></input></td>\
						</tr>\
					</table>\
				</div>\
				</div>';
				$(".favoritos").prepend(plantilla);
		}
	}

