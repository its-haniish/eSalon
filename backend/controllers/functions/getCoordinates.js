const getCoordinates = async (locationName) => {
    try {
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationName)}&key=fca204d952de42a9a67af0a13db863c8`; 
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.results.length > 0) {
        const lat = data.results[0].geometry.lat;
        const lon = data.results[0].geometry.lng;
        return { latitude: lat, longitude: lon };
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
};

module.exports = getCoordinates;
