let map;

const initMap = async () => {
    const myLoc = new google.maps.LatLng(18.520430,73.856743);
    map = new google.maps.Map(document.getElementById('map-canvas'),{
        center : myLoc,
        zoom : 15,
        mapTypeId : "terrain"
    })
    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode : google.maps.drawing.OverlayType.MARKER,
        drawingControl : true,
        drawingControlOptions : {
            position : google.maps.ControlPosition.TOP_CENTER,
            drawingModes : [
                google.maps.drawing.OverlayType.POLYGON
            ]
        },
        polygonOptions : {
            fillColor: "#ffff0065",
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
            geodesic : true
        }
    })

    const printCoordinates = (polygon) => {
        $("#clist").empty();
        polygon.getPath().forEach(path => {
            $("#clist").append(`<li>${path.toString()}</li>`);
        });
    }

    google.maps.event.addListener(drawingManager,'polygoncomplete',(polygon) => {
        console.log(polygon);
        google.maps.event.addListener(polygon,'dragend',printCoordinates(polygon));
        google.maps.event.addListener(polygon.getPath(),'insert_at',()=>{console.log('insert_at');printCoordinates(polygon)});
        google.maps.event.addListener(polygon.getPath(),'set_at',() => {console.log('insert_at');printCoordinates(polygon)});
    });

    drawingManager.setMap(map)
}

initMap();