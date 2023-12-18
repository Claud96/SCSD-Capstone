import { DataTypes } from "sequelize";

// Define the sessionModel function that creates and configures a Session model

const Sessions = (db) => {
    // Define the 'Session' model with the given schema
    return db.define("sessions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: DataTypes.STRING,
        expiryDate: DataTypes.DATE,
    });
};

// Export the sessionModel function
export default Sessions;
