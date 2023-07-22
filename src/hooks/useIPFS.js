 const useIPFS = () => {
    const resolveLink = (url) => {
        if(!url) return;
        if (url.includes("https://spotify-web3.infura-ipfs.io/ipfs")) return url;
        return url.replace("https://infura-ipfs.io/ipfs", "https://spotify-web3.infura-ipfs.io/ipfs");
    }
    return {resolveLink}
}

export default useIPFS;