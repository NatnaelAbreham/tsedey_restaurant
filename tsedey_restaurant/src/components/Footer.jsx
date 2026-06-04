import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto transition-colors duration-300 bg-slate-50 dark:bg-[#0a0f1c] border-t border-slate-100 dark:border-slate-800">
      
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        
        {/* Brand */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Tsedey Restaurant
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Fresh taste • Modern dining • Delivered with care
        </p>

        {/* Soft modern divider (better than hard line) */}
        <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

        {/* Copyright */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © {year} Tsedey Restaurant. All rights reserved.
        </p>

        {/* Accent */}
        <p className="mt-3 text-xs text-orange-500">
          Built with passion 🍊
        </p>

      </div>
    </footer>
  )
}

export default Footer