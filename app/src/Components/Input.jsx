import React from "react";

const Input = ({ ...props }) => {
  return (
    <div >
      <div className="pointer-events-none">
      </div>
      <input
        {...props}
        className="rounded-[1.875rem] bg-[#F2F2F2] w-full pl-6  py-2  outline-none placeholder-[#5A5151] h-12 text-[16px]"
        />
    </div>
  );
};

export default Input;