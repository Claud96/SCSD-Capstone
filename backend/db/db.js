import Sequelize from "sequelize";
// import StudentsModel from "./Students.js";
// import SessionsModel from "./Sessions.js";
import ReportsModel from "./Reports.js";

const db = new Sequelize("Postgres://claudio96@localhost:5432/scsd");

// const Students = StudentsModel(db);
const Reports = ReportsModel(db);
// const Sessions = SessionsModel(db);

// // Define associations
// Students.hasMany(Reports, { foreignKey: "userId" }); // One student has many reports
// Students.hasMany(Sessions); // One student has many sessions

// Reports.belongsTo(Students); // A report belongs to a student
// Sessions.belongsTo(Students); // A session belongs to a student

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log("connected to database");

        db.sync();
    } catch (error) {
        console.error(error);
        console.error(" P A N I C ! database ISSUE !!");
    }
};

connectToDB();

export { db, Reports };
