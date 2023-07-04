import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WalletSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    coins: [
      {
        coin: {
          type: Schema.Types.ObjectId,
          ref: "Coin",
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Wallet", WalletSchema);
