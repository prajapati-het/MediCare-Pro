import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Printer, Share2, FileText } from "lucide-react";
import { Patient } from "@/data/patientsData";
import ReportHeader from "./ReportHeader";
import PrintableReport from "./PrintableReport";

interface PrintPreviewModalProps {
  open: boolean;
  onClose: () => void;
  patient: Patient;
}

const sections = ["Vitals", "Body", "Medical", "Labs", "Prescriptions", "History"];

export default function PrintPreviewModal({ open, onClose, patient }: PrintPreviewModalProps) {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedSections([]);
      setShowPreview(false);
    }
  }, [open]);

  const toggleSection = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleAll = () => {
    if (selectedSections.length === sections.length) setSelectedSections([]);
    else setSelectedSections([...sections]);
  };

  const proceedToPreview = () => {
    if (selectedSections.length === 0) return alert("Please select at least one section!");
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderPrintContent = () => (
    <PrintableReport
        patient={patient}
        selectedSections={selectedSections}
      />
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-6xl max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <DialogTitle className="text-2xl font-semibold">
                  {showPreview ? "Print Preview" : "Select Sections to Print"}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          {!showPreview ? (
            <div className="px-6 py-6">
  {/* Header Section */}
  <div className="mb-6">
    <p className="text-sm text-gray-600 mb-2">
      Select the sections you want to include in the patient report
    </p>
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="font-medium text-primary">
        {selectedSections.length} of {sections.length} selected
      </span>
      {selectedSections.length > 0 && (
        <button
          onClick={() => setSelectedSections([])}
          className="text-primary hover:underline ml-auto"
        >
          Clear all
        </button>
      )}
    </div>
  </div>

  {/* Sections Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
    {sections.map(section => (
      <div
        key={section}
        className={`group relative flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
          selectedSections.includes(section)
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-gray-200 hover:border-primary/40 hover:bg-gray-50"
        }`}
        onClick={() => toggleSection(section)}
      >
        {/* Checkbox */}
        <div className="flex-shrink-0">
          <Checkbox
            checked={selectedSections.includes(section)}
            onCheckedChange={() => toggleSection(section)}
            className="h-5 w-5"
          />
        </div>

        {/* Label */}
        <Label className="cursor-pointer font-medium text-sm flex-1 text-gray-700 group-hover:text-gray-900">
          {section}
        </Label>

        {/* Selected Indicator */}
        {selectedSections.includes(section) && (
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    ))}
  </div>

  {/* Quick Select Options */}
  <div className="flex items-center gap-2 mb-6 pb-6 border-b">
    <span className="text-xs font-medium text-gray-600">Quick select:</span>
    <button
      onClick={() => setSelectedSections(sections)}
      className="text-xs px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
    >
      Select All
    </button>
    <button
      onClick={() => setSelectedSections([])}
      className="text-xs px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
    >
      Clear All
    </button>
  </div>

  {/* Action Buttons */}
  <div className="flex justify-between items-center gap-3">
    {/* Info Text */}
    <p className="text-xs text-gray-500">
      {selectedSections.length === 0 ? (
        <span className="text-amber-600 font-medium">
          Please select at least one section
        </span>
      ) : (
        <span>
          Ready to generate report with {selectedSections.length} section{selectedSections.length !== 1 ? 's' : ''}
        </span>
      )}
    </p>

    {/* Buttons */}
    <div className="flex gap-3">
      <Button variant="outline" onClick={onClose} className="min-w-[100px]">
        Cancel
      </Button>
      <Button
        onClick={proceedToPreview}
        disabled={selectedSections.length === 0}
        className="min-w-[140px] shadow-sm"
      >
        <FileText className="w-4 h-4 mr-2" />
        Preview Report
      </Button>
    </div>
  </div>
</div>
          ) : (
            <div className="flex flex-col h-[90vh]">
              <ScrollArea className="flex-1 overflow-y-auto px-6 py-4">
                {renderPrintContent()}
              </ScrollArea>

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center sticky bottom-0 z-10">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Back to Selection
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => alert('Share functionality coming soon!')}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={handlePrint}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print Report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Hidden print container - rendered outside dialog */}
      {showPreview && (
        <div id="printable-content" className="hidden print:block">
          {renderPrintContent()}
        </div>
      )}

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #printable-content,
          #printable-content * {
            visibility: visible !important;
          }

          #printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }

          .print-container {
            box-shadow: none !important;
            border: none !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .page-break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          @page {
            size: A4;
            margin: 0.5in;
          }
        }
      `}</style>
    </>
  );
}