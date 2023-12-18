// Report.js
import { DataTypes } from "sequelize";

// Define the reportModel function that creates and configures a Report model
const Reports = (db) => {
    // Define the 'Report' model with the given schema
    return db.define("reports", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.TEXT,
        title: DataTypes.TEXT,
        author: DataTypes.TEXT,
        mainCharacters: DataTypes.TEXT,
        setting: DataTypes.TEXT,
        beginning: DataTypes.TEXT,
        conflict: DataTypes.TEXT,
        resolution: DataTypes.TEXT,
        review: DataTypes.TEXT,
    });
};

// Export the reportModel function
export default Reports;
