import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/Prisma";
import { UserSchema } from "../UserSchema";

interface Params{
    params: {
        id: string
    }
}

interface User{
    name: string,
    email: string
}

// single object
export async function GET(request: NextRequest, { params: { id } }: Params){
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!user){
        return NextResponse.json(
            {
                error: "User Not Fouond !"
            },
            {
                status: 404
            }
        );
    }

    return NextResponse.json(user)
}

export async function PUT(request: NextRequest, { params: {id}}: Params){
    const body = await request.json();
    const validation = UserSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json(
            { error: validation.error.errors},
            { status: 400}
        )
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!user){
        return NextResponse.json(
            { error: "User Not Fouond !"  },
            {  status: 404 }
        );
    }

    // task
    // check email if exist, return error with error Message

    // update user
    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data :{
            name: body.name,
            email: body.email
        }
    });

    return NextResponse.json(updatedUser)
}

// DELETE
export async function DELETE(request: NextRequest, { params: { id}}: Params){
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!user){
        return NextResponse.json(
            { error: "User Not Fouond !"  },
            {  status: 404 }
        );
    }

    // delete user
    const deletedUser = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });
    
    return NextResponse.json({
        msg: "User Deleted Successfull!",
        user: deletedUser
    })

}