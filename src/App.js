import React, { useEffect, useState } from "react"
import Web3 from "web3"
import { ethers } from "ethers"
import metaMaskIcon from "./metamask.png"

function App() {
  const [contract, setContract] = useState(null)
  const [latestsPost, setLatestsPost] = useState("")

  const newFunction = async (contract) => {
    console.log("Started")
    let val = await contract.callStatic.getLatestPostID().caller
    setLatestsPost(val)
    console.log(val)
  }

  useEffect(() => {
    const web3 = new Web3(
      "https://rinkeby.etherscan.io/address/0x9120b19e921fAf41d315B528dE711f99cf530725"
    )

    const daiAddress = "0x9120b19e921fAf41d315B528dE711f99cf530725"
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    const daiAbi = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "postID",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "string",
            name: "text",
            type: "string",
          },
        ],
        name: "PostCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "postID",
            type: "uint256",
          },
        ],
        name: "PostDeleted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "postID",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "sponsorAmount",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sponsor",
            type: "address",
          },
        ],
        name: "PostSponsored",
        type: "event",
      },
      {
        inputs: [{ internalType: "string", name: "text", type: "string" }],
        name: "createPost",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
        name: "deletePost",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "start", type: "uint256" },
          { internalType: "uint256", name: "numOfPosts", type: "uint256" },
        ],
        name: "fetchPostsRanged",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "timestamp", type: "uint256" },
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "string", name: "text", type: "string" },
            ],
            internalType: "struct ISocialNetwork.Post[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getLatestPostID",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
        name: "getPost",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "timestamp", type: "uint256" },
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "string", name: "text", type: "string" },
            ],
            internalType: "struct ISocialNetwork.Post",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "posts",
        outputs: [
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "string", name: "text", type: "string" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
        name: "sponsorPost",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ]

    // The Contract object
    let daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
    setContract(daiContract)
    console.log(daiContract)
  }, [])

  const metaMaskLoggin = () => {
    if (window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          console.log(res[0], "Logged in with this ID")

          console.log(latestsPost)
          // Redirect
        })
        .catch((err) => console.error(err))
    } else {
      console.log("Please install MetaMask")
    }
  }

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="h-full w-1/2 flex justify-center items-center bg-blue-500 ">
        <span className="font-bold underline-offset-2 text-5xl text-white">
          Vibe
        </span>
      </div>
      <div className="background h-full w-1/2 flex flex-col justify-center items-center gap-8">
        <div className="w-3/4 h-1/5 flex flex-col  justify-around items-start text-6xl">
          <h1>Connect your Wallet</h1>
          <p className="text-xl">
            Need help connecting your wallet?
            <a className="text-blue-500   underline">Read our FAQ.</a>
          </p>
        </div>
        <button
          onClick={() => metaMaskLoggin()}
          className="w-64 h-20 px-2 flex justify-evenly text-2xl items-center rounded-md bg-white border border-black"
        >
          <img className="w-10" src={metaMaskIcon} alt="" />
          <h2>Login</h2>
        </button>
        <button
          onClick={() => newFunction(contract)}
          className="w-64 h-20 px-2 flex justify-evenly text-2xl items-center rounded-md bg-white border border-black"
        >
          <img className="w-10" src={metaMaskIcon} alt="" />
          <h2>Get Contract Data</h2>
        </button>
      </div>
    </main>
  )
}

export default App
