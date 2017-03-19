import React from 'react';
import { connect } from 'react-redux';
// import { CaptureModal } from '../capture-modal/CaptureModal';

export const Capture = ({ transactions }) => {
  return (
    <div>
      <h2>
        {JSON.stringify(transactions)}
      </h2>
      {/* <CaptureModal /> */}
    </div>
  );
};

export const CaptureContainer = connect(store => {
  return {
    transactions: store.transactions,
  };
})(Capture);


// How to dispatch:
// const mapStateToProps = (state, ownProps) => {
//   return {
//     activeParty: true,
//   };
// };
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => {
//       dispatch({
//         type: 'ADD_TRANSACTION',
//         id: '123',
//         amt: 19.99,
//         date: '2017-03-13',
//         cat_id: 2,
//       });
//     },
//   };
// };
//
// const Capture = connect(mapStateToProps, mapDispatchToProps)(Flub);
//
// export default Capture;
