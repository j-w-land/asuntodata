import data_all_transactions from "../assets/data/data_all_transactions.json";
import zipCodeStructure from "../assets/data/zipCodeStructure.json";

/*

Dataa filteröitynä käytettäväksi komponenteissa...

*/

const cityList = () => {
  let zipCodeStructureData = zipCodeStructure.data;

  let list = [];
  for (const item in zipCodeStructureData) {
    list.push(zipCodeStructureData[item].kaupunki);
  }

  list = [...new Set(list)];

  return list.sort();
};

const regionList = () => {
  let zipCodeStructureData = zipCodeStructure.data;

  let list = [];
  for (const item in zipCodeStructureData) {
    list.push(zipCodeStructureData[item].maakunta);
  }

  list = [...new Set(list)];

  return list.sort();
};

const zipsByCity = () => {
  let zipCodeStructureData = zipCodeStructure.data;
  let list = [];
  let cityListData = cityList();

  for (const item in cityListData) {
    let matches = zipCodeStructureData.filter(
      (e) => e.kaupunki === cityListData[item]
    );
    list.push({ place: cityListData[item], data: matches });
  }

  return list.sort();
};

const zipsByRegion = () => {
  let zipCodeStructureData = zipCodeStructure.data;
  let list = [];
  let regionListData = regionList();

  for (const item in regionListData) {
    let matches = zipCodeStructureData.filter(
      (e) => e.maakunta === regionListData[item]
    );
    list.push({ place: regionListData[item], data: matches });
  }

  return list.sort();
};

const transactionsByCity = () => {
  let list = [];
  let cityListData = zipsByCity();

  for (const item in cityListData) {
    let dataElement = cityListData[item].data;
    let matchesRes = [];
    for (const element in dataElement) {
      let matches = data_all_transactions.filter(
        (e) => e.postinumero === dataElement[element].postinumero
      );
      for (const match in matches) {
        matchesRes.push(matches[match]);
      }
    }

    list.push({ place: cityListData[item].place, data: matchesRes });
  }

  return list.sort();
};

const transactionsByRegion = async () => {
  let list = [];
  let regionListData = zipsByRegion();

  for (const item in regionListData) {
    let dataElement = regionListData[item].data;
    let matchesRes = [];
    for (const element in dataElement) {
      let matches = data_all_transactions.filter(
        (e) => e.postinumero === dataElement[element].postinumero
      );
      for (const match in matches) {
        matchesRes.push(matches[match]);
      }
    }

    list.push({ place: regionListData[item].place, data: matchesRes });
  }

  return list.sort();
};

let summaryByRegionData = [];
let summaryByCityData = [];
let summaryByCountryData = [];

const summaryByArea = async (params) => {
  //console.log("summaryByArea___________FUNKTIO");
  if (params.type === "region") {
    if (summaryByRegionData.length !== 0) return summaryByRegionData;
    //console.log("summaryByArea___________FUNKTIO__DATAHAKU");
    let data = await getData("transactionsByRegion");
    let res = await summaryByAreaCreateData(data);
    summaryByRegionData = res;
    return res;
  } else if (params.type === "city") {
    if (summaryByCityData.length !== 0) return summaryByCityData;
    //console.log("summaryByArea___________FUNKTIO__DATAHAKU");
    let data = transactionsByCity();
    let res = await summaryByAreaCreateData(data);
    summaryByCityData = res;
    return res;
  } else if (params.type === "country") {
    if (summaryByCountryData.length !== 0) return summaryByCountryData;
    //console.log("summaryByArea___________FUNKTIO__DATAHAKU");
    let data = [{ place: "Suomi", data: data_all_transactions }];
    let res = await summaryByAreaCreateData(data);
    summaryByCountryData = res;
    return res;
  }
  // return empty array if params do not match conditions
  return [];
};

const summaryByAreaCreateData = async (data) => {
  let list = [];

  let summaryList = [];

  const roomSizes = ["1", "2", "3", "4"];

  for (const region in data) {
    let regionDataObj = {
      1: [],
      2: [],
      3: [],
      4: [],
    };
    let dataObject = {};

    for (const roomSize in roomSizes) {
      let dataBySize = data[region].data.filter(
        (e) => e.huoneLukumaara === roomSizes[roomSize]
      );

      dataObject = {
        hintaPerNelio: [],
        /*   huoneLukumaara: [], */
        pintaAla: [],
        rakennusvuosi: [],
        velatonHinta: [],
      };
      for (const item in dataBySize) {
        let dataElement = dataBySize[item];

        dataObject.hintaPerNelio.push(parseFloat(dataElement["hintaPerNelio"]));
        /* dataObject.huoneLukumaara.push(
          parseFloat(dataElement["huoneLukumaara"])
        ); */
        /* dataObject.kerros.push(dataElement[element]["kerros"]); */
        dataObject.pintaAla.push(parseFloat(dataElement["pintaAla"]));
        dataObject.rakennusvuosi.push(parseFloat(dataElement["rakennusvuosi"]));
        dataObject.velatonHinta.push(parseFloat(dataElement["velatonHinta"]));
      }
      regionDataObj[roomSizes[roomSize]] = dataObject; // .push(dataObject);
    }

    let dataAll = {
      hintaPerNelio: [],
      /* huoneLukumaara: [], */
      pintaAla: [],
      rakennusvuosi: [],
      velatonHinta: [],
    };

    // combine roomSize level data into one object (in order to calculate values on total level)
    for (const dataItem in regionDataObj) {
      for (const objItem in dataAll) {
        dataAll[objItem] = [
          ...dataAll[objItem],
          ...regionDataObj[dataItem][objItem],
        ];
      }
    }

    regionDataObj["kaikki"] = dataAll;

    list.push({
      place: data[region].place,
      data: regionDataObj,
    });
  }

  for (const item in list) {
    let regionDataObject = {};
    let summaryObj = {};
    for (const roomSize in list[item]["data"]) {
      summaryObj = {
        hintaPerNelio: { min: "", avg: "", max: "" },
        /*  huoneLukumaara: { min: "", avg: "", max: "" }, */
        pintaAla: { min: "", avg: "", max: "" },
        rakennusvuosi: { min: "", avg: "", max: "" },
        velatonHinta: { min: "", avg: "", max: "" },
        tapahtumatYht: "",
      };

      /* kerros:{min:"", avg:"",max:""}, */

      for (const property in list[item]["data"][roomSize]) {
        let listItemElement = list[item]["data"][roomSize][property];

        if (listItemElement.length === 0) continue;

        let total = 0;
        let min = Math.min.apply(Math, listItemElement).toFixed(0);
        let max = Math.max.apply(Math, listItemElement).toFixed(0);
        let average = 0;

        for (const value in listItemElement) {
          total = total + listItemElement[value];
        }
        average = total / listItemElement.length;

        summaryObj[property]["min"] = getFormattedValue(min, null, property);
        summaryObj[property]["max"] = getFormattedValue(max, null, property);
        summaryObj[property]["avg"] = getFormattedValue(
          average,
          null,
          property
        );
      }
      summaryObj["tapahtumatYht"] =
        list[item]["data"][roomSize]["velatonHinta"].length;

      regionDataObject[roomSize] = summaryObj;
    }
    summaryList.push({ place: list[item].place, data: regionDataObject });
  }

  return summaryList;
};

const getFormattedValue = (value, format = null, attribute = "null") => {
  const formatObject = {
    null: "",
    hintaPerNelio: "eur",
    velatonHinta: "eur",
  };
  if (format == null) format = formatObject[attribute];

  if (format == "eur") {
    return Number(value).toLocaleString("fi-FI", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } else {
    return Number(value).toFixed(0);
  }
};

// alusta data aluksi ja tallenna muuttujiin niin ei tarvii suorittaa monta kertaa samaa toimintoa jos voi hyödyntää samaa dataa filterointien yhteydessä.
let transactionsByRegionData = [];

export default async function getData(structure, params) {
  if (structure === "cityList") return cityList();
  if (structure === "regionList") return regionList();
  if (structure === "zipsByCity") return zipsByCity();
  if (structure === "zipsByRegion") return zipsByRegion();
  if (structure === "transactionsByCity") return transactionsByCity();
  if (structure === "transactionsByRegion") {
    if (transactionsByRegionData.length === 0) {
      transactionsByRegionData = await transactionsByRegion();
      return transactionsByRegionData;
    } else {
      return transactionsByRegionData;
    }
  }

  if (structure === "summaryByArea") return await summaryByArea(params);
}
