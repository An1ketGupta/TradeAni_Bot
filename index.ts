import { Connection, Keypair } from "@solana/web3.js";
import { Bot } from "grammy";
import { startKeyboard, zeroBalanceKeyboard } from "./keyboards";

const KeyPairData:Record<number , Keypair> = {}
const connection = new Connection(process.env.RPC_URL!)
const tokenAPI = process.env.BOT_API_KEY;
if (!tokenAPI) {
    throw new Error("Token API must be included.")
}
const bot = new Bot(tokenAPI)

// this is the start command action
bot.command("start", async (ctx) => {

    const userKeyPair = Keypair.generate();
    if(!ctx.from?.id){
        throw new Error("No userid detected")
    }
    const userId:number = ctx.from?.id;
    KeyPairData[userId] = userKeyPair;

    await ctx.reply(`<b>Welcome to NanuBot</b><b>This is your Public Key (Wallet Address): <i>${userKeyPair.publicKey.toBase58()}</i></b>`,
        {
            parse_mode: "HTML",
            reply_markup:startKeyboard
        }
    )
})

bot.hears(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/ , async(ctx)=>{
    if(!ctx.from?.id){
        throw new Error("htt")
    }

    const userId = ctx.from.id;
    const userPublicKey = KeyPairData[userId]?.publicKey
    if(!userPublicKey){
        throw new Error("No PublicKey")
    }

    const userBalance = await connection.getBalance(userPublicKey)
    if(userBalance == 0){
        await ctx.reply("You have 0 sol in your wallet.", {
            reply_markup:zeroBalanceKeyboard
        })
    }
    else{
        await ctx.reply("Enter the number of tokens you want to buy---")
    }
})

bot.callbackQuery("buyHandler" , async (ctx)=>{
    await ctx.answerCallbackQuery("Buying the token for you...")
    await ctx.reply("You have called the buy button")
})



bot.start()