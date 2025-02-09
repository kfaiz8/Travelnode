
	mapboxgl.accessToken = 'pk.eyJ1IjoiZmFpejY5NyIsImEiOiJjbTZxaGJmcGoxaXV1MnFzaHhxN3ZuY2MyIn0.bV9XE1Ht6Jw1FKCTjJBujQ';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:'mapbox://styles/mapbox/satellite-streets-v12',
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    const marker1 = new mapboxgl.Marker({color:'red'})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset:8})
        .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`))
        .addTo(map);

