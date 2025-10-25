import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Upload,
  LogOut,
  FileText,
  DollarSign,
  Calendar,
  MapPin,
  Hash,
  FileCheck,
  Plus,
} from "lucide-react";

// Main Invoice Form Component
const InvoiceForm = ({ onLogout, username }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDataUrl, setPdfDataUrl] = useState(null);

  const invoiceSchema = Yup.object().shape({
    vendor: Yup.string().required("Vendor is required"),
    purchaseOrderNumber: Yup.string().required(
      "Purchase Order Number is required"
    ),
    invoiceNumber: Yup.string().required("Invoice Number is required"),
    invoiceDate: Yup.date().required("Invoice Date is required"),
    paymentTerms: Yup.string().required("Payment Terms is required"),
    dueDate: Yup.date().required("Due Date is required"),
    invoiceType: Yup.string().required("Invoice Type is required"),
    invoiceDescription: Yup.string(),
    lineAmount: Yup.number()
      .min(0, "Amount must be positive")
      .required("Line Amount is required"),
    department: Yup.string().required("Department is required"),
    account: Yup.string().required("Account is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string(),
  });

  const dummyData = {
    vendor: "E-Transporters",
    purchaseOrderNumber: "PO-2024-001",
    invoiceNumber: "INV-2024-0567",
    invoiceDate: "2024-10-15",
    paymentTerms: "Net 30",
    dueDate: "2024-11-14",
    invoiceType: "Standard",
    invoiceDescription: "Monthly transportation services for Q4 2024",
    lineAmount: 5000,
    department: "Logistics",
    account: "5200-Travel",
    location: "Bangalore HQ",
    description:
      "Transportation and delivery services including fuel surcharges",
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfDataUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  const loadDummyPdf = () => {
    const dummyPdfDataUrl =
      "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj4Kc3RyZWFtCkJUCi9GMSA0OCBUZgoxMCA3MDAgVGQKKElOVk9JQ0UpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjczIDAwMDAwIG4gCjAwMDAwMDAyMjQgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTI0IDAwMDAwIG4gCjAwMDAwMDAzMjIgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDYvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo0MDAKJSVFT0Y=";
    setPdfDataUrl(dummyPdfDataUrl);
  };

  useEffect(() => {
    const savedForm = JSON.parse(
      localStorage.getItem("invoiceFormData") || "{}"
    );
    const savedPdf = localStorage.getItem("invoicePdfData");
    if (savedPdf) {
      setPdfDataUrl(savedPdf);
    }
  }, []);

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

      <Formik
        initialValues={JSON.parse(
          localStorage.getItem("invoiceFormData") ||
            JSON.stringify({
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
            })
        )}
        validationSchema={invoiceSchema}
        onSubmit={(values) => {
          localStorage.setItem("invoiceFormData", JSON.stringify(values));
          if (pdfDataUrl) {
            localStorage.setItem("invoicePdfData", pdfDataUrl);
          }
          alert("Invoice saved successfully!");
        }}
        enableReinitialize
      >
        {({ errors, touched, setValues, values }) => (
          <Form className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - PDF Upload */}
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
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Upload File
                    </h3>
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
                        <span className="text-sm font-medium text-gray-700">
                          PDF Loaded
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPdfDataUrl(null);
                          setPdfFile(null);
                          localStorage.removeItem("invoicePdfData");
                        }}
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

                <button
                  type="button"
                  onClick={() => {
                    setValues(dummyData);
                    loadDummyPdf();
                  }}
                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Load Dummy Data & PDF
                </button>
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-6">
                {/* Vendor Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Vendor Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vendor <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="vendor"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.vendor && touched.vendor
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="E-Transporters"
                      />
                      <ErrorMessage
                        name="vendor"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purchase Order Number{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="purchaseOrderNumber"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.purchaseOrderNumber &&
                          touched.purchaseOrderNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Select PO Number"
                      />
                      <ErrorMessage
                        name="purchaseOrderNumber"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Hash className="w-5 h-5 mr-2 text-blue-600" />
                    Invoice Details
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Invoice Number <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="invoiceNumber"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.invoiceNumber && touched.invoiceNumber
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="XXXXX-YYY"
                        />
                        <ErrorMessage
                          name="invoiceNumber"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Invoice Date <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="invoiceDate"
                          type="date"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.invoiceDate && touched.invoiceDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <ErrorMessage
                          name="invoiceDate"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Terms <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="paymentTerms"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.paymentTerms && touched.paymentTerms
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Payment Terms</option>
                          <option value="Net 15">Net 15</option>
                          <option value="Net 30">Net 30</option>
                          <option value="Net 45">Net 45</option>
                          <option value="Net 60">Net 60</option>
                          <option value="Due on Receipt">Due on Receipt</option>
                        </Field>
                        <ErrorMessage
                          name="paymentTerms"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Due Date <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="dueDate"
                          type="date"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.dueDate && touched.dueDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <ErrorMessage
                          name="dueDate"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Invoice Type <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="select"
                        name="invoiceType"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.invoiceType && touched.invoiceType
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Invoice Type</option>
                        <option value="Standard">Standard</option>
                        <option value="Credit Memo">Credit Memo</option>
                        <option value="Debit Memo">Debit Memo</option>
                        <option value="Recurring">Recurring</option>
                      </Field>
                      <ErrorMessage
                        name="invoiceType"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Invoice Description
                      </label>
                      <Field
                        as="textarea"
                        name="invoiceDescription"
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter invoice description"
                      />
                    </div>
                  </div>
                </div>

                {/* Expense Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                      Expense Details
                    </h2>
                    <span className="text-lg font-bold text-blue-600">
                      ${values.lineAmount || "0.00"} / $0.00
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Line Amount <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">
                            USD
                          </span>
                          <Field
                            name="lineAmount"
                            type="number"
                            className={`w-full pl-14 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.lineAmount && touched.lineAmount
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="0.00"
                          />
                        </div>
                        <ErrorMessage
                          name="lineAmount"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="department"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.department && touched.department
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Department</option>
                          <option value="Sales">Sales</option>
                          <option value="Marketing">Marketing</option>
                          <option value="IT">IT</option>
                          <option value="HR">HR</option>
                          <option value="Finance">Finance</option>
                          <option value="Logistics">Logistics</option>
                        </Field>
                        <ErrorMessage
                          name="department"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="account"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.account && touched.account
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Account</option>
                          <option value="5200-Travel">5200-Travel</option>
                          <option value="5100-Supplies">5100-Supplies</option>
                          <option value="5300-Equipment">5300-Equipment</option>
                          <option value="5400-Services">5400-Services</option>
                        </Field>
                        <ErrorMessage
                          name="account"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="location"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.location && touched.location
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Location</option>
                          <option value="Bangalore HQ">Bangalore HQ</option>
                          <option value="Mumbai Office">Mumbai Office</option>
                          <option value="Delhi Branch">Delhi Branch</option>
                          <option value="Chennai Center">Chennai Center</option>
                        </Field>
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter expense description"
                      />
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Comments
                  </h2>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a comment and tag @Name to notify someone"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg"
                  >
                    Submit & New
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InvoiceForm;
