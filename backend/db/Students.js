import { DataTypes } from "sequelize";

const Students = (db) => {
    // Define the 'Student' model with the given schema
    return db.define("students", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: DataTypes.STRING, // Store hashed passwords securely
    });
};

// Export the studentModel function
export default Students;
