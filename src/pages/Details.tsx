import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
interface LocationState {
  state: {
    post: any;
  };
}
const Details = () => {
  const { state } = useLocation();

  return (
    <div>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export default Details;
