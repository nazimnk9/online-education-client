import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

let Index = ({ courses }) => {
     const [coursesData, setCoursesData] = useState([]);

     useEffect(() => {
         const fetchCourses = async () => {
             const { data } = await axios.get("/api/courses");
             setCoursesData(data);
         };
         fetchCourses();
     }, []);

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Online Education</h1>
            <div className="container-fluid">
                <div className="row">
                    {coursesData.map((course) => (
                        <div key={course._id} className="col-md-4">
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/courses`);
    return {
        props: {
            courses: data,
        },
    };
};

export default Index;

// export default function index({ Component, pageProps }) {
//     return <h1>hello world</h1>
//   };