import db from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'



export async function POST(request: Request) {
    try {
        const { content, title } = await request.json()


        const { userId } = auth()
        console.log("useId", userId)

        if (!userId) {
            return new NextResponse("You are not allowed to perform this action", {
                status: 401
            })
        }

        await db.article.create({
            data: {
                userId,
                title,
                content
            }
        })

        return NextResponse.json("article created")

    } catch (error) {
        console.log(error)
    }
}

export async function PUT(request: Request) {
    try {
        const { title, content, userId, id } = await request.json()

        const auth = await currentUser()

        if (userId !== auth?.id) {
            return new NextResponse("you are not allowed to perform this action", {
                status: 401
            })
        }

        await db.article.update({
            where: {
                id: id
            },
            data: {
                title, content
            }
        })

        return NextResponse.json("Article updated")


    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(request: Request) {
    try {
        const { userId, id } = await request.json()

        const auth = await currentUser()

        if (userId !== auth?.id) {
            return new NextResponse("you are not allowed to perform this action", {
                status: 401
            })
        }

        await db.article.delete({
            where: {
                id: Number(id)
            }
        })

        return NextResponse.json("Article removed")
    } catch (error) {
        console.log(error)
    }
}



export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");

    const all = request.nextUrl.searchParams.get("all")
    try {
        if (all) {
            const res = await db.article.findMany()

            return NextResponse.json(res)
        }

        const res = await db.article.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!res) {
            return new NextResponse("Not found", {
                status: 404
            })
        }
        return NextResponse.json(res)
    } catch (error) {
        console.log(error)
    }
}
