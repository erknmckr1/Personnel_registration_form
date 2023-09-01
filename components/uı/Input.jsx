import React from "react";

function Input(props) {
  const { values, placeholder, touched, errors, ...inputProps } = props;
  
  return (
    <div>
      <label className="relative block cursor-text w-full">
        <input
          type="text"
          className=" placeholder-[8px] text-sm text-red-600  h-10 w-full peer border outline-none px-4 pt-2 bg-[#E5E8E8] border border-1 "
          required
          {...inputProps}
        ></input>
        <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
           {placeholder}
          </span>
      </label>
    </div>
  );
}

export default Input;
