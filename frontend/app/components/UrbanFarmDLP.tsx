"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, UseWaitForTransactionReceiptReturnType } from "wagmi";
import UrbanFarmDLPCompiler from "../hooks/UrbanFarmDLPCompiler";
import ActionButton from "./ActionButton";

interface UrbanFarmDLPProps {
  setTxReceipt: (receipt: UseWaitForTransactionReceiptReturnType['data']) => void;
}

const UrbanFarmDLP: React.FC<UrbanFarmDLPProps> = ({ setTxReceipt }) => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { sendTransactionAsync } = useSendTransaction();

  const urbanFarmDLPCompiler = new UrbanFarmDLPCompiler(
    "https://api.multibaas.com/api/v0",
    "YOUR_ACCESS_TOKEN",
    "0x1234567890123456789012345678901234567890"
  );

  const [communityData, setCommunityData] = useState<any | null>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [userInteractions, setUserInteractions] = useState<any[]>([]);
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const { data: txReceipt, isLoading: isTxProcessing } = useWaitForTransactionReceipt({ hash: txHash });

  const fetchData = useCallback(async () => {
    if (address) {
      const data = await urbanFarmDLPCompiler.getCommunityData(1);
      setCommunityData(data);

      const solutionsData = await urbanFarmDLPCompiler.getSolutions(1);
      setSolutions(solutionsData);

      const interactions = await urbanFarmDLPCompiler.getUserInteractions(1);
      setUserInteractions(interactions);
    }
  }, [address, urbanFarmDLPCompiler]);

  useEffect(() => {
    if (isConnected) {
      fetchData();
    }
  }, [isConnected, txReceipt, fetchData]);

  useEffect(() => {
    if (txReceipt) {
      setTxReceipt(txReceipt);
    }
  }, [txReceipt, setTxReceipt]);

  const handleStoreCommunityData = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    try {
      const tx = await urbanFarmDLPCompiler.storeCommunityData(
        "geoData",
        "demographicData",
        "agriculturalData",
        "hydroponicData"
      );
      const hash = await sendTransactionAsync(tx);
      setTxHash(hash);
    } catch (error) {
      console.error("Error storing community data:", error);
    }
  };

  const handleAddSolution = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    try {
      const tx = await urbanFarmDLPCompiler.addSolution(1, "aiSolution");
      const hash = await sendTransactionAsync(tx);
      setTxHash(hash);
    } catch (error) {
      console.error("Error adding solution:", error);
    }
  };

  const handleLogUserInteraction = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    try {
      const tx = await urbanFarmDLPCompiler.logUserInteraction(1, "action", "details");
      const hash = await sendTransactionAsync(tx);
      setTxHash(hash);
    } catch (error) {
      console.error("Error logging user interaction:", error);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    try {
      const tx = await urbanFarmDLPCompiler.submitFeedback(1, "feedback");
      const hash = await sendTransactionAsync(tx);
      setTxHash(hash);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">UrbanFarmDLP</h1>
      {!isConnected ? (
        <div className="text-center">Please connect your wallet to interact with UrbanFarmDLP</div>
      ) : (
        <div className="spinner-parent">
          <ActionButton
            label="Store Community Data"
            count={communityData?.id || 0}
            isActive={communityData !== null}
            isDisabled={isTxProcessing}
            handleAction={handleStoreCommunityData}
          />
          <ActionButton
            label="Add Solution"
            count={solutions.length}
            isActive={solutions.length > 0}
            isDisabled={isTxProcessing}
            handleAction={handleAddSolution}
          />
          <ActionButton
            label="Log User Interaction"
            count={userInteractions.length}
            isActive={userInteractions.length > 0}
            isDisabled={isTxProcessing}
            handleAction={handleLogUserInteraction}
          />
          <ActionButton
            label="Submit Feedback"
            count={0}
            isActive={false}
            isDisabled={isTxProcessing}
            handleAction={handleSubmitFeedback}
          />
          {isTxProcessing && (
            <div className="overlay">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UrbanFarmDLP;
