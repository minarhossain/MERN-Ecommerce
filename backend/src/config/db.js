const mongoose = require('mongoose');
const { mongodbUrl } = require('../secret');

const mongodbConnection = async (options) => {
    try {
        await mongoose.connect(mongodbUrl, options);
        console.log("✅ Database Connected");
        // if any error or stop this connection we can use
        mongoose.connection.on('error', (error) => {
            console.error("❌ Database Connection Error", error);
        });
    } catch (error) {
        console.log("❌ Could not connect", error.toString());
    }
}
module.exports = mongodbConnection;