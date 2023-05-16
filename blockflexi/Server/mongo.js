import mongoose, { Schema } from "mongoose";
import shortid from "shortid";
import dotenv from "dotenv";
// import { Int32, Timestamp } from "mongodb";
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
mongoose.models={};
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
    WalletAddress:{
      type:String,
      required: true
    }
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
    JewellerWallet:{
      type:String,
      required: true,
      unique:true
    }
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
      index:true
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
      type:mongoose.Schema.Types.String,
      ref: "Jeweller_Master",
      required:true,
      maxLength: 25
    },
    SchemeID: {
      type: mongoose.Schema.Types.String,
      ref: "Jewellery_Scheme",
      required:true
    },
    CustomerID: {
      type: mongoose.Schema.Types.String,
      ref: "Customer_Master",
      required: true,
      maxLength: 10
    },
    DOJ: {
      type: Date,
      default:new Date(Date.now())
    },
    LoanReq: {
      type: Boolean,
      default:false
    },
    LoanRegDate: {
      type: Date,
      
      default:null
    },
    LoanStatus_Jw: {
      type: String,
      default:null
    },
    LoanStatus_Jw_Date: {
      type: Date,
      default:null
    },
    BankID: {
      type: String,
      ref: "Bank_Master.BankID",
      maxLength: 25
    },
    LoanStatus_Bank: {
      type: String,
      default:null,
    },
    LoanStatus_Bank_Date: {
      type: Date,
      default:null
    },
    LoanAmount: {
      type: Number,
      default:0
    },
    GoldClaimStatus: {
      type: Boolean,
      default:false
    },
    GoldClaimDate: {
      type: Date,
      default:null
    },
    GoldSettledStatus: {
      type: Boolean,
      default:false
    },
    GoldSettledDate: {
      type: Date,
      default:null
    },
    SchemeName:{
      type: String,
      ref:'Jewellery_Scheme.SchemeName'
    },
    JewellerName:{
      type:String,
      ref:'Jewellery_Scheme.SchemeName'
    },
    Status:{
      type:String,
      default:'Pending'
    }
    
  },
  {
    collection: "Customer_Scheme"
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
export const customerSchemeCollection = mongoose.model(
  "Customer_Scheme",
  CustomerSchemeSchema
);
// CustomerSchemeSchema.virtual('customer',{
//   ref:'Customer_Master',
//   localField:'CustomerID',
//   foreignField:'CustomerID',
  
// })