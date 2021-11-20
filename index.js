const express = require("express");
const app = express();

// Configuramos los settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());

//Routes
app.use(require('./src/routes/empleados'));

//Starting server
app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
