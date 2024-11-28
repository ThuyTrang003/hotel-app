'use client';

import React, { useState } from 'react';
import { DateTimePicker } from '@/components/ui/date-time-picker';

const DatetimePickerHourCycle = () => {
  const [date12, setDate12] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="flex w-72 flex-col gap-2">
        <DateTimePicker hourCycle={12} value={date12} onChange={setDate12} />
      </div>
    </div>
  );
};

export default DatetimePickerHourCycle;