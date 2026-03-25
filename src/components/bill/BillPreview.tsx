import { QRCodeCanvas } from "qrcode.react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import "./BillCSS.css/PrintableBill.css";
import { DoctorType, Patient } from "@/types/type";

interface MedicineItem {
  id: number;
  name: string;
  dosage: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

interface BillPreviewProps {
  patient: Patient;
  currentUser: DoctorType;
  medicines: MedicineItem[];
  consultationFee: number;
  labTests: number;
  subtotal: number;
  tax: number;
  total: number;
  billDate: string;
  currentBillNumber: string;
  reportUrl: string;
  status?: "Paid" | "Pending" | "Cancelled";
  paymentMethod?: string;
  notes?: string;
  taxPercent?: number;
}

// ── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const base = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border";
  switch (status) {
    case "Paid":
      return (
        <span className={`${base} bg-emerald-100 text-emerald-700 border-emerald-200`}>
          <CheckCircle2 className="h-3 w-3" /> Paid
        </span>
      );
    case "Pending":
      return (
        <span className={`${base} bg-amber-100 text-amber-700 border-amber-200`}>
          <Clock className="h-3 w-3" /> Pending
        </span>
      );
    case "Cancelled":
      return (
        <span className={`${base} bg-red-100 text-red-600 border-red-200`}>
          <XCircle className="h-3 w-3" /> Cancelled
        </span>
      );
    default:
      return <span className="text-xs text-gray-500">{status ?? "—"}</span>;
  }
}

// ── Accreditation circle badge ───────────────────────────────────────────────
function AccrBadge({
  label, sub, bg, border, color,
}: {
  label: string; sub: string;
  bg: string; border: string; color: string;
}) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: "50%",
      background: bg, border: `2px solid ${border}`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontSize: 7.5, fontWeight: 700, color,
      lineHeight: 1.2, textAlign: "center",
      fontFamily: "Arial, sans-serif", flexShrink: 0,
    }}>
      <span>{label}</span><span>{sub}</span>
    </div>
  );
}

// ── Section heading (underlined, bold) ──────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 13, fontWeight: 700, textDecoration: "underline",
      marginTop: 12, marginBottom: 4, fontFamily: "Arial, sans-serif",
    }}>
      {children}
    </div>
  );
}

export default function BillPreview({
  patient,
  currentUser,
  medicines,
  consultationFee,
  labTests,
  subtotal,
  tax,
  total,
  billDate,
  currentBillNumber,
  reportUrl,
  status = "Pending",
  paymentMethod = "Cash",
  notes,
  taxPercent,
}: BillPreviewProps) {

  const taxLabel =
    taxPercent != null
      ? `${taxPercent}%`
      : subtotal > 0
      ? `${Math.round((tax / subtotal) * 100)}%`
      : "0%";

  const reportedTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit",
  });

  const tdBase: React.CSSProperties = {
    border: "1px solid #bbb",
    padding: "7px 8px",
    verticalAlign: "top",
    fontSize: 11,
  };

  return (
    <div style={{ fontFamily: "'Times New Roman', Georgia, serif", background: "#fff", color: "#1a1a1a", fontSize: 12, position: "relative" }}>

      {/* ── Print watermark ────────────────────────────────────────────── */}
      <div className="print-watermark">
        <span>{currentUser?.hospital}</span>
      </div>

      {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
      <header style={{
        padding: "14px 20px 10px",
        borderBottom: "2.5px solid #1a3a6b",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
      }}>
        {/* Left: logo + badges + QR */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* 3-bar logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 3, height: 40 }}>
              {(["#1a3a6b", "#c41230", "#1a3a6b"] as const).map((c, i) => (
                <div key={i} style={{ width: 9, height: "100%", background: c, borderRadius: 2 }} />
              ))}
            </div>
            <div>
              <div style={{
                fontSize: 24, fontWeight: 900, color: "#1a3a6b",
                letterSpacing: 1, lineHeight: 1,
                fontFamily: "'Arial Black', Arial, sans-serif",
              }}>
                {currentUser?.hospital?.split(" ")[0]?.toUpperCase() ?? "CLINIC"}
              </div>
              <div style={{
                fontSize: 8, fontWeight: 700, color: "#1a3a6b",
                letterSpacing: 2, fontFamily: "Arial, sans-serif", marginTop: 2,
              }}>
                {currentUser?.hospital?.toUpperCase() ?? "HOSPITAL"}
              </div>
            </div>
          </div>

          {/* Accreditation badges */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <AccrBadge label="NABH" sub="✓" bg="#f0c040" border="#d4a800" color="#8B6914" />
            <AccrBadge label="JCI"  sub="+" bg="#e8f0e8" border="#4a7a4a" color="#2a5a2a" />
          </div>

          {/* QR code */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <QRCodeCanvas value={reportUrl} size={52} level="H" />
            <span style={{ fontSize: 8, color: "#666", marginTop: 2, fontFamily: "Arial, sans-serif" }}>
              Scan Bill
            </span>
          </div>
        </div>

        {/* Right: doctor info */}
        <div style={{ textAlign: "right", maxWidth: 280 }}>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "Arial, sans-serif", color: "#1a1a1a" }}>
            {currentUser?.username}
          </div>
          <div style={{ fontSize: 9, color: "#444", lineHeight: 1.6, fontFamily: "Arial, sans-serif", marginTop: 2 }}>
            {currentUser?.specialization && <>{currentUser.specialization}<br /></>}
            {currentUser?.email && <>{currentUser.email}<br /></>}
            {currentUser?.phone && <>Ph: {currentUser.phone}</>}
          </div>
        </div>
      </header>

      {/* ══ PATIENT INFO BANNER ═════════════════════════════════════════════ */}
      <div style={{ background: "#f5f8ff", padding: "9px 20px", borderBottom: "1px solid #c0c8d8" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 24px", fontSize: 11.5 }}>
          {[
            ["UHID",           `#${patient?.id}`],
            ["Visit Date",     billDate],
            ["Patient Name",   patient?.name],
            ["Age / Gender",   `${patient?.age} / ${patient?.gender}`],
            ["Doctor",         currentUser?.username],
            ["Bill No",        currentBillNumber],
          ].map(([lbl, val], i) => (
            <div key={i} style={{ lineHeight: 1.65 }}>
              <span style={{ fontWeight: 700 }}>{lbl}</span> : {val}
            </div>
          ))}
          <div style={{ gridColumn: "span 2", fontSize: 11.5, lineHeight: 1.65 }}>
            <span style={{ fontWeight: 700 }}>Patient Address</span> : {patient?.address ?? "—"}
          </div>
        </div>
      </div>

      {/* ══ BODY ════════════════════════════════════════════════════════════ */}
      <div style={{ padding: "14px 20px" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, textDecoration: "underline", fontFamily: "Arial, sans-serif" }}>
            Outpatient Billing Invoice
          </div>
          <div style={{ fontSize: 11, color: "#444", fontFamily: "Arial, sans-serif" }}>
            Reported DateTime : {billDate} {reportedTime}
          </div>
        </div>

        {/* ── Services section ─────────────────────────────────────────── */}
        <SectionHeading>Services &amp; Consultation</SectionHeading>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 4 }}>
          <thead>
            <tr style={{ background: "#1a3a6b" }}>
              {["Description", "Amount (₹)"].map((h, i) => (
                <th key={i} style={{
                  border: "1px solid #999", padding: "6px 8px",
                  color: "#fff", fontSize: 11, fontWeight: 700,
                  textAlign: i === 0 ? "left" : "right",
                  fontFamily: "Arial, sans-serif",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdBase }}>Doctor Consultation Fee</td>
              <td style={{ ...tdBase, textAlign: "right" }}>₹{consultationFee.toFixed(2)}</td>
            </tr>
            <tr style={{ background: "#f9f9f9" }}>
              <td style={{ ...tdBase }}>Laboratory Tests</td>
              <td style={{ ...tdBase, textAlign: "right" }}>₹{labTests.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* ── Prescribed Medicines ─────────────────────────────────────── */}
        {medicines.length > 0 && (
          <>
            <SectionHeading>Rx:(Prescribed Medicines)</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 4 }}>
              <thead>
                <tr style={{ background: "#1a3a6b" }}>
                  {["S.No", "Medicine Name", "Dosage", "Qty", "Price/Unit (₹)", "Total (₹)"].map((h, i) => (
                    <th key={i} style={{
                      border: "1px solid #999", padding: "6px 8px",
                      color: "#fff", fontSize: 11, fontWeight: 700,
                      textAlign: i === 1 ? "left" : "center",
                      fontFamily: "Arial, sans-serif",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {medicines.map((med, idx) => (
                  <tr key={med.id ?? idx} style={{ background: idx % 2 !== 0 ? "#f9f9f9" : "#fff" }}>
                    <td style={{ ...tdBase, textAlign: "center" }}>{idx + 1}</td>
                    <td style={{ ...tdBase, fontWeight: 700 }}>{med.name}</td>
                    <td style={{ ...tdBase, textAlign: "center" }}>{med.dosage}</td>
                    <td style={{ ...tdBase, textAlign: "center" }}>{med.quantity}</td>
                    <td style={{ ...tdBase, textAlign: "right" }}>₹{med.pricePerUnit.toFixed(2)}</td>
                    <td style={{ ...tdBase, textAlign: "right", fontWeight: 700 }}>₹{med.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ── Bill Summary ─────────────────────────────────────────────── */}
        <SectionHeading>Bill Summary</SectionHeading>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 4 }}>
          <tbody>
            <tr>
              <td style={{ ...tdBase, width: "75%" }}>Subtotal</td>
              <td style={{ ...tdBase, textAlign: "right" }}>₹{subtotal.toFixed(2)}</td>
            </tr>
            <tr style={{ background: "#f9f9f9" }}>
              <td style={{ ...tdBase }}>Tax ({taxLabel})</td>
              <td style={{ ...tdBase, textAlign: "right" }}>₹{tax.toFixed(2)}</td>
            </tr>
            <tr style={{ background: "#1a3a6b" }}>
              <td style={{ ...tdBase, border: "1px solid #0d2a52", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                Total Amount
              </td>
              <td style={{ ...tdBase, border: "1px solid #0d2a52", textAlign: "right", color: "#fff", fontWeight: 700, fontSize: 15 }}>
                ₹{total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Payment Info ─────────────────────────────────────────────── */}
        <SectionHeading>Payment Details</SectionHeading>
        <div style={{ fontSize: 12, marginLeft: 8, lineHeight: 2 }}>
          <div>
            <span style={{ fontWeight: 700 }}>Payment Status :</span>{" "}
            <StatusBadge status={status} />
          </div>
          <div>
            <span style={{ fontWeight: 700 }}>Payment Method :</span> {paymentMethod}
          </div>
          {notes && (
            <div>
              <span style={{ fontWeight: 700 }}>Notes :</span> {notes}
            </div>
          )}
        </div>

        {/* Bill number reference */}
        <div style={{ marginTop: 10, fontSize: 10, color: "#aaa", fontFamily: "Arial, sans-serif", textAlign: "right" }}>
          Ref: {currentBillNumber}
        </div>
      </div>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer>
        <div style={{
          background: "#1a3a6b", color: "#fff",
          padding: "9px 20px", fontSize: 10,
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", gap: 6,
          fontFamily: "Arial, sans-serif",
        }}>
          {currentUser?.hospital && <span>&#9679; {currentUser.hospital}</span>}
          {currentUser?.phone   && <span>&#9742; {currentUser.phone}</span>}
          {currentUser?.email   && <span>&#9993; {currentUser.email}</span>}
        </div>
        <div style={{
          background: "#f0f4ff", borderTop: "1px solid #c0c8d8",
          padding: "5px 20px", fontSize: 10, textAlign: "center",
          color: "#333", fontFamily: "Arial, sans-serif",
        }}>
          Thank you for choosing {currentUser?.hospital ?? "our hospital"} &nbsp;·&nbsp;
          This is a computer-generated bill and does not require a signature
        </div>
        <div style={{
          background: "#1a3a6b", color: "#aabddd",
          padding: "4px 20px", fontSize: 10,
          fontFamily: "Arial, sans-serif",
        }}>
          Page 1 of 1
        </div>
      </footer>
    </div>
  );
}