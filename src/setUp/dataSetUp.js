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

const transactionsByRegion = () => {
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

const summaryByArea = (params) => {
  let data = [];

  if (params.type === "region") {
    data = transactionsByRegion();
  } else if (params.type === "city") {
    data = transactionsByCity();
  }
  let list = [];

  let summaryList = [];
  //let data = transactionsByRegion();
  console.log(data);
  console.log("summaryByRegion__Data");

  for (const item in data) {
    let dataElement = data[item].data;
    let dataObject = {
      hintaPerNelio: [],
      huoneLukumaara: [],
      /* kerros: [], */
      pintaAla: [],
      rakennusvuosi: [],
      velatonHinta: [],
    }; //parseFloat()
    for (const element in dataElement) {
      dataObject.hintaPerNelio.push(
        parseFloat(dataElement[element]["hintaPerNelio"])
      );
      dataObject.huoneLukumaara.push(
        parseFloat(dataElement[element]["huoneLukumaara"])
      );
      /* dataObject.kerros.push(dataElement[element]["kerros"]); */
      dataObject.pintaAla.push(parseFloat(dataElement[element]["pintaAla"]));
      dataObject.rakennusvuosi.push(
        parseFloat(dataElement[element]["rakennusvuosi"])
      );
      dataObject.velatonHinta.push(
        parseFloat(dataElement[element]["velatonHinta"])
      );
    }

    list.push({ place: data[item].place, data: dataObject });
  }

  for (const item in list) {
    let summaryObj = {
      hintaPerNelio: { min: "", avg: "", max: "" },
      huoneLukumaara: { min: "", avg: "", max: "" },
      pintaAla: { min: "", avg: "", max: "" },
      rakennusvuosi: { min: "", avg: "", max: "" },
      velatonHinta: { min: "", avg: "", max: "" },
      tapahtumatYht: "",
    };

    /* kerros:{min:"", avg:"",max:""}, */

    for (const property in list[item]["data"]) {
      if (list[item]["data"][property].length === 0) continue;

      let total = 0;
      let min = Math.min.apply(Math, list[item]["data"][property]);
      let max = Math.max.apply(Math, list[item]["data"][property]);
      let average = 0;

      for (const value in list[item]["data"][property]) {
        total = total + list[item]["data"][property][value];
      }
      average = total / list[item]["data"][property].length;

      summaryObj[property]["min"] = min;
      summaryObj[property]["max"] = max;
      summaryObj[property]["avg"] = average;
    }
    summaryObj["tapahtumatYht"] = list[item]["data"]["velatonHinta"].length;

    summaryList.push({ place: list[item].place, data: summaryObj });
  }

  return summaryList;
};

// alusta data aluksi ja tallenna muuttujiin niin ei tarvii suorittaa monta kertaa samaa toimintoa..?
export function initData() {}

export default async function getData(structure, params) {
  if (structure === "cityList") return cityList();
  if (structure === "regionList") return regionList();
  if (structure === "zipsByCity") return zipsByCity();
  if (structure === "zipsByRegion") return zipsByRegion();
  if (structure === "transactionsByCity") return transactionsByCity();
  if (structure === "transactionsByRegion") return transactionsByRegion();
  if (structure === "summaryByArea") return summaryByArea(params);
}
