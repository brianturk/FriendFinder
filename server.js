const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('app/public'));  //so you can put a javascript file in you public folder

require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);


app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});