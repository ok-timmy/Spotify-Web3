
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
        "0x5F1FB2Ea9eBCddffFFF6CFD1a560b9325cBE9C0A"
        // "0xAE6b08da0fa2273c502bDc8a23d39Aee8992B8a4"     // Polygon
        //  "0x2c59F8582cfDf4cb227507044FA9a6009C1AB57F"  //Polygon
      );

      return musicStoreContract;
 }