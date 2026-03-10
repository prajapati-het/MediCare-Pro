import express from "express";
import { createBill, getBillById, getBillsByDoctor, getBillsByPatient, updateBillStatus } from "../controllers/BillController.js";
import twilio from "twilio";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";


const BillRouter = express.Router();

BillRouter.post("/create", createBill);
BillRouter.get("/:id", getBillById);
BillRouter.get("/doctor/:doctorCode", getBillsByDoctor);
BillRouter.get("/patient/:patientId", getBillsByPatient);
BillRouter.put("/:id/status", updateBillStatus);


// Twilio credentials from env
const accountSid = "AC35b9c4380e107f5fe36789b25cfd7c11";
const authToken = "e388a7cd66be0fb8ba35e088e4de8617";
const client = twilio(accountSid, authToken);

// Dummy WhatsApp sender route

BillRouter.post("/send-whatsapp-dummy", async (req, res) => {
  try {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    const pdfPath = path.join(publicDir, "dummy.pdf");
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    doc.fontSize(20).text("Dummy PDF", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text("This is a dummy PDF for testing WhatsApp sending.");
    doc.text("You can replace this with real bill data later.");
    doc.end();

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    const pdfUrl = `https://dorian-unboggy-donita.ngrok-free.dev/public/dummy.pdf`;

    const accountSid = "AC35b9c4380e107f5fe36789b25cfd7c11";
    const authToken = "e388a7cd66be0fb8ba35e088e4de8617";
    const client = twilio(accountSid, authToken);

    try {
      await client.messages.create({
        from: "whatsapp:+14155238886",
        contentSid: "HX229f5a04fd0510ce1b071852155d3e75",
        contentVariables: JSON.stringify({ 1: "12345" }),
        to: "whatsapp:+917984603330",
      });
    } catch (err) {
      console.error("Template message error:", err);
    }

    try {
      await client.messages.create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+917984603330",
        body: "Here is your dummy PDF",
        mediaUrl: [pdfUrl],
      });
    } catch (err) {
      console.error("PDF send error:", err);
    }

    res.json({ success: true, pdfUrl });
  } catch (err:any) {
    console.error("Route error:", err);
    res.status(500).json({ error: err.toString() });
  }
});


export default BillRouter;