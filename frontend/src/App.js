import React from "react";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
    useUser,
    UserButton,
    useAuth,
} from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./HomePage"; // Import the Home component
import StudentDashboard from "./StudentDashboard"; // Import the StudentDashboard component
import ReportTemplate from "./ReportTemplate"; // Import the ReportTemplate component
import ViewReport from "./ViewReport";

function ProtectedSignedIn() {
    const { user } = useUser();
}

function Protected() {
    return (
        <div>
            <SignedIn>
                <ProtectedSignedIn />
            </SignedIn>

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </div>
    );
}

function App() {
    // Create route configurations using createBrowserRouter
    const routes = createBrowserRouter([
        {
            path: "/", // URL path
            element: <Home />, // Component to render for this route
        },
        {
            path: "/student-dashboard", // URL path
            element: <StudentDashboard />, // Component to render for this route
        },
        {
            path: "/submit-report", // URL path
            element: <ReportTemplate />, // Component to render for this route
        },
        {
            path: "/student-dashboard/view-report/:id",
            element: <ViewReport />,
        },
        //clerk specific routes

        {
            path: "/sign-in/*",
            element: <SignIn routing="path" path="/sign-in" />,
        },
        {
            path: "/sign-up/*",
            element: <SignUp routing="path" path="/sign-up" />,
        },

        // protected page - a user must be logged in to view this page

        { path: "/protected", element: <Protected /> },
    ]);

    // App component that renders the RouterProvider with routes

    return (
        <ClerkProvider
            publishableKey="pk_test_cm9tYW50aWMtd2Vhc2VsLTUwLmNsZXJrLmFjY291bnRzLmRldiQ"
            navigate={(to) => routes.navigate(to)}
        >
            <div className="App">
                {/* RouterProvider is responsible for rendering the appropriate component based on the current route */}
                <RouterProvider router={routes} />
            </div>
        </ClerkProvider>
    );
}

export default App;
