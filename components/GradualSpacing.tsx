'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import * as React from 'react';

type Props = {
  text: string;
  className?: string;
};

export function GradualSpacing({ text, className = '' }: Props) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`flex flex-wrap justify-center text-center ${className}`}
    >
      <AnimatePresence>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.01 }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
