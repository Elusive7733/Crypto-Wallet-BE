// // Find coin in wallet
// let filteredCoin = populatedWallet.coins.find((coin) => {
//   if (coin.coin.name === coinToSell.name) {
//     return coin;
//   }
// });

// if (!filteredCoin) {
//   // If Coin is not found in wallet -> throw Error
//   throwError("Coin not found in wallet", 404);
// } else {
//   // If Coin is found in wallet -> check if user has enough quantity to sell
//   if (parseFloat(filteredCoin.quantity) < parseFloat(quantity)) {
//     throwError("Not enough quantity to sell coin", 403);
//   }

//   filteredCoin.quantity = subtractStrings(filteredCoin.quantity, quantity);

//   // Find PKR in Wallet
//   let PKR = populatedWallet.coins.find((coin) => coin.coin.acronym === "PKR");
//   if (PKR) {
//     // If PKR found in wallet -> update quantity
//     PKR.quantity = addStrings(PKR.quantity, price);
//   } else {
//     // If PKR is not found in wallet -> add PKR to wallet
//     let Rupees = await Coin.findOne({ acronym: "PKR" });
//     populatedWallet.coins.push({ coin: Rupees, quantity: price });
//   }
// }
