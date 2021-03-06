function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: -23.5734614,
            lng: -46.9806374
        },
        zoom: 14,
        mapTypeId: "roadmap"

    });

    var input = document.getElementById("buscar");
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); // Envia dados do input.

    map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
    });
    var markers = []; // envia evento trazendo detalhes do lugar 

    searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return; // Limpa os marcadores
        }

        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = []; // traz icone do local

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Local sem geometria");
                return;
            }

            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            }; // creador de marcadores

            markers.push(
                new google.maps.Marker({
                    map: map,
                    draggable: true,
                    title: place.name,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP
                })
                
            );

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}
exports.initAutocomplete = initAutocomplete;
