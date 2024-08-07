"use client";
import React from "react";

function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">Profile</h1>
            <p className="text-4xl mt-3">
                {" "}
                Profile Page{": "}
                <span className="p-2 rounded bg-orange-400">{params.id}</span>
            </p>
        </div>
    );
}

export default UserProfile;
