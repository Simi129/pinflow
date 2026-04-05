import { MessageCircle, Bot } from 'lucide-react';

export default function ChatWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
      <div className="absolute bottom-16 right-0 mb-2 w-64 p-4 bg-white border border-slate-200 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-bottom-right scale-95 group-hover:scale-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
            <Bot size={16} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900 mb-1">Hi there! 👋</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Need help automating your pins? Ask me anything.
            </p>
          </div>
        </div>
      </div>
      <button className="w-12 h-12 bg-slate-900 text-white rounded-full shadow-lg shadow-slate-900/30 flex items-center justify-center hover:bg-slate-800 hover:scale-105 transition-all">
        <MessageCircle size={22} strokeWidth={1.5} />
      </button>
    </div>
  );
}