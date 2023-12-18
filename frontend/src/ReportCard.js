import React from "react";
import { Link } from "react-router-dom";

const ReportCard = ({ data }) => {
    if (!data) {
        return null; // or handle the case when data or data.review is null or undefined
    }
    if (!data.review) {
        data.review = "";
    }
    return (
        <div className="col-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <div className="card-text">
                        <div className="author">{data.author}</div>
                        <p>
                            {data.review.slice(0, 100)}
                            {data.review.length > 100 ? "..." : ""}
                        </p>
                    </div>
                    {/* Use the id as a param in the route */}
                    <Link
                        to={`/student-dashboard/view-report/${data.id}`}
                        className="btn btn-primary"
                    >
                        VIew More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReportCard;
