// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract ChitFund {
    //instance variables

    address public contractManager;
    uint public totalFund;
    uint public chitAmount;
    uint public memberSize;
    bool public contractActive;
    uint public monthsRemaining;

    address payable public treasury = payable(0xd676B6EA169226319127FffEA974E13e74f8052e);


    address payable[] public paidMembersList;
    mapping(address => bool) public paidMembers;

    // ===================Events==================
    event NextMonthInvoked(uint remainingMonths);
    event AmountDeposited(address indexed member);
    event FundReceived(address indexed member, uint amount);
    event WithdrawActionComplete();


    constructor(
        uint _memberSize,
        uint _chitAmount, //In Wei
        uint _numMonths
    ) {
        contractManager = msg.sender; //The Contract Publisher is the Manager
        require(_numMonths == _memberSize, 'MONTH_MEMBER_MISMATCH');
        chitAmount = _chitAmount;
        memberSize = _memberSize;
        totalFund = chitAmount * memberSize;
        contractActive = true;
        monthsRemaining = _numMonths;
    }

    function getBalance() active public view returns(uint){
        return address(this).balance;
    }

    function initializeForNextMonth() active internal {
        monthsRemaining = monthsRemaining - 1; //Reduce the Number of Months
        for(uint i=0; i<paidMembersList.length; i++){
            paidMembers[paidMembersList[i]] = false;
        }
        delete paidMembersList;
        emit NextMonthInvoked(monthsRemaining);
        if(monthsRemaining == 0){
            contractActive = false;
        }
    }

    function depositChit() active public payable {
        require(msg.value == chitAmount, 'DEPOSIT_MISMATCH');
        require(paidMembers[msg.sender] == false, 'ALREADY_DEPOSITED');
        require(paidMembersList.length < memberSize, "MAX_MEMBERS_REACHED");
        paidMembers[msg.sender] = true;
        paidMembersList.push(payable(msg.sender));
        emit AmountDeposited(msg.sender);
    }

    function withdraw(
        address payable _beneficiary,
        uint _bidAmount
    ) active public  {
        uint balance = address(this).balance;
        // require(balance == totalFund, 'CHITFUND_INCOMPLETE');
        uint commission = balance * 2/100;  //2% Commission
        uint payableToBeneficiary = (balance - commission - _bidAmount);
        uint payableToAll = (_bidAmount / memberSize);
        _beneficiary.transfer(payableToBeneficiary); //Pay Beneficiary
        emit FundReceived(_beneficiary, payableToBeneficiary);
        treasury.transfer(commission); //Send Commission to Treasury
        for(uint i=0; i<paidMembersList.length; i++){
            address payable member = paidMembersList[i];
            member.transfer(payableToAll); //Send SplitBidValue to Everyone
            emit FundReceived(member, payableToAll);
        }
        emit WithdrawActionComplete();
        initializeForNextMonth(); //Initialize for Next Month
    }


    // =============== Modifiers ===============

    modifier active {
        require(contractActive, 'CHITFUND_INACTIVE');
        _;
    }
}