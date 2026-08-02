'use client';

import { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * QuestModal
 *
 * Formulir kontak bergaya "dispatch quest". Dimuat lewat dynamic import dengan
 * ssr:false karena baru dibutuhkan setelah pengguna berinteraksi (klik tombol buka),
 * bukan bagian dari tampilan awal halaman.
 *
 * Catatan: pengiriman form saat ini disimulasikan di sisi klien (setTimeout) dan
 * belum terhubung ke backend/layanan email sungguhan.
 */
export default function QuestModal({ isOpen, onClose }: QuestModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', questType: 'Full-Stack Web', details: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm select-none animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-zinc-900 border-4 border-red-600 p-6 md:p-8 text-white shadow-[0_0_50px_rgba(220,38,38,0.5)] -rotate-1"
        style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 95%)' }}
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 hover:bg-white hover:text-zinc-950 text-white p-1 -skew-x-12 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b-2 border-white/20 pb-3">
              <span className="bg-red-600 text-white font-mono font-black text-[10px] px-2 py-0.5 -rotate-2 inline-block mb-1">
                DISPATCH ORDER
              </span>
              <h2 className="font-serif font-black text-2xl uppercase tracking-tight">
                INITIATE NEW <span className="text-red-500">QUEST.</span>
              </h2>
            </div>

            <div>
              <label className="block font-mono text-xs text-zinc-400 uppercase mb-1">Client Identifier Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Ren Amamiya"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-xs text-white focus:border-red-500 outline-none -skew-x-6 font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-zinc-400 uppercase mb-1">Dispatch Communication Email</label>
              <input 
                required
                type="email" 
                placeholder="client@phantom.dev"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-xs text-white focus:border-red-500 outline-none -skew-x-6 font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-zinc-400 uppercase mb-1">Quest Category</label>
              <select 
                value={formData.questType}
                onChange={(e) => setFormData({ ...formData, questType: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-xs text-white focus:border-red-500 outline-none -skew-x-6 font-mono"
              >
                <option value="Full-Stack Web">Full-Stack Web Engineering</option>
                <option value="Embedded Systems">Embedded Systems / Hardware</option>
                <option value="UI/UX Prototyping">UI/UX &amp; High-Fidelity Design</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-zinc-400 uppercase mb-1">Quest Directives / Message</label>
              <textarea 
                required
                rows={3}
                placeholder="Describe project specifications..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-xs text-white focus:border-red-500 outline-none -skew-x-6 font-mono resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-white hover:text-zinc-950 text-white font-serif font-black text-sm py-3 uppercase tracking-widest transition duration-150 -skew-x-12 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>SEND DISPATCH DIRECTIVE</span>
              <Send size={16} />
            </button>
          </form>
        ) : (
          /* QUEST ACCEPTED STAMP ANIMATION */
          <div className="py-12 text-center space-y-4 animate-bounce">
            <CheckCircle2 size={56} className="mx-auto text-emerald-400" />
            <h2 className="font-serif font-black text-3xl uppercase tracking-tighter text-red-500 italic">
              QUEST ACCEPTED!
            </h2>
            <p className="font-mono text-xs text-zinc-300">
              DIRECTIVE DISPATCHED TO MUHAMMAD FARIS REVANSYAH.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}