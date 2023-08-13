import React, { useState, useEffect } from 'react';
import Data from '../../../Shared/Data';

function SelectRating({ onSelectRatings }) {
    const [selectedRating, setSelectedRating] = useState([]);

    useEffect(() => {
        onSelectRatings(selectedRating);
    }, [selectedRating, onSelectRatings]);

    const handleSelectRating = (isChecked, value) => {
        if (isChecked) {
            setSelectedRating([...selectedRating, value]);
        } else {
            setSelectedRating(selectedRating.filter((n) => n !== value));
        }
    };

    return (
        <div className='px-2 mt-5'>
            <h2 className='font-bold'>Select Rating</h2>
            <div>
                {Data.ratingList.map((item, index) => (
                    <div key={index} className='flex justify-between items-center'>
                        <label>{item.icon}</label>
                        <input
                            type='checkbox'
                            onChange={(e) => handleSelectRating(e.target.checked, item.name)}
                            checked={selectedRating.includes(item.name)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectRating;
