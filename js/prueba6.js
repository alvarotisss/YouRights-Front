//  https://www.youtube.com/watch?v=1b4NzbSJ7dI&list=PLHAwr9gJjquel5iPqOXxPQkV2Dou6zddO&index=11

// todo lo que hace referencia a marcadores_nuevos sirve para
// cuando pinches en el mapa siempre se quede el último pinchado
var marcadores_nuevos = [];

function quitar_marcadores(lista){
    // recorrer el array de los marcadores
    for (i in lista){
        lista[i].setMap(null);
    }
};
var cxGet = [];
var cyGet = [];

$(document).ready(function () {

    initMap();

    function initMap() {
        // Map options
        var options = {
            zoom: 5,
            center: {
                lat: 40.42928819958918,
                lng: -3.6999707343627506
            }
        }

        // New map
        var map = new google.maps.Map(document.getElementById('map'), options);

        // Listen for click on map
        google.maps.event.addListener(map, 'click', function (event) {

            

            // alert(event.latLng)
            var coordenadas = event.latLng.toString();

            coordenadas = coordenadas.replace("(","");
            coordenadas = coordenadas.replace(")","");
            var lista = coordenadas.split(",");

            // alert("La coordenada X es: " + lista [0]);
            // alert("La coordenada Y es: " + lista [1]);

            var direccion = new google.maps.LatLng(lista[0],lista[1]);

            var marcador = new google.maps.Marker({
                // titulo: prompt("Titulo del marcador?"),
                position: direccion,
                map: map,
                animation: google.maps.Animation.DROP,
                draggble: false // no permite el arrastre del marcador
            });

            // pasar coordenadas al formulario
            // $("#form-protests-create-map").find("input[name='cx']").val(lista[0]);
            // $("#form-protests-create-map").find("input[name='cx']").val(lista[1]);
            
            var cxMap = $("#form-cx-map").val(lista[0]);
            console.log(cxMap);
            var cyMap = $("#form-cy-map").val(lista[1]);

            cxGet.push(cxMap);
            cyGet.push(cyMap);
            marcadores_nuevos.push(marcador);

            google.maps.event.addListener(marcador, "click", function(){
                // alert(marcador.titulo);
            });

            quitar_marcadores(marcadores_nuevos);
            marcador.setMap(map);
        });
        $("#button-map-save").on("click", function(){
            function DataProtest(tittleCoordinate, coordinateX, coordinateY) {
                this.tittleCoordinate = tittleCoordinate;
                this.coordinateX = coordinateX;
                this.coordinateY = coordinateY;
            }
            var tittleCoordinateGet = $("#form-tittle-map").val();
            var coordinateXget = cxGet;
            console.log(cxGet)
            var coordinateYget = cyGet;
            console.log(cyGet)

            dataForm = new DataProtest(
                tittleCoordinateGet,
                coordinateXget, 
                coordinateYget,
            );
            console.log(dataForm);
            fetch(`http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create`, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
              ],
            body: JSON.stringify(dataForm)
            })
            //  console.log(newProtest);

            // tambien:    .then((resp) => resp.json())
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                return data;
            })
                return false;
            });
    }
});