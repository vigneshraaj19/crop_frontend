import React from "react";
import ScaleLoader from "react-spinners/BarLoader";

const Loader = ({ loading }) => {
  return (
    <div className="text-center">
      <ScaleLoader
        color="blue"
        loading={loading}
        height={8}
        width={100}
        margin={2}
      />
    </div>
  );
};

export default Loader;
