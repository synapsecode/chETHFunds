const hre = require("hardhat");

async function main() {
    const contract = await hre.ethers.deployContract("ChitFund", [2, hre.ethers.parseEther('0.005'), 2]);
    await contract.waitForDeployment();

    console.log(
        `Contract(ChitFund) with deployed to ${contract.target}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});