import { useParams } from "react-router-dom";
import { useTable } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CitytView(props) {
  let { city } = useParams();
  let Sales = findCityData(props.cityData, city).data;

   // Haetaan listalta oikean kaupungin tiedot
   function findCityData(array, value) {
    return array.find((element) => {
      return element.place === value;
    })
  }

  function Table(props) {
    const data = props.sales;
    
    // Vakikolumnit kauppatiedoille
    // Todo: siirrä omaan structure-tiedostoon
    const columns = [
    {
        Header: 'Kauppatiedot',
        columns: [
                {
                    Header: 'Kaupunginosa',
                    accessor: 'kaupunginosa',
                },
                {
                    Header: 'Huoneisto',
                    accessor: 'huoneisto',
                },
                {
                    Header: 'Talotyyppi',
                    accessor: 'talotyyppi',
                },
                {
                    Header: 'Pinta-ala',
                    accessor: 'pintaAla',
                },
                {
                    Header: 'Velaton hinta',
                    accessor: 'velatonHinta',
                },
                {
                    Header: 'Hinta per neliö',
                    accessor: 'hintaPerNelio',
                },
                {
                    Header: 'Rakennusvuosi',
                    accessor: 'rakennusvuosi',
                },
                {
                    Header: 'Kerros',
                    accessor: 'kerros',
                },
                {
                    Header: 'Hissi',
                    accessor: 'hissi',
                },
                {
                    Header: 'Kunto',
                    accessor: 'kunto',
                },
                {
                    Header: 'Tontti',
                    accessor: 'tontti',
                },
                {
                    Header: 'Energialuokka',
                    accessor: 'energialuokka',
                },
              ],
        },
    ];
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = useTable({columns, data, });
  
    // Generoidaan taulu lennossa oikean kokoseksi
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

  return (
    <div>
      <h1 style={{ padding: "50px" }}>{city}</h1>
      <Table sales={Sales} />
    </div>
  );
}