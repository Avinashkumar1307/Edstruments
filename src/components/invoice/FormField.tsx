import { Field, ErrorMessage } from "formik";

const FormField = ({
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  options,
  errors,
  touched,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  as?: string;
  options?: { value: string; label: string }[];
  errors: any;
  touched: any;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <Field
      name={name}
      type={type}
      as={as}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        errors[name] && touched[name] ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    >
      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </Field>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs mt-1"
    />
  </div>
);

export default FormField;
