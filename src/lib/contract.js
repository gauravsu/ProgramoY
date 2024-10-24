export const contractABI=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "postId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "optionIds",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "imageUrls",
				"type": "string[]"
			},
			{
				"internalType": "address",
				"name": "distributorAddress",
				"type": "address"
			}
		],
		"name": "AddPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "listed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "initialBudget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "initialFrequency",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "postId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "optionIds",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "imageUrls",
				"type": "string[]"
			}
		],
		"name": "initDistributor",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initWorker",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Post_Exist",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__AmountLessThanEqual0",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__BadPayload",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__DistributorExists",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__DoesNotExist",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__NotEnoughBudget",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__OptionDoesNotExist",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__OptionExists",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__PostDNE",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__PostDoesNotExist",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__UnAuthorisedAccess",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__WithdrawFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__WithdrawRewardsBeforeDeleting",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Turks__WorkerDNE",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Turks__WorkersExists",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			}
		],
		"name": "DistributorListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "postId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "optionId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newImageUrl",
				"type": "string"
			}
		],
		"name": "ImageUrlUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "postId",
				"type": "string"
			}
		],
		"name": "PostAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "worker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "budget",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "distributorAddress",
				"type": "address"
			}
		],
		"name": "updateBudget",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "postId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "distributorAddress",
				"type": "address"
			}
		],
		"name": "updateDescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "workers",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "rewards",
				"type": "uint256"
			}
		],
		"name": "updateRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64[]",
				"name": "votes",
				"type": "uint64[]"
			},
			{
				"internalType": "string[]",
				"name": "optionIds",
				"type": "string[]"
			},
			{
				"internalType": "address",
				"name": "distributorAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "postId",
				"type": "string"
			}
		],
		"name": "updateVotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "workers",
				"type": "address[]"
			},
			{
				"internalType": "string[]",
				"name": "postIds",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "optionIds",
				"type": "string[]"
			}
		],
		"name": "updateVotingMapping",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "worker",
				"type": "address"
			}
		],
		"name": "WorkerListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "worker",
				"type": "address"
			}
		],
		"name": "WorkerRemoved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "postId",
				"type": "string"
			}
		],
		"name": "getAllOptions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "vote",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "affiliated_post",
						"type": "string"
					}
				],
				"internalType": "struct Turks.Option[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "distributorId",
				"type": "address"
			}
		],
		"name": "getAllPosts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "optionIds",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "affiliated_distributor",
						"type": "address"
					}
				],
				"internalType": "struct Turks.Post[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			}
		],
		"name": "getBudget",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			}
		],
		"name": "getFrequency",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "distributorId",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "postId",
				"type": "string"
			}
		],
		"name": "getParticularPost",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "optionIds",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "affiliated_distributor",
						"type": "address"
					}
				],
				"internalType": "struct Turks.Post",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "worker",
				"type": "address"
			}
		],
		"name": "getRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "postId",
				"type": "string"
			}
		],
		"name": "getTotalVotesOnPost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalVotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "worker",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "postId",
				"type": "string"
			}
		],
		"name": "getVotedOption",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "s_WorkerListed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export const contractAddress = "0x9800E70e6531c5ABFaa6df5f8F5152a18998C701"