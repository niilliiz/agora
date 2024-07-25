require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors"); // Import the cors package
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust to match your frontend URL
  }),
);

app.get("/api/agora-channel", async (req, res) => {
  const channelName = "First";
  // const channelName=req.query.channelName
  if (!channelName) {
    return res.status(400).send("Channel name is required");
  }

  // const url = `${process.env.NEXT_PUBLIC_AGORA_BASE_URL}/apps/${process.env.AGORA_APP_ID}/channels/${channelName}/users`;
  const url = `https://api.agora.io/v1/apps/fd4a81fd8752405bbccd1fa1b7a65cc6/channels/${channelName}/users`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: "780ab86085ab40bca482c03427a5dba6",
        password: "c903247c0abf4b71bc427f449d0d408d",
      },
    });

    console.log("hello", response);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching channel users:", error);
    res.status(500).send("Failed to fetch channel users");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
