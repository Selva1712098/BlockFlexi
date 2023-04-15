const { ethers } = require('hardhat');
const { writeFileSync } = require('fs');

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

async function main() {
  const BlockFlexi = await deploy('FlexiScheme');
  console.log("BlockFlexi deployed to:", BlockFlexi.address);
  
  writeFileSync('output.json', JSON.stringify({
    BlockFlexi: BlockFlexi.address,
   
  }, null, 2));

}
if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}