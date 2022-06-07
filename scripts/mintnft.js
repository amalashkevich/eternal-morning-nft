import { ethers } from "hardhat";

const {
  NFT_CONTRACT_ADDRESS,
  TOKEN_ID,
  WALLET_ADDRESSES,
} = require("../data/participants");

function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayInms);
  });
}

async function main() {
  const ContractFactory = await ethers.getContractFactory("AssetContractShared");
  const contract = await ContractFactory.attach(NFT_CONTRACT_ADDRESS)

  for (const [i, _to] of WALLET_ADDRESSES.entries()) {
    await contract.mint(_to, TOKEN_ID, 1, ethers.utils.formatBytes32String(""));
    console.log(`minted to ${_to} (${i + 1} of ${WALLET_ADDRESSES.length})`);
    await delay(500);
  }

  console.log(`Minted ${WALLET_ADDRESSES.length} NFTs`);
  console.log("Have a nice day.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
