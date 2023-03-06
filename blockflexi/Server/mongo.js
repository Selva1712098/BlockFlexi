import mongoose from "mongoose";
import shortid from "shortid";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.Mongouri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => console.log(err));

const customerschema = new mongoose.Schema(
  {
    CustomerID: {
      type: String,
      unique: true,
      default: shortid.generate,
      required: true,
    },
    CustomerName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    Address: {
      type: String,
      required: true,
      maxLength: 250,
    },
    PANno: {
      type: String,
      required: true,
      unique: true,
      maxLength: 10,
    },
    MobileNo: {
      type: Number,
      required: true,
      unique: true,
      maxLength: 10,
    },
    EmailID: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
    },
    Password: {
      type: String,
      required: true,
      unique: true,
    },
    RowDate: {
      type: Date,
      required: true,
    },
    Status: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "Customer_Master" }
);

const jewellerSchema = new mongoose.Schema(
  {
    JewellerID: {
      type: String,
      unique: true,
      default: shortid.generate,
      required: true,
    },
    JewellerName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    EmailID: {
      type: String,
      unique: true,
      required: true,
      maxLength: 50,
    },
    Password: {
      type: String,
      required: true,
      unique: true,
    },
    RowDate: {
      type: Date,
      required: true,
    },
    Status: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "Jeweller_Master",
  }
);

const bankSchema = new mongoose.Schema(
  {
    BankID: {
      type: String,
      unique: true,
      default: shortid.generate,
      required: true,
    },
    BankName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    EmailID: {
      type: String,
      unique: true,
      required: true,
      maxLength: 50,
    },
    Password: {
      type: String,
      required: true,
      unique: true,
    },
    RowDate: {
      type: Date,
      required: true,
    },
    Status: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "Bank_Master",
  }
);

export const customerMasterCollection = mongoose.model(
  "Customer_Master",
  customerschema
);
export const jewellerMasterCollection = mongoose.model(
  "Jeweller_Master",
  jewellerSchema
);
export const bankMasterCollection = mongoose.model("Bank_Master", bankSchema);


 

