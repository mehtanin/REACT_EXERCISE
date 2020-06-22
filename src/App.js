import React, { Component } from "react";
import Table from "./components/tableComponent";
import ChartWrapper from "./components/chartComponent";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h4>Movie Dataset Visualizer</h4>
        <ChartWrapper />
        <Table />
      </div>
    );
  }
}

export default Home;
