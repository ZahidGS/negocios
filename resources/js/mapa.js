import { OpenStreetMapProvider } from 'leaflet-geosearch';
const provider = new OpenStreetMapProvider();


document.addEventListener('DOMContentLoaded', () => {

    if (document.querySelector('#mapa')) {

        const lat = document.querySelector('#lat').value === '' ? 19.681389 : document.querySelector('#lat').value;
        const lng = document.querySelector('#lng').value === '' ? -101.185016 : document.querySelector('#lng').value;

        const mapa = L.map('mapa').setView([lat, lng], 16);

        let markers = new L.FeatureGroup().addTo(mapa);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

        let marker;

        // agregar el pin
        marker = new L.marker([lat, lng], {
            draggable: true,
            autoPan: true
        }).addTo(mapa);

        //agregar pin a las capas
        markers.addLayer(marker);

        //geocoding service
        const geocodeService = L.esri.Geocoding.geocodeService();

        //console.log(geocodeService);

        //buscador de direcciones
        const buscador = document.querySelector('#formBuscador');
        buscador.addEventListener("blur", buscarDireccion);

        reubicarPin(marker);

        function reubicarPin(marker) {
            //detectar movimiento del marker
            marker.on('moveend', function(e) {
                marker = e.target;

                console.log(marker.getLatLng());

                const posicion = marker.getLatLng();

                //centrar automaticamente el mapa cuando sueltas el PIN
                mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

                //Reverse Geocoding, cuando el usuario reubica el PIN
                geocodeService.reverse().latlng(posicion, 16).run(function(error, resultado) {
                    console.log(error);


                    //console.log(resultado);

                    //abrir el globo informativo al soltar el PIN
                    marker.bindPopup(resultado.address.LongLabel);
                    marker.openPopup();


                    //llenar los campos direccion y colonia
                    llenarInputs(resultado);

                })
            });

        }

        function buscarDireccion(e) {

            if (e.target.value.length > 1) {
                provider.search({ query: e.target.value + ' Morelia, MX ' })
                    .then(resultado => {
                        if (resultado) {


                            //limpiar los pines previos
                            markers.clearLayers();

                            //Reverse Geocoding, cuando el usuario reubica el PIN
                            geocodeService.reverse().latlng(resultado[0].bounds[0], 16).run(function(error, resultado) {

                                //llenar los campos direccion y colonia
                                llenarInputs(resultado);
                                console.log(resultado);

                                // centrar el mapa
                                mapa.setView(resultado.latlng)

                                // agregar el pin
                                marker = new L.marker(resultado.latlng, {
                                    draggable: true,
                                    autoPan: true
                                }).addTo(mapa);

                                //asignar al contenedor de markers el nuevo pin
                                markers.addLayer(marker);

                                //mover el  pin
                                reubicarPin(marker);

                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

            console.log(e.target.value.length)
        }

        function llenarInputs(resultado) {
            document.querySelector('#direccion').value = resultado.address.Address || '';
            document.querySelector('#colonia').value = resultado.address.Neighborhood || '';
            document.querySelector('#lat').value = resultado.latlng.lat || '';
            document.querySelector('#lng').value = resultado.latlng.lng || '';
        }
    }

});