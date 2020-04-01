async function _getLocationAsync(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
  }

  function displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);
    console.log(`longitude: ${ lng } | latitude: ${ lat }`);

    return lat;
  }
}
export const findLocation = async () => {

  return _getLocationAsync()

}