// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Flexi {
    struct Customer_Scheme {
        string customerName;
        address customerAddress;
        string jewellerName;
        address jewellerAddress;
        string schemeName;
       
        uint256 totalSchemeAmount;
        uint256 balance;
        uint256[] payments;
    }

    
   
    mapping(bytes32 => uint256) public customerSchemeIndexes;
    Customer_Scheme[] public customerSchemes;
    
    function addCustomerScheme(
        string memory _customerName,
        address _customerAddress,
        string memory _jewellerName,
        address _jewellerAddress,
        string memory _schemeName,
       
        uint256 _totalSchemeAmount
    ) public {
        bytes32 key = keccak256(abi.encodePacked(_customerName, _schemeName,_jewellerName));
        require(customerSchemeIndexes[key] == 0, "Customer scheme already exists.");
      
       
       
        customerSchemeIndexes[key] = customerSchemes.length + 1;
        customerSchemes.push(
            Customer_Scheme({
                customerName: _customerName,
                customerAddress: _customerAddress,
                jewellerName: _jewellerName,
                jewellerAddress: _jewellerAddress,
                schemeName: _schemeName,
               
                totalSchemeAmount: _totalSchemeAmount,
                balance: _totalSchemeAmount,
                payments: new uint256[](0)
            })
        );
    }
    function getBalance(address) public view returns(uint256 result){
        result =address(this).balance;
    }
    
}