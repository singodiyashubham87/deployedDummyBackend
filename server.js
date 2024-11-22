/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const FILE_NAME = "dummy.png";

app.use(express.json());
app.use(cors());

const routes = {
  download: "/download",
  ping: "/ping",
};

app.get(routes.ping, (req, res) => {
  res.status(200).send({ status: "ok" });
});
app.get(routes.download, async (req, res) => {
  try {
    res.sendFile(FILE_NAME, { root: "./" });
  } catch (error) {
    console.error(`Error sending file: ${error.message}`);
    res.status(500).send("Error sending file");
  }
});

app.post("/log-network-performance", (req, res) => {
  try {
    const {
      droppedRequests,
      latency,
      jitter,
      successfulRequests,
      totalRequests,
      downloadSpeed,
      timestamp,
    } = req.body;

    if (
      droppedRequests === undefined ||
      latency === undefined ||
      jitter === undefined ||
      successfulRequests === undefined ||
      totalRequests === undefined ||
      downloadSpeed === undefined ||
      timestamp === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const logEntry = {
      droppedRequests,
      latency,
      jitter,
      successfulRequests,
      totalRequests,
      downloadSpeed,
      timestamp,
    };
    console.log("Network performance logged:", logEntry);
    return res
      .status(200)
      .json({ message: "Performance data logged successfully" });
  } catch (error) {
    console.error(`Error logging network performance: ${error.message}`);
    res.status(500).send("Error logging network performance");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
