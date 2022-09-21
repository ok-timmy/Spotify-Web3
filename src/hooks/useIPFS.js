export const useIPFS = () => {
    const resolveLink = (url) => {
        if (!url  || !url.includes("https://ipfs.io/ipfs")) return url;
        return url.replace("https://infura-ipfs.io/ipfs", "https://ipfs.io/ipfs")
    }
    return {resolveLink}
}