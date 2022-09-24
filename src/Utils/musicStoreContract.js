
import musicStoreJSON from "../contract_abi/MusicStore.json";
 var Contract = require("web3-eth-contract");
 
 const web3 = window.web3;

 const musicStoreABI = musicStoreJSON.abi;

 export const musicweb3Contract = async() => {
    await Contract.setProvider(
        "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"
      );
      const musicStoreContract = await new web3.eth.Contract(
        musicStoreABI,
        // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
        "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
      );

      return musicStoreContract;
 }