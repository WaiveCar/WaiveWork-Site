import React, { useState } from 'react';
import Personal from '../Personal';
import License from '../License';
import Doc from '../Doc';
const Insurance = () => <Doc type={'insurance'} />;

const pages = [Personal, License, Insurance];

function Wizard() {
  const [selectedPage, setPage] = useState(0);
  const SelectedComp = pages[selectedPage];
  return (
    <div>
      <SelectedComp />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4 d-flex justify-content-between">
            <button className="btn btn-primary">Prev</button>
            <button className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wizard;
