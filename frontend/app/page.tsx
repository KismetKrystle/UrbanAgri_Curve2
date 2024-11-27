'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UrbanFarmDLPCompiler } from './components/UrbanFarmDLPCompiler';
import UrbanFarmDLPComponent from './components/UrbanFarmDLPComponent';

const UrbanFarmingPage: React.FC = () => {
  const [communityData, setCommunityData] = useState<any | null>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [userInteractions, setUserInteractions] = useState<any[]>([]);
  const [txReceipt, setTxReceipt] = useState<UseWaitForTransactionReceiptReturnType['data']>();

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
          urbanFarmDLPCompiler={urbanFarmDLPCompiler}
          setTxReceipt={setTxReceipt}
          communityData={communityData}
          solutions={solutions}
          userInteractions={userInteractions}
        />
      </div>
    </div>
  );
};

export default UrbanFarmingPage;
