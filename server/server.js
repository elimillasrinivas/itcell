const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
dotenv.config();

const User = require("./models/User");
const authController = require("./controllers/authController");
const districts = require("./districts.json");
const mandals = require("./mandals.json");
const assemblies = require("./assemblies.json");
const policeStations = require("./policeStations.json");

// middlewares
app.use(cors());
app.use(express.json());

//db connection
mongoose
  .connect(process.env.mongo_uri)
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log(error));

//api's

app.get(
  "/admin/dashboard",
  authController.authenticateToken,
  async (req, res) => {
    // console.log(req.user.role);
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    try {
      // Retrieve admin information
      const admin = await User.findOne({ role: "admin" });

      // Retrieve user information
      const users = await User.find({ role: "user" });

      // Return the admin and user information
      res.json({ admin, users, message:"Access success" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error retrieving admin and user information" });
    }
  }
);

// API endpoint to fetch districts
app.get("/api/districts", (req, res) => {
  res.json(districts);
});

// API endpoint to fetch mandals based on district ID
app.get("/api/mandals/:assemblyId", (req, res) => {
  const assemblyId = parseInt(req.params.assemblyId);
  const filteredMandals = mandals.filter(
    (mandal) => mandal.assemblyId === assemblyId
  );
  res.json(filteredMandals);
});

// API endpoint to fetch police stations based on district and mandal IDs
app.get("/api/police-stations/:districtId/:mandalId", (req, res) => {
  const districtId = parseInt(req.params.districtId);
  const mandalId = parseInt(req.params.mandalId);
  const filteredPoliceStations = policeStations.filter(
    (ps) => ps.districtId === districtId && ps.mandalId === mandalId
  );
  res.json(filteredPoliceStations);
});

// API endpoint to fetch assemblies based on district and mandal IDs
app.get("/api/assemblies/:districtId", (req, res) => {
  const districtId = parseInt(req.params.districtId);
  const filteredAssemblies = assemblies.filter(
    (ac) => ac.districtId === districtId
  );
  res.json(filteredAssemblies);
});

// routes
const dataEntryRouter = require("./routes/eaDataEntryRouter");
const userRouter=require("./routes/userRouter")
app.use("/data", dataEntryRouter);
app.use("/user", userRouter);

//Port
const port = process.env.port;
app.listen(port, () => console.log(`Server is listening on ${port}`));
