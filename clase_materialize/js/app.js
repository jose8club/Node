var basePath = "http://146.83.216.162:8080/";

var usuarios;
var currentid;

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

			usuarios = data;

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

				php=php + '<div id="'+data[i]._id+'" class="col s4 m4 l4 col">'+
							'<div class="card" id="elem">'+			
    							'<div class="card-image waves-effect waves-block waves-light">'+
     								'<img class="activator ima" src="'+data[i].img+'"></img>'+
    							'</div>'+
    							'<div class="card-content">'+
      								'<span class="card-title activator grey-text text-darken-4"><h4><b><em class="name">'+data[i].first_name+' '+data[i].last_name+'</em></b></h4><i class="material-icons right">Desplegar Comentario</i></span>'+
      								'<p><a class="waves-effect waves-light btn modal-trigger" onclick="mostrar_modal('+i+')"><em>Editar Datos</em></a></p>'+
    							'</div>'+
    							'<div class="card-reveal name">'+
      								'<span class="card-title grey-text text-darken-4"><h4><b><em class="name">'+data[i].first_name+' '+data[i].last_name+'</em></b></h4><i class="material-icons right">Contraer Comentario</i></span>'+

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

	
});

function mostrar_modal(id){
	currentid = id;
	$('#id').val(usuarios[currentid]._id);
	$('#nombre').val(usuarios[currentid].first_name);
	$('#apellido').val(usuarios[currentid].last_name);
	$('#comentario').val(usuarios[currentid].comment);
	$('#imagen').val(usuarios[currentid].img);
	$('#modal1').openModal();

}

function modificar(){
	$.ajax({
		url: basePath + "users/" + usuarios[currentid]._id,
		type: "PUT",
		dataType: "JSON",
		data:{
			first_name:$('#nombre').val(),
			last_name:$('#apellido').val(),
			comment:$('#commentario').val(),
			img:$('#imagen').val()
		},
		success: function(data){
			
			alert("Usuario Modificado");
			$("#"+data.data.id).find(".ima").attr("src",data.data.img);
			$("#"+data.data.id).find(".name").html(data.data.first_name +' '+ data.data.last_name);
			$("#"+data.data.id).find(".name").html(data.data.comment);
			//$('body').append(data);
			
			//data=data.data;
		},
		error: function(){

		}
	});
}

function eliminado(){
	$.ajax({
		url: basePath + "users/" + usuarios[currentid]._id,
		type: "DELETE",
		dataType: "JSON",
		data:{
			_id:$('#id').val()
		},
		success: function(data){
			
			alert("Usuario Eliminado");
			$("#"+data.data.id).find(".ima").attr("src",data.data.img);
			$("#"+data.data.id).find(".name").html(data.data.first_name +' '+ data.data.last_name);
			$("#"+data.data.id).find(".name").html(data.data.comment);
			//$('body').append(data);
			
			//data=data.data;
		},
		error: function(){

		}
	});
}

