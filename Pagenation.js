import React from "react";

const Pagenation = ({ nextclick, previousclick, totalpage, pagedata }) => {
  return (
    <div className="pagedata">
      <button
        className="pagebutton"
        onClick={previousclick}
        disabled={pagedata === 1}
      >
        Previous
      </button>
      <h4>{pagedata} </h4>
      <button
        className="pagebutton"
        onClick={nextclick}
        disabled={totalpage === pagedata}
      >
        Next
      </button>
    </div>
  );
};

export default React.memo(Pagenation);
