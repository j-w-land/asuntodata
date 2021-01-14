import { useParams } from "react-router-dom";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import React, { useState, useEffect } from "react";
import Grid from "../home/Grid";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CitytView(props) {
  let { city } = useParams();
  let Sales = findCityData(props.cityData, city).data;

    // Vakikolumnit kauppatiedoille
    // Todo: siirrä omaan structure-tiedostoon (?)
    const columns = React.useMemo(
        () => [
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
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'Pinta-ala',
                accessor: 'pintaAla',
                Filter: NumberRangeColumnFilter,
                filter: 'between',
            },
            {
                Header: 'Velaton hinta',
                accessor: 'velatonHinta',
                Filter: NumberRangeColumnFilter,
                filter: 'between',
            },
            {
                Header: 'Hinta per neliö',
                accessor: 'hintaPerNelio',
                Filter: NumberRangeColumnFilter,
                filter: 'between',
            },
            {
                Header: 'Rakennusvuosi',
                accessor: 'rakennusvuosi',
                Filter: NumberRangeColumnFilter,
                filter: 'between',
            },
            {
                Header: 'Kerros',
                accessor: 'kerros',
            },
            {
                Header: 'Hissi',
                accessor: 'hissi',
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'Kunto',
                accessor: 'kunto',
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'Tontti',
                accessor: 'tontti',
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'Energialuokka',
                accessor: 'energialuokka',
                Filter: SelectColumnFilter,
                filter: 'equals',
            }
        ], []
    )

   // Haetaan listalta oikean kaupungin tiedot
    function findCityData(array, value) {
        return array.find((element) => {
            return element.place === value;
        })
    }

    /********** FILTTERIT ***********/
    // https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/filtering?file=/src/App.js:6247-6319

    //TODO: Siirrä erilliseen tiedostoon, jos/kun käytetään muille view:eille

    // Define a default UI for filtering
    function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) {
        const count = preGlobalFilteredRows.length
        const [value, setValue] = React.useState(globalFilter)
        const onChange = useAsyncDebounce(value => {
          setGlobalFilter(value || undefined)
        }, 200)
      
        return (
          <span>
            Hae:{' '}
            <input
              value={value || ""}
              onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              placeholder={`${count} asuntokaupasta...`}
              style={{
                fontSize: '1rem',
                border: '0',
              }}
            />
          </span>
        )
    }

    // Define a default UI for filtering
    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length

        return (
            <input
                value={filterValue || ''}
                onChange={e => {
                setFilter(e.target.value || undefined)
                }}
                placeholder={`Hae...`}
            />
        )
    }

    // This is a custom filter UI for selecting
    // a unique option from a list
    function SelectColumnFilter({
        column: { filterValue, setFilter, preFilteredRows, id },
    }) {
        // Calculate the options for filtering
        // using the preFilteredRows
        const options = React.useMemo(() => {
            const options = new Set()
            preFilteredRows.forEach(row => {
                options.add(row.values[id])
            })

            return [...options.values()]
        }, [id, preFilteredRows])
    
        // Render a multi-select box
        return (
            <select
                value={filterValue}
                onChange={e => {
                setFilter(e.target.value || undefined)
                }}
            >
                <option value="">Kaikki</option>
                {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
                ))}
            </select>
        )
    }

    function NumberRangeColumnFilter({
        column: { filterValue = [], preFilteredRows, setFilter, id },
    }) {
        const [min, max] = React.useMemo(() => {
            let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
            let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
            preFilteredRows.forEach(row => {
                min = Math.min(row.values[id], min)
                max = Math.max(row.values[id], max)
            })
            return [min, max]
        }, [id, preFilteredRows])
      
        return (
            <div
                style={{
                display: 'flex',
                }}
            >
            <input
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                }}
                placeholder={`Mistä`}
                style={{
                    width: '65px',
                    marginRight: '0.5rem',
                }}
            />
            -
            <input
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                placeholder={`Mihin`}
                style={{
                    width: '65px',
                    marginLeft: '0.5rem',
                }}
            />
          </div>
        )
    }

  // Vilkuiltu täältä mallia: https://www.freakyjolly.com/react-table-tutorial/
  function Table(props) {
    const data = props.sales;

    const filterTypes = React.useMemo(
        () => ({
            // Override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                const rowValue = row.values[id]
                return rowValue !== undefined
                    ? String(rowValue)
                        .toLowerCase()
                        .startsWith(String(filterValue).toLowerCase())
                    : true
                })
            },
        }),
        []
      )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
      )
  
    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter, 
    } = useTable({
            columns,
            data,
            defaultColumn,
            filterTypes, 
    },
    useFilters,
    useGlobalFilter,
    );    
  
    // Generoidaan taulu lennossa oikean kokoseksi
    return (
      <table className="table" {...getTableProps()}>
            <thead>
                <tr>
                    <th
                    colSpan={visibleColumns.length}
                    style={{
                        textAlign: 'left',
                    }}
                    >
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    </th>
                </tr>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                {/* Render the columns filter UI */}
                                <div>
                                    {column.canFilter ? column.render('Filter') : null}
                                </div>
                            </th>
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

  const [apartmentInfoActive, setApartmentInfoActive] = useState("Huonemäärä");

  const onClickHandler = (e) => {
    setApartmentInfoActive(e.target.id);
  };

  return (
    <div>
      <h1 style={{ padding: "50px" }}>{city}</h1>
      <div className="flex-container">
        <div style={{ width: "100%" }}>
            <h5>Tilastoja huonekohtaisesti</h5>
            {/* <Grid
                data={Sales}
                width="100%"
                onClick={onClickHandler}
            /> */}
            <div
              style={{
                height: "100px",
                alignContent: "center",
                verticalAlign: "center",
              }}
            >
                Gridi tulossa tähän
            </div>

            <div style={{ width: "100%" }}>
                <h5>{apartmentInfoActive}</h5>
                <Table sales={Sales} />
            </div>
            <div
              style={{
                height: "100px",
                alignContent: "center",
                verticalAlign: "center",
              }}
            >
            </div>
        </div>
      </div>

      
    </div>
  );
}