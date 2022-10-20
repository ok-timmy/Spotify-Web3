import Web3 from "web3";

window.web3 = new Web3(window.ethereum);
const web3 = window.web3;

export const toWei = (num) => web3.utils.toWei(num, "ether");
export const fromWei = (num) => web3.utils.fromWei(num, "ether");

export const toBytes = (name) => web3.utils.utf8ToHex(name);

export const toString = (bytesValue) => web3.utils.hexToUtf8(bytesValue);
