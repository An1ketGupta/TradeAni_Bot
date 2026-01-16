import { InlineKeyboard } from "grammy";

export const startKeyboard = new InlineKeyboard()
    .text("Buy" , "buyHandler")
    .text("Sell", "sellHandler").row()
    .text("Wallet" , "walletHandler")
    .text("fund", "fundHandler").row()
    .text("Refer a friend", "referalHandler")
    .text("Refresh", "refreshHandler")


export const zeroBalanceKeyboard = new InlineKeyboard()
    .text("Wallet" , "walletHandler").row()
    .text("Fund", "fundHandler").row()
    .text("Close", "closeHandler").row()