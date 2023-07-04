import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    avatar: {
      type: String,
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
