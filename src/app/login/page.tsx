"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/users/login", user);

            if (response.status === 200) {
                toast.success(response.data.message);
                router.push("/profile");
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email && user.password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-center text-2xl font-bold leading-tight text-white mb-4">
                            {loading ? "Loading..." : "Login to your account"}
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-base font-medium text-white"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-base font-medium text-white"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-700/80"
                                    onClick={onLogin}
                                    disabled={buttonDisabled}
                                >
                                    {buttonDisabled
                                        ? "Fill the Details"
                                        : "Sign In"}
                                </button>
                            </div>
                            <p className="my-2 text-center text-base text-white-600">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    title=""
                                    className="font-medium text-white transition-all duration-200 hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster position="bottom-center" reverseOrder={false} />
        </div>
    );
}

export default LoginPage;
