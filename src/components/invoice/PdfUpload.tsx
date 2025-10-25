
import { Upload, FileCheck } from "lucide-react";

const PdfUpload = ({
  pdfDataUrl,
  handleFileUpload,
  removePdf,
}: {
  pdfDataUrl: string | null;
  handleFileUpload: (event: any) => void;
  removePdf: () => void;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">
      Upload Your Invoice
    </h2>
    <p className="text-sm text-gray-600 mb-4">
      To auto-capture tools and save time
    </p>

    {!pdfDataUrl ? (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-full mb-4">
          <Upload className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Upload File</h3>
        <p className="text-sm text-gray-500 mb-4">
          Click to upload or Drag and Drop
        </p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
        >
          Upload File
        </label>
      </div>
    ) : (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">PDF Loaded</span>
          </div>
          <button
            type="button"
            onClick={removePdf}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
        <div className="bg-white p-4 h-96 flex items-center justify-center">
          <iframe
            src={pdfDataUrl}
            className="w-full h-full border-0"
            title="Invoice PDF"
          />
        </div>
      </div>
    )}
  </div>
);

export default PdfUpload;
