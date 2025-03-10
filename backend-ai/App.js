const express = require("express");
const cookieParser = require("cookie-parser");
const { getPlaceName } = require("./middleware/getPlaces");
const app = express();
app.use(express.json());
app.use(cookieParser());
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getPrompt } = require("./utils/AppUtils");
const cors = require("cors");

const genAI = new GoogleGenerativeAI("AIzaSyAWN0tVEMNUkrI8WatqitjrOibDUNAdNpc");
const { cleanAndParseJSON } = require("./utils/AppUtils");
app.use(cors());

app.listen(3000, () => {
  console.log("listening");
});

app.post("/ai/details", async (req, res) => {
  try {
    const { latitude, longitude, generalInfo, song } = req.body;

    const placeName = await getPlaceName(latitude, longitude);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    let prompt = getPrompt(placeName, null);
    if (generalInfo) {
      prompt = getPrompt(placeName, generalInfo);
    }
    if (song) {
      prompt = getPrompt(placeName, generalInfo, song);
    }

    const aiResponse = await model.generateContent(prompt);
    let aiText =
      aiResponse.response.candidates[0]?.content?.parts[0]?.text ||
      "No facts found.";

    console.log(latitude, longitude, "lat", placeName, aiText);
    res.json(generalInfo ? { info: aiText } : cleanAndParseJSON(aiText));
  } catch (error) {
    res.status(500).send("Error " + error.message);
  }
});
