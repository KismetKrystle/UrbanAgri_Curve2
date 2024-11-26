// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "./IUrbanFarmDLP.sol";
import "./DataLiquidityPoolStorageV1.sol";
import "./VanaDLP.sol";

contract UrbanFarmDLP is
    UUPSUpgradeable,
    PausableUpgradeable,
    Ownable2StepUpgradeable,
    ReentrancyGuardUpgradeable,
    MulticallUpgradeable,
    IUrbanFarmDLP,
    DataLiquidityPoolStorageV1
{
    using SafeERC20 for IERC20;
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

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

    // Storage
    uint256 private nextCommunityId;
    mapping(uint256 => CommunityData) public communities;
    mapping(uint256 => Solution[]) public solutions;
    mapping(uint256 => UserInteraction[]) public userInteractions;
    IERC20 public rewardToken;
    uint256 public communityRewardPerSolution;

    // Constructor
    constructor(
        string memory dlpName,
        string memory description,
        IERC20 _rewardToken,
        uint256 _communityRewardPerSolution
    ) VanaDLP(dlpName, description) {
        rewardToken = _rewardToken;
        communityRewardPerSolution = _communityRewardPerSolution;
    }

    // Initialize function for upgradable contracts
    function initialize(
        string memory dlpName,
        string memory description,
        IERC20 _rewardToken,
        uint256 _communityRewardPerSolution
    ) public onlyInitializing {
        __VanaDLP_init(dlpName, description);
        __UUPSUpgradeable_init();
        __Ownable2Step_init();
        __Pausable_init();
        __ReentrancyGuard_init();
        __MulticallUpgradeable_init();

        rewardToken = _rewardToken;
        communityRewardPerSolution = _communityRewardPerSolution;
    }

    // Store Community Data
    function storeCommunityData(
        string memory geoData,
        string memory demographicData,
        string memory agriculturalData,
        string memory hydroponicData
    ) public {
        nextCommunityId++;
        communities[nextCommunityId] = CommunityData(
            nextCommunityId,
            geoData,
            demographicData,
            agriculturalData,
            hydroponicData
        );

        emit CommunityDataStored(nextCommunityId, msg.sender);
    }

    // Add AI Solution
    function addSolution(
        uint256 communityId,
        string memory aiSolution
    ) public onlyVanaMember {
        require(communities[communityId].id != 0, "Community does not exist");
        solutions[communityId].push(
            Solution(aiSolution, block.timestamp, msg.sender)
        );

        // Distribute community reward for the added solution
        rewardToken.transfer(
            communities[communityId].id,
            communityRewardPerSolution
        );
        emit CommunityRewardDistributed(
            communityId,
            communityRewardPerSolution
        );

        emit SolutionGenerated(communityId, aiSolution, msg.sender);
    }

    // Log User Interaction
    function logUserInteraction(
        uint256 communityId,
        string memory action,
        string memory details
    ) public {
        require(communities[communityId].id != 0, "Community does not exist");
        userInteractions[communityId].push(
            UserInteraction(msg.sender, action, details, block.timestamp)
        );

        emit UserInteractionLogged(communityId, msg.sender, action, details);
    }

    // Submit Feedback
    function submitFeedback(
        uint256 communityId,
        string memory feedback
    ) public {
        require(communities[communityId].id != 0, "Community does not exist");

        emit FeedbackSubmitted(communityId, msg.sender, feedback);
    }

    // Retrieve Solutions
    function getSolutions(
        uint256 communityId
    ) public view returns (Solution[] memory) {
        return solutions[communityId];
    }

    // Retrieve User Interactions
    function getUserInteractions(
        uint256 communityId
    ) public view returns (UserInteraction[] memory) {
        return userInteractions[communityId];
    }

    // Upgradable contract functions
    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}

    function version() external pure virtual override returns (uint256) {
        return 1;
    }
}
