"use client";

import { Button } from "@/components/ui/button";
import { formatAddress } from "@/lib/utils";
import { injected, useAccount, useConnect, useDisconnect } from "wagmi";

export function TopNav() {
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnectPending } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">P3AI Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {isConnected && (
          <Button
            variant="outline"
            size="default"
            onClick={() => {
              disconnect();
            }}
          >
            {formatAddress(address)}
          </Button>
        )}

        {isConnectPending && <Button variant="outline">Connecting...</Button>}

        {!isConnected && (
          <Button
            variant="outline"
            size="default"
            onClick={() =>
              connect({
                connector: injected(),
              })
            }
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}
