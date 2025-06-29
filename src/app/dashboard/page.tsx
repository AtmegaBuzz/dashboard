"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, Bot, Zap, Sparkle } from "lucide-react";
import { useAtom } from "jotai";
import { userCredsAtom } from "@/store/global.store";
import { VCResponse } from "@/apis/registry/types";
import CredentialCard from "@/components/dashboard/credential-card";


const formatDID = (did: string) => {
  if (did.length <= 20) return did;
  return `${did.slice(0, 10)}...${did.slice(-10)}`;
};

// Utility function to format timestamp to readable date
const formatDate = (timestamp: number) => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};


const getCredentialStatus = (revoked: boolean, expirationDate: number) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (revoked) return 'revoked';
  if (expirationDate && currentTimestamp > expirationDate) return 'expired';
  return 'active';
};


export default function AgentsPage() {
  const [error, setError] = useState<string | null>(null);
  const [credentials,] = useAtom(userCredsAtom);

  const getStatusIcon = (revoked: VCResponse["revoked"]) => {

    if (revoked) {
      return <XCircle className="text-[#EC4899] w-5 h-5" />;
    } else {
      return <CheckCircle2 className="text-[#3B82F6] w-5 h-5" />;
    }
    // switch (status) {
    //   case 'active':
    //     return <CheckCircle2 className="text-[#3B82F6] w-5 h-5" />;
    //   case 'revoked':
    //     return <XCircle className="text-[#EC4899] w-5 h-5" />;
    //   case 'expired':
    //     return <XCircle className="text-[#06B6D4] w-5 h-5" />;
    // }
  };


  if (error) {
    return (
      <div className="text-[#EC4899] text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="relative pt-8 pb-16 bg-white min-h-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4]">
                Issued Credentials
              </CardTitle>
              <CardDescription>
                Discover and manage your professional credentials
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-black/10 rounded-lg p-4">
            <div
              className="size-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${('#3B82F6')}10` }}
            >
              <Bot size={24} className="text-[#3B82F6]" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Total Credentials</div>
              <div className="text-2xl font-bold text-black">{credentials.length}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-black/10 rounded-lg p-4">
            <div
              className="size-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${('#06B6D4')}10` }}
            >
              <Sparkle size={24} className="text-[#06B6D4]" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Active Credentials</div>
              <div className="text-2xl font-bold text-black">
                {credentials.filter(c => c.revoked === false).length}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-black/10 rounded-lg p-4">
            <div
              className="size-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${('#7678ed')}10` }}
            >
              <Zap size={24} className="text-[#7678ed]" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Expired Credentials</div>
              <div className="text-2xl font-bold text-black">
                {credentials.filter(c => c.revoked === true).length}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((credential, index) => (
            <CredentialCard key={index} credential={credential} index={index} isDID={false} />
          ))}
        </div>

        {credentials.length === 0 && (
          <motion.div
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No credentials found
          </motion.div>
        )}
      </div>
    </div>
  );
}