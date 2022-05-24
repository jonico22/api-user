const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const logger = require('./utils/logger')
const config = require('./config')
const routes = require('./routes');
const helmet = require("helmet");
const app = express();
const upload = multer();
const { createRoles, createAdmin} = require("./libs/initialSetup");

//createRoles()
//createAdmin()
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
require('./services/database/mongo');

app.use(morgan('short', {
    stream: {
      write: message => logger.info(message.trim())
    }
}))

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to API",
  });
});
app.use('/v1', routes);
app.listen(config.PORT, () => {
    logger.info('Escuchando en el puerto ' + config.PORT)
})

module.exports = app;    