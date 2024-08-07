"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {
                token,
            });
            if (response.status === 200) {
                setVerified(true);
                toast.success("Email verified successfully");
            }
        } catch (error) {
            setError(true);
            toast.error("Failed to verify email");
            console.error("Error verifying email:", error);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-black">
            <div className="max-w-xl px-5 text-center">
                <h2 className="mb-2 text-[42px] font-bold text-orange-600">
                    Verify Your Email
                </h2>

                <p className="mb-2 text-lg text-zinc-300">
                    {token ? `${token}` : "No Token Available"}
                </p>
                {verified && (
                    <>
                        {" "}
                        <p className="mb-2 text-lg text-zinc-300">
                            Your email has been verified. You can now login.
                        </p>
                        <Link
                            href="/login"
                            className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
                        >
                            Login here →
                        </Link>
                    </>
                )}

                {error && (
                    <>
                        {" "}
                        <p className="mb-2 text-lg text-red-500">
                            Something went wrong. Please try again later.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
