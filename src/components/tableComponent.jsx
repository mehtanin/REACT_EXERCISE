import React, { Component } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    var corsAnywhereProxy = "https://cors-anywhere.herokuapp.com/";
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
    };
    fetch(
      corsAnywhereProxy + "https://gitlab.fit.fraunhofer.de/snippets/18/raw",
      { headers }
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({ isLoaded: true, items: this.formatTableData(data) })
      );
  }
  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Please wait. Loading table...</div>;
    }
    const columns = [
      { Header: "Title", accessor: "title", id: "title" },
      {
        Header: "Year",
        accessor: "year",
        id: "year",
        filterMethod: (filter, row) => {
          return String(row[filter.id]).indexOf(filter.value) >= 0;
        },
      },
      { Header: "Cast", accessor: "cast", id: "cast" },
      { Header: "Genres", accessor: "genres", id: "genres" },
    ];
    return (
      <div className="Table">
        <div>
          *Please type on the filter text box to filter the data by
          corresponding column's value.
        </div>
        <ReactTable
          showFilters={true}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]).toLowerCase().indexOf(filter.value) >= 0
          }
          columns={columns}
          data={items}
          className="-striped -highlight"
        />
      </div>
    );
  }
  formatTableData(data) {
    var formattedData = "";
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].genres.length; j++) {
        formattedData = formattedData + data[i].genres[j] + ", ";
      }
      data[i].genres = formattedData.substring(0, formattedData.length - 2);
      formattedData = "";

      for (var k = 0; k < data[i].cast.length; k++) {
        formattedData = formattedData + data[i].cast[k] + ", ";
      }
      data[i].cast = formattedData.substring(0, formattedData.length - 2);
      formattedData = "";
    }

    return data;
  }
}

export default Table;
