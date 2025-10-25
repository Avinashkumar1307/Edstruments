
const ActionButtons = () => (
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
);

export default ActionButtons;
