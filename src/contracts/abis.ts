export const CONTRACT_ABI = [
  {
    name: "action_cost",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "buyin",
    type: "function",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
] as const;

export const STRK_ABI = [
  {
    name: "approve",
    type: "function",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "balanceOf",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      }
    ],
    outputs: [
      {
        type: "core::integer::u256",
      }
    ],
    state_mutability: "view",
  }
] as const; 