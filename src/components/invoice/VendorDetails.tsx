
import { FileText } from "lucide-react";
import FormField from "./FormField";

const VendorDetails = ({ errors, touched }: { errors: any; touched: any }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <FileText className="w-5 h-5 mr-2 text-blue-600" />
      Vendor Details
    </h2>
    <div className="space-y-4">
      <FormField
        name="vendor"
        label="Vendor"
        placeholder="E-Transporters"
        errors={errors}
        touched={touched}
      />
      <FormField
        name="purchaseOrderNumber"
        label="Purchase Order Number"
        placeholder="Select PO Number"
        errors={errors}
        touched={touched}
      />
    </div>
  </div>
);

export default VendorDetails;
