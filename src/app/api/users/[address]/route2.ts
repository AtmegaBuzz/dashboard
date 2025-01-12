// "user server"

// import { prisma } from "@/lib/prisma"
// import { verifyMessage } from "@/lib/utils";
// import { UserRegisterSchema } from "@/schema/AuthSchema";


// interface GetParams {
//     address: string
// }

// /* eslint-disable jsx-a11y/alt-text */
// export async function GET(req: Request, context: {params: GetParams}) {

//     try {

//         const params = await context.params;
//         const {address} = params;

//         const user = await prisma.user.findFirst({
//             where: {
//                 address: address
//             }, 
//             select: {
//                 email: true, 
//                 name: true,
//                 id: true,
//                 address: true, 
//                 did_str: true,
//                 is_verified: true
//             }
//         });

//         if (!user) {
//             return new Response(JSON.stringify({"error": "User Not Found!"}), {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 status: 404
//             })
//         }

//         return new Response(JSON.stringify(user), {
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             status: 200
//         })
//     }
//     catch (err: any) {

//         return new Response(JSON.stringify({
//             errors: err
//         }), {
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             status: 500
//         })
//     }


// }