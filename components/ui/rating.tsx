"use client"

import React, { useState } from 'react'
import { cn } from "@/lib/utils"

interface RatingProps {
  initialValue?: number
  onChange?: (rating: number) => void
  readonly?: boolean
}

export default function Rating({ 
  initialValue = 0, 
  onChange,
  readonly = false 
}: RatingProps) {
  const [value, setValue] = useState(initialValue)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (readonly) return
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const isHalfStar = x < rect.width / 2
    setHoverValue(index + (isHalfStar ? 0.5 : 1))
  }

  const handleClick = (rating: number) => {
    if (readonly) return
    setValue(rating)
    if (onChange) {
      onChange(rating)
    }
  }

  const renderStar = (index: number) => {
    const displayValue = hoverValue ?? value
    const filled = displayValue - index
    
    if (filled >= 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      )
    } else if (filled > 0) {
      return (
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-gray-300"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
  }

  return (
    <div 
      className={cn(
        "flex gap-1",
        readonly ? "pointer-events-none" : "cursor-pointer"
      )}
      onMouseLeave={() => !readonly && setHoverValue(null)}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "text-yellow-400 p-0 focus:outline-none",
            !readonly && "hover:scale-110 transition-transform"
          )}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onClick={() => {
            const isHalfStar = (hoverValue ?? 0) % 1 !== 0
            handleClick(index + (isHalfStar ? 0.5 : 1))
          }}
          disabled={readonly}
        >
          {renderStar(index)}
        </button>
      ))}
    </div>
  )
}