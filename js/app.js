
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 14
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }


      var restaurante = [
	{
		"nombre": "ChilaKillers",
		"direccion": "Av. Revolución, Tacubaya, 11870 Ciudad de México, CDMX",
		"lat": "19.4068567",
		"lng": "-99.18452130000003"
	},
	{
		"nombre": "Contamar",
		"direccion": "Calle Durango 200, Roma, Roma Nte.,06700 Cuauhtémoc, CDMX",
		"lat": "19.4195252",
		"lng":"-99.16712819999998"
	},
	{
		"nombre": "Mercado Roma",
		"direccion": "Calle Querétaro 225, Roma Nte.,06700 Ciudad de México, CDMX",
		"lat": "19.4195252",
		"lng":"-99.16712819999998"
	},
	{
		"nombre": "Chili's",
		"direccion": "Londres 127, Cuauhtémoc, Juárez,06600 Ciudad de México, CDMX",
		"lat": "19.4255196",
		"lng":"-99.16456690000001"
	},

];
//var busqueda = $("#search-form");
//var busqueda = document.getElementById("search-form");

//busqueda.submit(filtrarRestaurantes);
var plantillaContacto = 

	'<ul id="restaurantes" data-lat="__latitud__" data-lng="__longitud__" class="collection ubicaciones">'+
    '<li class="collection-item avatar">'+
      '<img src="img/restaurant.png" alt="" class="circle">'+
      '<span class="title">__nombre__</span>'+
      '<p>__direccion__</p>';

var cargarPagina = function () {
	$("#search-form").submit(filtrarRestaurantes);
	$(document).on("click",".ubicaciones",cambiarUbicacion);
};

var filtrarRestaurantes = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#search").val().toLowerCase();
	var restaurantesFiltrados = restaurante.filter(function (restaurante) {
		return restaurante.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
	});
	mostrarRestaurantes(restaurantesFiltrados);
};

var mostrarRestaurantes = function (restaurante) {
	var plantillaFinal = "";
	restaurante.forEach(function (restaurante) {
		plantillaFinal += plantillaContacto.replace("__nombre__", restaurante.nombre).replace("__latitud__",restaurante.lat).replace("__longitud__",restaurante.lng).replace("__direccion__",restaurante.direccion)
		
	});
	$("#restaurantes").html(plantillaFinal);
};




function mostrarMapa(coordenadas) {
  var map = new google.maps.Map($('.map')[0], {
    zoom: 8,
    center: coordenadas
  });
  var marker = new google.maps.Marker({
    position: coordenadas,
    map: map
  });
}

function cambiarUbicacion() {
alert("hola");
  var latitud = $(this).data("lat");
  var longitud = $(this).data("lng");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  console.log(coordenadas);
  mostrarMapa(coordenadas);
}



$(document).ready(cargarPagina);