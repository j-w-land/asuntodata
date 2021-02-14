import pxwebAPI from "./api/api.js";
import pxwebAPIGet from "./api/apiGET.js";
import parseResponse from "./parseResponse.js";
import getData from "../dataSetUp.js";
import regions from "../../assets/data/PXWeb/regions_2010_2020.json";

export default async function pxwebGetData(structure, params = null) {
  if (structure === "zipsByRegion") return zipsByRegion(params);
  if (structure === "summaryByRegion") return summaryByRegion(params);
  if (structure === "byZip") return byZip(params);
}

const byZip = async (params) => {
  let zips = params.zips;

  let zipsParam = await removeMissingZips(zips);

  params["zips"] = zipsParam;
  let failCount = 0;
  let res;

  const reRun = async () => {
    res = await fetchData(params);

    if (res === "fail") {
      console.log("RERUN_________");
      console.log(failCount);
      failCount++;
      if (failCount < 10) {
        setTimeout(reRun, 20000);
      } else {
        res = {};
        res["data"] = "FAIL_DATA_FETCH";
      }
    }
  };

  await reRun();

  let resArray = res["data"];
  return resArray;
};

let zipsByRegionData = [];
const zipsByRegion = async (params) => {
  if (zipsByRegionData.length > 0) return zipsByRegionData;
  let zips = await getData("zipsByRegion");

  let resArray = [];

  let limitCount = 0;
  for (const region in zips) {
    //if (limitCount === 2) break;
    let zipsParam = [];
    let zipsList = zips[region].data;
    for (const zip in zipsList) {
      zipsParam.push(zipsList[zip].postinumero);
    }
    zipsParam = await removeMissingZips(zipsParam);

    params["zips"] = zipsParam;
    let failCount = 0;
    let res;

    const reRun = async () => {
      res = await fetchData(params);

      if (res === "fail") {
        console.log("RERUN_________");
        console.log(failCount);
        failCount++;
        if (failCount < 10) {
          setTimeout(reRun, 20000);
        } else {
          res = {};
          res["data"] = "FAIL_DATA_FETCH";
        }
      }
    };

    await reRun();

    resArray.push({ place: zips[region].place, data: res["data"] });
    limitCount++;
  }

  zipsByRegionData = resArray;
  return resArray;
};

let summaryByRegionData = [];
const summaryByRegion = async (params) => {
  console.log(summaryByRegionData.length);
  console.log("summaryByRegion___");
  if (summaryByRegionData.length > 0) return summaryByRegionData;
  console.log(regions);

  let resArr = [];
  if (true) {
    for (const year in regions) {
      let object = { year: regions[year].year };
      let regionArray = [];
      for (const region in regions[year].data) {
        let obj = {
          place: regions[year].data[region].place,
          data: JSON.parse(regions[year].data[region].data),
        };

        regionArray.push(obj);
      }
      object["data"] = regionArray;
      resArr.push(object);
    }
  }
  console.log(resArr);
  console.log("summaryByRegionData_RES_");
  summaryByRegionData = resArr;
  return resArr;
};

async function fetchData(params) {
  let apiResonse = await pxwebAPI(params);
  if (apiResonse == "fail") return apiResonse;

  let data = await parseResponse(apiResonse);
  return data;
}

let PXWebZipList = [];
const removeMissingZips = async (list) => {
  if (PXWebZipList.length === 0) {
    let res = await pxwebAPIGet();

    let resZips = [];
    try {
      resZips = res.variables.filter((e) => e.code === "Postinumero")[0].values;
    } catch (error) {}

    PXWebZipList = resZips;
  }

  const intersection = list.filter(function (item) {
    return PXWebZipList.includes(item);
  });

  return intersection;
};
