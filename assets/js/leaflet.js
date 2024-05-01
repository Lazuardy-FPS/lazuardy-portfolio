//1. MAP TEMPLATE
// Leaflet map initialization
let map = L.map('map').setView([24.366, 64.602], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.scale().addTo(map);

var homeIcon = L.icon({
    iconUrl: './images/home_icon.png',
    iconSize: [20, 20], // size of the icon
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
});

var bagIcon = L.icon({
    iconUrl: '/images/work_icon.png',
    iconSize: [20, 20], // size of the icon
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
});

// Create markers with custom icons
var markerhome = L.marker([-6.924, 107.607], {icon: homeIcon}).bindPopup("My Home").addTo(map);
var markerlocation = L.marker([48.799, 9.207], {icon: bagIcon}).bindPopup("My Location").addTo(map);

// Create polyline connecting the markers
var polyline = L.polyline([
    [-6.924, 107.607], 
    [48.799, 9.207]
]).addTo(map);

// Calculate distance between markers (in meters)
var distance = Math.round(markerhome.getLatLng().distanceTo(markerlocation.getLatLng()));

// Add a tooltip to the polyline displaying the distance
polyline.bindTooltip("Distance: " + distance.toFixed(2)/1000 + " Kilometers").openTooltip();


//2. LEAFLET DRAW FUNCTIONALITY
drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    draw: {
        rectangle: true,
        polygon: true,
        circle: false,
        marker: false
    },
    edit: {
        featureGroup: drawnItems
    }
});

//draw feature
let drawtype, layer, bounds, north, south, east, west, disastercoordinate;
let y, x, deltax, deltay; 
var disastertags, disasterid;

map.addControl(drawControl);
map.on('draw:created', function (e) {
    drawtype = e.layerType;
    layer = e.layer;
    // Getting the bounding box
    if (drawtype === 'rectangle') {
        bounds = layer.getBounds();
        north = bounds.getNorth();
        south = bounds.getSouth();
        east = bounds.getEast();
        west = bounds.getWest();

        y = Math.ceil((north-south)/0.002);
        deltay = (north-south)/y; 
        x = Math.ceil((east-west)/0.002); 
        deltax = (east-west)/x;
        console.log('Rectangle Bounds: (north, south, east, west)= ', bounds, north, south, east, west, y, x, deltax, deltay);
    }
    else if (drawtype === 'polygon') {
        var disastercoordinate1 = layer.getLatLngs()[0];
        disastercoordinate1.push(disastercoordinate1[0]);
        disastercoordinate = disastercoordinate1;
        console.log('polygon coordinate:', disastercoordinate);
    }
    drawnItems.addLayer(layer);
});