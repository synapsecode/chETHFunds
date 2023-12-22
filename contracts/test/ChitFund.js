// Import necessary modules from Hardhat
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Define some constants
const CHIT_AMOUNT = ethers.parseEther("1"); // 1 Ether in Wei

// Hardhat test suite
describe("ChitFund Contract", function () {
    let chitFund;
    let owner;
    let member1;
    let member2;

    // Deploy the contract before each test
    beforeEach(async function () {
        [owner, member1, member2] = await ethers.getSigners();
        const ChitFund = await ethers.getContractFactory("ChitFund");
        chitFund = await ChitFund.deploy(2, CHIT_AMOUNT, 2);
    });

    // Test case 1: Contract initialization
    it("Should initialize the contract correctly", async function () {
        expect(await chitFund.contractManager()).to.equal(owner.address);
        expect(await chitFund.totalFund()).to.equal(CHIT_AMOUNT * 2n);
        expect(await chitFund.chitAmount()).to.equal(CHIT_AMOUNT);
        expect(await chitFund.memberSize()).to.equal(2);
        expect(await chitFund.contractActive()).to.equal(true);
        expect(await chitFund.monthsRemaining()).to.equal(2);
    });

    // Test case 2: Member deposits chit
    it("Should allow members to deposit chit", async function () {
        await chitFund.connect(member1).depositChit({ value: CHIT_AMOUNT });
        const paidMembers = await chitFund.paidMembers(member1.address);
        expect(paidMembers).to.equal(true);
    });

    // The Remaining Manual Testcases are tested on remix
});
