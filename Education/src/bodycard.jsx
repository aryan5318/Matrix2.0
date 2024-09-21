import React, { useRef } from 'react';
import './bodycard.css'
import { Link } from 'react-router-dom';

const Bodycard = ({ courses }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            top: 0,
            left: -300, // Adjust the scroll amount as needed
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            top: 0,
            left: 300, // Adjust the scroll amount as needed
            behavior: 'smooth'
        });
    };

    return (
        <div className="scroll-wrapper">
            <button className="scroll-button left" onClick={scrollLeft}>‹</button>
            <div className="course-container" ref={scrollRef}>
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div key={index} className="course-card">
                            <div className="course-image-container">
                                <img src={course.imgUrl} alt={course.name} className="course-image" />
                            </div>
                            <h2 className="course-title">{course.name}</h2>
                            <Link to={`/courses/${course._id}`}>View Details</Link>
                        </div>
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>›</button>
        </div>
    );
};

export default Bodycard;
