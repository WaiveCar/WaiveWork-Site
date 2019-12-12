import React from 'react';
import './loading.scss';

function Loading() {
  return (
    <div className="d-flex flex-row justify-content-center loading-holder">
      <div className="d-flex flex-column justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
