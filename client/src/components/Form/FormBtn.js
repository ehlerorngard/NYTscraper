import React from "react";
import "./FormBtn.css";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="form-btn">
    {props.children}
  </button>
);
