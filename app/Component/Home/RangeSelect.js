import { useState } from "react";

function RangeSelect({onRadiusChange}) {
    const [radius,setRadius]=useState(5);
  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-2'>
        Select Radius
      </h2>
      <input
        type='range'
        className='w-full h-4 rounded-lg appearance-none
         bg-gray-200 cursor-pointer
          hover:bg-gray-400 focus:outline-none focus:bg-brown-400'
        min="0"
        max="100"
        step="5"
        onChange={(e)=>{setRadius(e.target.value);onRadiusChange(e.target.value)}}
        defaultValue={radius}/>
        <label>{radius} in Meter</label>
    </div>
  );
}

export default RangeSelect;
