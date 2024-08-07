import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

// importing models
import User from "@/models/userModel";

// for token and encryption
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // check if username already exists
        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return NextResponse.json(
                { error: "Username already exists" },
                { status: 400 }
            );
        }

        // hasded password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const response = await newUser.save();

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                data: response,
            },
            {
                status: 201,
            }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
