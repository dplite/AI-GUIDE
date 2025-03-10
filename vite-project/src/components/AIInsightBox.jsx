const AIInsightBox = ({ aiStory }) => {
  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">🗣️ AI Narrator</h2>
      <p className="mt-2">{aiStory || "Loading AI travel facts..."}</p>
    </div>
  );
};

export default AIInsightBox;
