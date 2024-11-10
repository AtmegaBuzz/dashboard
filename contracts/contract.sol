// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract P3AIDIDRegistry {
    // Struct to store DID information
    struct DIDDocument {
        string document;        // The DID document stored as a JSON string
        address controller;     // The address that controls this DID
        address creator;        // The address that created this DID (important for AI agents)
        uint256 timestamp;     // Last update timestamp
        bool active;           // Whether the DID is active
        bool isAIAgent;        // Whether this DID belongs to an AI agent
    }
    
    // Mapping from DID string to DID Document
    mapping(string => DIDDocument) private didDocuments;
    
    // Mapping to track user's AI agents
    mapping(address => string[]) private userAIAgents;
    
    // Mapping to track if an address has a registered user DID
    mapping(address => bool) private registeredUsers;
    
    // Mapping to track delegated controllers for DIDs
    mapping(string => mapping(address => bool)) private delegates;
    
    // Events
    event UserDIDRegistered(string indexed did, address controller);
    event AIAgentDIDRegistered(string indexed did, address agentAddress, address creator);
    event DIDUpdated(string indexed did, address updater);
    event DIDDeactivated(string indexed did);
    event DelegateAdded(string indexed did, address delegate);
    event DelegateRemoved(string indexed did, address delegate);
    
    // Modifiers
    modifier onlyController(string memory did) {
        require(
            didDocuments[did].controller == msg.sender || delegates[did][msg.sender],
            "Not authorized to modify this DID"
        );
        _;
    }
    
    modifier didExists(string memory did) {
        require(didDocuments[did].controller != address(0), "DID does not exist");
        _;
    }
    
    modifier didActive(string memory did) {
        require(didDocuments[did].active, "DID is not active");
        _;
    }

    modifier onlyRegisteredUser() {
        require(registeredUsers[msg.sender], "Must be a registered user");
        _;
    }
    
    /**
     * @dev Register a new user DID
     * @param document The DID document as a JSON string
     */
    function registerUserDID(string memory document) public {
        require(!registeredUsers[msg.sender], "User already registered");
        
        string memory did = generateUserDID(msg.sender);
        
        didDocuments[did] = DIDDocument({
            document: document,
            controller: msg.sender,
            creator: msg.sender,
            timestamp: block.timestamp,
            active: true,
            isAIAgent: false
        });
        
        registeredUsers[msg.sender] = true;
        emit UserDIDRegistered(did, msg.sender);
    }
    
    /**
     * @dev Register a new AI agent DID
     * @param agentAddress The address/public key of the AI agent
     * @param document The DID document as a JSON string
     */
    function registerAIAgentDID(address agentAddress, string memory document) 
        public 
        onlyRegisteredUser 
    {
        require(agentAddress != address(0), "Invalid agent address");
        
        string memory did = generateAIAgentDID(agentAddress);
        require(didDocuments[did].controller == address(0), "Agent DID already registered");
        
        didDocuments[did] = DIDDocument({
            document: document,
            controller: agentAddress,
            creator: msg.sender,
            timestamp: block.timestamp,
            active: true,
            isAIAgent: true
        });
        
        userAIAgents[msg.sender].push(did);
        emit AIAgentDIDRegistered(did, agentAddress, msg.sender);
    }
    
    /**
     * @dev Update an existing DID document
     * @param did The DID to update
     * @param newDocument The new DID document
     */
    function updateDID(string memory did, string memory newDocument) 
        public 
        didExists(did) 
        didActive(did) 
        onlyController(did) 
    {
        didDocuments[did].document = newDocument;
        didDocuments[did].timestamp = block.timestamp;
        
        emit DIDUpdated(did, msg.sender);
    }
    
    /**
     * @dev Add a delegate for a DID
     * @param did The DID to add a delegate for
     * @param delegate The address to add as a delegate
     */
    function addDelegate(string memory did, address delegate) 
        public 
        didExists(did) 
        didActive(did) 
        onlyController(did) 
    {
        require(delegate != address(0), "Invalid delegate address");
        require(!delegates[did][delegate], "Already a delegate");
        
        delegates[did][delegate] = true;
        
        emit DelegateAdded(did, delegate);
    }
    
    /**
     * @dev Remove a delegate for a DID
     * @param did The DID to remove a delegate from
     * @param delegate The address to remove as a delegate
     */
    function removeDelegate(string memory did, address delegate) 
        public 
        didExists(did) 
        didActive(did) 
        onlyController(did) 
    {
        require(delegates[did][delegate], "Not a delegate");
        
        delegates[did][delegate] = false;
        
        emit DelegateRemoved(did, delegate);
    }
    
    /**
     * @dev Deactivate a DID
     * @param did The DID to deactivate
     */
    function deactivateDID(string memory did) 
        public 
        didExists(did) 
        didActive(did) 
        onlyController(did) 
    {
        didDocuments[did].active = false;
        
        emit DIDDeactivated(did);
    }
    
    /**
     * @dev Resolve a DID to get its document
     * @param did The DID to resolve
     * @return document The DID document
     * @return controller The controller address
     * @return creator The creator address
     * @return timestamp Last update timestamp
     * @return active Whether the DID is active
     * @return isAIAgent Whether this is an AI agent DID
     */
    function resolveDID(string memory did) 
        public 
        view 
        returns (
            string memory document,
            address controller,
            address creator,
            uint256 timestamp,
            bool active,
            bool isAIAgent
        ) 
    {
        DIDDocument memory didDoc = didDocuments[did];
        require(didDoc.controller != address(0), "DID does not exist");
        
        return (
            didDoc.document,
            didDoc.controller,
            didDoc.creator,
            didDoc.timestamp,
            didDoc.active,
            didDoc.isAIAgent
        );
    }
    
    /**
     * @dev Get all AI agents registered by a user
     * @param user The user's address
     * @return An array of DIDs belonging to the user's AI agents
     */
    function getUserAIAgents(address user) 
        public 
        view 
        returns (string[] memory) 
    {
        return userAIAgents[user];
    }
    
    /**
     * @dev Check if an address is a delegate for a DID
     * @param did The DID to check
     * @param delegate The address to check
     * @return bool True if the address is a delegate
     */
    function isDelegate(string memory did, address delegate) 
        public 
        view 
        returns (bool) 
    {
        return delegates[did][delegate];
    }
    
    /**
     * @dev Check if an address has a registered user DID
     * @param user The address to check
     * @return bool True if the address has a registered user DID
     */
    function isRegisteredUser(address user) 
        public 
        view 
        returns (bool) 
    {
        return registeredUsers[user];
    }
    
    /**
     * @dev Generate a user DID string
     * @param userAddress The user's address
     * @return The generated DID string
     */
    function generateUserDID(address userAddress) 
        internal 
        pure 
        returns (string memory) 
    {
        return string(abi.encodePacked("did:p3ai:user:", toHexString(userAddress)));
    }
    
    /**
     * @dev Generate an AI agent DID string
     * @param agentAddress The AI agent's address
     * @return The generated DID string
     */
    function generateAIAgentDID(address agentAddress) 
        internal 
        pure 
        returns (string memory) 
    {
        return string(abi.encodePacked("did:p3ai:agent:", toHexString(agentAddress)));
    }
    
    /**
     * @dev Convert an address to its hex string representation
     * @param addr The address to convert
     * @return The hex string
     */
    function toHexString(address addr) 
        internal 
        pure 
        returns (string memory) 
    {
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
    
    /**
     * @dev Convert a byte to its hex char representation
     * @param b The byte to convert
     * @return The hex char
     */
    function char(bytes1 b) 
        internal 
        pure 
        returns (bytes1) 
    {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}