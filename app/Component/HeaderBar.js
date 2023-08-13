import React from 'react';
import Image from 'next/image';

function HeaderBar() {
  return (
    <div className='flex items-center justify-center p-5 bg-[#3E2723]'>
      <div className='flex gap-5 items-center'>
        
      <Image src='/eatLocationLogo.png' alt='logo' width={50} height={50} />
        <h2 className='text-white font-semibold'>When In Tagaytay</h2>
      </div>
      <div>
      </div>
    </div>
  );
}

export default HeaderBar;
