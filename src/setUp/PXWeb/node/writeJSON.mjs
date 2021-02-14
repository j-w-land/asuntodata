"use strict";
import pxwebGetData from "../getData.js";
/* import objectToJSON from "../objectToJSON.js"; */

//const fs = require("fs");
import * as fs from "fs";
console.log("wirteJSON start");

const fetchData = async () => {
  let years = [
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ];

  let resArray = [];
  for (const year in years) {
    console.log("HAKUVUOSI: " + years[year] + "!!!!!!!!!!!!!!!!!!!!!!!!!!!--");
    let response = await pxwebGetData("zipsByRegion", {
      years: [years[year]],
    });
    resArray.push(response);
  }
  /* console.log(resArray);
  console.log("RegionBarLine__res"); */

  let writeArray = [];
  for (const year in resArray) {
    let yearObj = { year: years[year] };
    let regionArray = [];
    for (const region in resArray[year]) {
      let object = {};
      object["place"] = resArray[year][region].place;
      /* console.log(resArray[year][region]);
      console.log("resArray[region]"); */

      object["data"] = JSON.stringify(resArray[year][region].data.total);
      regionArray.push(object);
    }
    yearObj["data"] = regionArray;
    writeArray.push(yearObj);
  }
  let data = JSON.stringify(writeArray);
  fs.writeFileSync("src/setUp/PXWeb/node/regionsIndex.json", data);
};
fetchData();
