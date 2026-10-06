const mongoose = require("mongoose");

let isShuttingDown = false;

const gracefullShutDown = async (signal) => {
    console.log(`${signal} received. Shutting Down...`);

    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    const shutDownTimeOut = setTimeout(() => {
        console.error("Graceful shutdown timed out. Forcing shutdown...");
        process.exit(1);
    }, 10000);

    try {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) {
                reject(error);
                } else {
                resolve();
                }
            });
        });

        console.log("HTTP server closed.");

        await mongoose.connection.close();

        console.log("MongoDB connection closed.");

        clearTimeout(shutDownTimeOut);

        console.log("Graceful shutdown complete.");

        process.exit(0);
    } catch (error) {
        clearTimeout(shutDownTimeOut);
        console.error("Error during graceful shutdown: ", error);
        process.exit(1);
    }
};

module.exports = gracefullShutDown