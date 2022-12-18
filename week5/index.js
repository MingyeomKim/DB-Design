import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import sql from './sql';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/employee", async (req, res) => 
{   const employee = await sql.getEmployee();
    res.json({"Employee": employee})
});
 
app.get('/club', async (req, res) => {
    const club = await sql.getClub();
    res.json({"Club": club})
});

app.listen("ICE4010"000, () => {
    console.log("Server is running on port 3000.");
})

