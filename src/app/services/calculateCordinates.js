import axios  from "axios";


async function getLocationCoordinates(locations) {
  const nominatimBaseUrl =
    "https://nominatim.openstreetmap.org/search?format=json&q=";

  try {
    if (typeof locations === "string") {
      const nominatimUrl = `${nominatimBaseUrl}${encodeURIComponent(
        locations
      )}`;
      const response = await axios.get(nominatimUrl);

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return [[parseFloat(lat), parseFloat(lon)]];
      } else {
        throw new Error(`No results found for the location: ${locations}`);
      }
    } else if (Array.isArray(locations)) {
      const coordinates = [];
      for (const location of locations) {
        const nominatimUrl = `${nominatimBaseUrl}${encodeURIComponent(
          location
        )}`;
        const response = await axios.get(nominatimUrl);

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          coordinates.push([parseFloat(lat), parseFloat(lon)]);
        } else {
          throw new Error(`No results found for the location: ${location}`);
        }
      }
      return coordinates;
    } else {
      throw new Error(
        "Invalid argument: locations must be a string or an array"
      );
    }
  } catch (error) {
    console.error("Error fetching location coordinates:", error.message);
    throw error;
  }
}


export default getLocationCoordinates
