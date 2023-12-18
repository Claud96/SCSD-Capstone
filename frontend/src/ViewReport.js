import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FooterComponent from "./Footer";
import APIURL from "./APIURL";
import "./ViewReport.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const ViewReport = () => {
    const [report, setReport] = useState(null); // Initialize report as null

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
        if (window.confirm("Are you sure you want to delete?")) {
            await fetch(`${APIURL}/reports/${id}`, { method: "DELETE" });
            navigateTo("/student-dashboard");
        }
    };

    if (!report) {
        return <p>Loading...</p>; // or render a loading indicator
    }

    return (
        <div>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
                <div id="navBar" className="row">
                    <div className="col-2">
                        <img
                            src="scsdLogo.png"
                            alt="syracuse city school district logo"
                        />
                    </div>
                </div>
                <hr />
                <h2 id="intro">you are currently viewing report {report.id}</h2>
                <h2>{report.title}</h2>
                <p>
                    <b> Author:</b> {report.author}
                </p>
                <p>
                    <b> Main Characters:</b> {report.mainCharacters}
                </p>
                <p>
                    <b>Setting:</b> {report.setting}
                </p>
                <p>
                    <b>Beginning:</b> {report.beginning}
                </p>
                <p>
                    <b>Conflict:</b> {report.conflict}
                </p>
                <p>
                    <b>Resultion:</b> {report.resolution}
                </p>
                <p>
                    <b>Review:</b> {report.review}
                </p>

                <div>
                    <button className="btn btn-danger" onClick={deleteReport}>
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
