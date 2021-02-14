import fetch from "node-fetch";

// palauttaa apin metatiedot
export default async function pxwebAPIGet() {
  const url =
    "http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/asu/ashi/vv/statfin_ashi_pxt_112q.px";
  /* "http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/asu/ashi/nj/statfin_ashi_pxt_112p.px"; */
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    /* body: JSON.stringify({
          query: query,
          response: {
            format: "json-stat",
          },
        }), */ // body data type must match "Content-Type" header
  });
  console.log("pxwebAPIGet");
  console.log(response);
  if (response.status !== 200) return null;

  return response.json(); // parses JSON response into native JavaScript objects
}
