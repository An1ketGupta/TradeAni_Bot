import { Bot } from "grammy"
import { couldStartTrivia } from "typescript";

const tokenAPI = process.env.BOT_API_KEY;
if(!tokenAPI){
    throw new Error("Token API should be provided")
}
const bot = new Bot(tokenAPI)
const chatid = 6296735010;

bot.command("start", (ctx)=>{
    ctx.reply("Hi there")
    ctx.reply("<b>Hi everyone</b>", {
        parse_mode: "HTML"
    })
})

// bot.hears(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/ , async (ctx)=>{
//     await ctx.reply("this is a public key.")
// })

// bot.on("message", (ctx)=>{
//     console.log(ctx.message)
// })

bot.on("message" ,async (ctx)=>{
    await ctx.reply("Hi there", {
        reply_parameters:{
            message_id:ctx.msg.message_id
        }
    })
})



bot.start();