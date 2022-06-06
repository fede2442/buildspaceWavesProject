/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ProfitThePonzi,
  ProfitThePonziInterface,
} from "../ProfitThePonzi";

const _abi = [
  {
    inputs: [],
    name: "AccountIsNotAWinner",
    type: "error",
  },
  {
    inputs: [],
    name: "AmountUnderMinBet",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTicketNumber",
    type: "error",
  },
  {
    inputs: [],
    name: "LotteryNumberAlreadySold",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxAmountOfTickets",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "ticketNumber",
        type: "uint256",
      },
    ],
    name: "BoughtTicket",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newLotteryId",
        type: "uint256",
      },
    ],
    name: "NewLotteryStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_superJackpot",
        type: "uint256",
      },
    ],
    name: "SuperJackpot",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vaultAmount",
        type: "uint256",
      },
    ],
    name: "Winner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amountWitdrawed",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "amountOfTickets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ticketNumber",
        type: "uint256",
      },
    ],
    name: "buyTicket",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ticketNumber",
        type: "uint256",
      },
    ],
    name: "buyerOfTicket",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getJackpot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "getTicketsBoughtBy",
    outputs: [
      {
        internalType: "uint256[10]",
        name: "_tickets",
        type: "uint256[10]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTicketsSold",
    outputs: [
      {
        internalType: "uint256[10]",
        name: "_tickets",
        type: "uint256[10]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "jackpot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lotteryId",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pendingWinners",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieveLoot",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "soldTicketsCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "superJackpot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ticketOwners",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611937806100206000396000f3fe6080604052600436106100dd5760003560e01c8063e580f47b1161007f578063ebcb42ed11610059578063ebcb42ed146102b7578063f408ed6c146102f4578063f6c9ad381461031f578063fb3c46bb14610329576100dd565b8063e580f47b14610224578063e886cd141461024f578063eb2dbcf61461027a576100dd565b80636b31ee01116100bb5780636b31ee01146101665780636f9fb98a146101915780639226b0ff146101bc5780639329066c146101f9576100dd565b80633e0a51d4146100e2578063520198a81461011f57806367dd74ca1461014a575b600080fd5b3480156100ee57600080fd5b506101096004803603810190610104919061146c565b610354565b604051610116919061158c565b60405180910390f35b34801561012b57600080fd5b506101346103c4565b60405161014191906115a7565b60405180910390f35b610164600480360381019061015f919061146c565b6104ce565b005b34801561017257600080fd5b5061017b610777565b60405161018891906115e3565b60405180910390f35b34801561019d57600080fd5b506101a661077d565b6040516101b391906115e3565b60405180910390f35b3480156101c857600080fd5b506101e360048036038101906101de9190611443565b610785565b6040516101f091906115e3565b60405180910390f35b34801561020557600080fd5b5061020e61079d565b60405161021b91906115e3565b60405180910390f35b34801561023057600080fd5b506102396107a7565b60405161024691906115e3565b60405180910390f35b34801561025b57600080fd5b506102646107b3565b60405161027191906115e3565b60405180910390f35b34801561028657600080fd5b506102a1600480360381019061029c919061146c565b6107b8565b6040516102ae919061158c565b60405180910390f35b3480156102c357600080fd5b506102de60048036038101906102d99190611443565b6107ee565b6040516102eb91906115a7565b60405180910390f35b34801561030057600080fd5b506103096108fa565b60405161031691906115e3565b60405180910390f35b610327610900565b005b34801561033557600080fd5b5061033e610af6565b60405161034b91906115e3565b60405180910390f35b6000806001836103649190611728565b600a811061039b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6103cc6113c6565b60005b600a8110156104ca57600073ffffffffffffffffffffffffffffffffffffffff16600082600a811061042a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104b7576001816104749190611647565b8282600a81106104ad577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020181815250505b80806104c2906117a5565b9150506103cf565b5090565b6000811115806104de5750600a81115b15610515576040517faeaddff100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600060018361053c9190611728565b600a8110610573577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146105e2576040517f5afb4d4800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105eb33610b02565b610621576040517f5488147300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b67016345785d8a00003414610662576040517fc34dcda400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b34600c60008282546106749190611647565b9250508190555033600060018361068b9190611728565b600a81106106c2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061070b600a610be9565b803373ffffffffffffffffffffffffffffffffffffffff1661072d600b610bff565b7fccad0280ccafddab656a5e677bdd9410b465bf9abcec44b45b26de4548cd59ee60405160405180910390a4600a610765600a610bff565b141561077457610773610c0d565b5b50565b600c5481565b600047905090565b600e6020528060005260406000206000915090505481565b6000600c54905090565b600b8060000154905081565b600a81565b600081600a81106107c857600080fd5b016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6107f66113c6565b60005b600a8110156108f4578273ffffffffffffffffffffffffffffffffffffffff16600082600a8110610853577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156108e15760018161089e9190611647565b8282600a81106108d7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020181815250505b80806108ec906117a5565b9150506107f9565b50919050565b600d5481565b6000600e60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411610979576040517f55ea9f6000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600e60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600e60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060003373ffffffffffffffffffffffffffffffffffffffff1682604051610a2890611577565b60006040518083038185875af1925050503d8060008114610a65576040519150601f19603f3d011682016040523d82523d6000602084013e610a6a565b606091505b5050905080610aae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aa5906115c3565b60405180910390fd5b813373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b6560405160405180910390a35050565b600a8060000154905081565b6000806000905060005b600a811015610bdd578373ffffffffffffffffffffffffffffffffffffffff16600082600a8110610b66577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610bca578180610baf906117ee565b92505060058260ff161415610bc957600092505050610be4565b5b8080610bd5906117a5565b915050610b0c565b5060019150505b919050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6000610c1761134f565b90506000600182610c289190611647565b90506000600182610c399190611647565b90506000600f610c49600b610bff565b610c539190611818565b1415610d0957600a6009600d54610c6a91906116ce565b610c74919061169d565b600c6000828254610c859190611647565b92505081905550600a6001600d54610c9d91906116ce565b610ca7919061169d565b600d81905550610cb7600b610bff565b7f2e34d1f5f3952891cd0f54ba7d8cafe4c6f94d6cae31617e2288df19764fff75600a6009600d54610ce991906116ce565b610cf3919061169d565b604051610d0091906115e3565b60405180910390a25b60326018600c54610d1a91906116ce565b610d24919061169d565b600e60008086600a8110610d61577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610dcc9190611647565b925050819055506032600d600c54610de491906116ce565b610dee919061169d565b600e60008085600a8110610e2b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e969190611647565b9250508190555060196004600c54610eae91906116ce565b610eb8919061169d565b600e60008084600a8110610ef5577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f609190611647565b92505081905550600a600c54610f76919061169d565b600d81905550600e60008085600a8110610fb9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600084600a8110611050577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16611092600b610bff565b7f1c2ae1f7e99dbbbfe25aac964f3889ea68259d88b74709f53037a6fb930bb02a60405160405180910390a4600e60008084600a81106110fb577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600083600a8110611192577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166111d4600b610bff565b7f1c2ae1f7e99dbbbfe25aac964f3889ea68259d88b74709f53037a6fb930bb02a60405160405180910390a4600e60008083600a811061123d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600082600a81106112d4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16611316600b610bff565b7f1c2ae1f7e99dbbbfe25aac964f3889ea68259d88b74709f53037a6fb930bb02a60405160405180910390a461134a611358565b505050565b60006005905090565b6000600c8190555060008061136d91906113e9565b611377600a6113b9565b611381600b610be9565b61138b600b610bff565b7f9e157affda43e17eef8b86763820bcb49bf2a976a0a0292b27fcbe249cc5f55560405160405180910390a2565b6000816000018190555050565b604051806101400160405280600a90602082028036833780820191505090505090565b5080600a01906113f991906113fc565b50565b5b808211156114155760008160009055506001016113fd565b5090565b600081359050611428816118d3565b92915050565b60008135905061143d816118ea565b92915050565b60006020828403121561145557600080fd5b600061146384828501611419565b91505092915050565b60006020828403121561147e57600080fd5b600061148c8482850161142e565b91505092915050565b60006114a18383611559565b60208301905092915050565b6114b68161175c565b82525050565b6114c581611608565b6114cf8184611620565b92506114da826115fe565b8060005b8381101561150b5781516114f28782611495565b96506114fd83611613565b9250506001810190506114de565b505050505050565b6000611520601283611636565b915061152b826118a7565b602082019050919050565b600061154360008361162b565b915061154e826118d0565b600082019050919050565b6115628161178e565b82525050565b6115718161178e565b82525050565b600061158282611536565b9150819050919050565b60006020820190506115a160008301846114ad565b92915050565b6000610140820190506115bd60008301846114bc565b92915050565b600060208201905081810360008301526115dc81611513565b9050919050565b60006020820190506115f86000830184611568565b92915050565b6000819050919050565b6000600a9050919050565b6000602082019050919050565b600081905092915050565b600081905092915050565b600082825260208201905092915050565b60006116528261178e565b915061165d8361178e565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561169257611691611849565b5b828201905092915050565b60006116a88261178e565b91506116b38361178e565b9250826116c3576116c2611878565b5b828204905092915050565b60006116d98261178e565b91506116e48361178e565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561171d5761171c611849565b5b828202905092915050565b60006117338261178e565b915061173e8361178e565b92508282101561175157611750611849565b5b828203905092915050565b60006117678261176e565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60006117b08261178e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156117e3576117e2611849565b5b600182019050919050565b60006117f982611798565b915060ff82141561180d5761180c611849565b5b600182019050919050565b60006118238261178e565b915061182e8361178e565b92508261183e5761183d611878565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f5769746864726177616c206661696c65642e0000000000000000000000000000600082015250565b50565b6118dc8161175c565b81146118e757600080fd5b50565b6118f38161178e565b81146118fe57600080fd5b5056fea2646970667358221220f7207edd66189f3962f5227ff6efba874b96257bec75cacc36304a26362c480b64736f6c63430008040033";

export class ProfitThePonzi__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ProfitThePonzi> {
    return super.deploy(overrides || {}) as Promise<ProfitThePonzi>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ProfitThePonzi {
    return super.attach(address) as ProfitThePonzi;
  }
  connect(signer: Signer): ProfitThePonzi__factory {
    return super.connect(signer) as ProfitThePonzi__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProfitThePonziInterface {
    return new utils.Interface(_abi) as ProfitThePonziInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProfitThePonzi {
    return new Contract(address, _abi, signerOrProvider) as ProfitThePonzi;
  }
}