import { NextRequest, NextResponse } from "next/server";
import { UserSchema} from "./UserSchema";
import prisma from "../../../../prisma/Prisma";

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany({});
    return NextResponse.json(users)
}

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = UserSchema.safeParse(body);

    if(!validation.success){
      return NextResponse.json({
        error: validation.error.errors
      },{
        status: 400
      })
    }

    const isExistEmail = await prisma.user.findUnique({
        where:{
            email: body.email
        }
    });

    if(isExistEmail){
        return NextResponse.json(
            { error: "Email is already exist!"},
            { status: 400}
        )
    }

    const newUser =  await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })
    
    return NextResponse.json(newUser)
}