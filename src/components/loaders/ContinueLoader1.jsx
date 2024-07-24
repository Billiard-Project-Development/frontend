import React from "react";
import { dotSpinner } from "ldrs";
const ContinueLoader1 = () => {
  dotSpinner.register();
  return <l-dot-spinner size="40" speed="0.9" color="black"></l-dot-spinner>;
};

export default ContinueLoader1;
