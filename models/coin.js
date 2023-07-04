import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CoinSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  acronym: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Coin", CoinSchema);
