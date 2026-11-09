# Quant.ai Finance Bot (Budget Bandhu frontend)

**The Next.js front end for Budget Bandhu: a personal and group savings app with ML spend forecasting,
on-chain group escrow and soulbound achievement badges.**

> **This repository holds the front end only.** The full project, including the backend, the Hardhat contract
> package and the deployed contract addresses, lives in
> [**Budget-Bandhu**](https://github.com/Aryan-lomte05/Budget-Bandhu). Start there.

## What is here

A Next.js 16 App Router application with:

- MetaMask wallet integration and MetaMask design tokens
- Goal and budget interfaces, with Recharts visualisation
- 3D elements via React Three Fiber and Drei, including a finance advisor model
- Zustand with Immer for state, Zod and React Hook Form for input validation
- Framer Motion, GSAP and Lenis for motion and scrolling
- Markdown rendering for advisory responses

## Running it

```bash
npm install
cp .env.example .env.local      # backend URL, chain RPC, contract addresses
npm run dev
```

The app expects the Budget Bandhu backend to be reachable, and the contracts to be deployed on Polygon Amoy.

## Limits

- Front end only, and not useful standalone.
- Testnet wallets and testnet contracts throughout.
- Build output and scratch notes are committed here and should be cleaned out.
