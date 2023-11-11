const app = require("./app");
const mongodbConnection = require("./config/db");
const { serverPort } = require("./secret");


app.listen(serverPort, () => {
    console.log(`Server running  http://localhost:${serverPort}`);
    mongodbConnection();
})

