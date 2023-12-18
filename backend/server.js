import express from "express";
import cors from "cors";
import { db, Reports } from "./db/db.js";
import jwt from "jsonwebtoken";
import fs from "fs";

const server = express();
server.use(express.json());
server.use(cors());

const validateUserTokenMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).send({ error: "Authorization header not specified!" });
        return;
    }

    const headerParts = header.split(" ");
    if (headerParts.length !== 2) {
        res.status(401).send({
            error: `Malformed Authorization header - expected two words, found ${headerParts.length}`,
        });
        return;
    }

    if (headerParts[0] !== "Bearer") {
        res.status(401).send({
            error: `Malformed Authorization header - expected Bearer scheme, found ${headerParts[0]}`,
        });
        return;
    }

    const token = headerParts[1];
    if (token.length === 0) {
        res.status(401).send({
            error: "Malformed Authorization header - missing token!",
        });
        return;
    }

    const publicKey = fs.readFileSync("./clerk-public-key.pem", {
        encoding: "utf-8",
    });
    let decoded;
    try {
        decoded = jwt.verify(token, publicKey);
        console.log(decoded);
    } catch (error) {
        console.error("Error validating token:", error.message);
        res.status(401).json({
            error: "Malformed Authorization header - invalid token!",
        });
        return;
    }
    req.auth = { clerkUserID: decoded.sub };
    next();
};

server.get("/", (req, res) => {
    res.send({ status: "online" });
});

server.post(
    "/ReportTemplate",
    validateUserTokenMiddleware,
    async (req, res) => {
        console.log(req.auth.clerkUserID);
        console.log(req.body);

        // const { title, name } = req.body;
        // await Reports.create({ title, name });

        await Reports.create({
            name: req.body.name,
            title: req.body.title,
            author: req.body.author,
            mainCharacters: req.body.mainCharacters,
            setting: req.body.setting,
            beginning: req.body.beginning,
            conflict: req.body.conflict,
            resolution: req.body.resolution,
            review: req.body.review,
        });
        res.send({});
        console.log(req.body);
    }
);

server.get("/reports", async (req, res) => {
    try {
        // Query the database to get the reports
        const reports = await Reports.findAll();

        // // Convert the reports array to an object with report IDs as keys
        // const reportsObject = {};
        // for (const report of reports) {
        //     reportsObject[report.id] = report;
        // }

        // Send the reports as an object in the response
        res.send({ reports });
    } catch (error) {
        console.error("Error fetching reports:", error);
    }

    // try {
    //     // Query the database to get the reports
    //     // Send the reports to the frontend
    //     res.send({ reports: await Reports.findAll() });
    // } catch (error) {
    //     console.error("Error fetching reports:", error);
    // }
});

server.get("/reports/:id", async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Reports.findOne({ where: { id: reportId } });

        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.send({ report });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// server.get("/reports", async (req, res) => {
//     res.send({ reports: await Reports.findOne({ id: req.params.id }) });

//     console.log(error);
// });

// server.delete("/reports/:id", async (req, res) => {
//     const report = await Reports.findOne({ where: { id: req.params.id } });
//     await report.destroy();
//     res.send({});
// });

// server.delete("/reports/:id", async (req, res) => {
//     try {
//         const reportId = req.params.id;
//         const report = await Reports.findOne({ where: { id: reportId } });

//         if (!report) {
//             return res.status(404).json({ error: "Report not found" });
//         }

//         // Delete the report from the database
//         await report.destroy();

//         res.send({ message: "Report deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting report:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

server.delete("/reports/:id", async (req, res) => {
    const report = await Reports.findOne({ where: { id: req.params.id } });
    await report.destroy();
    res.send();
});

server.listen(3021, () => {
    console.log("server running on port 3021");
});
