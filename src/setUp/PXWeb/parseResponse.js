export default async function parseResponse(data) {
  //let data = await pxwebAPI(params);

  if (data === null) return null;
  let dimension = null;
  let values = null;

  try {
    dimension = data.dataset.dimension;
    values = data.dataset.value;
  } catch (error) {
    return null;
  }

  let zipsObj = dimension.Postinumero.category.index;
  let ids = dimension.id;

  let sizeArray = dimension.size;

  let itemCombs = sizeArray.reduce(function (a, b) {
    return a * b;
  }, 1);

  let count = 0;
  let i = 0;

  const createObject = (
    obj,
    type,
    structure,
    objectsList,
    pos,
    values,
    count
  ) => {
    let objElement = {};

    while (pos < Object.keys(structure).length) {
      let labels = objectsList[structure[pos]].category.label;
      let labelIndeces = objectsList[structure[pos]].category.index;

      let labelsArr = [];
      for (const index in labelIndeces) {
        labelsArr.push([labelIndeces[index], labels[index]]);
      }
      labelsArr.sort(function (a, b) {
        return a[0] - b[0];
      });
      for (const item in labelsArr) {
        objElement[labelsArr[item][1]] = "";
      }

      if (Object.keys(obj).length === 0) {
        obj = objElement;
      } else {
        for (const key in obj) {
          obj[key] = objElement;
        }
      }

      pos = pos + 1;

      if (pos === Object.keys(structure).length) {
        for (const element in objElement) {
          count = count + 1;
        }
      }

      return createObject(
        objElement,
        type,
        structure,
        objectsList,
        pos,
        values,
        count
      );
    }
  };
  let dataObject = { data: "" };
  createObject(dataObject, "item", ids, dimension, 0, values, 0);

  dataObject = dataObject.data;

  const createTotalObject = (obj, structure) => {
    let objKeys = Object.keys(structure);

    for (const key in objKeys) {
      if (Object.keys(structure[objKeys[key]]).length === 0) {
        Object.defineProperty(obj, objKeys[key], {
          value: [],
          writable: true,
          enumerable: true,
        });
        Object.defineProperty(obj, objKeys[key] + "_count", {
          value: [],
          writable: true,
          enumerable: true,
        });
        Object.defineProperty(obj, objKeys[key] + "_zip", {
          value: [],
          writable: true,
          enumerable: true,
        });
      } else {
        Object.defineProperty(obj, objKeys[key], {
          value: {},
          writable: true,
          enumerable: true,
        });
      }

      createTotalObject(obj[objKeys[key]], structure[objKeys[key]]);
    }
  };

  let totalObject = { data: {} };
  if (dataObject[Object.keys(dataObject)[0]] !== undefined) {
    createTotalObject(totalObject.data, dataObject[Object.keys(dataObject)[0]]);
  }

  let resArr = [];

  const loopValues = (
    obj,
    totalObject,
    resObject,
    values,
    sizeArray,
    round,
    objectRound,
    testArr
  ) => {
    let sizes = [...sizeArray];
    objectRound = objectRound + 1;
    sizes.shift();

    let itemCombs = sizes.reduce(function (a, b) {
      return a * b;
    }, 1);

    let objKeys = Object.keys(obj);

    let loopCount = 0;
    let newRound = 0;
    for (const key in objKeys) {
      Object.defineProperty(resObject, objKeys[key], {
        value: {},
        writable: true,
        enumerable: true,
      });
      newRound = round + loopCount * itemCombs;

      //When value is empty string we are are the end of the object tree. -> save value to the variable
      if (obj[objKeys[key]] === "") {
        let treeCount = 0;

        for (const item in obj) {
          testArr.push(values[newRound + treeCount]);
          try {
            if (true) {
              if (values[newRound + treeCount] === null) {
                Object.defineProperty(resObject, item, {
                  value: "NULL",
                  writable: true,
                  enumerable: true,
                });
              } else {
                Object.defineProperty(resObject, item, {
                  value: values[newRound + treeCount],
                  writable: true,
                  enumerable: true,
                });

                totalObject[item].push(values[newRound + treeCount]);
                if (item === "Neliöhinta (EUR/m2)") {
                  totalObject[item + "_count"].push(
                    values[newRound + treeCount + 1]
                  );
                }
              }
            }
          } catch (error) {}

          treeCount = treeCount + 1;
        }
        break;
      }

      let totalObjectToSend;

      if (objectRound === 1) {
        totalObjectToSend = totalObject.data;
      } else if (objectRound > 1) {
        totalObjectToSend = totalObject[objKeys[key]];
      }

      loopValues(
        obj[objKeys[key]],
        totalObjectToSend,
        resObject[objKeys[key]],
        values,
        sizes,
        newRound,
        objectRound,
        testArr
      );
      loopCount++;
    }
    //return resObject;
  };

  let testArr = [];
  let sizeArrayCombs = [...sizeArray];

  let newObject = { data: {} };

  resArr = loopValues(
    dataObject,
    totalObject,
    newObject.data,
    values,
    sizeArrayCombs,
    0,
    0,
    testArr
  );

  newObject.data["total"] = totalObject;

  //calculate averages for regions

  newObject.data.total = newObject.data.total.data;

  let keysLayer1 = []; //Object.keys(newObject.data.total);

  Object.getOwnPropertyNames(newObject.data.total).forEach((key) => {
    keysLayer1.push(key);
  });
  for (const layer1 in keysLayer1) {
    let keysLayer2 = []; // Object.keys(newObject.data.total[keysLayer1[layer1]]);
    Object.getOwnPropertyNames(
      newObject.data.total[keysLayer1[layer1]]
    ).forEach((key) => {
      keysLayer2.push(key);
    });

    for (const layer2 in keysLayer2) {
      let keysLayer3 = []; // Object.keys(newObject.data.total[keysLayer1[layer1]]);
      Object.getOwnPropertyNames(
        newObject.data.total[keysLayer1[layer1]][keysLayer2[layer2]]
      ).forEach((key) => {
        keysLayer3.push(key);
      });

      for (const layer3 in keysLayer3) {
        let countArray =
          newObject.data.total[keysLayer1[layer1]][keysLayer2[layer2]][
            keysLayer3[layer3]
          ]["Neliöhinta (EUR/m2)_count"];
        let countSum = countArray.reduce(function (a, b) {
          return a + b;
        }, 0);

        let priceArray =
          newObject.data.total[keysLayer1[layer1]][keysLayer2[layer2]][
            keysLayer3[layer3]
          ]["Neliöhinta (EUR/m2)"];
        let avgPrice = 0;
        for (const item in priceArray) {
          avgPrice =
            avgPrice + (priceArray[item] * countArray[item]) / countSum;
        }

        newObject.data.total[keysLayer1[layer1]][keysLayer2[layer2]][
          keysLayer3[layer3]
        ]["avg_Neliöhinta (EUR/m2)"] = avgPrice;

        let countTotalArray =
          newObject.data.total[keysLayer1[layer1]][keysLayer2[layer2]][
            keysLayer3[layer3]
          ]["Kauppojen lukumäärä"];
        let countTotalSum = countTotalArray.reduce(function (a, b) {
          return a + b;
        }, 0);

        newObject.data.total[keysLayer1[layer1]][keysLayer2[layer2]][
          keysLayer3[layer3]
        ]["total_Kauppojen lukumäärä"] = countTotalSum;
      }
    }
  }
  return newObject;
}
