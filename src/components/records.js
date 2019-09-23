import React from "react";
const Records = ({ records }) => {
  return (
    <div>
      <center>
        <h1>Music Festival List</h1>
      </center>
      {records.map(recordLabels => (
        <div className="recordLabels">
          <h2>{recordLabels.label}</h2>

          {recordLabels.bands.map(bandLabels => (
            <div className="bandLabels">
              <h4>&emsp;{bandLabels.name}</h4>
              {bandLabels.fests.map(festsLabels => (
                <div className="festsLabels">
                  <h4>&emsp;&emsp;&emsp;&emsp;{festsLabels}</h4>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Records;
