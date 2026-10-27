import { createContext, useContext, useEffect, useState } from "react";

const AppointmentsContext = createContext(null);

const STORAGE_KEY = "helpinghands_demo_appointments";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  function addAppointment(appointment) {
    const bookingId =
      "HH-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      Date.now().toString().slice(-4);
    const record = {
      ...appointment,
      id: bookingId,
      status: "upcoming",
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [record, ...prev]);
    return record;
  }

  function cancelAppointment(id) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  }

  return (
    <AppointmentsContext.Provider
      value={{ appointments, addAppointment, cancelAppointment }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx)
    throw new Error(
      "useAppointments must be used within AppointmentsProvider"
    );
  return ctx;
}
