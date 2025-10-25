
//@ts-nocheck
import { DollarSign } from "lucide-react";
import FormField from "./FormField";

const ExpenseDetails = ({
  errors,
  touched,
  values,
}: {
  errors: any;
  touched: any;
  values: any;
}) => (
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
            <span className="absolute left-3 top-2.5 text-gray-500">USD</span>
            <FormField
              name="lineAmount"
              type="number"
              placeholder="0.00"
              errors={errors}
              touched={touched}
            />
          </div>
        </div>
        <FormField
          name="department"
          label="Department"
          as="select"
          errors={errors}
          touched={touched}
          options={[
            { value: "", label: "Select Department" },
            { value: "Sales", label: "Sales" },
            { value: "Marketing", label: "Marketing" },
            { value: "IT", label: "IT" },
            { value: "HR", label: "HR" },
            { value: "Finance", label: "Finance" },
            { value: "Logistics", label: "Logistics" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name="account"
          label="Account"
          as="select"
          errors={errors}
          touched={touched}
          options={[
            { value: "", label: "Select Account" },
            { value: "5200-Travel", label: "5200-Travel" },
            { value: "5100-Supplies", label: "5100-Supplies" },
            { value: "5300-Equipment", label: "5300-Equipment" },
            { value: "5400-Services", label: "5400-Services" },
          ]}
        />
        <FormField
          name="location"
          label="Location"
          as="select"
          errors={errors}
          touched={touched}
          options={[
            { value: "", label: "Select Location" },
            { value: "Bangalore HQ", label: "Bangalore HQ" },
            { value: "Mumbai Office", label: "Mumbai Office" },
            { value: "Delhi Branch", label: "Delhi Branch" },
            { value: "Chennai Center", label: "Chennai Center" },
          ]}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <FormField
          name="description"
          as="textarea"
          rows="3"
          placeholder="Enter expense description"
          errors={errors}
          touched={touched}
        />
      </div>
    </div>
  </div>
);

export default ExpenseDetails;
