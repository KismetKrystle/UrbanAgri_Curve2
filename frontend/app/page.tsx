'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UrbanFarmDLPCompiler } from './components/UrbanFarmDLPCompiler';
import UrbanFarmDLPComponent from './components/UrbanFarmDLPComponent';
import { UseWaitForTransactionReceiptReturnType } from 'wagmi'; // Make sure to import this

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

  // We'll move these handlers to the UrbanFarmDLPComponent
  // Remove handleStoreCommunityData, handleAddSolution, handleLogUserInteraction, and handleSubmitFeedback from here

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
          setCommunityData={setCommunityData}
          solutions={solutions}
          setSolutions={setSolutions}
          userInteractions={userInteractions}
          setUserInteractions={setUserInteractions}
        />
      </div>
    </div>
  );
};

export default UrbanFarmingPage;
