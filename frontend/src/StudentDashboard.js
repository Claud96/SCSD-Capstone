import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import FooterComponent from "./Footer";
import ReportCard from "./ReportCard";
import APIURL from "./APIURL";
import "./StudentDashboard.css";
import {
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    useUser,
} from "@clerk/clerk-react";

const StudentDashboard = () => {
    const [reports, setReports] = useState([]);
    const { user } = useUser();

    //when page first loads

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch reports from backend/Reports endpoint
                const response = await fetch(`${APIURL}/reports`);

                //parse the data
                if (response.ok) {
                    const data = await response.json();

                    //use data to set into state
                    setReports(data.reports);
                    console.log(
                        data.reports,
                        "this is the data fetched from the back end"
                    );
                } else {
                    console.error("Failed to fetch reports");
                }
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
                {/* remove this className="container-fluid" */}
                <div id="navBar" className="row">
                    <div className="col-2">
                        <img
                            src="scsdLogo.png"
                            alt="syracuse city school district logo"
                        />
                    </div>
                </div>
                <hr />
                <h2 id="intro">Welcome to Your Dashboard</h2>
                <div className="row" id="reports">
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <ReportCard key={report.id} data={report} />
                        ))
                    ) : (
                        <p>No reports yet...</p>
                    )}
                </div>
                <div>
                    <FooterComponent />
                </div>
            </SignedIn>
        </div>
    );
};

export default StudentDashboard;
