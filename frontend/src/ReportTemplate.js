// eslint-disable no-unused-vars;

import { useNavigate, Link } from "react-router-dom";
import FooterComponent from "./Footer";
import "./ReportTemplate.css";
import "./TemplateForm.css";
import APIURL from "./APIURL";
import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from "@clerk/clerk-react";

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

const ReportTemplate = () => {
    const navigateTo = useNavigate();
    const { getToken } = useAuth();

    const createForm = async (event) => {
        event.preventDefault();

        const token = await getToken();

        const response = await fetch(`${APIURL}/ReportTemplate`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: event.target.elements.name.value,
                title: event.target.elements.title.value,
                author: event.target.elements.author.value,
                mainCharacters: event.target.elements.mainCharacters.value,
                setting: event.target.elements.setting.value,
                beginning: event.target.elements.beginning.value,
                conflict: event.target.elements.conflict.value,
                resolution: event.target.elements.resolution.value,
                review: event.target.elements.review.value,
            }),
        });

        try {
            if (response.status === 200) {
                const data = await response.json();

                if (data.error) {
                    alert(data.error);
                } else {
                    navigateTo("/student-dashboard");
                }
            } else {
                alert("Failed to create the report.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

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
                    <h2 style={{ fontWeight: 600, marginTop: "1rem" }}>Create a Book Report</h2>
                    <p style={{ color: "#6c757d", marginBottom: "1.5rem" }}>
                        Fill out each section after you finish reading your book.
                    </p>

                    <form onSubmit={createForm}>
                        {/* BOOK INFO */}
                        <div className="card" style={sectionCard}>
                            <div style={stripe} />
                            <div className="card-body">
                                <h5 style={sectionTitle}>Book Info</h5>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input type="text" className="form-control" id="name" name="name"
                                        placeholder="First and last name" required />
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="title" className="form-label">Book Title</label>
                                        <input type="text" className="form-control" id="title" name="title"
                                            placeholder="e.g., Hatchet" required />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="author" className="form-label">Author</label>
                                        <input type="text" className="form-control" id="author" name="author"
                                            placeholder="e.g., Gary Paulsen" required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STORY ELEMENTS */}
                        <div className="card" style={sectionCard}>
                            <div style={stripe} />
                            <div className="card-body">
                                <h5 style={sectionTitle}>Story Elements</h5>

                                <div className="mb-3">
                                    <label htmlFor="mainCharacters" className="form-label">Main Characters</label>
                                    <textarea className="form-control" id="mainCharacters" name="mainCharacters"
                                        rows="2" placeholder="Who are the most important characters?"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="setting" className="form-label">Setting</label>
                                    <textarea className="form-control" id="setting" name="setting"
                                        rows="2" placeholder="Where and when does the story take place?"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* PLOT */}
                        <div className="card" style={sectionCard}>
                            <div style={stripe} />
                            <div className="card-body">
                                <h5 style={sectionTitle}>Plot</h5>

                                <div className="mb-3">
                                    <label htmlFor="beginning" className="form-label">Beginning</label>
                                    <textarea className="form-control" id="beginning" name="beginning"
                                        rows="2" placeholder="How does the story start?"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="conflict" className="form-label">Conflict</label>
                                    <textarea className="form-control" id="conflict" name="conflict"
                                        rows="2" placeholder="What problem do the characters face?"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="resolution" className="form-label">Resolution</label>
                                    <textarea className="form-control" id="resolution" name="resolution"
                                        rows="2" placeholder="How is the problem solved?"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* REVIEW */}
                        <div className="card" style={sectionCard}>
                            <div style={stripe} />
                            <div className="card-body">
                                <h5 style={sectionTitle}>Your Review</h5>

                                <div className="mb-3">
                                    <label htmlFor="review" className="form-label">
                                        What did you think of the book?
                                    </label>
                                    <textarea className="form-control" id="review" name="review"
                                        rows="4" placeholder="Would you recommend it? Why or why not?" required></textarea>
                                </div>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="d-flex align-items-center gap-3">
                            <button type="submit" className="btn"
                                style={{ backgroundColor: "#000000", color: "#ffffff", borderRadius: "8px", padding: "0.5rem 1.5rem" }}>
                                Create Report
                            </button>
                            <Link to="/student-dashboard" style={{ color: "#6c757d" }}>Cancel</Link>
                        </div>
                    </form>
                </div>

                <div>
                    <FooterComponent />
                </div>
            </SignedIn>
        </div>
    );
};

export default ReportTemplate;
