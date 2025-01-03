import { ABI } from "@/lib/abi";

export const contractConfig = {
    address: process.env.NEXT_PUBLIC_DID_REGISTRY_CONTRACT_ADDRESS, // Replace with your contract address
    abi: ABI
  };