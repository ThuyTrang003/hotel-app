import React from 'react';
import { usePathname } from 'next/navigation';

const steps = [
  { name: 'Search', path: '/search' },
  { name: 'Booking', path: '/booking' },
  { name: 'Checkout', path: '/checkout' },
  { name: 'Confirmation', path: '/confirmation' },
];

const Stepper: React.FC = () => {
  const pathname = usePathname();
  const currentStep = steps.findIndex(step => step.path === pathname);

  return (
    <div className="flex justify-center bg-wheat py-16 mt-16">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Bước hiện tại */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index <= currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </div>

            {/* Tên bước */}
            <span
              className={`ml-2 ${
                index <= currentStep ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              {step.name}
            </span>

            {/* Đường nối giữa các bước */}
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-4 ${
                  index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
