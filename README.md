# Nexsar - Frontend

## Technology
| Tools                    | Usage                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Lit**                  | Transaction Automation - Data Encryption & Decryption via. `Lit Actions` - Broadcast (off-chain) & Collection via. `Lit Actions` |
| **Galadriel**            | Generate AI-based content                                                                                                        |
| **Pimlico**              | Paymaster - Bundler                                                                                                              |
| **ether.js** & **wagmi** | Blockchain Interaction                                                                                                           |

---

## Introduction
This React app provides a decentralized platform for `distributors` and `workers` to collaborate on `AI-generated content`. The platform leverages the **`LIT protocol`** for *decentralized access management* and integrates *on-chain AI agents* for generating high-quality content. Distributors can provide content briefs for AI content generation, while workers participate in evaluating the content and earning rewards through blockchain-based mechanisms.

---

## Installation

> Clone the repo
```sh
git clone https://github.com/Nexsar/Frontend
cd Frontend/
```

> Build the project
```sh
npm i
npm i -f # incase of errors
```

> Start the project
```sh
npm start
```

---

## Table of Contents
- [Nexsar - Frontend](#nexsar---frontend)
  - [Technology](#technology)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Table of Contents](#table-of-contents)
  - [Distributor Dashboard](#distributor-dashboard)
    - [Account Creation and Login](#account-creation-and-login)
      - [Metamask Authentication and PKP Integration:](#metamask-authentication-and-pkp-integration)
      - [Smart Wallet Creation and Transaction Automation:](#smart-wallet-creation-and-transaction-automation)
      - [Off-Chain Action Integration:](#off-chain-action-integration)
    - [Content Brief and Post Configuration](#content-brief-and-post-configuration)
    - [AI Content Generation via LIT API](#ai-content-generation-via-lit-api)
    - [Automatic Posting to Worker Dashboard](#automatic-posting-to-worker-dashboard)
  - [Worker Dashboard](#worker-dashboard)
    - [Account Creation and Login](#account-creation-and-login-1)
    - [Content Evaluation and Voting](#content-evaluation-and-voting)
    - [Incentivized Participation](#incentivized-participation)
  - [AI Integration and Content Generation](#ai-integration-and-content-generation)
    - [On-Chain AI Agent (Galadriel)](#on-chain-ai-agent-Galadriel)
    - [AI Model Selection and Customization](#ai-model-selection-and-customization)
  - [Security and Privacy](#security-and-privacy)
    - [LIT Protocol](#lit-protocol)
    - [LIT Wallet for Encryption and Decryption](#lit-wallet-for-encryption-and-decryption)


## Distributor Dashboard

### Account Creation and Login
Distributors use their **METAMASK** to login through the **LIT protocol**, which offers decentralized access management and authentication. This ensures a secure environment for distributors to create and manage their accounts. Once logged in, distributors gain access to the platform’s functionalities through their unique **LIT Wallet**, which handles **`Automated Signing`** (via. *pkp creation* & *smart wallet*), **encryption** and **decryption** tasks to protect their data and transactions.

<details>
<summary>
Implementation
</summary>

Here's a more technical and professionally framed version of your content in pointer format:

#### Metamask Authentication and PKP Integration:
- **Metamask Login:**  
  Upon logging in via Metamask, we retrieve the **wrapped key** (private key) and initiate a session signed using the **AUTH method** from the PKP (Programmable Key Pair) generated during Metamask authentication.
  
- **Session Sign and Expiration:**  
  The session signature is valid for **10 minutes** and grants specific capabilities based on user roles:
  - **Distributor Capabilities:**
    - Encryption
    - Decryption
    - Signing all resources
    - Executing LIT Actions
    - Implementing Access Control Conditions
  - **Worker Capabilities:**
    - Signing

- **Session Renewal and Capability Requests:**  
  The session signature can be updated upon expiration, allowing the request for assigned capabilities as needed, according to the LIT protocol.

#### Smart Wallet Creation and Transaction Automation:
- **Smart Wallet via LitWalletEther:**  
  Using the session sign and **AUTH method**, a **Smart Wallet** is created through `LitWalletEther`. This wallet facilitates **automated transactions** and is integral for handling secure blockchain operations.
  
- **Encryption and Decryption:**  
  The Smart Wallet's encryption and decryption features are employed to securely encrypt and decrypt sensitive distributor information, ensuring data confidentiality.

#### Off-Chain Action Integration:
- **Broadcast Functionality for Off-Chain Actions:**  
  The platform utilizes **Broadcast** functionality to perform off-chain actions, such as:
  - Aggregating votes.
  - Determining winners for each post.
  
  These actions are directly executed by **LIT Nodes**, enabling efficient off-chain computations and maximizing participation.

This structure is clear, professional, and provides a technical breakdown of the functionalities.
<hr>

</details>

### Content Brief and Post Configuration
After logging in, distributors can provide `detailed descriptions` of the content they wish to generate. This includes specifying:
- Content `prompt`, theme and tone.
- `Budget allocation` for content generation.
- Post `frequency` (handled **Cron job scheduling**).
- Relevant details about the brand or campaign.

### AI Content Generation via LIT API
The distributor’s content brief is processed through the **LIT API**, which transmits the data to the platform's AI agent. This **on-chain agent (Galadriel)** utilizes smart contracts to generate the appropriate AI-gen contents (e.g., via. **DALL-E** or **OpenAI**) based on the content prompts. The AI agent generates both images and text content, ensuring that the output aligns with the distributor’s specifications.

### Automatic Posting to Worker Dashboard
Once the AI agent generates the content, it is automatically posted to the **Worker Dashboard**. This seamless integration saves time and effort by eliminating manual content handling.

---

## Worker Dashboard

### Account Creation and Login
Similar to distributors, workers login using their Metamask Account through the **LIT protocol**. The **LIT Wallet** provides encryption and decryption to protect workers' data and ensure privacy across the platform.

### Content Evaluation and Voting
Workers evaluate AI-generated content based on the distributor’s briefs. They vote on the content they find most effective and provide feedback, offering valuable insights into public sentiment. This feedback helps distributors refine their content strategies.

### Incentivized Participation
Workers earn platform tokens for participating in the content evaluation process. Their feedback and voting are recorded on the blockchain, ensuring transparency and fairness. Tokens are awarded based on engagement, feedback quality, and how closely the worker’s vote aligns with community consensus.

---

## AI Integration and Content Generation

### On-Chain AI Agent (Galadriel)
The AI agent is responsible for generating content, operating **on-chain** using smart contracts. It manages the process of **AI image generation**, ensuring that the entire process is transparent, secure, and tamper-proof. Models like **DALL-E** and **OpenAI** are integrated for creating both image and text content based on provided prompts.

### AI Model Selection and Customization
The AI agent dynamically selects the most suitable AI model based on the distributor’s content brief. This allows for flexibility in catering to diverse content needs. The platform continuously updates and trains AI models to stay current with content trends and evolving requirements.

---

## Security and Privacy

### LIT Protocol
The **LIT protocol** is central to the platform’s security, providing decentralized access management and authentication. Both distributors and workers can be assured of their data's safety, as the LIT protocol protects against unauthorized access.

### LIT Wallet for Encryption and Decryption
The **LIT Wallet** handles encryption and decryption, ensuring sensitive information is always secure. This method enhances user trust and ensures that all communication on the platform is private and secure.

---

This React app leverages advanced AI models and blockchain technology to provide a decentralized, secure, and user-friendly platform for content generation and evaluation. Both distributors and workers can collaborate efficiently while ensuring their data is protected through the LIT protocol.
