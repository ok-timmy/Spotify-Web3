require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "polygon",
  networks: {
     hardhat: {},
      polygon: {
        url : ` ${process.env.NODE_POLYGON_URL}`,
        accounts: [`${process.env.PRIVATE_KEY}`]
     }
  },

};
