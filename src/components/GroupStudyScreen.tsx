import React from "react";
import { Screen } from "../App";

interface Props {
  onNavigate: (screen: Screen) => void;
}

const GroupStudyScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Group Study</h1>
      <button
        onClick={() => onNavigate("home")}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
};

export default GroupStudyScreen;
