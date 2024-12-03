const app = require('./app');
require('dotenv').config();
const fs = require('fs');

// check .env
if (!fs.existsSync('.env')) {
  console.error('Error: .env file not found!');
  process.exit(1); // Exit with status code 1 (failure)
}

// check api keys
if (process.env.API_KEYS === undefined) {
  console.error('Error: variable "API_KEYS" in .env not found!');
  process.exit(1); // Exit with status code 1 (failure)
}

// to host in local or vps
const port = process.env.PORT || 3555;
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
  console.log(process.env.NODE_ENV + ' enviroment');
});
