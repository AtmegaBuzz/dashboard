import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  Copy,
  Maximize2
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// Utility function to format DID
const formatDID = (did: string) => {
  if (did.length <= 20) return did;
  return `${did.slice(0, 10)}...${did.slice(-10)}`;
};

// Utility function to format timestamp to readable date
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Determine credential status
const getCredentialStatus = (revoked: boolean, expirationDate: string) => {
  const currentDate = new Date();
  const expDate = new Date(expirationDate);

  if (revoked) return 'revoked';
  if (currentDate > expDate) return 'expired';
  return 'active';
};

// Status configuration
const statusConfig = {
  active: {
    color: 'from-[#3B82F6] to-[#06B6D4]',
    icon: ShieldCheck,
    iconColor: 'text-green-500',
    text: 'Active'
  },
  expired: {
    color: 'from-[#F59E0B] to-[#D97706]',
    icon: ShieldAlert,
    iconColor: 'text-yellow-500',
    text: 'Expired'
  },
  revoked: {
    color: 'from-[#EF4444] to-[#DC2626]',
    icon: ShieldX,
    iconColor: 'text-red-500',
    text: 'Revoked'
  }
};

export const CredentialCard = ({
  credential,
  index
}: {
  credential: any,
  index: number
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract relevant information
  const {
    id,
    revoked,
    vc: {
      expirationDate,
      issuanceDate,
      credentialSubject,
      issuer,
      type: credentialType
    }
  } = credential;

  const status = getCredentialStatus(revoked, expirationDate);
  const { color, icon: StatusIcon, iconColor, text } = statusConfig[status];

  const handleCopyDID = () => {
    navigator.clipboard.writeText(credentialSubject.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(credential, null, 2));
  };

  return (
    <>
      <TooltipProvider>
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1
          }}
          className="group w-full max-w-[500px]"
        >
          <Card
            className={`
              relative overflow-hidden border-none 
              bg-gradient-to-br ${color} 
              text-white shadow-xl transform transition-all 
              hover:-translate-y-2 hover:shadow-2xl
              w-full
            `}
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                  linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)
                `,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Card Content */}
            <CardContent className="relative p-6 pb-0">
              <div className="flex items-center space-x-3 mb-4">
                <StatusIcon className={`w-8 h-8 ${iconColor}`} />
                <h3 className="text-lg font-semibold">
                  {credentialSubject.type}
                </h3>
              </div>

              <div className="space-y-3 text-white/90">
                <div>
                  <span className="text-xs opacity-70 block mb-1">Issuer</span>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium flex-grow truncate text-left">
                          {formatDID(issuer)}
                        </p>
                        <button
                          onClick={handleCopyDID}
                          className="hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          <Copy
                            className={`w-4 h-4 ${copied ? 'text-green-300' : 'text-white/70'}`}
                          />
                        </button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-black text-white max-w-[300px] break-words"
                    >
                      {issuer}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div>
                  <span className="text-xs opacity-70 block mb-1">Issued To</span>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium flex-grow truncate text-left">
                          {formatDID(credentialSubject.id)}
                        </p>
                        <button
                          onClick={handleCopyDID}
                          className="hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          <Copy
                            className={`w-4 h-4 ${copied ? 'text-green-300' : 'text-white/70'}`}
                          />
                        </button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-black text-white max-w-[300px] break-words"
                    >
                      {credentialSubject.id}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs opacity-70 block mb-1">Issued At</span>
                    <p className="font-medium text-left">{formatDate(issuanceDate)}</p>
                  </div>
                  <div>
                    <span className="text-xs opacity-70 block mb-1">Valid Until</span>
                    <p className="font-medium text-left">{formatDate(expirationDate)}</p>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="relative p-4 pt-0 flex justify-between items-center">
              <Badge
                variant="outline"
                className={`
                  text-white border-white/30 
                  ${status === 'active' ? 'bg-white/20' :
                    status === 'expired' ? 'bg-yellow-500/20' :
                      'bg-red-500/20'}
                `}
              >
                {text}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDetailsOpen(true)}
                className="
                  border-white/30 text-white 
                  hover:bg-white hover:text-black 
                  transition-colors
                "
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </TooltipProvider>

      {/* JSON Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Credential Details
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyJSON}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" /> Copy JSON
              </Button>
            </DialogTitle>
            <DialogDescription>
              Detailed information about the credential
            </DialogDescription>
          </DialogHeader>

          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm text-black">
            <code>
              {JSON.stringify(credential, null, 2)}
            </code>
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CredentialCard;