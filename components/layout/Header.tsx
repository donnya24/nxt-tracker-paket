"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">📦</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"
              >
                PaketTracker
              </Link>
              <p className="text-xs text-gray-500 font-medium">
                Lacak pengiriman dengan mudah
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Beranda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/tracker"
              className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
            >
              Lacak Paket
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 opacity-20 blur-sm"></div>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-2xl border border-blue-100 animate-fadeIn">
            <div className="p-4 space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🏠</span>
                </div>
                <span className="font-medium text-gray-800">Beranda</span>
              </Link>
              <Link
                href="/tracker"
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 text-white font-medium shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🔍</span>
                </div>
                <span>Lacak Paket</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
