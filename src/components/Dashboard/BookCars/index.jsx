import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function BookCars({ user }) {
  let [searchText, setText] = useState('');
  return (
    <div className="card-body">
      <h5 className="card-title">Book A Car:</h5>
      <div>
        <input type="text" onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
}

function mapStateToProps({ carReducer, userReducer }) {
  return {
    ...carReducer,
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCars);
