import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "url";
import simulateAccess from "./rules/index.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const employees = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/employees.json"), "utf-8")
);

app.get("/", (req, res) =>
  res.status(200).json({
    success: true,
    message: "Access Simulator API",
  })
);

app.get("/api/employees", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employees fetched successfully",
    results: employees,
  });
});

app.get("/api/simulate", (req, res) => {
  const results = simulateAccess(employees);
  res.status(200).json({
    success: true,
    message: "Simulation completed successfully",
    results,
  });
});

const port = process.env.PORT ?? 3000;
app.listen(port, () =>
  console.log(`Express running → On http://localhost:${port} 🚀`)
);
