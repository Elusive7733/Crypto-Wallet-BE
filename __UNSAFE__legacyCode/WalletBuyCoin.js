// // Check if user has enough balance to buy coin
// let PKR = populatedWallet.coins.find((coin) => coin.coin.acronym === "PKR");
// if (PKR) {
//   if (parseFloat(PKR.quantity) < parseFloat(price)) {
//     throwError("Not enough balance to buy coin", 403);
//   }
// } else if (coinToBuy.acronym !== "PKR") {
//   throwError("Cant buy coins without PKR", 403);
// }

// // Find coin in wallet
// let filteredCoin = populatedWallet.coins.find((coin) => {
//   if (coin.coin.name === coinToBuy.name) {
//     return coin;
//   }
// });

// if (!filteredCoin) {
//   // If Coin is not found in wallet -> add coin to wallet
//   populatedWallet.coins.push({ coin: coinToBuy, quantity });
//   if (PKR) {
//     PKR.quantity = subtractStrings(PKR.quantity, price);
//   }
// } else {
//   // If Coin is found in wallet -> update quantity
//   filteredCoin.quantity = addStrings(filteredCoin.quantity, quantity);
//   if (PKR) {
//     PKR.quantity = subtractStrings(PKR.quantity, price);
//   }
// }
