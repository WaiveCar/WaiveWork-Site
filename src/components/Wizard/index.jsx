import React, { useState } from 'react';
import Personal from '../Personal';
import License from '../License';
import Doc from '../Doc';
const Insurance = () => <Doc type={'insurance'} />;
import { Link } from 'react-router-dom';

const pages = [
  { comp: Personal },
  { comp: License },
  { comp: Insurance, title: 'Insurance Policies' },
];

function Wizard() {
  const [selectedPage, setPage] = useState(0);
  const SelectedComp = pages[selectedPage].comp;
  const title = pages[selectedPage].title;
  return (
    <div>
      <SelectedComp />
      <div className="container">
        <div className="d-flex justify-content-between">
          <div>
            {selectedPage > 0 && (
              <button
                className="btn btn-primary"
                onClick={() => setPage(selectedPage - 1)}
              >
                Prev
              </button>
            )}
          </div>
          <div>
            {selectedPage < pages.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setPage(selectedPage + 1)}
              >
                Next
              </button>
            ) : (
              <Link className="btn btn-primary" to={'/dashboard'}>
                Finish
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wizard;
