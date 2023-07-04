// // Find coin in sender wallet
// let filteredSenderCoin = senderWallet.coins.find((coin) => {
//   if (coin.coin.name === coinToSend.name) {
//     return coin;
//   }
// });

// if (!filteredSenderCoin) {
//   // If Coin is not found in wallet -> throw Error
//   throwError("Coin not found in wallet", 404);
// } else {
//   // If Coin is found in wallet -> check if user has enough quantity to send
//   if (parseFloat(filteredSenderCoin.quantity) < parseFloat(quantity)) {
//     throwError("Not enough quantity to send coin", 403);
//   }
// }
// filteredSenderCoin.quantity = subtractStrings(filteredSenderCoin.quantity, quantity);

// //. -------- Adding coin to Reciever's Wallet --------

// let filteredRecieverCoin = receiverWallet.coins.find((coin) => {
//   if (coin.coin.name === coinToSend.name) {
//     return coin;
//   }
// });

// if (!filteredRecieverCoin) {
//   // If Coin is not found in wallet -> add coin to wallet
//   receiverWallet.coins.push({ coin: coinToSend, quantity });
// } else {
//   // If Coin is found in wallet -> update quantity
//   filteredRecieverCoin.quantity = addStrings(filteredRecieverCoin.quantity, quantity);
// }

// const newTransaction = new Transaction({
//   owner: userId,
//   coin: coinToSend,
//   quantity,
//   type,
//   terminal,
// });
// await newTransaction.save();
// await receiverWallet.save();
// await senderWallet.save();
