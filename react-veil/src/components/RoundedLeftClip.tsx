import React, { type ReactNode } from 'react';
import styles from './RoundedLeftClip.module.css';

interface RoundedLeftClipProps {
  children: ReactNode;
  className?: string; // Allow for additional custom styling
}

const RoundedLeftClip: React.FC<RoundedLeftClipProps> = ({ children, className }) => {
  const clipPathId = "react-veil-rounded-left-definition";

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1, opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0.5,0 A 0.5,0.333 0 0,1 1,0.333 L 1,1 L 0.5,1 A 0.5,0.333 0 0,1 0,0.667 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className={`${styles.roundedLeftClipWrapper} ${className || ''}`.trim()}>
        {children}
      </div>
    </>
  );
};

export default RoundedLeftClip;