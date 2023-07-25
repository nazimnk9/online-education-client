import SingleCourse from "../../pages/course/[slug]";
import { currencyFormatter } from "../../utils/helpers";
import { Badge, Button } from "antd";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";

const SingleCourseJumbotron = ({
    course,
    showModal,
    setShowModal,
    preview,
    setPreview,
    loading,
    user,
    handlePaidEnrollment,
    handleFreeEnrollment,
    enrolled,
    setEnrolled,
}) => {
    // distructure
    const {
        name,
        description,
        instructor,
        updatedAt,
        lessons,
        image,
        price,
        paid,
        category,
    } = course;

    //const lesson = lessons[0];
    const [lesson, setLesson] = useState([]);

    useEffect(() => {
        const less = lessons[0];
        setLesson(less);

        //     //loadcourses();
    }, []);

    return (
        <div className="jumbotron bg-primary square">
            <div className="row">
                <div className="col-md-8">
                    <h1 className="text-light font-weight-bold">{name}</h1>
                    <p className="lead">
                        {description && description.substring(0, 300)}...
                    </p>
                    <Badge
                        count={category}
                        style={{ backgroundColor: "#006400" }}
                        className="pb-4 mr-2"
                    />
                    <p>Created by {instructor.name}</p>
                    <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
                    <h4 className="text-light">{
                        paid
                            ? currencyFormatter({
                                amount: price,
                                currency: "usd",
                            })
                            : "Free"}
                    </h4>
                </div>
                <div className="col-md-4">
                    {lesson.free_preview && lesson.video && lesson.video.location ? (
                        <div onClick={() => {
                            setPreview(lesson.video.location);
                            setShowModal(!showModal);
                        }}
                        >
                            <ReactPlayer
                                className="react-player-div"
                                url={lesson.video.location}
                                light={image.location}
                                width="100%"
                                height="225px"
                            />
                        </div>
                    ) : (
                        <>
                            <img
                                src={image.location}
                                alt={name}
                                className="img img-fluid"
                            />
                        </>
                    )}

                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <LoadingOutlined className="h1 text-danger" />
                        </div>
                    ) : (
                        <Button
                            className="mb-3 mt-3"
                            type="danger"
                            block
                            shape="round"
                            style={{ backgroundColor: "#00BFFF", color: "#E0FFFF" }}
                            icon={<SafetyOutlined />}
                            size="large"
                            disabled={loading}
                            onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                        >
                            {user
                                ? enrolled.status
                                    ? "Go to course"
                                    : "Enroll"
                                : "Login to enroll"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleCourseJumbotron;