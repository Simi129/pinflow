import { useState } from 'react';
import { X, Loader2, Lock, Globe } from 'lucide-react';
import Alert from '../shared/Alert';
import { createBoard } from '../../lib/api';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export default function CreateBoardModal({ isOpen, onClose, onSuccess, userId }: CreateBoardModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', privacy: 'PUBLIC' });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { setError('Please enter a board name'); return; }

    setLoading(true);
    setError(null);
    try {
      await createBoard({ user_id: userId, name: formData.name.trim(), description: formData.description.trim(), privacy: formData.privacy });
      setFormData({ name: '', description: '', privacy: 'PUBLIC' });
      onSuccess();
      onClose();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      if (msg.includes('403') || msg.includes('Forbidden')) {
        setError('Pinterest API access denied. Your app may need approval. Please use existing boards or contact support.');
      } else {
        setError('Failed to create board. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Create New Board</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <Alert variant="error" title="Error" message={error} onClose={() => setError(null)} />}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Board Name <span className="text-rose-500">*</span></label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Travel Inspiration"
              maxLength={100}
              disabled={loading}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:bg-slate-50"
              required
            />
            <p className="text-xs text-slate-500 mt-1">{formData.name.length}/100 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What's this board about?"
              rows={3}
              maxLength={500}
              disabled={loading}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none disabled:bg-slate-50"
            />
            <p className="text-xs text-slate-500 mt-1">{formData.description.length}/500 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Privacy</label>
            <div className="grid grid-cols-2 gap-3">
              {(['PUBLIC', 'SECRET'] as const).map((privacy) => (
                <button
                  key={privacy}
                  type="button"
                  onClick={() => setFormData({ ...formData, privacy })}
                  disabled={loading}
                  className={`p-3 rounded-lg border-2 transition-all disabled:opacity-50 ${formData.privacy === privacy ? 'border-rose-500 bg-rose-50' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {privacy === 'PUBLIC' ? <Globe className={`w-5 h-5 mx-auto mb-1 ${formData.privacy === 'PUBLIC' ? 'text-rose-600' : 'text-slate-400'}`} /> : <Lock className={`w-5 h-5 mx-auto mb-1 ${formData.privacy === 'SECRET' ? 'text-rose-600' : 'text-slate-400'}`} />}
                  <p className={`text-sm font-medium ${formData.privacy === privacy ? 'text-rose-900' : 'text-slate-600'}`}>{privacy === 'PUBLIC' ? 'Public' : 'Secret'}</p>
                  <p className="text-xs text-slate-500 mt-1">{privacy === 'PUBLIC' ? 'Anyone can see' : 'Only you can see'}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} disabled={loading} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={loading || !formData.name.trim()} className="flex-1 py-2.5 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating...</> : 'Create Board'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}