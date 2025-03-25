import { UserResponse, VCResponse } from "@/apis/registry/types";
import {atom} from "jotai";
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import { AbiItem } from "web3-utils";

export const contractAtom = atom<Contract<AbiItem[]> | null>(null);
export const web3Atom = atom<Web3 | null>(null);
export const accessTokenAtom = atom<string | null>(null);
export const userAtom = atom<UserResponse | null>(null);

export const userCredsAtom = atom<VCResponse[]>([]);
