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
  console.log(regionListData);
  console.log("regionListData");

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

// alusta data aluksi ja tallenna muuttujiin niin ei tarvii suorittaa monta kertaa samaa toimintoa..?
export function initData() {}

export default function getData(structure) {
  if (structure === "cityList") return cityList();
  if (structure === "regionList") return regionList();
  if (structure === "zipsByCity") return zipsByCity();
  if (structure === "zipsByRegion") return zipsByRegion();
  if (structure === "transactionsByCity") return transactionsByCity();
  if (structure === "transactionsByRegion") return transactionsByRegion();
}
