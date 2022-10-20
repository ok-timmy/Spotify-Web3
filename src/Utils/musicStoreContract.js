
import musicStoreJSON from "../contract_abi/MusicStore.json";
 var Contract = require("web3-eth-contract");
 
 const web3 = window.web3;

 const musicStoreABI = musicStoreJSON.abi;

 export const musicweb3Contract = async() => {
    await Contract.setProvider(
        // "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"
        "https://polygon-mumbai.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"
      );
      const musicStoreContract = await new web3.eth.Contract(
        musicStoreABI,
         "0x8133D83fBa966e982ab4b0E154fA4BB7e09f3ca1"  //Polygon
        // "0xaCA2672f59B48C862c2d4D8AD88FC5c5A969E43B"
      );

      return musicStoreContract;
 }