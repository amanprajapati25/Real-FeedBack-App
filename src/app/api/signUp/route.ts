import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from "bcrypt";


export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();
        const existingUserVerifiedByUsername = await userModel.findOne({ username, isVerified: true })
        if (existingUserVerifiedByUsername) {
            Response.json(
                {
                    success: true,
                    message: 'Username Already Taken'
                },
                {
                    status: 400
                }
            )
        }

        const existingUser = await userModel.findOne(username)
        if (existingUser){

        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryPasswordTime = new Date;
            expiryPasswordTime.setHours(expiryPasswordTime.getHours() + 1);
            
        }

    } catch (error) {
        console.error('Error Registering User', error);
        return Response.json({ success: false, message: 'Error Registering User' }, { status: 500 });

    }
}