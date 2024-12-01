const app = require('./app');

// to host in local or vps
const port = process.env.PORT || 3555;
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
  console.log(process.env.NODE_ENV + " enviroment");
});
