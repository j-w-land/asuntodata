import { useEffect } from "react";
import zipCodeStructure from "../../assets/data/zipCodeStructure.json";

export default function Search({
  searchValue,
  setSearchResults,
  setSearching,
}) {
  useEffect(() => {
    if (searchValue === "") {
      setSearchResults([]);
      setSearching(false);
      return null;
    }

    let matchesCity = zipCodeStructure.data.filter((e) =>
      e.kaupunki.toLowerCase().includes(searchValue.toLowerCase())
    );

    let cities = [];
    for (const city in matchesCity) {
      cities.push(matchesCity[city].kaupunki);
    }
    cities = [...new Set(cities)];

    let matchesZip = zipCodeStructure.data.filter((e) =>
      e.postinumero.includes(searchValue)
    );

    let zips = [];
    for (const zip in matchesZip) {
      zips.push(matchesZip[zip].postinumero);
    }
    zips = [...new Set(zips)];

    if (cities.length === 0 && zips.length === 0) {
      setSearchResults(null);
    } else {
      setSearchResults({ Kaupunki: cities, Postinumero: zips });
    }
    setSearching(false);
  }, [searchValue]);

  return null;
}
