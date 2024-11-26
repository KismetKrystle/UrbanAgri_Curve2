import React, { useState } from "react";
import ActionButton from "./ActionButton";
import UrbanFarmDLPCompiler from "../hooks/UrbanFarmDLPCompiler";

const UrbanFarmDLPComponent: React.FC = () => {
  const urbanFarmDLPCompiler = new UrbanFarmDLPCompiler(
    "https://api.multibaas.com/api/v0",
    "YOUR_ACCESS_TOKEN",
    "0x1234567890123456789012345678901234567890"
  );

  const [communityData, setCommunityData] = useState<any | null>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [userInteractions, setUserInteractions] = useState<any[]>([]);

  const handleStoreCommunityData = async () => {
    await urbanFarmDLPCompiler.storeCommunityData(
      "geoData",
      "demographicData",
      "agriculturalData",
      "hydroponicData"
    );
    const data = await urbanFarmDLPCompiler.getCommunityData(1);
    setCommunityData(data);
  };

  const handleAddSolution = async () => {
    await urbanFarmDLPCompiler.addSolution(1, "aiSolution");
    const solutionsData = await urbanFarmDLPCompiler.getSolutions(1);
    setSolutions(solutionsData);
  };

  const handleLogUserInteraction = async () => {
    await urbanFarmDLPCompiler.logUserInteraction(1, "action", "details");
    const interactions = await urbanFarmDLPCompiler.getUserInteractions(1);
    setUserInteractions(interactions);
  };

  const handleSubmitFeedback = async () => {
    await urbanFarmDLPCompiler.submitFeedback(1, "feedback");
  };

  return (
    <div>
      <ActionButton
        label="Store Community Data"
        count={communityData?.id || 0}
        isActive={communityData !== null}
        isDisabled={false}
        handleAction={handleStoreCommunityData}
      />
      <ActionButton
        label="Add Solution"
        count={solutions.length}
        isActive={solutions.length > 0}
        isDisabled={false}
        handleAction={handleAddSolution}
      />
      <ActionButton
        label="Log User Interaction"
        count={userInteractions.length}
        isActive={userInteractions.length > 0}
        isDisabled={false}
        handleAction={handleLogUserInteraction}
      />
      <ActionButton
        label="Submit Feedback"
        count={0}
        isActive={false}
        isDisabled={false}
        handleAction={handleSubmitFeedback}
      />
    </div>
  );
};

export default UrbanFarmDLPComponent;
