require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT ?? 3000;
app.listen(port, () =>
  console.log(`Express running → On http://localhost:${port} 🚀`)
);
