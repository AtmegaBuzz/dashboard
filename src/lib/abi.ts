export const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "addDelegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "agentAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "AIAgentDIDRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			}
		],
		"name": "deactivateDID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "did",
				"type": "string"
			}
		],
		"name": "DIDDeactivated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "updater",
				"type": "address"
			}
		],
		"name": "DIDUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "DelegateAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "DelegateRemoved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "agentAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "document",
				"type": "string"
			}
		],
		"name": "registerAIAgentDID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "document",
				"type": "string"
			}
		],
		"name": "registerUserDID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "removeDelegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "newDocument",
				"type": "string"
			}
		],
		"name": "updateDID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "controller",
				"type": "address"
			}
		],
		"name": "UserDIDRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserAIAgents",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "isDelegate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "isRegisteredUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			}
		],
		"name": "resolveDID",
		"outputs": [
			{
				"internalType": "string",
				"name": "document",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "controller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isAIAgent",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]