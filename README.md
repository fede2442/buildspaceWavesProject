# BuildSpace waves project (modified)

This is my try at buildspace's first project after finishing a solidity bootcamp.

Heroku URL deployed: https://buildspace-waves-app.herokuapp.com/

First rinkeby deploy :) : https://rinkeby.etherscan.io/address/0x7068d74E67AEC8aa72aB08E2699aa23D0086D825

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


Testing:

- Awesome article testing solidity: https://stermi.medium.com/how-to-create-tests-for-your-solidity-smart-contract-9fbbc4f0a319

- Waffle Matchers ---> https://ethereum-waffle.readthedocs.io/en/latest/matchers.html

- Gas reporter ---> https://www.npmjs.com/package/hardhat-gas-reporter


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
- SuperJackpot winning not defined yet

---

Progress images:

![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/ScreenShots/1.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/ScreenShots/2.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/ScreenShots/3.JPG)
![alt text](https://github.com/fede2442/buildspaceWavesProject/blob/main/ScreenShots/4.png)
