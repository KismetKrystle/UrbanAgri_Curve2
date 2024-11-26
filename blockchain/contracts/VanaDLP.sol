// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

contract VanaDLP is
    UUPSUpgradeable,
    PausableUpgradeable,
    Ownable2StepUpgradeable,
    ReentrancyGuardUpgradeable,
    MulticallUpgradeable
{
    string public name;
    string public description;

    constructor(string memory _name, string memory _description) {
        name = _name;
        description = _description;
    }

    function __VanaDLP_init(string memory _name, string memory _description) internal onlyInitializing {
        __UUPSUpgradeable_init();
        __Ownable2Step_init();
        __Pausable_init();
        __ReentrancyGuard_init();
        __MulticallUpgradeable_init();

        name = _name;
        description = _description;
    }

    modifier onlyVanaMember() {
        // Add your logic to check if the caller is a Vana member
        _;
    }

    function _authorizeUpgrade(address newImplementation) internal virtual override onlyOwner {}

    function version() external pure virtual override returns (uint256) {
        return 1;
    }
}
