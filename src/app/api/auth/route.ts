"user server"

import { prisma } from "@/lib/prisma"
import { verifyMessage } from "@/lib/utils";
import { UserRegisterSchema } from "@/schema/AuthSchema";

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const user = UserRegisterSchema.parse(body);

        const sig_valid = verifyMessage(process.env.NEXT_PUBLIC_MESSAGE!, user.signature,user.wallet_address);

        if (!sig_valid) {
            throw "Invalid Wallet Signature";
        }
        
        await prisma.user.create({
            data: {
                name: user.name, 
                email: user.email, 
                website: user.website,
                did_str: user.did_str,
                address: user.wallet_address,
            }
        })

        return new Response(JSON.stringify("Done"), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        })
    }
    catch (err: any) {

        return new Response(JSON.stringify({
            errors: err
        }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 500
        })
    }


}