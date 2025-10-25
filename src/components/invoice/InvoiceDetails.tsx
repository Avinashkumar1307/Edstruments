
// @ts-nocheck
import { Hash } from "lucide-react";
import FormField from "./FormField";

const InvoiceDetails = ({ errors, touched }: { errors: any; touched: any }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <Hash className="w-5 h-5 mr-2 text-blue-600" />
      Invoice Details
    </h2>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name="invoiceNumber"
          label="Invoice Number"
          placeholder="XXXXX-YYY"
          errors={errors}
          touched={touched}
        />
        <FormField
          name="invoiceDate"
          label="Invoice Date"
          type="date"
          errors={errors}
          touched={touched}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name="paymentTerms"
          label="Payment Terms"
          as="select"
          errors={errors}
          touched={touched}
          options={[
            { value: "", label: "Select Payment Terms" },
            { value: "Net 15", label: "Net 15" },
            { value: "Net 30", label: "Net 30" },
            { value: "Net 45", label: "Net 45" },
            { value: "Net 60", label: "Net 60" },
            { value: "Due on Receipt", label: "Due on Receipt" },
          ]}
        />
        <FormField
          name="dueDate"
          label="Due Date"
          type="date"
          errors={errors}
          touched={touched}
        />
      </div>
      <FormField
        name="invoiceType"
        label="Invoice Type"
        as="select"
        errors={errors}
        touched={touched}
        options={[
          { value: "", label: "Select Invoice Type" },
          { value: "Standard", label: "Standard" },
          { value: "Credit Memo", label: "Credit Memo" },
          { value: "Debit Memo", label: "Debit Memo" },
          { value: "Recurring", label: "Recurring" },
        ]}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Invoice Description
        </label>
        <FormField
          name="invoiceDescription"
          as="textarea"
          rows="3"
          placeholder="Enter invoice description"
          errors={errors}
          touched={touched}
        />
      </div>
    </div>
  </div>
);

export default InvoiceDetails;
