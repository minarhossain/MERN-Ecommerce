const app = require("./app");
const mongodbConnection = require("./config/db");
const { serverPort } = require("./secret");


app.listen(serverPort, async () => {
    console.log(`Server running  http://localhost:${serverPort}`);
    await mongodbConnection();
})

