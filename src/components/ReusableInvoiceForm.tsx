import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PdfUpload from "./invoice/PdfUpload";
import VendorDetails from "./invoice/VendorDetails";
import InvoiceDetails from "./invoice/InvoiceDetails";
import ExpenseDetails from "./invoice/ExpenseDetails";
import Comments from "./invoice/Comments";
import ActionButtons from "./invoice/ActionButtons";

// Reusable Invoice Form Component
const ReusableInvoiceForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: any;
  onSubmit: (values: any) => void;
}) => {
  // const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

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

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      // setPdfFile(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPdfDataUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  const removePdf = () => {
    setPdfDataUrl(null);
    // setPdfFile(null);
    localStorage.removeItem("invoicePdfData");
  };

  useEffect(() => {
    const savedPdf = localStorage.getItem("invoicePdfData");
    if (savedPdf) {
      setPdfDataUrl(savedPdf);
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={invoiceSchema}
      onSubmit={(values) => {
        if (pdfDataUrl) {
          localStorage.setItem("invoicePdfData", pdfDataUrl);
        }
        onSubmit(values);
      }}
      enableReinitialize
    >
      {({ errors, touched, values }) => (
        <Form className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PdfUpload
              pdfDataUrl={pdfDataUrl}
              handleFileUpload={handleFileUpload}
              removePdf={removePdf}
            />

            <div className="space-y-6">
              <VendorDetails errors={errors} touched={touched} />
              <InvoiceDetails errors={errors} touched={touched} />
              <ExpenseDetails
                errors={errors}
                touched={touched}
                values={values}
              />
              <Comments />
              <ActionButtons />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReusableInvoiceForm;
