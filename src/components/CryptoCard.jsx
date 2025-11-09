import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cryptocard.css";

import coinimg1 from "../assets/images/bitcoin.png"
import coinimg2 from "../assets/images/ethereum.png"
import coinimg3 from "../assets/images/ton.png"


const cryptos = [
  { name: "Bitcoin (BTC)", ticker: "BTC", img: coinimg1, color: "#FF8C00" },
  { name: "Toncoin (TON)", ticker: "TON", img: coinimg3, color: "#1E90FF" },
  { name: "Ethereum (ETH)", ticker: "ETH", img: coinimg2, color: "#40E0D0" }
];

const CryptoCards = () => {
  
  const [prices,setPrices] =useState({})

  useEffect(()=>{
    axios
    .get(
      'https://pro-api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,the-open-network&vs_currencies=usd'
    )
    .then((res)=>{
      setPrices({
        BTC:res.data.bitcoin.usd,
        ETH:res.data.ethereum.usd,
        TON:res.data['the-open-network'].usd,
      });

    })
  

    .catch((err) => {
      console.error('Error fetching api is : ',err);
    });
  },[]);

  

  return (
    <div className="cards-wrapper" >
      {cryptos.map((c) => (
        <div key={c.ticker} className="card-3d" >
          <div className="card-border" > </div>
          <div className="card-content" >
            <img src={c.img} className="crypto-img " alt="coin img"  />
            <h2 className="crypto-title" >{c.name}</h2>
            <p className="crypto-price" >
              {prices[c.ticker] ? `$${prices[c.ticker].toFixed(2)}` : "Loading..." }
            </p>
          </div>
        </div>

      ))}
    </div>
  );
};

export default CryptoCards;
