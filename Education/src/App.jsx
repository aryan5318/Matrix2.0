import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './index.css'
import './App.css'
import StarRating from './starrating';
import ParentComponent from './Parentcomponent';

import Bodycard from './bodycard';
function App() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ name: '', description: '', CourseUrl: '', courseType: '', imgUrl: '' });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        // Fetching the list of courses from the backend
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                setCourses(response.data);
                
                // Set the list of courses
                
            })
            .catch(error => {
                console.error('Error fetching the courses!', error);
            });
    }, []);
   
    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imgUrl = newCourse.imgUrl;

            // Upload the image if a new image file is selected
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('upload_preset', 'Code hustlers'); // Replace with your Cloudinary upload preset

                // Use Cloudinary's upload URL
                const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/dahdr8x7g/image/upload', formData);
                imgUrl = uploadResponse.data.secure_url;
            }
            console.log(imgUrl)

            // Post the new course to the backend with the image URL
            const response = await axios.post('http://localhost:5000/api/courses', { ...newCourse, imgUrl });

            // Add the newly created course to the course list in state
        
            setCourses([...courses, response.data]);

            
            setNewCourse({ name: '', description: '',  CourseUrl: '', courseType: '', imgUrl: '' }); // Clear the form fields
            setImageFile(null); // Clear the selected file
        } catch (error) {
            console.error('Error posting the course data!', error);
        }
    };
    console.log(courses)

    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle file input changes
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        setImageFile(file); // Save the file for uploading
    };

    return (<>
        <Navbar />
        <div className='course-Add'>
        <div ><Bodycard courses={courses} />
        </div>


            <form className='course-add' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={handleChange}
                    required
                     className="form-input"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newCourse.description}
                    onChange={handleChange}
                    required
                     className="form-input"
                />
                <input
                    type="text"
                    name="CourseUrl"
                    placeholder="courseUrl"
                    value={newCourse.CourseUrl}
                    onChange={handleChange}
                    required
                     className="form-input"
                />
                <input
                    type="text"
                    name="courseType"
                    placeholder="Course Type"
                    value={newCourse.courseType}
                    onChange={handleChange}
                    required
                     className="form-input"
                />
                <input
                    type="file"
                    name="imgUrl"
                    onChange={handleFileChange}
                    className="form-input file-input"
                />
                <button type="submit"
                className="form-button">Add Course</button>
            </form>
        </div>
    </>
    );
}

export default App;
