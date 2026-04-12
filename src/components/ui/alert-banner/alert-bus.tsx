import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AlertBanner } from "./alert-banner";

export type AlertPayload = {
  id?: string;
  variant?: "success" | "error";
  title: string;
  message: string;
  durationMs?: number;
};

type Subscriber = (alert: AlertPayload) => void;

const subscribers = new Set<Subscriber>();

export function pushAlert(alert: AlertPayload) {
  subscribers.forEach((cb) => {
    cb(alert);
  });
}

export function AlertHost() {
  const [alerts, setAlerts] = useState<AlertPayload[]>([]);

  useEffect(() => {
    const handler: Subscriber = (alert) => {
      const id = alert.id ?? crypto.randomUUID();
      const payload: AlertPayload = {
        durationMs: 3500,
        variant: "success",
        ...alert,
        id,
      };
      setAlerts((prev) => [...prev, payload]);
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, payload.durationMs);
    };
    subscribers.add(handler);
    return () => {
      subscribers.delete(handler);
    };
  }, []);

  if (alerts.length === 0) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-100 flex flex-col gap-3 px-4 md:inset-auto md:bottom-4 md:right-4 md:top-auto md:w-[360px]"
      aria-live="polite"
    >
      {alerts.map((alert) => (
        <div key={alert.id} className="pointer-events-auto">
          <AlertBanner
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        </div>
      ))}
    </div>,
    document.body,
  );
}
