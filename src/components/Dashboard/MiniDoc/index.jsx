import React from 'react';
import './miniDoc.scss';

function MiniDoc({ file }) {
  return (
    <div className={'mini-doc d-flex justify-content-center'}>
      {file ? (
        file.mime === 'application/pdf' ? (
          <embed
            src={`http://docs.google.com/gview?url=http://waivecar-prod.s3.amazonaws.com/${file.path}&embedded=true`}
            className={'mini-embed'}
          />
        ) : (
          <img
            className={'doc-image'}
            src={`http://waivecar-prod.s3.amazonaws.com/${file.path}`}
          />
        )
      ) : (
        <div className="text-center">{file} not uploaded</div>
      )}
    </div>
  );
}

export default MiniDoc;
