import React, { useState } from 'react';
import Data from '../../../Shared/Data';
import Image from 'next/image';

function CategoryList({onCategoryChange}) {
  const [categoryList, setCategoryList] = useState(Data.CategoryListData);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-4'>
        Where in Tagaytay...
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {categoryList.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col justify-center items-center bg-white p-2 rounded-lg shadow-md transition-transform transform hover:scale-95 cursor-pointer ${
              selectedCategory === index ? 'border-2 border-yellow-500' : ''
            }`}
            onClick={() => {setSelectedCategory(index);onCategoryChange(item.value)}}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={40}
              height={20}
              className='mb-2'
            />
            <p className='text-lg font-semibold text-gray-800'>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
