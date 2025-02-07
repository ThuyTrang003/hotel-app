"use client";

import { useEffect, useState } from 'react';
import BillingDetails from '@/features/booking/components/billing-details';

export default function Booking() {

  return (
    <div className="min-h-screen flex flex-col">
      <BillingDetails/>
    </div>
  );
}
