import mongoose, { Schema } from "mongoose";
import shortid from "shortid";
import dotenv from "dotenv";
import { Int32, Timestamp } from "mongodb";
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
const schemeSchema = new mongoose.Schema(
  {
    JewellerID: {
      type: String,
      ref: "Jeweller_Master.JewellerID",
    },
    SchemeID: {
      type: String,
      unique: true,
      default: shortid.generate,
      required: true,
    },
    SchemeName: {
      type: String,
      require: true,
    },
    SchemeDetails: {
      type: String,
      require: true,
    },
    MonthlyPayment: {
      type: Number,
      require: true,
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
    collection: "Jewellery_Scheme",
  }
);
const CustomerSchemeSchema = new mongoose.Schema(
  {
    JewellerID: {
      type: String,
      ref: "Jeweller_Master.JewellerID",
    },
    SchemeID: {
      type: String,
      ref: "Jewellery_Scheme.SchemeID",
    },
    CustomerID: {
      type: String,
      ref: "Customer_Master.CustomerID",
      require: true,
    },
    DOJ: {
      type: Date,
    },
    LoanReq: {
      type: Boolean,
    },
    LoanRegDate: {
      type: Date,
      require: true,
    },
    LoanStatus_Jw: {
      type: String,
    },
    LoanStatus_Jw_Date: {
      type: Date,
    },
    BankID: {
      type: String,
      ref: "Bank_Master.BankID",
    },
    LoanStatus_Bank: {
      type: String,
    },
    LoanStatus_Bank_Date: {
      type: Date,
    },
    LoanAmount: {
      type: Number,
    },
    GoldClaimStatus: {
      type: Boolean,
    },
    GoldClaimDate: {
      type: Date,
    },
    GoldSettledStatus: {
      type: Boolean,
    },
    GoldSettledDate: {
      type: Date,
    },
  },
  {
    collection: "Customer_Scheme",
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
export const jewellerySchemeCollection = mongoose.model(
  "Jewellery_Scheme",
  schemeSchema
);
export const CustomerSchemeCollection = mongoose.model(
  "Customer_Scheme",
  CustomerSchemeSchema
);
