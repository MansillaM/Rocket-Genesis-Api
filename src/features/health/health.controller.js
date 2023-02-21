require('dotenv').config();
const port = process.env.PORT || 3004;

// Hello world
const helloWorld = async(req, res) => {
  res.send('Hello World!!');
};

// Status of environment and port
const status = async(req,res) => {
  const envName = process.env.ENV_NAME;
  const message = `Environment '${envName}' running on port: ${port}`;
  res.send(message);
};

// Error status
const error = async(req,res) => {
  res.status(400);
  res.send('error');
};

module.exports = {helloWorld, status, error};