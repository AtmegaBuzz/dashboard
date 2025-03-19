import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ethers } from "ethers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function verifyMessage(
  message: string,
  signature: string,
  address: string
) {
  // Recover the address that signed the message
  const recoveredAddress = ethers.verifyMessage(message, signature);

  // Compare the recovered address with the expected address
  if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

export const sha256Hash = async (input: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

/**
 * Formats an Ethereum address to show only the first and last few characters
 * @param address The full Ethereum address
 * @param firstChars Number of characters to show at the beginning (default: 6)
 * @param lastChars Number of characters to show at the end (default: 4)
 * @returns The formatted address with ellipsis in the middle
 */
export function formatAddress(
  address: string | undefined,
  firstChars: number = 6,
  lastChars: number = 4
): string {
  if (!address) return "";

  // Check if the address is valid
  if (address.length < firstChars + lastChars) {
    return address;
  }

  const start = address.substring(0, firstChars);
  const end = address.substring(address.length - lastChars);

  return `${start}...${end}`;
}
