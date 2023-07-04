import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    coin: {
      type: Schema.Types.ObjectId,
      ref: "Coin",
    },
    quantity: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    terminal: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
