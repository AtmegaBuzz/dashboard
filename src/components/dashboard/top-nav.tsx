"use client";
import { getMe } from "@/apis/registry";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { formatAddress } from "@/lib/utils";
import { accessTokenAtom, userAtom, userCredsAtom } from "@/store/global.store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { User, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function TopNav() {
  const { address, isConnected } = useAccount();
  const [authToken, setAuthToken] = useAtom(accessTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [, setUserUserCreds] = useAtom(userCredsAtom);
  const router = useRouter();

  useEffect(() => {
    const getMyself = async () => {
      if (isConnected && authToken) {
        try {
          const fetchedUser = await getMe(authToken);

          setUserUserCreds(fetchedUser.credentials);
          setUser(fetchedUser.user);
        } catch (error) {
          console.error("Failed to fetch user info", error);
        }
      }
    };

    getMyself();
  }, [isConnected, authToken, setUser]);

  const handleLogout = () => {
    setAuthToken(null);
  };


  useEffect(() => {

    if (authToken === null) {
      router.push("/")
    }

  }, [authToken])

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-xl font-bold">Zynd Dashboard</div>

      {isConnected && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-auto">
              {formatAddress(address)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[700px] mr-5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {user && (
              <>
                <DropdownMenuItem disabled>
                  <User className="mr-2 h-4 w-4" />
                  <p>{user.didIdentifier || 'User'}</p>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <span className="mr-2">Wallet:</span>
                  <span>{user.walletAddress}</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <span className="mr-2">Connection:</span>
                  <span>{user.connectionString || "Nil"}</span>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}