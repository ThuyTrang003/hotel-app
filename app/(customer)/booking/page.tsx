"use client";

import { useEffect, useState } from 'react';

import Progressbar from '@/features/booking/components/progressbar';
import BillingDetails from '@/features/booking/components/billing-details';

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
      {/* <Progressbar/> */}
      <BillingDetails/>
    </div>
  );
}
