const axios = require("axios");

async function getPlaceName(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  try {
    const response = await axios.get(url);
    return response.data.display_name || "Unknown Location";
  } catch (error) {
    console.error("❌ Error fetching place info:", error);
    return null;
  }
}

module.exports = { getPlaceName };
