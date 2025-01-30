// app/desktop-only/page.tsx

'use client'; // Required for interactivity

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DesktopOnlyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center min-h-screen bg-background text-foreground p-4"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Please Switch to Desktop Mode
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg mb-8 text-center text-muted-foreground"
      >
        For the best experience, please use this website on a larger screen or switch to desktop mode in your browser settings.
      </motion.p>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {/* Refresh Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-primary rounded-md hover:bg-primary/90 transition-colors"
        >
          Refresh Page
        </motion.button>

        {/* Return to Home Button */}
        <Button asChild size="lg" variant="outline">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </motion.div>
  );
}