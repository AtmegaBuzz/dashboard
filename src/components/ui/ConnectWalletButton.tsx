"use client"; // Ensure this is a client-side component in Next.js



import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { arbitrumSepolia } from "viem/chains";

const ConnectWalletButton: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors, error } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <div className="w-full flex items-center justify-between">
          <p className="h-full py-2 px-2 mx-3 rounded-md bg-gray-800">{address}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>

          {
            connectors.map(
              (connector) => {

                if (connector.name === "MetaMask") {
                  return (
                    <button
                      key={connector.id}
                      className="px-4 py-2 bg-gray-800 text-white rounded font-bold"
                      onClick={() => connect({ connector, chainId: arbitrumSepolia.id })}
                    >
                      Connect Wallet
                    </button>
                  )
                }
              }

            )

          }

          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
