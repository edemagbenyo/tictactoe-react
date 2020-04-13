import React from "react";

function Square(props) {
  return (
    <button className="sq" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
Square.defaultProps = {
  value: 1
};
export default Square;
