import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
            //   rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block mb-8"
          >
            <GraduationCap size={80} className="text-white" />
          </motion.div>
          <h1 className="text-6xl font-bold text-white mb-6">Gradsphere</h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Empowering educators and students with comprehensive academic tracking
            and performance analytics.
          </p>
          <Link
            to="/login"
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition-colors"
          >
            Get Started
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
            <p>Monitor academic performance and identify areas for improvement.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
            <p>Get instant insights into student performance and engagement.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Early Intervention</h3>
            <p>Identify at-risk students early and provide timely support.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;