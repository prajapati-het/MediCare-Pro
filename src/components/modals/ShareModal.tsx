import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import {
  Copy,
  Check,
  Link2,
  ChevronDown,
  X,
  QrCode,
  Mail,
  MessageCircle,
} from "lucide-react";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  patientName?: string;
  patientId?: string | number;
}

// Platform definitions
const platforms = [
  {
    name: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    getUrl: (link: string, text: string) =>
      `https://wa.me/?text=${encodeURIComponent(text + " " + link)}`,
  },
  {
    name: "Telegram",
    color: "#26A5E4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    getUrl: (link: string, text: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
  },
  {
    name: "Facebook",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    getUrl: (link: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
  },
  {
    name: "X (Twitter)",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    getUrl: (link: string, text: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    getUrl: (link: string, text: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}&summary=${encodeURIComponent(text)}`,
  },
  {
    name: "Mail",
    color: "#EA4335",
    icon: <Mail className="w-5 h-5" />,
    getUrl: (link: string, text: string) =>
      `mailto:?subject=${encodeURIComponent("Patient Report")}&body=${encodeURIComponent(text + "\n\n" + link)}`,
  },
  {
    name: "SMS",
    color: "#34C759",
    icon: <MessageCircle className="w-5 h-5" />,
    getUrl: (link: string, text: string) =>
      `sms:?&body=${encodeURIComponent(text + " " + link)}`,
  },
];

export default function ShareModal({ open, onClose, patientName = "Patient", patientId }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    if (open) {
      const reportUrl = `${window.location.origin}/reports/print/${patientId}`;
      setShareLink(reportUrl);
      setShowPlatforms(false);
      setShowQR(false);
      setCopied(false);
    }
  }, [open, patientId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const shareText = `Patient report for ${patientName}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md p-0 overflow-hidden rounded-2xl shadow-2xl border-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 pt-6 pb-5">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white text-lg font-semibold tracking-tight flex items-center gap-2">
                <Link2 className="w-5 h-5 text-sky-400" />
                Share Report
              </DialogTitle>
              <button
                title="Close"
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors rounded-lg p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Share this report securely via link or platform
            </p>
          </DialogHeader>

          {/* Link Box */}
          <div className="mt-4 flex items-center gap-2 bg-slate-700/60 border border-slate-600 rounded-xl px-3 py-2.5">
            <span className="text-sky-400 flex-shrink-0">
              <Link2 className="w-4 h-4" />
            </span>
            <span className="text-slate-300 text-xs font-mono truncate flex-1 select-all">
              {shareLink}
            </span>
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-sky-500 hover:bg-sky-400 text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white px-6 py-5 space-y-4">
          {/* Share via Platform */}
          <div>
            <button
              onClick={() => {
                setShowPlatforms((v) => !v);
                setShowQR(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50 transition-all text-sm font-medium text-slate-700 group"
            >
              <span className="flex items-center gap-2">
                <span className="text-sky-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </span>
                Share via Platform
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showPlatforms ? "rotate-180" : ""}`}
              />
            </button>

            {/* Platform Grid */}
            {showPlatforms && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.getUrl(shareLink, shareText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
                      style={{
                        backgroundColor: p.color,
                        color: p.name === "Snapchat" ? "#000" : "#fff",
                      }}
                    >
                      {p.icon}
                    </div>
                    <span className="text-xs text-slate-600 font-medium group-hover:text-slate-900">
                      {p.name}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* QR Code */}
          <div>
            <button
              onClick={() => {
                setShowQR((v) => !v);
                setShowPlatforms(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50 transition-all text-sm font-medium text-slate-700"
            >
              <span className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-sky-500" />
                Show QR Code
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showQR ? "rotate-180" : ""}`}
              />
            </button>

            {showQR && shareLink && (
              <div className="mt-3 flex flex-col items-center gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                  <QRCodeCanvas
                    value={shareLink}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="text-xs text-slate-500 text-center">
                  Scan to open the patient report on any device
                </p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
            This link is secure and expires in 7 days. Only authorized personnel should access patient reports.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}