import React from 'react';

function ForLoading() {
  return (
    <div className='w-[300px] h-[41vh] p-5 bg-white shadow-md rounded-md flex flex-col justify-between'
    style={{ marginTop: '30px' }} >
      <div className='flex justify-center'>
        <div className='rounded-lg bg-slate-200 h-[200px] w-[200px]'></div>
      </div>
      <div className='mt-2'>
        <div className='h-2 bg-slate-200 rounded'></div>
        <div className='space-y-3 mt-2'>
          <div className='grid grid-cols-3 gap-1'>
            <div className='h-2 bg-slate-200 rounded col-span-2'></div>
            <div className='h-2 bg-slate-200 rounded col-span-1'></div>
          </div>
          <div className='h-2 bg-slate-200 rounded'></div>
        </div>
      </div>
    </div>
  );
}


export default ForLoading;
