const env = require("./config/env.js");
const connectDB = require("./db/connectDB.js");
const app = require("./app.js");
const gracefullShutDown = require("./lifecycle/shutdown.js");

async function startServer(){
    try{
        await connectDB(env.DB_URL);

        const server = app.listen(env.PORT,() => {
            console.log(`Server listening on port: ${env.PORT}`);
        })

        server.on('error', (error) => {
            console.error("HTTP server error: ", error);
            process.exit(1);
        })

        process.on("SIGTERM", () => gracefullShutDown("SIGTERM"))
        process.on("SIGINT", () => gracefullShutDown("SIGINT"))
    }catch(error){
        console.error("Application Startup Failed");
        process.exit(1);
    }
}

startServer()
