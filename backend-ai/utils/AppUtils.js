function cleanAndParseJSON(jsonString) {
  // Remove markdown artifacts
  jsonString = jsonString.replace(/```json\n|```/g, "");

  try {
    // Parse the cleaned JSON string into an object
    const jsonData = JSON.parse(jsonString);
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return null;
  }
}

const getPrompt = (placeName, generalInfo, song) => {
  let prompt = `Provide travel information about ${placeName} in valid JSON format. 
  The response should be a JSON array with each item containing:
  {
    "name": "<Place Name>",
    "description": "<Brief Description>",
    "category": "<Category>",
    "location": "<Location>",
    "best_time_to_visit": "<Best Time to Visit>",
    "highlights": ["Highlight 1", "Highlight 2"]
  }
  Ensure the response is **valid JSON** without extra text or formatting. without backticks at the end`;

  if (generalInfo) {
    return `Provide information about ${generalInfo} without extra formatting and \n
   `;
  }
  if (song) {
    return `I want to play a song in my app. Please provide a direct youtube url for the song ${song}. 
Return the result in JSON format as:
{
  "songName": "{songName}",
  "artist": "{artistName}",
  "mp3Url": "{mp3_url_here}",
  "streamingLink": "{alternative_streaming_link_if_no_mp3}"
}`;
  }
  return prompt;
};
module.exports = { cleanAndParseJSON, getPrompt };
