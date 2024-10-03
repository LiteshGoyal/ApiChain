import React from 'react';
import APIChainBuilder from './components/APIChainBuilder';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">API Chaining Dashboard</h1>
      <p className="text-gray-600 mb-8 text-lg">Chain multiple APIs and visualize the data flow</p>
      </header>
      
      <main className="mt-10">
        <APIChainBuilder />
      </main>
      
      <footer className="mt-auto text-gray-500 text-sm">
                ©2024 Devzery
            </footer>
    </div>
  );
}

export default App;
