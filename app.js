const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apikey = "57c5ceee0a0a4e6e6ba1042a1dcabb2e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit + "";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      console.log(temp);
      const weatherDesciption = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1> The Temperature description is " + weatherDesciption + " </h1>");
      res.write("<h1> The temperatur in "+ query+" is  " + temp + " degree celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  });
})
app.listen(3000, function () {
  console.log("Server is runnig at port 3000");
});