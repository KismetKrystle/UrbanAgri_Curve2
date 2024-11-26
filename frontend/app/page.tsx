import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import UrbanFarmDLPComponent from './components/UrbanFarmDLPComponent';
import Buttons from './components/Buttons';
import UrbanFarmDLPCompiler from './hooks/UrbanFarmDLPCompiler';

const UrbanFarmingPage: React.FC = () => {
  const [communityData, setCommunityData] = useState<any | null>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [userInteractions, setUserInteractions] = useState<any[]>([]);

  const urbanFarmDLPCompiler = new UrbanFarmDLPCompiler(
    'https://api.multibaas.com/api/v0',
    'YOUR_ACCESS_TOKEN',
    '0x1234567890123456789012345678901234567890'
  );

  const handleStoreCommunityData = async (
    geoData: string,
    demographicData: string,
    agriculturalData: string,
    hydroponicData: string
  ) => {
    await urbanFarmDLPCompiler.storeCommunityData(
      geoData,
      demographicData,
      agriculturalData,
      hydroponicData
    );
    const data = await urbanFarmDLPCompiler.getCommunityData(1);
    setCommunityData(data);
  };

  const handleAddSolution = async (aiSolution: string) => {
    await urbanFarmDLPCompiler.addSolution(1, aiSolution);
    const solutionsData = await urbanFarmDLPCompiler.getSolutions(1);
    setSolutions(solutionsData);
  };

  const handleLogUserInteraction = async (action: string, details: string) => {
    await urbanFarmDLPCompiler.logUserInteraction(1, action, details);
    const interactions = await urbanFarmDLPCompiler.getUserInteractions(1);
    setUserInteractions(interactions);
  };

  const handleSubmitFeedback = async (feedback: string) => {
    await urbanFarmDLPCompiler.submitFeedback(1, feedback);
  };

  return (
    <div>
      <div className="navbar">
        <h1 className="app-title">UrbanAgri_Curve</h1>
        <ConnectButton />
      </div>
      <div>
        <UrbanFarmDLPComponent
          communityData={communityData}
          solutions={solutions}
          userInteractions={userInteractions}
        />
        <Buttons
          onStoreCommunityData={handleStoreCommunityData}
          onAddSolution={handleAddSolution}
          onLogUserInteraction={handleLogUserInteraction}
          onSubmitFeedback={handleSubmitFeedback}
        />
      </div>
    </div>
  );
};

export default UrbanFarmingPage;
