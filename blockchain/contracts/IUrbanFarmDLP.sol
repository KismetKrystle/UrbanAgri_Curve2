// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IDataLiquidityPool.sol";

interface IUrbanFarmDLP is IDataLiquidityPool {
    // Events
    event CommunityDataStored(
        uint256 indexed communityId,
        address indexed user
    );
    event SolutionGenerated(
        uint256 indexed communityId,
        string aiSolution,
        address indexed user
    );
    event UserInteractionLogged(
        uint256 indexed communityId,
        address indexed user,
        string action,
        string details
    );
    event FeedbackSubmitted(
        uint256 indexed communityId,
        address indexed user,
        string feedback
    );
    event CommunityRewardDistributed(
        uint256 indexed communityId,
        uint256 amount
    );

    // Structs
    struct CommunityData {
        uint256 id;
        string geoData;
        string demographicData;
        string agriculturalData;
        string hydroponicData;
    }

    struct Solution {
        string description;
        uint256 timestamp;
        address submitter;
    }

    struct UserInteraction {
        address user;
        string action;
        string details;
        uint256 timestamp;
    }

    // Functions
    function storeCommunityData(
        string memory geoData,
        string memory demographicData,
        string memory agriculturalData,
        string memory hydroponicData
    ) external;

    function addSolution(
        uint256 communityId,
        string memory aiSolution
    ) external;

    function logUserInteraction(
        uint256 communityId,
        string memory action,
        string memory details
    ) external;

    function submitFeedback(
        uint256 communityId,
        string memory feedback
    ) external;

    function getSolutions(
        uint256 communityId
    ) external view returns (Solution[] memory);

    function getUserInteractions(
        uint256 communityId
    ) external view returns (UserInteraction[] memory);

    function rewardToken() external view returns (IERC20);

    function communityRewardPerSolution() external view returns (uint256);
}
