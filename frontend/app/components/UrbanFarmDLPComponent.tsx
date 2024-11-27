// components/UrbanFarmDLPComponent.tsx
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { UrbanFarmDLPCompiler } from './UrbanFarmDLPCompiler';
import ActionButton from './ActionButton';
import { UseWaitForTransactionReceiptReturnType } from 'wagmi';

interface UrbanFarmDLPComponentProps {
  urbanFarmDLPCompiler: UrbanFarmDLPCompiler;
  setTxReceipt: (receipt: UseWaitForTransactionReceiptReturnType['data']) => void;
  communityData: any | null;
  setCommunityData: React.Dispatch<React.SetStateAction<any | null>>;
  solutions: any[];
  setSolutions: React.Dispatch<React.SetStateAction<any[]>>;
  userInteractions: any[];
  setUserInteractions: React.Dispatch<React.SetStateAction<any[]>>;
}

const UrbanFarmDLPComponent: React.FC<UrbanFarmDLPComponentProps> = ({
  urbanFarmDLPCompiler,
  setTxReceipt,
  communityData,
  setCommunityData,
  solutions,
  setSolutions,
  userInteractions,
  setUserInteractions
}) => {
  const { isConnected } = useAccount();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStoreCommunityData = async () => {
    if (!isConnected) return;
    setIsProcessing(true);
    try {
      await urbanFarmDLPCompiler.storeCommunityData("geoData", "demographicData", "agriculturalData", "hydroponicData");
      const data = await urbanFarmDLPCompiler.getCommunityData(1);
      setCommunityData(data);
      console.log("Community data stored successfully");
    } catch (error) {
      console.error("Error storing community data:", error);
    }
    setIsProcessing(false);
  };

  const handleAddSolution = async () => {
    if (!isConnected) return;
    setIsProcessing(true);
    try {
      await urbanFarmDLPCompiler.addSolution(1, "AI generated solution");
      const solutionsData = await urbanFarmDLPCompiler.getSolutions(1);
      setSolutions(solutionsData);
      console.log("Solution added successfully");
    } catch (error) {
      console.error("Error adding solution:", error);
    }
    setIsProcessing(false);
  };

  const handleLogUserInteraction = async () => {
    if (!isConnected) return;
    setIsProcessing(true);
    try {
      await urbanFarmDLPCompiler.logUserInteraction(1, "action", "details");
      const interactions = await urbanFarmDLPCompiler.getUserInteractions(1);
      setUserInteractions(interactions);
      console.log("User interaction logged successfully");
    } catch (error) {
      console.error("Error logging user interaction:", error);
    }
    setIsProcessing(false);
  };

  const handleSubmitFeedback = async () => {
    if (!isConnected) return;
    setIsProcessing(true);
    try {
      await urbanFarmDLPCompiler.submitFeedback(1, "User feedback");
      console.log("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="space-y-4">
      <ActionButton 
        label="Store Community Data"
        count={communityData ? 1 : 0}
        isActive={isConnected}
        isDisabled={isProcessing}
        handleAction={handleStoreCommunityData}
      />
      <ActionButton 
        label="Add Solution"
        count={solutions.length}
        isActive={isConnected}
        isDisabled={isProcessing}
        handleAction={handleAddSolution}
      />
      <ActionButton 
        label="Log User Interaction"
        count={userInteractions.length}
        isActive={isConnected}
        isDisabled={isProcessing}
        handleAction={handleLogUserInteraction}
      />
      <ActionButton 
        label="Submit Feedback"
        count={0} // You might want to track this separately if needed
        isActive={isConnected}
        isDisabled={isProcessing}
        handleAction={handleSubmitFeedback}
      />
    </div>
  );
};

export default UrbanFarmDLPComponent;
