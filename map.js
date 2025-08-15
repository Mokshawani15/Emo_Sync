function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Initialize the map centered at user's location
            const map = new google.maps.Map(document.getElementById("map"), {
                center: userLocation,
                zoom: 14,
                styles: [
                    {
                        featureType: "poi", // Hide all points of interest
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.medical", // Show only hospitals
                        stylers: [{ visibility: "on" }]
                    }
                ]
            });

            // Mark User's Location
            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "Your Location",
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            });

            // Find Nearby Hospitals
            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: userLocation,
                radius: 5000, // Search within 5 km
                type: ["hospital"]
            }, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        createHospitalMarker(results[i], map);
                    }
                } else {
                    console.error("Nearby Search Failed: ", status);
                    alert("No hospitals found nearby.");
                }
            });

        }, function (error) {
            console.error("Geolocation failed: ", error);
            alert("Location access denied. Enable location services.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Function to create a hospital marker
function createHospitalMarker(place, map) {
    if (!place.geometry || !place.geometry.location) return;

    new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
    });
}
