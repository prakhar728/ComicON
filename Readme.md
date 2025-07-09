# 🦸‍♂️ ComicOn

**ComicOn** is a Farcaster-native bot that turns real conversations into mintable comic strips. Just tag `@ComicOn` in any thread, and we’ll instantly turn the last two messages into a comic — coined on Zora, and buyable right from your feed.

## ✨ How It Works

1. **Tag the Bot**: Mention `@ComicOn` in a Farcaster conversation.
2. **We Listen**: Using Neynar, we fetch the last two messages in the thread.
3. **Comicify**: Those messages get turned into a funny, expressive comic script.
4. **Mint it on Zora**: We generate the comic, coin it using the Zora SDK.
5. **Post Instantly**: The comic is posted with an embedded with it's CA.
6. **Buy Instantly**: You can buy using Uniswap v4 / the Zora Page / or using Clankr and Bankr.

## Platform choice - Farcaster

We felt the need to highlight the reasoning behind our choice as Farcaster instead of X.

- Farcaster ensures every user already has a wallet created and associated.
- They have a variety of degen + active people that would want to engage and test the bot more willingly.
- Farcaster proves a better entry with it's API costing and helpful webhooks.

## Sponsor Integration - Zora SDK

We chose to build with Zora SDK because they have all the support we need.

- Converting Comics into Coins aka NFTs with proper metadata.
- Being able to get the deployed address and post.
- Being able to add ourselves as referrer, which abstracts the pain process of minting and keeping a portion of coins for ourselves.
- Being able to specify the payout receipent is an added benefit.

Overall our system relies a lot on Zora due to the intuitive nature of their SDK, the services they provided, and the fact that it already has a lot of people on it ready to buy the coins.

## 🎯 Why ComicOn?

Because products shouldn't be complex to use. They should be intuitive, obvious, and instant. Social media is full of magic moments — jokes, debates, and banter. We capture that *in the moment* and let you own it forever.

- 🧠 **Frictionless**: Just tag — no setup, no app, no wallet dancing.
- 🎨 **Memetic**: Comics are visual, emotional, and highly shareable.
- 💸 **Onchain-native**: Every post is an Zora coin. Tradeable. Ownable.
- 💰 **Aligned Incentives**: We earn through Zora referral fees, not through user extraction.

## 💼 Business Model

Every time someone mints a comic, we earn a Zora referral fee. As ComicOn moments spread and go viral, we scale with them.

## 🤝 Built With

- **Farcaster + Neynar API** – For social graph and post reading
- **Zora SDK** – Mint and coin NFTs onchain
- **Clankr / Bankr** – Simple, embedded mint UX in social feeds
- **TypeScript, Node.js** – Backend & bot logic

## 🛠️ Future Plans

- Customization with tags  Ex: @comicon with Dragon Ball-z art style.
- "Comic of the Day" leaderboard
- Series tracking and multi-panel stories with long conversation threads.
- Farcaster mini-app to create comic using templates, and provided art tools with Zora SDK for instant coining.

## 📸 Example

> Conversation:
> - User1: "Why did the smart contract break up with the front-end?"
> - User2: "It needed more space!"

ComicOn generates and coins it as a 1-of-1 collectible comic.

## 📬 Get In Touch

Want to collab, suggest a feature, or co-create?
DM us on Farcaster: `@ComicOn`

---

ComicOn — *Moments into Comics. Instantly Owned.*
