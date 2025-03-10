
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function Second() {
    const reviews = [
        { text: "“a different paradise, it’s rich in culture”", author: "Ana Begera", image: "review.png" },
        { text: "“The most luxurious experience ever!”", author: "James Carter", image: "review.png" },
        { text: "“A hidden gem that feels like home”", author: "Sophia Lee", image: "review.png" }
    ];

    // State to track current review
    const [currentReview, setCurrentReview] = useState(0);

    // Function to change review on image click
    const handleReviewClick = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    return (
        <>
            <br />
            <br /><br />
            <br />
            <br />

            <div className="container-fluid py-0 border-top border-bottom border-dark">
                <div className="row align-items-center">
                    {/* Left Text (col-5) */}
                    <div className="col-2 text-start ">

                    </div>
                    <div className="col-3 text-start ">
                        <h2 className="libre-caslon-text-regular  text-dark fs-1">
                            We host <br />
                            <span className="libre-caslon-text-bold">19,000 to 27,000</span> <br />
                            guests every day
                        </h2>
                    </div>

                    {/* Center Image (col-4) */}
                    <div className="col-4">
                        <img src="image2.png" alt="Guests enjoying" className="img w-75" />
                    </div>


                    {/* Right Text & Review (col-3) */}
                    <div className="col-3">
                        <blockquote className="blockquote mb-5 col-8">
                            <p className="libre-caslon-text-regular fs-4">{reviews[currentReview].text}</p>
                            <footer className="libre-caslon-text-regular text-muted fs-6">
                                {reviews[currentReview].author}
                            </footer>
                        </blockquote>

                        {/* Review Image - Click to Change Review */}
                        <img
                            src={reviews[currentReview].image}
                            alt="Reviewers"
                            className="mt-5 cursor-pointer"
                            width="200"
                            onClick={handleReviewClick}
                        />
                    </div>
                </div>
            </div>


        </>
    );
}

export default Second;
