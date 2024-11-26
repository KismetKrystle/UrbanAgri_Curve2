"use client";

import type { UseWaitForTransactionReceiptReturnType } from "wagmi";

import React, { useEffect, useState, useCallback } from "react";
import UrbanFarmDLPCompiler from "../hooks/UrbanFarmDLPCompiler";

interface EventData {
  event: {
    name: string;
    communityId: number;
    user: string;
    aiSolution?: string;
    feedback?: string;
    action?: string;
    details?: string;
  };
  triggeredAt: string;
  transaction: {
    txHash: string;
  };
}

interface EventsProps {
  txReceipt: UseWaitForTransactionReceiptReturnType['data'] | undefined;
}

const Events: React.FC<EventsProps> = ({ txReceipt }) => {
  const urbanFarmDLPCompiler = new UrbanFarmDLPCompiler(
    "https://api.multibaas.com/api/v0",
    "YOUR_ACCESS_TOKEN",
    "0x1234567890123456789012345678901234567890"
  );

  const [events, setEvents] = useState<EventData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchEvents = useCallback(async () => {
    setIsFetching(true);
    try {
      const fetchedEvents = await urbanFarmDLPCompiler.getEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsFetching(false);
    }
  }, [urbanFarmDLPCompiler]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (txReceipt) {
      fetchEvents();
    }
  }, [txReceipt, fetchEvents]);

  return (
    <div className="container">
      <h1 className="title">Recent Events</h1>
      <div className="spinner-parent">
        {isFetching && (
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        )}
        {!isFetching && events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul className="events-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                <div className="event-name">
                  <strong>{event.event.name}</strong> - {event.triggeredAt}
                </div>
                <div className="event-details">
                  <p>
                    <strong>Community ID:</strong> {event.event.communityId}
                  </p>
                  <p>
                    <strong>User:</strong> {event.event.user}
                  </p>
                  {event.event.aiSolution && (
                    <p>
                      <strong>AI Solution:</strong> {event.event.aiSolution}
                    </p>
                  )}
                  {event.event.feedback && (
                    <p>
                      <strong>Feedback:</strong> {event.event.feedback}
                    </p>
                  )}
                  {event.event.action && (
                    <p>
                      <strong>Action:</strong> {event.event.action}
                    </p>
                  )}
                  {event.event.details && (
                    <p>
                      <strong>Details:</strong> {event.event.details}
                    </p>
                  )}
                  <p>
                    <strong>Transaction Hash:</strong> {event.transaction.txHash}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Events;
