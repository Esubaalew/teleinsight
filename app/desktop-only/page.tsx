'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DesktopOnlyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col justify-center items-center min-h-screen bg-background text-foreground p-4"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 120 }}
        className="mb-6cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc text-6xl text-primary"
      >
        🖥️
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-4xl font-bold mb-4 text-center text-primary"
      >
        Switch to Desktop Mode
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-lg mb-8 text-center text-muted-foreground max-w-md"
      >
        For the best experience, please use this website on a larger screen or switch to desktop mode in your browser settings.
      </motion.p>

      {/* Buttons Container */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {/* Refresh Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition-all"
        >
          Refresh Page
        </motion.button>

        {/* Return to Home Button */}
        <Button asChild size="lg" variant="outline" className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-sm text-muted-foreground"
      >
        Designed with ❤️ for better user experiences.
      </motion.div>
    </motion.div>
  );
}