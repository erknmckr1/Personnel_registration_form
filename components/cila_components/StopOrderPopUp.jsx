import React from "react";

function StopOrderPopUp() {
  return (
    <div className="w-full h-full absolute  grid place-content-center bg-[#F8F9F9] bg-opacity-60 top-0 left-0 z-50 rounded-l-lg popup">
      <div className="w-full h-full flex justify-center items-center rounded-r-[5px]">
        <div className="w-[850px] h-[750px] border border-1 bg-[#FEF9E7] flex ">
          <div className="relative w-1/3 h-full">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: "url('/1-removebg.png')",
                opacity: "0.1",
              }}
            ></div>
          </div>
          <div className="w-2/3 h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default StopOrderPopUp;
