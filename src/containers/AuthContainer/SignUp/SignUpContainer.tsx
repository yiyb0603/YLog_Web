import React from "react";
import { inject, observer } from "mobx-react";

const SignUpContainer = ({}) => {
  return (
    <>
      <div></div>
    </>
  );
};

export default inject("store")(observer(SignUpContainer));
