/* eslint-disable no-undef */
/**
 * XXXXXXXXXXXX
 */

// config map
let config = {
  minZoom: 7,
  maxZoom: 18,
};
// magnification with which the map will start
const zoom = 18;
// co-ordinates
const lat = 52.22977;
const lng = 21.01178;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// ----------------------------------------------------------

// one marker
L.marker([52.22983, 21.011728]).addTo(map).bindPopup("Center Warsaw");

document.addEventListener("click", (e) => {
  if (e.target.className !== "move") return;

  const offset = 100;
  const moveType = e.target.id.split("-")[1];

  // get marker latlng from marker
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      // get marker latlng from marker
      const latlngMarker = layer.getLatLng();

      // convert latlng to container point
      const latLng = map.latLngToContainerPoint(latlngMarker);

      // move marker to new place
      const moveToNewPlace = changePostion(latLng, moveType, offset);

      // convert container point to latlng
      const newLatLng = map.containerPointToLatLng(moveToNewPlace);

      // set new latlng to marker
      layer.setLatLng(newLatLng);

      // move map to new latlng
      map.panTo([newLatLng.lat, newLatLng.lng]);
    }
  });
});

/**
 * Change position of latlng
 *
 * @param {Object} latLng
 * @param {String} positionType
 * @param {Number} offset
 * @returns {Object}
 */
function changePostion(latLng, positionType, offset) {
  switch (positionType) {
    case "up":
      return { x: latLng.x, y: latLng.y - offset };
    case "down":
      return { x: latLng.x, y: latLng.y + offset };
    case "left":
      return { x: latLng.x - offset, y: latLng.y };
    case "right":
      return { x: latLng.x + offset, y: latLng.y };
    default:
      return latLng;
  }
}
