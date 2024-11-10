import {atom} from "jotai";
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import { AbiItem } from "web3-utils";

export const contractAtom = atom<Contract<AbiItem[]> | null>(null);
export const web3Atom = atom<Web3 | null>(null);