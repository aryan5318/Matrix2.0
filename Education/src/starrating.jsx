import React, { useState } from 'react';
import './StarRating.css';


const StarRating = ({ totalStars = 5, onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
        onRatingChange(value); 
        console.log(rating);
        console.log(hoverRating);
    };

    const handleMouseEnter = (value) => {
        setHoverRating(value);
        console.log(rating);
        console.log(hoverRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
        console.log(rating);
        console.log(hoverRating);
    };

    return (
        <div className="star-rating">
           
            {Array.from({ length: totalStars }, (_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={starValue}
                        className={`star ${starValue <= (hoverRating || rating) ? 'filled' : ''}`}
                        onClick={() => handleRating(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
