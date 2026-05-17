import React from "react";
import loadingIcon from "@/assets/images/loading.svg";

const Loading = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50">
      <img src={loadingIcon} alt="Loading" className="w-25 h-25 animate-spin" />
    </div>
  );
};

export default Loading;
