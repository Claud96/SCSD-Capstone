import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FooterComponent from "./Footer";
import APIURL from "./APIURL";
import "./ViewReport.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const sectionCard = {
    borderRadius: "12px",
    border: "none",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    marginBottom: "1.5rem",
    backgroundColor: "#ffffff",
};

const stripe = {
    height: "6px",
    background: "linear-gradient(90deg, #d33e3c, #f1be37)",
};

const sectionTitle = {
    fontWeight: 600,
    color: "#000000",
    marginBottom: "1rem",
};

const label = {
    fontWeight: 600,
    marginBottom: "0.25rem",
};

const ViewReport = () => {
    const [report, setReport] = useState(null);
    const { id } = useParams();
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`${APIURL}/reports/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch report");
                }
                const data = await response.json();
                setReport(data.report);
            } catch (error) {
                console.error("Error fetching report:", error);
            }
        };

        fetchReport();
    }, [id]);

    const deleteReport = async () => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            await fetch(`${APIURL}/reports/${id}`, { method: "DELETE" });
            navigateTo("/student-dashboard");
        }
    };

    if (!report) {
        return (
            <p style={{ textAlign: "center", marginTop: "3rem", color: "#6c757d" }}>
                Loading report...
            </p>
        );
    }

    return (
        <div>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
                <div id="navBar">
                    <img src="/scsdLogo.png" alt="syracuse city school district logo" />
                </div>
                <hr />

                <div className="container" style={{ maxWidth: "800px", paddingBottom: "2rem" }}>
                    <Link to="/student-dashboard" style={{ color: "#6c757d" }}>
                        &larr; Back to Dashboard
                    </Link>

                    {/* HEADER */}
                    <div className="card" style={{ ...sectionCard, marginTop: "1rem" }}>
                        <div style={stripe} />
                        <div className="card-body">
                            <h2 style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{report.title}</h2>
                            {report.author && (
                                <p style={{ color: "#6c757d", fontStyle: "italic", marginBottom: "0.5rem" }}>
                                    by {report.author}
                                </p>
                            )}
                            {report.name && (
                                <p style={{ marginBottom: 0 }}>
                                    Report by <strong>{report.name}</strong>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* STORY ELEMENTS */}
                    <div className="card" style={sectionCard}>
                        <div style={stripe} />
                        <div className="card-body">
                            <h5 style={sectionTitle}>Story Elements</h5>
                            <p style={label}>Main Characters</p>
                            <p>{report.mainCharacters}</p>
                            <p style={label}>Setting</p>
                            <p style={{ marginBottom: 0 }}>{report.setting}</p>
                        </div>
                    </div>

                    {/* PLOT */}
                    <div className="card" style={sectionCard}>
                        <div style={stripe} />
                        <div className="card-body">
                            <h5 style={sectionTitle}>Plot</h5>
                            <p style={label}>Beginning</p>
                            <p>{report.beginning}</p>
                            <p style={label}>Conflict</p>
                            <p>{report.conflict}</p>
                            <p style={label}>Resolution</p>
                            <p style={{ marginBottom: 0 }}>{report.resolution}</p>
                        </div>
                    </div>

                    {/* REVIEW */}
                    <div className="card" style={sectionCard}>
                        <div style={stripe} />
                        <div className="card-body">
                            <h5 style={sectionTitle}>Review</h5>
                            <p style={{ marginBottom: 0 }}>{report.review}</p>
                        </div>
                    </div>

                    <button className="btn btn-danger" onClick={deleteReport} style={{ borderRadius: "8px" }}>
                        Delete Report
                    </button>
                </div>

                <div>
                    <FooterComponent />
                </div>
            </SignedIn>
        </div>
    );
};

export default ViewReport;
