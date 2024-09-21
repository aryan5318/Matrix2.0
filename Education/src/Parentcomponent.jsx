import React, { useState } from 'react';
import StarRating from './starrating'; // Import the StarRating component
import { useParams } from 'react-router-dom';
import AverageRating from './Averagerating';
import  './AverageRating.css';
import './ParentComponent.css'
const ParentComponent = () => {
    const { courseId } = useParams(); 
    const [userRating, setUserRating] = useState(0);

    // This function will be passed to StarRating and called when the user selects a rating
    const handleRatingChange = async (newRating) => {
        setUserRating(newRating); // Update the user rating in the frontend state
    
        const token = localStorage.getItem('token'); // Get the user's token for authentication
    
        // Send the rating data to the POST route on the server
        await fetch(`http://localhost:5000/api/courses/${courseId}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token // Include JWT for authentication
            },
            body: JSON.stringify({ rating: newRating }) // Send the rating value in the request body
        });
    
        // Fetch and update the average rating after the new rating is submitted
        const ratingResponse = await fetch(`/api/courses/${courseId}/average-rating`);
        const ratingData = await ratingResponse.json();
        setAverageRating(ratingData.averageRating);
    };
    
    return (
        <div className='f'>
            <h1>Rate this Course</h1>
            <StarRating totalStars={5} onRatingChange={handleRatingChange} />
            <p className='Parentstar' >Selected Rating: {userRating}</p>
               <AverageRating/>
        </div>
    );
};

export default ParentComponent;
