// import mongoose, { Schema, Types } from "mongoose";

// export interface IBillMedicine {
//   name: string;
//   dosage: string;
//   quantity: number;
//   pricePerUnit: number;
//   total: number;
// }

// export interface IBill {
//   billNumber: string;

//   doctorId: Types.ObjectId;
//   doctorCode: number;

//   patientId: Types.ObjectId;

//   medicines: IBillMedicine[];

//   consultationFee: number;
//   labTestsFee: number;

//   subtotal: number;
//   tax: number;
//   total: number;

//   status: "Pending" | "Paid" | "Cancelled";

//   paymentMethod: "Cash" | "Card" | "UPI" | "Online";

//   notes?: string;

//   createdAt?: Date;
//   updatedAt?: Date;
// }


// const MedicineSchema = new Schema({
//   name: String,
//   dosage: String,
//   quantity: Number,
//   pricePerUnit: Number,
//   total: Number,
// });

// const BillSchema = new Schema(
//   {
//     billNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     doctorId: {
//       type: Schema.Types.ObjectId,
//       ref: "Doctor",
//       required: true,
//     },

//     doctorCode: {
//       type: Number,
//       required: true,
//     },

//     patientId: {
//       type: Schema.Types.ObjectId,
//       ref: "Patient",
//       required: true,
//     },

//     medicines: [MedicineSchema],

//     consultationFee: {
//       type: Number,
//       default: 0,
//     },

//     labTestsFee: {
//       type: Number,
//       default: 0,
//     },

//     subtotal: Number,
//     tax: Number,
//     total: Number,

//     status: {
//       type: String,
//       enum: ["Pending", "Paid", "Cancelled"],
//       default: "Pending",
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["Cash", "Card", "UPI", "Online"],
//       default: "Cash",
//     },

//     notes: String,
//   },
//   {
//     timestamps: true,
//   }
// );


// export const Bill = mongoose.model<IBill>("Bill", BillSchema);


import mongoose, { Schema, Types, Document } from "mongoose";

export interface IBillMedicine {
  name: string;
  dosage: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export interface IBill extends Document {
  billNumber: string;

  doctorId: Types.ObjectId;
  doctorCode: number;

  // ✅ changed
  patientId: any;

  medicines: IBillMedicine[];

  consultationFee: number;
  labTestsFee: number;

  subtotal: number;
  tax: number;
  total: number;

  status: "Pending" | "Paid" | "Cancelled";

  paymentMethod: "Cash" | "Card" | "UPI" | "Online";

  notes?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const MedicineSchema = new Schema({
  name: String,
  dosage: String,
  quantity: Number,
  pricePerUnit: Number,
  total: Number,
});

const BillSchema = new Schema(
  {
    billNumber: {
      type: String,
      required: true,
      unique: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    doctorCode: {
      type: Number,
      required: true,
    },

    // ✅ changed here
    patientId: {
  type: Schema.Types.Mixed,
  required: true,
},

    medicines: [MedicineSchema],

    consultationFee: {
      type: Number,
      default: 0,
    },

    labTestsFee: {
      type: Number,
      default: 0,
    },

    subtotal: Number,
    tax: Number,
    total: Number,

    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Online"],
      default: "Cash",
    },

    notes: String,
  },
  {
    timestamps: true,
  }
);

export const Bill = mongoose.model<IBill>("Bill", BillSchema);