// eslint-disable no-unused-vars;

import { useNavigate } from "react-router-dom";
import FooterComponent from "./Footer";
import "./ReportTemplate.css";
import "./TemplateForm.css";
import APIURL from "./APIURL";
import {
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    useAuth,
} from "@clerk/clerk-react";

const ReportTemplate = () => {
    const navigateTo = useNavigate();
    const { getToken } = useAuth();

    const createForm = async (event) => {
        event.preventDefault();

        const token = await getToken();
        console.log(token);

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
                // The response status indicates success, so we can attempt to parse JSON
                const data = await response.json();

                if (data.error) {
                    // Handle the case where the server returns an error message
                    alert(response.error);
                } else {
                    // The record was successfully inserted into the database
                    // You can handle the success case here
                    // For example, you can navigate to another page
                    navigateTo("/student-dashboard");
                }
            } else {
                // Handle the case where the HTTP request was not successful
                alert("Failed to create the report.");
            }
        } catch (error) {
            // Handle any other errors that may occur during the request
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
                    <img
                        src="scsdLogo.png"
                        alt="syracuse city school district logo"
                    />
                </div>
                <hr />
                <div className="container">
                    <form onSubmit={createForm}>
                        {/* Input for 'Name' */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                            />
                        </div>

                        {/* Input for 'Title' */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                // id="title"
                                name="title"
                            />
                        </div>

                        {/* Input for 'Author' */}
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">
                                Author
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                // id="author"
                                name="author"
                            />
                        </div>

                        {/* Input for 'Main Characters' */}
                        <div className="mb-3">
                            <label
                                htmlFor="mainCharacters"
                                className="form-label"
                            >
                                Main Characters
                            </label>
                            <textarea
                                className="form-control"
                                // id="mainCharacters"
                                name="mainCharacters"
                                rows="2"
                            ></textarea>
                        </div>

                        {/* Input for 'Setting' */}
                        <div className="mb-3">
                            <label htmlFor="setting" className="form-label">
                                Setting
                            </label>
                            <textarea
                                className="form-control"
                                // id="setting"
                                name="setting"
                                rows="2"
                            ></textarea>
                        </div>

                        {/* Input for 'Beginning' */}
                        <div className="mb-3">
                            <label htmlFor="beginning" className="form-label">
                                Beginning
                            </label>
                            <textarea
                                className="form-control"
                                // id="beginning"
                                name="beginning"
                                rows="2"
                            ></textarea>
                        </div>

                        {/* Input for 'Conflict' */}
                        <div className="mb-3">
                            <label htmlFor="conflict" className="form-label">
                                Conflict
                            </label>
                            <textarea
                                className="form-control"
                                // id="conflict"
                                name="conflict"
                                rows="2"
                            ></textarea>
                        </div>

                        {/* Input for 'Resolution' */}
                        <div className="mb-3">
                            <label htmlFor="resolution" className="form-label">
                                Resolution
                            </label>
                            <textarea
                                className="form-control"
                                // id="resolution"
                                name="resolution"
                                rows="2"
                            ></textarea>
                        </div>

                        {/* Input for 'Review' */}
                        <div className="mb-3">
                            <label htmlFor="review" className="form-label">
                                Review
                            </label>
                            <textarea
                                className="form-control"
                                // id="review"
                                name="review"
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="btn btn-link">
                            Create Report
                        </button>
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
