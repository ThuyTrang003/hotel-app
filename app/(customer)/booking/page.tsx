"use client";

import { useEffect, useState } from 'react';
import BillingDetails from '@/features/booking/components/billing-details';
import Stepper from "@/features/room/components/stepper"

export default function Booking() {
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const storedRoomId = sessionStorage.getItem('roomId');
    if (storedRoomId) {
      setRoomId(storedRoomId);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Stepper/>
      <BillingDetails/>
    </div>
  );
}
