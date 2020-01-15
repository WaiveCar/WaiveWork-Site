import React from 'react';

function MiniDoc({ file }) {
  return (
    <div>
      {file ? (
        file.mime === 'application/pdf' ? (
          <embed
            className={'doc-embed'}
            src={`http://docs.google.com/gview?url=http://waivecar-prod.s3.amazonaws.com/${file.path}&embedded=true`}
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
