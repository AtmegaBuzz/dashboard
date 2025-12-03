"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { accessTokenAtom, userAtom } from "@/store/global.store";
import { createApiKey, getApiKeys, deleteApiKey } from "@/apis/registry";
import { APIKeyResponse } from "@/apis/registry/types";
import {
    Key,
    Copy,
    Plus,
    Loader2,
    CheckCircle2,
    Settings as SettingsIcon,
    Trash2,
} from "lucide-react";

export default function SettingsPage() {
    const [apiKeys, setApiKeys] = useState<APIKeyResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [newApiKey, setNewApiKey] = useState<string | null>(null);
    const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [accessToken] = useAtom(accessTokenAtom);
    const [user] = useAtom(userAtom);
    const { toast } = useToast();

    const fetchApiKeys = async () => {
        try {
            setLoading(true);
            if (!accessToken) {
                throw new Error("No access token");
            }
            const keys = await getApiKeys(accessToken);
            setApiKeys(keys);
        } catch (error) {
            console.error("Failed to fetch API keys:", error);
            toast({
                title: "Error",
                description: "Failed to load API keys",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateApiKey = async () => {
        try {
            setCreating(true);
            if (!accessToken) {
                throw new Error("No access token");
            }
            const key = await createApiKey(accessToken);
            setNewApiKey(key);
            setShowNewKeyDialog(true);
            await fetchApiKeys();
            toast({
                title: "Success",
                description: "API key created successfully",
            });
        } catch (error) {
            console.error("Failed to create API key:", error);
            toast({
                title: "Error",
                description: "Failed to create API key",
                variant: "destructive",
            });
        } finally {
            setCreating(false);
        }
    };

    const confirmDeleteApiKey = (id: string) => {
        setKeyToDelete(id);
        setShowDeleteDialog(true);
    };

    const handleDeleteApiKey = async () => {
        if (!keyToDelete) return;

        try {
            setDeletingId(keyToDelete);
            if (!accessToken) {
                throw new Error("No access token");
            }
            await deleteApiKey(accessToken, keyToDelete);
            await fetchApiKeys();
            toast({
                title: "Success",
                description: "API key deleted successfully",
            });
        } catch (error) {
            console.error("Failed to delete API key:", error);
            toast({
                title: "Error",
                description: "Failed to delete API key",
                variant: "destructive",
            });
        } finally {
            setDeletingId(null);
            setKeyToDelete(null);
            setShowDeleteDialog(false);
        }
    };

    const copyToClipboard = async (text: string, id?: string) => {
        try {
            await navigator.clipboard.writeText(text);
            if (id) {
                setCopiedId(id);
                setTimeout(() => setCopiedId(null), 2000);
            }
            toast({
                title: "Copied",
                description: "API key copied to clipboard",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to copy to clipboard",
                variant: "destructive",
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };


    useEffect(() => {
        fetchApiKeys();
    }, []);


    return (
        <div className="space-y-6 bg-white text-black">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-[#7678ed]/10 to-[#3B82F6]/10 rounded-lg">
                        <SettingsIcon className="w-6 h-6 text-[#7678ed]" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-black">
                        Settings
                    </h2>
                </div>
                <p className="text-gray-500 mt-1">
                    Manage your account settings and API keys
                </p>
            </motion.div>

            {/* User Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                        <CardTitle className="text-xl text-black">
                            Account Information
                        </CardTitle>
                        <CardDescription>Your account details</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-600">
                                    Wallet Address
                                </span>
                                <div className="flex items-center gap-2">
                                    <code className="px-3 py-1 bg-gray-50 rounded border border-gray-200 text-sm font-mono text-black">
                                        {user?.walletAddress
                                            ? `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`
                                            : "Not connected"}
                                    </code>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-600">
                                    DID Identifier
                                </span>
                                <div className="flex items-center gap-2">
                                    <code className="px-3 py-1 bg-gray-50 rounded border border-gray-200 text-sm font-mono text-black max-w-xs truncate">
                                        {user?.didIdentifier || "N/A"}
                                    </code>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="text-sm font-medium text-gray-600">
                                    Account Status
                                </span>
                                <Badge className="bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 border-emerald-200">
                                    Active
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* API Keys Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <CardTitle className="text-xl text-black flex items-center gap-2">
                                    <Key className="w-5 h-5 text-[#7678ed]" />
                                    API Keys
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Manage your API keys for programmatic access
                                </CardDescription>
                            </div>
                            <Button
                                onClick={handleCreateApiKey}
                                disabled={creating}
                                className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white"
                            >
                                {creating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create API Key
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="flex justify-center items-center py-16 text-gray-600">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7678ed]"></div>
                                <span className="ml-3">Loading API keys...</span>
                            </div>
                        ) : apiKeys.length === 0 ? (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 m-6 text-center">
                                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                                    <Key className="w-full h-full" />
                                </div>
                                <h3 className="text-lg font-medium text-black mb-2">
                                    No API keys found
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Create your first API key to get started with programmatic
                                    access
                                </p>
                                <Button
                                    onClick={handleCreateApiKey}
                                    disabled={creating}
                                    className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create API Key
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="border-b border-gray-200">
                                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                                            <TableHead className="text-black font-medium text-xs uppercase tracking-wider py-4">
                                                API Key
                                            </TableHead>
                                            <TableHead className="text-black font-medium text-xs uppercase tracking-wider">
                                                Created
                                            </TableHead>
                                            <TableHead className="text-black font-medium text-xs uppercase tracking-wider">
                                                Last Updated
                                            </TableHead>
                                            <TableHead className="text-black font-medium text-xs uppercase tracking-wider text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {apiKeys.map((apiKey) => (
                                            <TableRow
                                                key={apiKey.id}
                                                className="hover:bg-blue-50/40 border-b border-gray-200 transition-colors"
                                            >
                                                <TableCell className="py-4">
                                                    <code className="px-3 py-1.5 bg-gray-50 rounded border border-gray-200 text-sm font-mono text-black">
                                                        {apiKey.key}
                                                    </code>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-gray-600">
                                                        {formatDate(apiKey.createdAt)}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-gray-600">
                                                        {formatDate(apiKey.updatedAt)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                                                            className="bg-white text-[#3B82F6] border-[#3B82F640] hover:bg-[#3B82F610] h-8 px-3"
                                                        >
                                                            {copiedId === apiKey.id ? (
                                                                <>
                                                                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                                                                    Copied
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="h-3.5 w-3.5 mr-1.5" />
                                                                    Copy
                                                                </>
                                                            )}
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => confirmDeleteApiKey(apiKey.id)}
                                                            className="bg-white text-red-600 border-red-200 hover:bg-red-50 h-8 px-3"
                                                            disabled={deletingId === apiKey.id}
                                                        >
                                                            {deletingId === apiKey.id ? (
                                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* New API Key Dialog */}
            <AlertDialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
                <AlertDialogContent className="bg-white border-gray-200">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            API Key Created Successfully
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4 pt-4">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-800 font-medium mb-2">
                                    ⚠️ Important: Save this API key now
                                </p>
                                <p className="text-xs text-yellow-700">
                                    This is the only time you&apos;ll see the full API key. Make sure to
                                    copy and store it securely.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Your API Key:
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newApiKey || ""}
                                        readOnly
                                        className="font-mono text-sm bg-gray-50 border-gray-200"
                                    />
                                    <Button
                                        onClick={() => copyToClipboard(newApiKey || "")}
                                        className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => {
                                setShowNewKeyDialog(false);
                                setNewApiKey(null);
                            }}
                            className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white"
                        >
                            I&apos;ve saved my API key
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="bg-white border-gray-200">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            Delete API Key?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this API key? This action cannot be
                            undone and any applications using this key will lose access immediately.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setShowDeleteDialog(false)}
                            className="bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteApiKey}
                            className="bg-red-600 text-white hover:bg-red-700 border-none"
                        >
                            Delete API Key
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
