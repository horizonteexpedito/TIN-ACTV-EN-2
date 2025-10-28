// src/app/sucesso/page.tsx

"use client";

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaginaSucesso() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#27AE60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center max-w-lg w-full"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">Pagamento Confirmado!</h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Seu acesso foi liberado. Clique no botão abaixo para acessar o relatorio completo.
        </p>
        <a
          href="https://profile-investigator-1fab208c.base44.app/Dashboard" // Coloque um link para o seu site principal ou para o login, se houver
          className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition-colors"
        >
          Ver relatório completo
        </a>
      </motion.div>
    </div>
  );
}
