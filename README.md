# UrbanAgri DAO
![image](https://github.com/user-attachments/assets/2c2e959a-4df2-461f-beba-1c043ea0210d)

Retrieving,Analyzing and Summarizing world Data to improve our understanding of the community conditions and generate customized urban Farming solutions for the particular area.

We built our project using [MultiBaas](https://docs.curvegrid.com/multibaas/) to handle the complexities of interacting with an EVM smart contract.

The repository consists of two sub-projects:

- The `**blockchain**` folder contains a [Hardhat](https://hardhat.org/) project that uses the [Hardhat MultiBaas Plugin](https://github.com/curvegrid/hardhat-multibaas-plugin) to compile the `UrbanAgriDLP` smart contract, deploy it to the network, and link it to a MultiBaas deployment so that we can interact with it via the REST API.
- The `frontend` folder contains a Next.js web application that provides a UI for interacting with the smart contract using the [MultiBaas SDK](https://github.com/curvegrid/multibaas-sdk-typescript).
 

## About the Project

<img width="677" alt="image" src="https://github.com/user-attachments/assets/6a0a6c68-dde7-4684-850f-1a560e385e43">


Sustainable urban farming solutions are crucial for our future. UrbanAgri_Curve 🌿 is the essential platform for anyone ready to revolutionize urban agriculture. Whether you're a city dweller, community organizer, or urban planning enthusiast, UrbanAgri_Curve makes data-driven urban farming accessible, engaging, and rewarding for all.

**Core Features:
**
**Data-Driven Insights:** Interact with our AI-powered platform to gain valuable insights into urban agricultural practices. Solve real-world challenges like optimal crop selection, resource management, and sustainable urban integration.

**Community Marketplace**: Access a dynamic marketplace where you can share data, exchange ideas, and discover innovative urban farming solutions tailored to your city's unique needs.

**Earn and Contribute:** Participate in data collection and solution creation to earn blockchain-powered rewards. Your contributions unlock platform features, grant access to exclusive urban farming resources, and offer rewards in the community marketplace.

**Join the Urban Farming Revolution:** Become part of the UrbanAgri DAO to collaborate on global urban sustainability projects, fund public goods, and promote data-driven urban agriculture as a solution for food security and urban resilience.

**Why UrbanAgri_Curve?**
With increasing urbanization and the need for sustainable city planning, data-driven urban agriculture is a vital solution—but it often lacks coordinated efforts and accessible data. UrbanAgri_Curve bridges these gaps, providing a platform for collaborative learning, rewards for meaningful contributions, and a thriving ecosystem to support your urban farming initiatives.

**Call to Action:**
Shape the future of your city, your impact, and urban sustainability. Join UrbanAgri_Curve, explore our data marketplace, master urban agricultural practices, and be part of a global movement to build more resilient and sustainable urban environments.

UrbanAgri_Curve: Cultivating Smart Cities, One Data Point at a Time. 🏙️🌱


## Contract Deployment via Hardhat
Prepare the project for deployment:

```sh
cd blockchain
npm install
cp deployment-config.template.js deployment-config.development.js
```

Finally, deploy the smart-contract:

```sh
npm run deploy:voting:dev
```

## Next.js Frontend

Start by setting up the project.

```sh
cd frontend
npm install
cp .env.template .env.development
```
Now, you should be able to run:

```sh
npm run dev
```

load the dApp in browser at http://localhost:3000.



