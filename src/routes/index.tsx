import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Experience } from "@/components/portfolio/Experience";
import { Certificates } from "@/components/portfolio/Certificates";
import { Works } from "@/components/portfolio/Works";
import { Journal } from "@/components/portfolio/Journal";
import { Explorations } from "@/components/portfolio/Explorations";
import { Stats } from "@/components/portfolio/Stats";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-bg font-body text-text-primary">
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            key="loading-screen"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* Website muncul dengan animasi fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <Navbar />

        <main>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Works />
          <Explorations />
          <Certificates />
          <Journal />
          <Stats />
          <Contact />
        </main>
      </motion.div>
    </div>
  );
}