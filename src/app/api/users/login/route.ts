import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

// importing models
import User from "@/models/userModel";

// for token and encryption
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or Not Registered User" },
                { status: 400 }
            );
        }

        // Password comparison
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1h",
        });

        const response = NextResponse.json(
            {
                message: "Login Successfull",
                success: true,
            },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
