"use client"

import { ClockIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString().slice(0, -3));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString().slice(0, -3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return  (
  <div className='bg-primary-500 text-neutral-900 p-2 h-10 flex gap-2 items-center justify-center rounded-3xl'>
    <ClockIcon className='w-5 h-5'    />
    <p className='font-poppins text-xl font-medium'>{time}</p>
  </div>
 )
};

export default Clock;
