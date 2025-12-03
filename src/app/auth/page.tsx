'use client'

import { User, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, useAnimation } from "framer-motion";
import { Brain, Hexagon, Network, Cpu, CircuitBoard } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import { PersonIcon } from '@radix-ui/react-icons'
import { DIDDocumentCreator } from '@/lib/did'
import { useRouter } from "next/navigation"
import ConnectWalletButton from '@/components/ui/ConnectWalletButton';
import { useWaitForTransactionReceipt, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { contractConfig } from '@/config/contract-config';
import { useAccount } from "wagmi";
import { useToast } from "@/hooks/use-toast"
import { sha256Hash } from '@/lib/utils';
import { z } from 'zod';

const NetworkAnimation = () => {
    const initialNodes = [
        { id: 1, x: 20, y: 20, icon: Brain },
        { id: 2, x: 80, y: 30, icon: Hexagon },
        { id: 3, x: 30, y: 70, icon: Cpu },
        { id: 4, x: 70, y: 80, icon: Network },
        { id: 5, x: 50, y: 50, icon: CircuitBoard }
    ];

    const NodeComponent = useCallback(({ node }: { node: typeof initialNodes[0] }) => {
        const Icon = node.icon;

        return (
            <motion.div
                key={node.id}
                className="absolute"
                style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="relative p-3 bg-purple-900/20 rounded-xl border border-purple-500/30 backdrop-blur-sm"
                    animate={{
                        boxShadow: [
                            "0 0 20px rgba(140,69,255,0.2)",
                            "0 0 40px rgba(140,69,255,0.4)",
                            "0 0 20px rgba(140,69,255,0.2)"
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Icon className="w-6 h-6 text-purple-400" />
                </motion.div>
            </motion.div>
        );
    }, []);

    const Connection = useCallback(({ start, end }: { start: typeof initialNodes[0], end: typeof initialNodes[0] }) => {
        return (
            <>
                <motion.line
                    x1={`${start.x}%`}
                    y1={`${start.y}%`}
                    x2={`${end.x}%`}
                    y2={`${end.y}%`}
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </>
        );
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-purple-900/20 to-black">
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,69,255,0.1),transparent_50%)]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Network visualization */}
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(140,69,255,0.5)" />
                        <stop offset="100%" stopColor="rgba(140,69,255,0.1)" />
                    </linearGradient>
                </defs>

                {/* Connections */}
                {initialNodes.map((start, i) =>
                    initialNodes.slice(i + 1).map((end, j) => (
                        <Connection
                            key={`${start.id}-${end.id}`}
                            start={start}
                            end={end}
                        />
                    ))
                )}
            </svg>

            {/* Nodes */}
            {initialNodes.map((node) => (
                <NodeComponent key={node.id} node={node} />
            ))}

            {/* Centered Text */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">
                        Zynd Protocol
                    </h1>
                    <p className="text-white/60 text-lg">
                        Secure Identity Management
                    </p>
                </div>
            </motion.div>
        </div>
    );
};


const UserRegisterSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    website: z.string().optional(),
});
type UserRegistration = z.infer<typeof UserRegisterSchema>;

export default function Auth() {

    const router = useRouter();
    const { toast } = useToast();

    const [didStr, setDIDStr] = useState("");
    const { isConnected, address } = useAccount();


    const [formData, setFormData] = useState<UserRegistration>({
        name: '',
        email: '',
        website: '',
    });

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        website?: string;
    }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name)
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const { data: approvalHash, writeContractAsync, error: writeContractError, isError: isWriteContractError, isPending: writeContractPending } = useWriteContract()

    const { isSuccess: isApprovalConfirmed } = useWaitForTransactionReceipt({
        hash: approvalHash,
    });


    const { data: resolveDIDData, isError: isResolveDIDError, error: resolveDIDError } = useReadContract({
        abi: contractConfig.abi,
        address: contractConfig.address as any,
        functionName: "resolveDID",
        args: [
            `did:p3ai:user:${address}`
        ]
    });

    const { signMessageAsync } = useSignMessage();

    const registerUser = async (e: any) => {

        e.preventDefault();

        try {
            UserRegisterSchema.parse(formData);
            setErrors({});
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                const formErrors = error.errors.reduce((acc, curr) => {
                    if (curr.path.length > 0) {
                        acc[curr.path[0] as keyof UserRegistration] = curr.message;
                    }
                    return acc;
                }, {} as typeof errors);

                setErrors(formErrors);
            }
            return;
        }

        try {

            if (!isConnected) {
                throw new Error("No account connected");
            }

            const didDocument = DIDDocumentCreator.createDIDDocument(address!, false);
            DIDDocumentCreator.validateDIDDocument(didDocument);
            const did = JSON.stringify(didDocument, null, 2);

            setDIDStr(did);

            console.log(did);

            const didHash = await sha256Hash(did);
            console.log(didHash)

            const res = await writeContractAsync({
                abi: contractConfig.abi,
                address: contractConfig.address! as any,
                functionName: "registerUserDID",
                args: [
                    didHash
                ]
            });

        } catch (error: any) {
            console.error(error.message);
        }
    }


    const createUserNode = async () => {

        const signature = await signMessageAsync({ message: process.env.NEXT_PUBLIC_MESSAGE! })


        const resp = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                website: formData.website,
                did_str: didStr,
                wallet_address: address,
                signature: signature
            })
        })

        if (resp.status !== 201) {
            toast({
                title: "Error",
                description: "Error Occured",
            })
            return
        }


        toast({
            title: "Success",
            description: "Sucessfully regitered User to the Registry",
        })

    }


    // Check if user already Registered
    useEffect(() => {
        const checkUserAlreadyRegistered = async () => {
            const resp = await fetch(`/api/users/${address}`);

            if (resp.status === 200) {
                router.push("/dashboard")
            }

        }
        checkUserAlreadyRegistered();
    }, [address, router])

    useEffect(() => {
        if (isApprovalConfirmed) {
            createUserNode();
        }
        else if (!isApprovalConfirmed && !writeContractPending) {
            toast({
                title: "Error",
                description: "User Already registered",
            })
        }
    }, [isApprovalConfirmed, writeContractPending, createUserNode])


    return (
        <div className="flex h-screen bg-background">
            <div className="hidden lg:flex w-[40%] bg-secondary items-center justify-center">
                <NetworkAnimation />
            </div>

            {/* Right side - Login Form */}

            <div className='flex w-[60%] flex-col'>

                <div className='flex justify-end p-3'>
                    <ConnectWalletButton />
                </div>
                <div className="flex-1 flex items-center justify-center p-8">

                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
                            <p className="mt-2 text-sm text-muted-foreground">Sign in to your AI Identity</p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={registerUser}>
                            <div className="space-y-4">
                                {/* Name Input */}
                                <div>
                                    <div className="relative">
                                        <div className='absolute left-2 h-full flex items-center'>
                                            <PersonIcon className="w-5" />
                                        </div>
                                        <Input
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            className="pl-10"
                                            placeholder="Full Name"
                                            onChange={handleChange}
                                            value={formData.name}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <div className="relative">
                                        <div className='absolute left-2 h-full flex items-center'>
                                            <Mail className="w-5" />
                                        </div>
                                        <Input
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="pl-10"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                {/* GitHub/Website Input */}
                                <div>
                                    <div className="relative">
                                        <div className='absolute left-2 h-full flex items-center'>
                                            <Mail className="w-5" />
                                        </div>
                                        <Input
                                            name="website"
                                            type="text"
                                            autoComplete="github"
                                            className="pl-10"
                                            placeholder="https://github.com/aicreator"
                                            value={formData.website || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.website && (
                                            <p className="mt-1 text-sm text-red-500">{errors.website}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Conditional Login Button */}
                            {isResolveDIDError === false && (
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        // Add login logic
                                        console.log('Login clicked');
                                    }}
                                >
                                    Login
                                </Button>
                            )}

                            {/* Submit Button */}
                            <Button
                                className="w-full"
                                type="submit"
                            >
                                Get my AI Identity
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}