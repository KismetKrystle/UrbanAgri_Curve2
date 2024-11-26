"use client";

import type {
  PostMethodArgs,
  MethodCallResponse,
  TransactionToSignResponse,
  Event,
} from "@curvegrid/multibaas-sdk";
import type { SendTransactionParameters } from "@wagmi/core";
import { Configuration, ContractsApi, EventsApi, ChainsApi } from "@curvegrid/multibaas-sdk";
import { useAccount } from "wagmi";
import { useCallback, useMemo } from "react";

interface ChainStatus {
  chainID: number;
  blockNumber: number;
}

interface UrbanFarmDLPHook {
  getChainStatus: () => Promise<ChainStatus | null>;
  storeCommunityData: (
    geoData: string,
    demographicData: string,
    agriculturalData: string,
    hydroponicData: string
  ) => Promise<SendTransactionParameters>;
  addSolution: (aiSolution: string) => Promise<SendTransactionParameters>;
  logUserInteraction: (action: string, details: string) => Promise<SendTransactionParameters>;
  submitFeedback: (feedback: string) => Promise<SendTransactionParameters>;
  getEvents: () => Promise<Array<Event> | null>;
}

const useUrbanFarmDLP = (): UrbanFarmDLPHook => {
  const mbBaseUrl = process.env.NEXT_PUBLIC_MULTIBAAS_DEPLOYMENT_URL || "";
  const mbApiKey = process.env.NEXT_PUBLIC_MULTIBAAS_DAPP_USER_API_KEY || "";
  const urbanFarmDLPContractLabel = process.env.NEXT_PUBLIC_MULTIBAAS_URBANFARMDLP_CONTRACT_LABEL || "";
  const urbanFarmDLPAddressLabel = process.env.NEXT_PUBLIC_MULTIBAAS_URBANFARMDLP_ADDRESS_LABEL || "";
  const chain = "ethereum";

  // Memoize mbConfig
  const mbConfig = useMemo(() => {
    return new Configuration({
      basePath: mbBaseUrl,
      accessToken: mbApiKey,
    });
  }, [mbBaseUrl, mbApiKey]);

  // Memoize Api
  const contractsApi = useMemo(() => new ContractsApi(mbConfig), [mbConfig]);
  const eventsApi = useMemo(() => new EventsApi(mbConfig), [mbConfig]);
  const chainsApi = useMemo(() => new ChainsApi(mbConfig), [mbConfig]);

  const { address, isConnected } = useAccount();

  const getChainStatus = async (): Promise<ChainStatus | null> => {
    try {
      const response = await chainsApi.getChainStatus(chain);
      return response.data.result as ChainStatus;
    } catch (err) {
      console.error("Error getting chain status:", err);
      return null;
    }
  };

  const callContractFunction = useCallback(
    async (methodName: string, args: PostMethodArgs['args'] = []): Promise<MethodCallResponse['output'] | TransactionToSignResponse['tx']> => {
      const payload: PostMethodArgs = {
        args,
        contractOverride: true,
        ...(isConnected && address ? { from: address } : {}),
      };
      const response = await contractsApi.callContractFunction(
        chain,
        urbanFarmDLPAddressLabel,
        urbanFarmDLPContractLabel,
        methodName,
        payload
      );
      if (response.data.result.kind === "MethodCallResponse") {
        return response.data.result.output;
      } else if (response.data.result.kind === "TransactionToSignResponse") {
        return response.data.result.tx;
      } else {
        throw new Error(`Unexpected response type: ${response.data.result.kind}`);
      }
    },
    [contractsApi, chain, urbanFarmDLPAddressLabel, urbanFarmDLPContractLabel, isConnected, address]
  );

  const storeCommunityData = useCallback(
    async (geoData: string, demographicData: string, agriculturalData: string, hydroponicData: string): Promise<SendTransactionParameters> => {
      return await callContractFunction("storeCommunityData", [geoData, demographicData, agriculturalData, hydroponicData]);
    },
    [callContractFunction]
  );

  const addSolution = useCallback(
    async (aiSolution: string): Promise<SendTransactionParameters> => {
      return await callContractFunction("addSolution", [aiSolution]);
    },
    [callContractFunction]
  );

  const logUserInteraction = useCallback(
    async (action: string, details: string): Promise<SendTransactionParameters> => {
      return await callContractFunction("logUserInteraction", [action, details]);
    },
    [callContractFunction]
  );

  const submitFeedback = useCallback(
    async (feedback: string): Promise<SendTransactionParameters> => {
      return await callContractFunction("submitFeedback", [feedback]);
    },
    [callContractFunction]
  );

  const getEvents = useCallback(async (): Promise<Array<Event> | null> => {
    try {
      const eventSignatures = [
        "CommunityDataStored(uint256,address)",
        "SolutionGenerated(uint256,string,address)",
        "UserInteractionLogged(uint256,address,string,string)",
        "FeedbackSubmitted(uint256,address,string)",
        "CommunityRewardDistributed(uint256,uint256)",
      ];
      const response = await eventsApi.listEvents(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false,
        chain,
        urbanFarmDLPAddressLabel,
        urbanFarmDLPContractLabel,
        eventSignatures.join("|"),
        50
      );
      return response.data.result;
    } catch (err) {
      console.error("Error getting events:", err);
      return null;
    }
  }, [eventsApi, chain, urbanFarmDLPAddressLabel, urbanFarmDLPContractLabel]);

  return {
    getChainStatus,
    storeCommunityData,
    addSolution,
    logUserInteraction,
    submitFeedback,
    getEvents,
  };
};

export default useUrbanFarmDLP;
