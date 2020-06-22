import React, { Component } from "react";
import Chart from "react-google-charts";

class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      lineChartData: [],
      pieChartData: [],
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
        this.setState({
          isLoaded: true,
          lineChartData: this.formatLineChartData(data),
          pieChartData: this.formatPieChartData(data),
        })
      );
  }
  render() {
    var { isLoaded, lineChartData, pieChartData } = this.state;
    if (!isLoaded) {
      return <div>Please wait. Loading chart...</div>;
    }
    return (
      <div
        className="Chart"
        style={{ display: "flex", maxWidth: 1500, margin: "auto" }}
      >
        <Chart
          width={1100}
          height={"350px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={lineChartData}
          options={{
            title: "Movie Production by Year",
            hAxis: {
              title: "Year",
              titleTextStyle: { color: "#333" },
              slantedText: true,
              slantedTextAngle: 50,
            },
            vAxis: { minValue: 0 },
            chartArea: { width: "80%", height: "60%" },
          }}
        />
        <Chart
          width={"350px"}
          height={"450px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieChartData}
          options={{
            title: "Movie Genres Distribution",
            is3D: true,
            chartArea: { width: "80%", height: "70%" },
          }}
          rootProps={{ "data-testid": "2" }}
        />
      </div>
    );
  }
  formatLineChartData(data) {
    var lineChartData = {};
    for (var i = 0; i < data.length; i++) {
      if (lineChartData[data[i].year] === undefined) {
        lineChartData[data[i].year] = 1;
      } else {
        lineChartData[data[i].year] = lineChartData[data[i].year] + 1;
      }
    }
    var chartData = [["Year", "No. of Movies"]];
    var keys = Object.keys(lineChartData);
    var values = Object.values(lineChartData);
    for (let i = 0; i < keys.length; i += 1) {
      chartData.push([keys[i], values[i]]);
    }
    return chartData;
  }
  formatPieChartData(data) {
    var pieChartData = {};
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].genres.length; j++) {
        if (pieChartData[data[i].genres[j]] === undefined) {
          pieChartData[data[i].genres[j]] = 1;
        } else {
          pieChartData[data[i].genres[j]] = pieChartData[data[i].genres[j]] + 1;
        }
      }
    }
    var chartData = [["Genres", "No. of Movies"]];
    var keys = Object.keys(pieChartData);
    var values = Object.values(pieChartData);
    for (let i = 0; i < keys.length; i += 1) {
      chartData.push([keys[i], values[i]]);
    }
    return chartData;
  }
}

export default ChartWrapper;
