import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParentComponent from './Parentcomponent';
import './CourseDetails.css'; // Import the CSS file

const CourseDetails = () => {
  const { courseId } = useParams(); // Extract courseId from the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);
    };

    fetchCourse();
  }, [courseId]);

  return (
    <div className="course-container1">
      {course ? (
        <div>
                                          <img src={course.imgUrl} alt={course.name} className="course-image" />
          <h1 className="course-title">{course.name}</h1>
          <p className="course-description">{course.description}</p>
          <p>Type: {course.courseType}</p>
          <a className="course-link" href={course.CourseUrl} target="_blank" rel="noopener noreferrer">
            Go to Course
          </a>
          <ParentComponent/>
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default CourseDetails;
