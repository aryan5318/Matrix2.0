import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AverageRating.css'

const AverageRating = () => {
    const { courseId } = useParams(); // Get courseId from the URL
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${courseId}/average-rating`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAverageRating(data.averageRating);
            } catch (error) {
                console.error('Error fetching average rating:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAverageRating();
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3 className='startcolor'>Average Rating: {averageRating.toFixed(1)} / 5</h3> {/* Display the average rating */}
        </div>
    );
};

export default AverageRating;
