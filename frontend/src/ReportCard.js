import React from "react";
import { Link } from "react-router-dom";

const formatDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date)) return null;
    const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
    return `${day} at ${time}`;
};

const ReportCard = ({ data }) => {
    if (!data) {
        return null;
    }
    const submitted = formatDate(data.createdAt);

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div
                className="card h-100"
                style={{
                    borderRadius: "12px",
                    border: "none",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
            >
                <div
                    style={{
                        height: "6px",
                        background: "linear-gradient(90deg, #d33e3c, #f1be37)",
                    }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title" style={{ color: "#000000", fontWeight: 600 }}>
                        {data.title}
                    </h5>
                    {data.author && (
                        <p style={{ color: "#6c757d", fontStyle: "italic", marginBottom: "0.5rem" }}>
                            by {data.author}
                        </p>
                    )}
                    {submitted && (
                        <p style={{ color: "#6c757d", fontSize: "0.85rem", marginBottom: "1rem" }}>
                            Submitted {submitted}
                        </p>
                    )}
                    <Link
                        to={`/student-dashboard/view-report/${data.id}`}
                        className="btn mt-auto"
                        style={{
                            backgroundColor: "#000000",
                            color: "#ffffff",
                            borderRadius: "8px",
                            alignSelf: "flex-start",
                        }}
                    >
                        View More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReportCard;