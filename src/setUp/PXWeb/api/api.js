import fetch from "node-fetch";

const url =
  "http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/asu/ashi/vv/statfin_ashi_pxt_112q.px";
/* "http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/asu/ashi/nj/statfin_ashi_pxt_112p.px"; */

export default async function pxwebAPI({ years, zips }) {
  const query = [];
  if (years !== undefined) {
    query.push({
      code: "Vuosi",
      selection: {
        filter: "item",
        values: years,
      },
    });
  } else {
    query.push({
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [2019],
      },
    });
  }

  if (zips !== undefined) {
    query.push({
      code: "Postinumero",
      selection: {
        filter: "item",
        values: zips, // ["00120", "00100"], // zips, //["00120"], //zips,
      },
    });
  } else {
    query.push({
      code: "Postinumero",
      selection: {
        filter: "item",
        values: ["00120"],
      },
    });
  }

  /*   console.log("pxwebAPI_PARAMS");
  console.log(years);
  console.log(zips); */

  // Default options are marked with *
  const /* response */ runFetch = async () => {
      return await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          query: query,
          response: {
            format: "json-stat",
          },
        }), // body data type must match "Content-Type" header
      });
    };

  let failCount = 0;
  let response = null;
  try {
    response = await runFetch();
  } catch (error) {
    console.log("RESPONSE___ERROR__");
  }

  if (response !== null && response.status !== 200) {
    console.log("EI_OLLUT_200");
    console.log(failCount);
    while (failCount < 2) {
      console.log("UUSI_YRITYS");
      console.log(failCount);

      response = await runFetch();
      if (response.status === 200) break;
      failCount++;
    }
    return "fail";
    if (response.status !== 200) return null;
  }

  return response.json(); // parses JSON response into native JavaScript objects
}

// Example POST method implementation:
async function postData(url = "", data = {}) {}
