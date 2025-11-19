'use client';

import { useRef, useState, MouseEvent } from 'react';

interface ScrollableListProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollabList = ({children,className=''} : ScrollableListProps) => {
  const slider = useRef<HTMLUListElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: MouseEvent<HTMLUListElement>) => {
    if (!slider.current) return;
    setIsDown(true);
    setStartX(e.pageX - slider.current.offsetLeft);
    setScrollLeft(slider.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDown || !slider.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = (x - startX) * 2;

    slider.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <ul
      ref={slider}
      className={`${className} cursor-grab active:cursor-grabbing select-none`}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {children}
    </ul>
  );
};
