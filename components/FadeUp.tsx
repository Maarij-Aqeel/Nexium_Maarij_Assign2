'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export function TextFade({
  direction,
  children,
  className = '',
  staggerChildren = 0.1,
}: {
  direction: 'up' | 'down';
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Animation When seeing
  const fadeVariant = {
    hidden: { opacity: 0, y: direction === 'down' ? -20 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, duration: 0.6 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={{
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
        hidden: {},
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={fadeVariant}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}
