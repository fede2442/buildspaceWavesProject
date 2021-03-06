# ProfitThePonzi - Decentralized lottery game

Hi there !

This project originally started following buildspace's Waves project. In the middle of doing it I decided to build my own idea of a lottery with 3 winners and a few other things. This also helped me strenghten the skills learnt at the solidity bootcamp @ Encode.

Link to deployed app: (Working on some changes)

First rinkeby deploy :) : https://rinkeby.etherscan.io/address/0x0856aec2139533B25B19F7DC08130A46f650C82e

At the bottom of this readme you can see some screenshots of the progress.

I also have been writing down almost all the links I have been through while doing the project. Some issues I encountered and some new knowledge about the workings of EVM, MEV, hardhat, react, etc etc.

Thanks for reading and I invite you to buy a ticket in the testnet application!

Rinkeby faucet (This faucet gives you test eth in rinkeby) -- https://faucet.rinkeby.io

---
Ideas for the lottery:

- Selling 50 tickets 1 to 50.
- each account can only buy up to 5 tickets.
- ticket price should be low, 0.05 eth each.
- There will be 3 winners.

    *First --- 48%
    
    *Second --- 26%
    
    *Third --- 16%
    
    *SuperJackpot --- 10%
    
- SuperJackpot gets added to the jackpot every 5 lottery games.
- Randomness with ChainlinkVRF.
---

Useful links found while doing the project:

hardhat doc ---> https://hardhat.org/getting-started/

Extend hre object ---> https://hardhat.org/advanced/hardhat-runtime-environment.html

testing contracts ---> https://hardhat.org/tutorial/testing-contracts.html


what's a provider ---> https://docs.ethers.io/v5/api/providers/

dotenv tut ---> https://zetcode.com/javascript/dotenv/

12 factor app ---> https://12factor.net


solidity special variables ---> https://docs.soliditylang.org/en/latest/units-and-global-variables.html?highlight=block#block-and-transaction-properties

Solidity custom errors ---> https://blog.soliditylang.org/2021/04/21/custom-errors/

Withdrawal pattern ---> https://docs.soliditylang.org/en/v0.8.14/common-patterns.html

Security considerations in solidity ---> https://docs.soliditylang.org/en/v0.8.14/security-considerations.html#security-considerations

Issue calling on-chain from off-chain // calling contract methods returning tx ---> https://ethereum.stackexchange.com/questions/88119/i-see-no-way-to-obtain-the-return-value-of-a-non-view-function-ethers-js

Reentrancy attack ---> https://blog.openzeppelin.com/reentrancy-after-istanbul/

OpenZepellin counters ---> https://docs.openzeppelin.com/contracts/3.x/api/utils#Counters

Ethereum smart contracts good practices ---> https://consensys.github.io/smart-contract-best-practices/

Commit/reveal schema --> https://medium.com/swlh/exploring-commit-reveal-schemes-on-ethereum-c4ff5a777db8#:~:text=The%20values%20in%20a%20commitment,understanding%2C%20consider%20this%20simplified%20visualization.

Commit/reveal schema more doc ---> https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/

Chainlink ----> https://docs.chain.link/docs/chainlink-vrf/

TestingChainlink ----> https://dev.to/abhikbanerjee99/testing-your-chainlink-vrf-powered-smart-contract-m3i

Mocking chainlink oracles ---> https://betterprogramming.pub/how-to-mock-chainlink-vrf-coordinator-v2-and-aggregator-v3-with-truffle-0-8-0-24353b96858e

Testing:

- Awesome article testing solidity: https://stermi.medium.com/how-to-create-tests-for-your-solidity-smart-contract-9fbbc4f0a319

- Waffle Matchers ---> https://ethereum-waffle.readthedocs.io/en/latest/matchers.html

- Gas reporter ---> https://www.npmjs.com/package/hardhat-gas-reporter

Frontend / React / CSS

- Good CSS practices: https://paulcpederson.com/articles/css-for-people-who-hate-css/

- Tailwind fast pro tutorial: https://www.youtube.com/watch?v=pfaSUYaSgRo

- Tailwind doc: https://tailwindcss.com/docs/animation#spin

- tailwind elements: https://tailwind-elements.com/docs

- React vs Next.js: https://snipcart.com/blog/next-js-vs-react


Some issues found along the way: 

Having a the client inside the repo with it's .git made the original repo not follow the subrepo.
FIX:
    - delete .git folder in client
    - run in console:  git rm --cached client
    - add, commit and push.
    
https://stackoverflow.com/questions/62056294/github-folders-have-a-white-arrow-on-them#:~:text=In%20both%20cases%20(white%20arrow,repository%2C%20hence%20an%20empty%20folder.

What is the address of the deployer in hardhat?

"Remember that the owner of the token who gets the entire supply is the account that makes the deployment, and when using the hardhat-ethers plugin ContractFactory and Contract instances are connected to the first signer by default. This means that the account in the owner variable executed the deployment, and balanceOf() should return the entire supply amount."

https://hardhat.org/tutorial/testing-contracts.html

issues between React and ESLint: (AWESOME ARTICLE)

https://andrebnassis.medium.com/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba



Progress images:

![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/evm/ScreenShots/1.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/evm/ScreenShots/2.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/evm/ScreenShots/3.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/evm/ScreenShots/4.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/evm/ScreenShots/5.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/evm/ScreenShots/6.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/evm/ScreenShots/7.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/evm/ScreenShots/8.JPG)
