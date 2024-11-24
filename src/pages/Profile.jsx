import React, { useContext } from "react";
import { SessionContext } from "../components/SessionContext";

const Profile = () => {
    const { user, loading } = useContext(SessionContext);

    if (loading) return <p>Loading...</p>;

    return user ? (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
        </div>
    ) : (
        <p>Please log in.</p>
    );
};

export default Profile;