import React from 'react';
import FormComponent from "@/components/forms/FormComponent";
import { FaCode, FaLock, FaSync, FaGlobe, FaBolt, FaRocket } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      {/* Navigation Breadcrumbs */}
      <div className="mx-auto max-w-7xl mb-8">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-red-500 hover:text-red-400 cursor-pointer transition-colors duration-200">
            Home
          </span>
          <span className="text-gray-500">/</span>
          <span className="text-yellow-500 hover:text-yellow-400 cursor-pointer transition-colors duration-200">
            Join Room
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">
              Mind<span className="text-blue-500">Link</span>
            </h1>
            <p className="text-xl text-gray-300">
              Real-time collaborative coding platform with powerful features
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaBolt className="text-blue-400" />
              <span className="text-gray-300">Instant synchronization</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRocket className="text-blue-400" />
              <span className="text-gray-300">Lightning-fast performance</span>
            </div>
          </div>
        </div>

        {/* Form Section - Ensuring it maintains its original structure */}
        <div className="relative flex justify-center items-start w-full">
          <div className="absolute -inset-1 bg-blue-500 opacity-30 blur-xl rounded-lg"></div>
          <div className="relative w-full">
            <FormComponent />
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="mx-auto max-w-7xl mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Powerful <span className="text-blue-500">Features</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FaCode, title: "Real-time Editing", desc: "Collaborate with your team in real-time", glow: "red" },
            { icon: FaLock, title: "Secure Access", desc: "Room-based security with encryption", glow: "yellow" },
            { icon: FaSync, title: "Auto Sync", desc: "Seamless synchronization across devices", glow: "blue" },
            { icon: FaGlobe, title: "Offline Support", desc: "Work offline with automatic syncing", glow: "green" }
          ].map((feature, index) => (
            <div key={index} className="relative group">
              <div className={`absolute -inset-1 bg-${feature.glow}-500 opacity-25 group-hover:opacity-50 blur-xl rounded-lg transition-opacity duration-200`}></div>
              <div className="relative p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-200">
                <feature.icon className="text-blue-400 text-2xl mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;