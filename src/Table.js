import React from 'react';
import { useTable } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

//https://www.freakyjolly.com/react-table-tutorial/
function Table(props) {

    // Vakikolumnit kauppatiedoille
    const columns = [
    {
        Header: 'Kauppatiedot',
        columns: [
                {
                    Header: 'Kaupunginosa',
                    accessor: 'kaupunginosa',
                },
                {
                    Header: 'huoneisto',
                    accessor: 'huoneisto',
                },
                {
                    Header: 'talotyyppi',
                    accessor: 'talotyyppi',
                },
                {
                    Header: 'pintaAla',
                    accessor: 'pintaAla',
                },
                {
                    Header: 'velatonHinta',
                    accessor: 'velatonHinta',
                },
                {
                    Header: 'hintaPerNelio',
                    accessor: 'hintaPerNelio',
                },
                {
                    Header: 'rakennusvuosi',
                    accessor: 'rakennusvuosi',
                },
                {
                    Header: 'kerros',
                    accessor: 'kerros',
                },
                {
                    Header: 'hissi',
                    accessor: 'hissi',
                },
                {
                    Header: 'kunto',
                    accessor: 'kunto',
                },
                {
                    Header: 'tontti',
                    accessor: 'tontti',
                },
                {
                    Header: 'energialuokka',
                    accessor: 'energialuokka',
                },
              ],
        },
    ];

    // Data kauppatiedoista, tää pitäis saada kaivettua suoraan JSONista
    // ATM kovakoodattu testailua varten
    const data = [
            {"kaupunginosa": "Skinnarila", "huoneisto": "1h,kk", "talotyyppi": "kt", "pintaAla": "34,50", "velatonHinta": "55422", "hintaPerNelio": "1606", "rakennusvuosi": "1976", "kerros": "3/5", "hissi": "on", "kunto": "tyyd.", "tontti": "oma", "energialuokka": ""},
            {"kaupunginosa": "Skinnarila", "huoneisto": "1h+kk", "talotyyppi": "kt", "pintaAla": "35,00", "velatonHinta": "53000", "hintaPerNelio": "1514", "rakennusvuosi": "1979", "kerros": "3/5", "hissi": "on", "kunto": "hyvä", "tontti": "oma", "energialuokka": "F2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "1h+kk", "talotyyppi": "kt", "pintaAla": "35,00", "velatonHinta": "55000", "hintaPerNelio": "1571", "rakennusvuosi": "1976", "kerros": "2/5", "hissi": "on", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "D2018"},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "2h+k+s", "talotyyppi": "rt", "pintaAla": "63,00", "velatonHinta": "113000", "hintaPerNelio": "1794", "rakennusvuosi": "1988", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": "E2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "2h, k, p", "talotyyppi": "kt", "pintaAla": "57,00", "velatonHinta": "69900", "hintaPerNelio": "1226", "rakennusvuosi": "1987", "kerros": "1/3", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": "F2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "2h, k", "talotyyppi": "kt", "pintaAla": "61,00", "velatonHinta": "53125", "hintaPerNelio": "871", "rakennusvuosi": "1976", "kerros": "5/5", "hissi": "on", "kunto": " ", "tontti": "vuokra", "energialuokka": "D2018"},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "2h, k, s", "talotyyppi": "rt", "pintaAla": "51,00", "velatonHinta": "82000", "hintaPerNelio": "1608", "rakennusvuosi": "1978", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": "E"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "2h+k", "talotyyppi": "kt", "pintaAla": "61,00", "velatonHinta": "71968", "hintaPerNelio": "1180", "rakennusvuosi": "1976", "kerros": "2/5", "hissi": "on", "kunto": "hyvä", "tontti": "oma", "energialuokka": "D2007"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "2h,k", "talotyyppi": "kt", "pintaAla": "62,50", "velatonHinta": "68500", "hintaPerNelio": "1096", "rakennusvuosi": "1981", "kerros": "3/3", "hissi": "on", "kunto": "hyvä", "tontti": "oma", "energialuokka": "F2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "2h, k", "talotyyppi": "kt", "pintaAla": "58,00", "velatonHinta": "69500", "hintaPerNelio": "1198", "rakennusvuosi": "1976", "kerros": "5/5", "hissi": "on", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "F2013"},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "2h+k+s", "talotyyppi": "rt", "pintaAla": "46,00", "velatonHinta": "113500", "hintaPerNelio": "2467", "rakennusvuosi": "2018", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "C2013"},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "3h, k, s", "talotyyppi": "rt", "pintaAla": "80,50", "velatonHinta": "119500", "hintaPerNelio": "1484", "rakennusvuosi": "1990", "kerros": "2/2", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": "E2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "3h, k, p", "talotyyppi": "kt", "pintaAla": "72,50", "velatonHinta": "83500", "hintaPerNelio": "1152", "rakennusvuosi": "1980", "kerros": "3/5", "hissi": "on", "kunto": "hyvä", "tontti": "oma", "energialuokka": "F2013"},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "3h+k", "talotyyppi": "rt", "pintaAla": "80,00", "velatonHinta": "187000", "hintaPerNelio": "2338", "rakennusvuosi": "2011", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": ""},
            {"kaupunginosa": "Skinnarila", "huoneisto": "3h,k", "talotyyppi": "kt", "pintaAla": "78,00", "velatonHinta": "46000", "hintaPerNelio": "590", "rakennusvuosi": "1980", "kerros": "5/5", "hissi": "on", "kunto": "huono", "tontti": "oma", "energialuokka": "E2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "3h+k", "talotyyppi": "kt", "pintaAla": "77,50", "velatonHinta": "45000", "hintaPerNelio": "581", "rakennusvuosi": "1976", "kerros": "4/5", "hissi": "on", "kunto": "tyyd.", "tontti": "oma", "energialuokka": "D2018"},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "oh,k,2mh,khh,wc...", "talotyyppi": "rt", "pintaAla": "78,00", "velatonHinta": "212000", "hintaPerNelio": "2718", "rakennusvuosi": "2019", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": ""},
            {"kaupunginosa": "Skinnarila", "huoneisto": "3h,k,p", "talotyyppi": "kt", "pintaAla": "70,50", "velatonHinta": "60984", "hintaPerNelio": "865", "rakennusvuosi": "1979", "kerros": "2/5", "hissi": "on", "kunto": "hyvä", "tontti": "oma", "energialuokka": "F2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "4mh, oh, k, rt,...", "talotyyppi": "ok", "pintaAla": "163,00", "velatonHinta": "217000", "hintaPerNelio": "1331", "rakennusvuosi": "2003", "kerros": "-1/2", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": ""},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "5h, k, s", "talotyyppi": "ok", "pintaAla": "149,00", "velatonHinta": "258000", "hintaPerNelio": "1732", "rakennusvuosi": "2020", "kerros": "-1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "C2013"},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "4h+k+kph", "talotyyppi": "ok", "pintaAla": "197,00", "velatonHinta": "263500", "hintaPerNelio": "1338", "rakennusvuosi": "2015", "kerros": " ", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "B2013"},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "3-4 h, k, pihas...", "talotyyppi": "ok", "pintaAla": "70,00", "velatonHinta": "84000", "hintaPerNelio": "1200", "rakennusvuosi": "1946", "kerros": " ", "hissi": "ei", "kunto": "tyyd.", "tontti": "oma", "energialuokka": ""},
            {"kaupunginosa": "Sammonlahti", "huoneisto": "4h, k, s, ak", "talotyyppi": "rt", "pintaAla": "86,00", "velatonHinta": "131000", "hintaPerNelio": "1523", "rakennusvuosi": "1984", "kerros": "1/2", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "C2018"},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "4h, k, s", "talotyyppi": "rt", "pintaAla": "87,00", "velatonHinta": "205000", "hintaPerNelio": "2356", "rakennusvuosi": "2018", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "C2013"},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "5h,k,khh, s, kp...", "talotyyppi": "ok", "pintaAla": "150,00", "velatonHinta": "283000", "hintaPerNelio": "1887", "rakennusvuosi": "2013", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "C2013"},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "4h+k", "talotyyppi": "ok", "pintaAla": "78,00", "velatonHinta": "95000", "hintaPerNelio": "1218", "rakennusvuosi": "1967", "kerros": " ", "hissi": "ei", "kunto": "tyyd.", "tontti": "oma", "energialuokka": ""},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "5h,k,khh, s, kp...", "talotyyppi": "ok", "pintaAla": "148,00", "velatonHinta": "266000", "hintaPerNelio": "1797", "rakennusvuosi": "2015", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "C2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "4h., k., rt., w...", "talotyyppi": "rt", "pintaAla": "119,00", "velatonHinta": "171000", "hintaPerNelio": "1437", "rakennusvuosi": "1990", "kerros": "1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": "D2018"},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "4h, k, s/kph, khh", "talotyyppi": "ok", "pintaAla": "80,00", "velatonHinta": "127000", "hintaPerNelio": "1588", "rakennusvuosi": "1948", "kerros": " ", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": "D2018"},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "5h,k,rt,pukuh,p...", "talotyyppi": "ok", "pintaAla": "183,00", "velatonHinta": "285000", "hintaPerNelio": "1557", "rakennusvuosi": "2000", "kerros": " ", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": "E2018"},
            {"kaupunginosa": "Ruoholampi", "huoneisto": "5h., k., rt., a...", "talotyyppi": "ok", "pintaAla": "156,00", "velatonHinta": "329000", "hintaPerNelio": "2109", "rakennusvuosi": "2013", "kerros": "1/2", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": "A2013"},
            {"kaupunginosa": "Skinnarila", "huoneisto": "5h, k,khh, s-os", "talotyyppi": "ok", "pintaAla": "202,00", "velatonHinta": "225000", "hintaPerNelio": "1114", "rakennusvuosi": "2008", "kerros": "-1/1", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": ""},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "4h+k+s+wc+veranta", "talotyyppi": "ok", "pintaAla": "88,00", "velatonHinta": "48000", "hintaPerNelio": "545", "rakennusvuosi": "1939", "kerros": " ", "hissi": "ei", "kunto": "tyyd.", "tontti": "oma", "energialuokka": ""},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "2h,k + 2h,kk", "talotyyppi": "ok", "pintaAla": "96,00", "velatonHinta": "106000", "hintaPerNelio": "1104", "rakennusvuosi": "1968", "kerros": " ", "hissi": "ei", "kunto": " ", "tontti": "oma", "energialuokka": "F2018"},
            {"kaupunginosa": "Uus-lavola", "huoneisto": "2-3 mh, oh, k, kph", "talotyyppi": "ok", "pintaAla": "86,00", "velatonHinta": "117500", "hintaPerNelio": "1366", "rakennusvuosi": "1956", "kerros": "-1/2", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": ""},
            {"kaupunginosa": "Skinnarila", "huoneisto": "3 h+k+takkah+ph+s", "talotyyppi": "ok", "pintaAla": "97,00", "velatonHinta": "86000", "hintaPerNelio": "887", "rakennusvuosi": "1975", "kerros": " ", "hissi": "ei", "kunto": "tyyd.", "tontti": "oma", "energialuokka": "C2018"},
            {"kaupunginosa": "", "huoneisto": "oh., 3mh., k., ...", "talotyyppi": "ok", "pintaAla": "119,00", "velatonHinta": "189000", "hintaPerNelio": "1588", "rakennusvuosi": "1981", "kerros": "2/2", "hissi": "ei", "kunto": "hyvä", "tontti": "vuokra", "energialuokka": ""},
            {"kaupunginosa": "", "huoneisto": "4h+k+s", "talotyyppi": "ok", "pintaAla": "105,00", "velatonHinta": "157000", "hintaPerNelio": "1495", "rakennusvuosi": "1982", "kerros": " ", "hissi": "ei", "kunto": "hyvä", "tontti": "oma", "energialuokka": "C2018"}
        ]

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = useTable({columns, data, });

    // Generoidaan taulu lennossa oikeen kokoseksi
    return (
      <table className="table" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
  }

export default Table;
