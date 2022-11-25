// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Greeter {
    string constant GREETING = "Hello, CryptoWorld";

    function greet() public pure returns (string memory) {
        return GREETING;
    }
}
