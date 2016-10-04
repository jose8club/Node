var basePath = "http://146.83.216.162:8080/";
//cuando el documentos ya este cargado
//$ = JQuery
//get: obtener recurso
//put: actualiza recurso
//post: enviar un recurso
//delete: eliminar un recurso
$(document).ready(function(){
	$.ajax({
		url: basePath + "users/",
		type: "GET",
		dataType: "JSON",
		success: function(data){
			//$("span").css("color","green");
			var data=data.data; //estructura del data a la que se puede ingresar
			console.log(data);
			var php = '<div class="row">';
			//$("body").append(php);
			//en materialize las columnas son s: pantalla chica, m: pantalla mediana y l: pantalla larga
			//y el numero de columnas es el total= 12 dividido por el numero que es 3 por lo q habra 4 elementos por fila
			for(var i=0;i<data.length;i++){
				php=php + '<div class="col s3 m3 l3">'+
							'<div class="card">'+			
    							'<div class="card-image waves-effect waves-block waves-light">'+
     								'<img class="activator" src="'+data[i].img+'">'+
    							'</div>'+
    							'<div class="card-content">'+
      								'<span class="card-title activator grey-text text-darken-4"><h4><b><em>'+data[i].first_name+' '+data[i].last_name+'</em></b></h4><i class="material-icons right">Desplegar Comentario</i></span>'+
      								'<p><a href="'+data[i].img+'"><em>Este es un enlace a la imagen puesta</em></a></p>'+
    							'</div>'+
    							'<div class="card-reveal">'+
      								'<span class="card-title grey-text text-darken-4"><h4><b><em>'+data[i].first_name+' '+data[i].last_name+'</em></b></h4><i class="material-icons right">Contraer Comentario</i></span>'+
      								'<p><em>'+data[i].comment+'</em></p>'+
    							'</div>'+
  							'</div>'+
  						'</div>';
			    //$("body").append(php);

			}
			php = php +'</div>';
			$(".result").append(php);

		},
		error: function() {
			
		}

	});
});