// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlexiScheme {
    // Structure to hold scheme details
    struct Scheme {
        string jewellerName;
        string schemeName;
        uint totalAmount;
        uint monthlyAmount;
        uint paidMonths;
        bool isActive;
        bool isGoldWithdrawalRequested;
        bool isGoldWithdrawn;
        address[] customer;
    }

    // Mapping to keep track of schemes using a unique identifier
    mapping(uint => Scheme) public schemes;

    // Mapping to keep track of schemes using jeweller name
    mapping(string => mapping(uint => Scheme)) public schemesByJeweller;

    // Unique identifier for each scheme
    uint private schemeId = 0;

    // Event to emit after a successful payment
    event PaymentReceived(uint indexed schemeId, string jewellerName, address indexed customer, uint monthlyAmount, uint paidMonths);

    // Event to emit after a gold withdrawal request is made
    event GoldWithdrawalRequested(uint indexed schemeId, string jewellerName, address indexed customer);

    // Event to emit after a gold withdrawal is completed
    event GoldWithdrawn(uint indexed schemeId, string jewellerName, address indexed customer);

    // Function to create a new scheme
    function createScheme(string memory _jewellerName,string memory _schemeName, uint _totalAmount, uint _monthlyAmount) public returns (uint) {
        // Increment the schemeId
        schemeId++;

        // Create a new scheme with the provided details
        schemes[schemeId] = Scheme({
            jewellerName: _jewellerName,
            schemeName:_schemeName,
            totalAmount: _totalAmount,
            monthlyAmount: _monthlyAmount,
            paidMonths: 0,
            isActive: true,
            isGoldWithdrawalRequested: false,
            isGoldWithdrawn: false,
            customer: new address[](0)
        });

        // Map the scheme to the respective jeweller
        schemesByJeweller[_jewellerName][schemeId] = schemes[schemeId];

        // Return the unique identifier for the new scheme
        return schemeId;
    }

    // Function to make a payment for a scheme
    function makePayment(uint _schemeId) public payable {
        // Get the scheme details using the provided schemeId
        Scheme storage scheme = schemes[_schemeId];

        // Ensure that the scheme is active and the customer has not withdrawn gold
        require(scheme.isActive, "Scheme is not active");
        require(!scheme.isGoldWithdrawn, "Gold has already been withdrawn");

        // Ensure that the payment amount is equal to the monthly amount
        require(msg.value == scheme.monthlyAmount, "Incorrect payment amount");

        // Ensure that the customer has not paid for all months already
        require(scheme.paidMonths < 11, "All payments have been made");

        // Update the paid months for the scheme
        scheme.paidMonths++;

         if (!contains(scheme.customer, msg.sender)) {
            scheme.customer.push(msg.sender);
        }


        // Set the customer's address for the scheme if it is not set yet
        // if (scheme.customer == address(0)) {
        //     scheme.customer = msg.sender;
        // }

        // Emit the payment received event
        emit PaymentReceived(_schemeId, scheme.jewellerName, msg.sender, scheme.monthlyAmount, scheme.paidMonths);

        // If the customer has paid for 3 months, request for gold withdrawal
        if (scheme.paidMonths == 3) {
            scheme.isGoldWithdrawalRequested = true;

                 // Emit the gold withdrawal requested event
     emit GoldWithdrawalRequested(_schemeId, scheme.jewellerName, msg.sender);
 }
    }

    function contains(address[] memory arr, address item) internal pure returns (bool) {
    for (uint i = 0; i < arr.length; i++) {
        if (arr[i] == address(item)) {
            return true;
        }
    }
    return false;
}
function withdrawGold(uint _schemeId) public {
    // Get the scheme details using the provided schemeId
    Scheme storage scheme = schemes[_schemeId];

    // Ensure that the scheme is active and the customer has requested for gold withdrawal
    require(scheme.isActive, "Scheme is not active");
    require(scheme.isGoldWithdrawalRequested, "Gold withdrawal has not been requested");

    // Ensure that the customer requesting gold withdrawal is in the customer array
    require(contains(scheme.customer, msg.sender), "Unauthorized access");

    // Remove the customer who requested gold withdrawal from the customer array
    for (uint i = 0; i < scheme.customer.length; i++) {
        if (scheme.customer[i] == msg.sender) {
            scheme.customer[i] = scheme.customer[scheme.customer.length - 1];
            scheme.customer.pop();
            break;
        }
    }

    // If all customers have withdrawn gold, mark the scheme as inactive
    if (scheme.customer.length == 0) {
        scheme.isActive = false;
    }

    // Mark the customer's gold withdrawal as complete
    scheme.isGoldWithdrawn = true;

    // Emit the gold withdrawn event
    emit GoldWithdrawn(_schemeId, scheme.jewellerName, msg.sender);
}


}


