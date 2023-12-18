// HomePage.js
import { React, useState } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [initialRedirect, setInitialRedirect] = useState(true);

    // const checkAuthentication = () => {
    if (user && initialRedirect) {
        navigate("/student-dashboard");
        setInitialRedirect(false); // Disable further initial redirects
    }

    return (
        <div>
            <div id="navBar">
                <img
                    src="scsdLogo.png"
                    alt="syracuse city school district logo"
                />
            </div>
            <hr />
            <div className="row">
                {/* <div className="col-1"></div> */}
                <div className="col-2">
                    {!user && (
                        <Link to="/sign-in">
                            <button> Sign In</button>
                        </Link>
                    )}
                    {user && <SignOutButton />}
                </div>
                <div className="col-10" id="mainContent">
                    <h3>Summer Reading Assignment</h3>
                    <p>
                        Parents, since we would like students to continue
                        improving their reading, comprehension, and writing
                        skills during the summer we are including an assignment
                        for students to work on during the months of June, July,
                        and August.
                    </p>
                    <p>
                        Expectations: Students will pick 3 to 5 books from the
                        available lists we have created for this assignment.
                        After they are done reading a book they need to complete
                        a book report graphic organizer. Students will turn
                        these into their ELA teachers for a grade in September.
                        Both the book lists and a blank version of the book
                        report graphic organizer are available below.
                    </p>
                    <div>
                        <h4>Book Lists</h4>
                        <ul>
                            <li>
                                <button>
                                    <b>YA</b> Biographies
                                </button>
                            </li>
                            <li>
                                <button>
                                    <b>YA</b> Nonfiction
                                </button>
                            </li>
                            <li>
                                <button>
                                    <b>YA</b> Fiction
                                </button>
                            </li>
                            <li>
                                <button>
                                    <b>YA</b> Graphic Novels
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
// };

export default HomePage;
