import React, { Component } from "react";
import Records from "./components/records";

class App extends Component {
  render() {
    const transformModel = fests => {
      const result = { recordLabels: [] };
      const recordLabels = fests
        .map(f => (f.bands.map(b => b.recordLabel) || "")[0])
        .filter((v, i, a) => a.indexOf(v) === i);
      recordLabels.map(rl =>
        result.recordLabels.push({ label: rl, bands: [] })
      );
      result.recordLabels.map(rcd => {
        const a = { bands: [] };
        const bands = fests
          .map(
            f =>
              f.bands
                .filter(b => b.recordLabel === rcd.label)
                .map(b => b.name)[0]
          )
          .filter(n => [null, undefined].indexOf(n) === -1)
          .filter((v, i, a) => a.indexOf(v) === i);
        a["label"] = rcd.label;
        bands.map(band => {
          const _bands = { name: band, fests: [] };
          fests.map(fest =>
            fest.bands.map(_band =>
              _band.name === band ? _bands.fests.push(fest.name) : () => {}
            )
          );
          rcd.bands.push(_bands);
        });
      });
      return result;
    };
    return (
      <Records records={transformModel(this.state.records).recordLabels} />
    );
  }
  state = { records: [] };

  /* Test Data For App 
   state = {
    records: [
      {
        name: "Omega Festival",
        bands: [
          {
            name: "Band X",
            recordLabel: "Record Label 1"
          }
        ]
      },
      {
        name: "Alpha Festival",
        bands: [
          {
            name: "Band A",
            recordLabel: "Record Label 2"
          }
        ]
      },
      {
        name: "Beta Festival",
        bands: [
          {
            name: "Band A",
            recordLabel: "Record Label 2"
          }
        ]
      },
      {
        bands: [
          {
            name: "Band Y",
            recordLabel: "Record Label 1"
          }
        ]
      }
    ]
  };
*/
  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "http://eacodingtest.digital.energyaustralia.com.au/api-docs/#/festivals";
    fetch(proxyurl + url)
      .then(res => res.json())
      .then(data => {
        this.setState({ records: data });
      })
      .catch(console.log);
  }
}

export default App;
