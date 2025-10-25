import { useState, useEffect } from "react";
import ReusableInvoiceForm from "./ReusableInvoiceForm";
import { LogOut, FileText } from "lucide-react";

// Main Invoice Form Component
const InvoiceForm = ({
  onLogout,
  username,
}: {
  onLogout: () => void;
  username: string;
}) => {
  const [initialValues, setInitialValues] = useState({
    vendor: "",
    purchaseOrderNumber: "",
    invoiceNumber: "",
    invoiceDate: "",
    paymentTerms: "",
    dueDate: "",
    invoiceType: "",
    invoiceDescription: "",
    lineAmount: "",
    department: "",
    account: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const savedForm = JSON.parse(
      localStorage.getItem("invoiceFormData") || "{}"
    );
    if (Object.keys(savedForm).length > 0) {
      setInitialValues(savedForm);
    }
  }, []);

  const handleSubmit = (values: any) => {
    localStorage.setItem("invoiceFormData", JSON.stringify(values));
    alert("Invoice saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Create New Invoice
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{username}</span>
            </span>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <ReusableInvoiceForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default InvoiceForm;