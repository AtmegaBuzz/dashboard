// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract P3AIDIDRegistry {
    // Struct to store DID information
    struct DIDDocument {
        string documentHash;        // The DID document stored as a JSON string
        address controller;     // The address that controls this DID
        address creator;        // The address that created this DID
        uint256 timestamp;     // Last update timestamp
        bool active;           // Whether the DID is active
        bool isAIAgent;        // Whether this DID belongs to an AI agent
        bool isVerified;       // Whether the DID is verified by a delegate
    }
    
    // Registry state variables
    mapping(string => DIDDocument) private didDocuments;
    mapping(address => string[]) private userAIAgents;
    mapping(address => bool) private registeredUsers;
    mapping(address => bool) private approvedDelegates;

    address[] private allUsers;

    
    // Owner of the registry
    address public owner;
    
    // Events
    event UserDIDRegistered(string indexed did, address indexed controller);
    event UserDIDVerified(string indexed did, address indexed verifier);
    event AIAgentDIDRegistered(string indexed did, address indexed agentAddress, address indexed creator);
    event DelegateAdded(address indexed delegate);
    event DelegateRemoved(address indexed delegate);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyDelegate() {
        require(approvedDelegates[msg.sender], "Only approved delegates can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        approvedDelegates[msg.sender] = true; // Owner is automatically a delegate
    }
    
    function registerUserDID(string memory documentHash) public {
        // 1. Add validation for document size
        require(bytes(documentHash).length > 0 && bytes(documentHash).length <= 256, "Invalid document size");
        
        // 2. Check if msg.sender is not zero address
        require(msg.sender != address(0), "Invalid sender");
        
        // 3. Check if user is not already registered
        require(!registeredUsers[msg.sender], "User already registered");
        
        // 4. Generate DID first and check if it doesn't exist
        string memory did = generateUserDID(msg.sender);
        require(didDocuments[did].controller == address(0), "DID already exists");
        
        // 5. Create DID document with memory struct first
        DIDDocument memory newDoc = DIDDocument({
            documentHash: documentHash,
            controller: msg.sender,
            creator: msg.sender,
            timestamp: block.timestamp,
            active: true,
            isAIAgent: false,
            isVerified: false
        });
        
        // 6. Update state variables in order
        didDocuments[did] = newDoc;
        registeredUsers[msg.sender] = true;
        allUsers.push(msg.sender);
        
        // 7. Emit event at the end
        emit UserDIDRegistered(did, msg.sender);
    }
    
    /**
     * @dev Verify a user's DID - only callable by delegates
     * @param userAddress The address of the user to verify
     */
    function verifyUserDID(address userAddress) public onlyDelegate {
        require(registeredUsers[userAddress], "User not registered");
        
        string memory did = generateUserDID(userAddress);
        require(!didDocuments[did].isVerified, "DID already verified");
        
        didDocuments[did].isVerified = true;
        didDocuments[did].timestamp = block.timestamp;
        
        emit UserDIDVerified(did, msg.sender);
    }
    

    function registerAIAgentDID(address agentAddress, string memory documentHash) public {
        string memory userDID = generateUserDID(msg.sender);
        require(didDocuments[userDID].isVerified, "User DID must be verified to register AI agents");
        require(agentAddress != address(0), "Invalid agent address");
        
        string memory did = generateAIAgentDID(agentAddress);
        require(didDocuments[did].controller == address(0), "Agent DID already registered");
        
        didDocuments[did] = DIDDocument({
            documentHash: documentHash,
            controller: msg.sender,    // User is the controller of AI agent
            creator: msg.sender,
            timestamp: block.timestamp,
            active: true,
            isAIAgent: true,
            isVerified: true          // Auto-verified since user is verified
        });
        
        userAIAgents[msg.sender].push(did);
        emit AIAgentDIDRegistered(did, agentAddress, msg.sender);
    }
    
    /**
     * @dev Add a new delegate
     * @param delegate Address to add as delegate
     */
    function addDelegate(address delegate) public onlyOwner {
        require(!approvedDelegates[delegate], "Already a delegate");
        approvedDelegates[delegate] = true;
        emit DelegateAdded(delegate);
    }
    
    /**
     * @dev Remove a delegate
     * @param delegate Address to remove as delegate
     */
    function removeDelegate(address delegate) public onlyOwner {
        require(delegate != owner, "Cannot remove owner as delegate");
        require(approvedDelegates[delegate], "Not a delegate");
        approvedDelegates[delegate] = false;
        emit DelegateRemoved(delegate);
    }
    
    /**
     * @dev Resolve a DID to get its document
     * @param did The DID to resolve
     */
    function resolveDID(string memory did) public view returns (
        string memory document,
        address controller,
        address creator,
        uint256 timestamp,
        bool active,
        bool isAIAgent,
        bool isVerified
    ) {
        DIDDocument memory didDoc = didDocuments[did];
        require(didDoc.controller != address(0), "DID does not exist");
        
        return (
            didDoc.documentHash,
            didDoc.controller,
            didDoc.creator,
            didDoc.timestamp,
            didDoc.active,
            didDoc.isAIAgent,
            didDoc.isVerified
        );
    }
    
    /**
     * @dev Get all AI agents registered by a user
     * @param user The user's address
     */
    function getUserAIAgents(address user) public view returns (string[] memory) {
        return userAIAgents[user];
    }
    
    /**
     * @dev Check if a user is verified
     * @param userAddress The address to check
     */
    function isUserVerified(address userAddress) public view returns (bool) {
        string memory did = generateUserDID(userAddress);
        return didDocuments[did].isVerified;
    }

    /**
     * @dev Fetch all the unverified users
    */
    function getUnverifiedUsers() public  view returns (address[] memory) {
        uint256 unverifiedCount = 0;

        for (uint256 i = 0; i < allUsers.length; i++) {
            if (!isUserVerified(allUsers[i])) {
                unverifiedCount++;
            }
        }

        address[] memory unverifiedUsers = new address[](unverifiedCount);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < allUsers.length; i++) {
            if (!isUserVerified(allUsers[i])) {
                unverifiedUsers[currentIndex] = allUsers[i];
                currentIndex++;
            }
        }

        return unverifiedUsers;

    }

    function getTotalUsers() public view returns (uint256) {
        return allUsers.length;
    }
    
    /**
     * @dev Check if an address is a delegate
     * @param delegate The address to check
     */
    function isDelegate(address delegate) public view returns (bool) {
        return approvedDelegates[delegate];
    }
    
    // Helper functions for DID generation
    function generateUserDID(address userAddress) internal pure returns (string memory) {
        return string(abi.encodePacked("did:p3ai:user:", toHexString(userAddress)));
    }
    
    function generateAIAgentDID(address agentAddress) internal pure returns (string memory) {
        return string(abi.encodePacked("did:p3ai:agent:", toHexString(agentAddress)));
    }
    
    function toHexString(address addr) internal pure returns (string memory) {
        bytes memory buffer = new bytes(40);
        for(uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(addr)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            buffer[2*i] = char(hi);
            buffer[2*i+1] = char(lo);
        }
        return string(buffer);
    }
    
    function char(bytes1 b) internal pure returns (bytes1) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}