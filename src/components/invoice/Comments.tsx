
const Comments = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Comments</h2>
    <textarea
      // rows="3"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Add a comment and tag @Name to notify someone"
    />
  </div>
);

export default Comments;
