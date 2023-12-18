import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import "./Footer.css";
import { SignedIn } from "@clerk/clerk-react";

function FooterComponent() {
    return (
        <SignedIn>
            <div className="row" id="footer" align="left">
                <div className="col-5 col-m-5 footerHeaderSmall">
                    <u>
                        <p> Anthony Q. Davis, Superintendent</p>
                        <p> 725 Harrison Street</p>
                        <p> Syracuse, NY 13210</p>
                        <p>315.435.4499</p>
                    </u>
                </div>

                <div
                    className="footer-links col-2 col-m-2 center"
                    id="footerlinks"
                >
                    <p>
                        <Link to="/">Home</Link>
                    </p>
                    <p>
                        <Link to="/student-dashboard">Student Dashboard</Link>
                    </p>

                    <p>
                        <Link to="/submit-report">Submit Report</Link>
                    </p>
                </div>

                <div className="col-2 col-m-2 center"> MADE BY A CLAUDIO </div>

                <div className="col-3 col-m-3"></div>
            </div>
        </SignedIn>
    );
}

export default FooterComponent;
