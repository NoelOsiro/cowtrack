'use client'
import React from 'react';
import Image from "next/image";
interface CountCardProps {
  handleClick?: () => void;
}

const CountCard = (props:CountCardProps) => {
  return (
    <div 
      data-testid="count-card" 
      className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark hover:cursor-pointer"
      onClick={props.handleClick}
    >
      <div className="relative flex h-22.5 w-22.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 m-auto">
        <Image src={'/images/cards/launch-svgrepo-com.svg'} alt="launch" fill className="p-4" />
      </div>
      <div className="mt-4 flex items-end justify-center">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            Start Count
          </h4>
        </div>
      </div>
    </div>
  )
}

export default CountCard;
