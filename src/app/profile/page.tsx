"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logoutFunc = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log(response);
            toast.success(response.data.message);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.response.data.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me");
            console.log(response);
            toast.success(response.data.message);
            setData(response.data.user._id);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-center text-5xl">Profile Page</h1>
            <h2>
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <div className="mt-4 text-blue-500 text-2xl">
                        <Link href={`/profile/${data}`}>{data}</Link>
                    </div>
                )}
            </h2>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
            <hr />
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={logoutFunc}
            >
                Logout
            </button>
            <Toaster position="bottom-center" reverseOrder={false} />
        </div>
    );
}

export default ProfilePage;
