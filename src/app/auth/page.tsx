'use client'

import { useState } from 'react'
import { User, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ConnectButton, useAccount, useConnect, useConnectors, useParticleAuth, useSmartAccount } from '@particle-network/connectkit'
import Web3 from "web3";
import { motion, useAnimation } from "framer-motion";
import { Brain, Hexagon, Network, Cpu, CircuitBoard } from "lucide-react";
import { useEffect, useCallback } from "react";
import { PersonIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { contractAtom, web3Atom } from '@/store/global.store'
import Contract from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { ABI } from '@/lib/abi'
import { DIDDocumentCreator } from '@/lib/did'
import { ParticleProvider } from '@particle-network/provider';
import Link from 'next/link'
import { useRouter } from "next/navigation"

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
                <motion.circle
                    r="2"
                    fill="rgb(140,69,255)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{
                        offsetDistance: "100%",
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        offsetPath: `path("M ${start.x}% ${start.y}% L ${end.x}% ${end.y}%")`,
                    }}
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
                        AI Network
                    </h1>
                    <p className="text-white/60 text-lg">
                        Secure Identity Management
                    </p>
                </div>
            </motion.div>
        </div>
    );
};


export default function Auth() {

    const { address, chain, status, isConnected, connector } = useAccount();
    const router = useRouter();
    const [contract, setContract] = useAtom(contractAtom);
    const [web3, setWeb3] = useAtom(web3Atom);

    const loadContract = async () => {
        
        const provider = await connector?.getProvider();
        const _web3 = new Web3(provider as string);
        setWeb3(_web3);
    
        const contractInstance = new _web3.eth.Contract(
            ABI,
            process.env.NEXT_PUBLIC_DID_REGISTRY_CONTRACT_ADDRESS as string
        );
        
        setContract(contractInstance);
    }

    
    const registerUser = async (e: any) => {

        e.preventDefault();

        try {
            if (!isConnected) {
              throw new Error("No account connected");
            }
      
            const didDocument = DIDDocumentCreator.createDIDDocument(address!, false);
            DIDDocumentCreator.validateDIDDocument(didDocument);
            const did = JSON.stringify(didDocument, null, 2);

            
            const gasEstimate = await contract?.methods.registerUserDID(did).estimateGas({ from: address });

            console.log(did)
            let tx = await contract?.methods.registerUserDID(did).send({
                from: address,
                value: '0x00',
                gasPrice: gasEstimate?.toString()
            });

            console.log(tx?.transactionHash);


            router.push("/dashboard/add-identity")

          } catch (error: any) {
            console.error(error.message);
          }
        }

    const checkUserAlreadyExists = async ()=>{

        // let exists = await contract?.methods.isRegisteredUser(web3?.defaultAccount).call();
        // console.log(exists)
        console.log(web3?.eth.accounts,"====")
    }


    useEffect(() => {
        if (isConnected){
            loadContract();
            checkUserAlreadyExists();
        }
    }, [isConnected])




    return (
        <div className="flex h-screen bg-background">
            <div className="hidden lg:flex w-[40%] bg-secondary items-center justify-center">
                <NetworkAnimation />
            </div>

            {/* Right side - Login Form */}

            <div className='flex w-[60%] flex-col'>

                <div className='flex justify-end p-3'>
                    <ConnectButton label='Connect Wallet' />
                </div>
                <div className="flex-1 flex items-center justify-center p-8">

                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
                            <p className="mt-2 text-sm text-muted-foreground">Sign in to your AI Identity</p>
                        </div>
                        <form className="mt-8 space-y-6">
                            <div className="space-y-4">
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
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <div className='absolute left-2 h-full flex items-center'>
                                            <Mail className="w-5" />
                                        </div>
                                        <Input
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="pl-10"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <div className='absolute left-2 h-full flex items-center'>
                                            <Mail className="w-5" />
                                        </div>
                                        <Input
                                            name="github"
                                            type="text"
                                            autoComplete="github"
                                            required
                                            className="pl-10"
                                            placeholder="https://github.com/aicreator"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full" onClick={registerUser}>
                                Get my AI Identity
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}