import "dotenv/config.js";
import express from "express";
import cors from "cors";
import PatientRoute from "./routes/PatientRoutes.js";
import RoomRoute from "./routes/RoomRoutes.js";
import DoctorRoute from "./routes/DoctorRoutes.js";
import db from "./config/database.js"
import { defineAssociations } from "./models/DoctorModels.js";
import { RoomdefineAssociations } from "./models/RoomModels.js";



const PORT = process.env.DATABASE_PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// Route
app.get("/", (req, res) => {
    res.send("Hello World Guys");
});

app.use(PatientRoute);
app.use(RoomRoute);
app.use(DoctorRoute);


db.sync({
        alter: true
    })
    .then(() => {
        console.log("Database connected");
        defineAssociations()
        RoomdefineAssociations()
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    }).catch((error) => {
        console.log(`Unable to connect to databse ${error}`)
    })