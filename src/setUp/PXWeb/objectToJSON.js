export default function JSONtoObject(object, array) {
  let keys = [];
  console.log(JSON.stringify(object));

  console.log("start");
  //console.log(object);
  if (object !== null && object !== undefined) {
    Object.getOwnPropertyNames(object).forEach((key) => {
      keys.push(key);
    });
    console.log(object);
    console.log(keys);
    console.log(keys.length);
    console.log("KEYS__");
  }
  let arrayRes = [];
  for (const key in keys) {
    /*  console.log(object[keys[key]]);
    console.log(keys[key]);
    console.log(JSON.stringify(object));
    console.log("testii"); */

    let newArray = [keys[key]];
    arrayRes.push(newArray.push(JSONtoObject(object[keys[key]], newArray)));
    //object[key] = JSONtoObject(object[key]);
  }

  /*   console.log("JSONtoObject_____");
  console.log(object);
  console.log("JSONtoObject_____"); */
  console.log("return");
  console.log(JSON.stringify(object));
  //return object;
  //return JSON.stringify(object);
  return arrayRes;
}
