import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { getBoards, publishNow, schedulePost, getPinterestStatus } from '../../lib/api';
import { Calendar, Loader2, Plus, Upload, X, Link as LinkIcon, Tag } from 'lucide-react';
import CreateBoardModal from './CreateBoardModal';
import Alert from '../shared/Alert';

type AlertType = { variant: 'success' | 'error' | 'warning' | 'info'; title?: string; message: string };

export default function CreatePinForm() {
  const [user, setUser] = useState<any>(null);
  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [pinterestConnected, setPinterestConnected] = useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const [keywordInput, setKeywordInput] = useState('');
  const [alert, setAlert] = useState<AlertType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    board_id: '', image_url: '', title: '', description: '', link: '', scheduled_at: '', keywords: [] as string[],
  });

  useEffect(() => { checkUser(); }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) { setUser(user); await checkPinterestAndLoadBoards(user.id); }
  };

  const checkPinterestAndLoadBoards = async (userId: string) => {
    try {
      const status = await getPinterestStatus(userId);
      setPinterestConnected(status.connected);
      if (status.connected) {
        const data = await getBoards(userId);
        setBoards(data.boards || []);
      }
    } catch (error) {
      console.error('Error loading boards:', error);
    } finally {
      setLoadingBoards(false);
    }
  };

  const handleBoardCreated = async () => {
    if (user) { setLoadingBoards(true); await checkPinterestAndLoadBoards(user.id); }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setAlert({ variant: 'error', title: 'Invalid File Type', message: 'Please select an image file (PNG, JPG, WEBP).' }); return; }
    if (file.size > 32 * 1024 * 1024) { setAlert({ variant: 'error', title: 'File Too Large', message: 'Image size must be less than 32MB.' }); return; }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('pin-images').upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from('pin-images').getPublicUrl(fileName);
      setFormData({ ...formData, image_url: publicUrl });
      setAlert({ variant: 'success', message: 'Image uploaded successfully!' });
    } catch {
      setAlert({ variant: 'error', title: 'Upload Failed', message: 'Failed to upload image. Please try using an image URL instead.' });
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image_url: '' });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddKeyword = () => {
    const keyword = keywordInput.trim();
    if (keyword && !formData.keywords.includes(keyword)) {
      setFormData({ ...formData, keywords: [...formData.keywords, keyword] });
      setKeywordInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent, action: 'now' | 'schedule') => {
    e.preventDefault();
    if (!user || !formData.board_id || !formData.title) { setAlert({ variant: 'warning', title: 'Missing Information', message: 'Please fill in all required fields (Board and Title).' }); return; }
    if (!formData.image_url) { setAlert({ variant: 'warning', title: 'Image Required', message: 'Please provide an image URL or upload an image.' }); return; }
    if (action === 'schedule' && !formData.scheduled_at) { setAlert({ variant: 'warning', title: 'Schedule Time Required', message: 'Please select a date and time for scheduling.' }); return; }

    setLoading(true);
    try {
      const postData = { user_id: user.id, board_id: formData.board_id, image_url: formData.image_url, title: formData.title, description: formData.description, link: formData.link || undefined, keywords: formData.keywords.length > 0 ? formData.keywords : undefined };
      if (action === 'now') {
        await publishNow(postData);
        setAlert({ variant: 'success', title: 'Pin Published! 🎉', message: 'Your pin has been successfully published to Pinterest.' });
      } else {
        await schedulePost({ ...postData, scheduled_at: new Date(formData.scheduled_at).toISOString() });
        setAlert({ variant: 'success', title: 'Pin Scheduled! 📅', message: `Your pin will be published on ${new Date(formData.scheduled_at).toLocaleString()}.` });
      }
      setFormData({ board_id: '', image_url: '', title: '', description: '', link: '', scheduled_at: '', keywords: [] });
      setImagePreview(null);
      setKeywordInput('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      setAlert({ variant: 'error', title: 'Operation Failed', message: 'Failed to publish/schedule pin. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!pinterestConnected) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Connect Pinterest First</h3>
        <p className="text-slate-600">Please connect your Pinterest account in Settings to start creating pins.</p>
      </div>
    );
  }

  return (
    <>
      {alert && <div className="mb-6"><Alert variant={alert.variant} title={alert.title} message={alert.message} onClose={() => setAlert(null)} autoClose autoCloseDelay={6000} /></div>}

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Create New Pin</h2>
          <button onClick={() => setShowCreateBoardModal(true)} className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2">
            <Plus size={16} /> New Board
          </button>
        </div>

        <form className="space-y-6">
          {/* Board */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Board <span className="text-rose-500">*</span></label>
            {loadingBoards ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /><span className="ml-2 text-sm text-slate-500">Loading boards...</span></div>
            ) : boards.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="text-sm text-slate-600">No boards found. Create your first board to get started!</p></div>
            ) : (
              <select value={formData.board_id} onChange={(e) => setFormData({ ...formData, board_id: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" required>
                <option value="">Select a board</option>
                {boards.map((board) => <option key={board.id} value={board.id}>{board.name}</option>)}
              </select>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Image <span className="text-rose-500">*</span></label>
            <div className="flex gap-2 mb-3">
              {(['url', 'upload'] as const).map((method) => (
                <button key={method} type="button" onClick={() => setUploadMethod(method)} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${uploadMethod === method ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {method === 'url' ? <><LinkIcon className="w-4 h-4 inline mr-2" />Image URL</> : <><Upload className="w-4 h-4 inline mr-2" />Upload File</>}
                </button>
              ))}
            </div>
            {uploadMethod === 'url' ? (
              <div>
                <input type="url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
                {formData.image_url && <img src={formData.image_url} alt="Preview" className="mt-3 w-full h-56 object-cover rounded-lg" onError={() => setAlert({ variant: 'error', message: 'Failed to load image from URL.' })} />}
              </div>
            ) : (
              <div>
                {!imagePreview ? (
                  <>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-colors">
                      {uploading ? <><Loader2 className="w-10 h-10 text-slate-400 animate-spin mb-2" /><p className="text-sm text-slate-500">Uploading to cloud...</p></> : <><Upload className="w-10 h-10 text-slate-400 mb-3" /><p className="text-sm text-slate-600 font-medium mb-1">Click to upload image</p><p className="text-xs text-slate-500">PNG, JPG, WEBP (max 32MB)</p></>}
                    </label>
                  </>
                ) : (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-56 object-cover rounded-lg" />
                    <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"><X size={16} /></button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title <span className="text-rose-500">*</span></label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter pin title" maxLength={100} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" required />
            <p className="text-xs text-slate-500 mt-1">{formData.title.length}/100 characters</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter pin description" rows={3} maxLength={500} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none" />
            <p className="text-xs text-slate-500 mt-1">{formData.description.length}/500 characters</p>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2"><Tag className="w-4 h-4 inline mr-1" />Keywords / Hashtags</label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddKeyword(); } }} placeholder="Add keywords (e.g., DIY, crafts)" className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
              <button type="button" onClick={handleAddKeyword} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors font-medium flex items-center gap-2"><Plus size={16} />Add</button>
            </div>
            {formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.keywords.map((keyword) => (
                  <span key={keyword} className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full text-sm font-medium">
                    #{keyword}
                    <button type="button" onClick={() => setFormData({ ...formData, keywords: formData.keywords.filter(k => k !== keyword) })} className="hover:bg-rose-100 rounded-full p-0.5"><X size={14} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Destination Link</label>
            <input type="url" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="https://your-website.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Schedule For (Optional)</label>
            <input type="datetime-local" value={formData.scheduled_at} onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })} min={new Date().toISOString().slice(0, 16)} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={(e) => handleSubmit(e, 'now')} disabled={loading || uploading} className="flex-1 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Publishing...</> : 'Publish Now'}
            </button>
            <button type="button" onClick={(e) => handleSubmit(e, 'schedule')} disabled={loading || uploading || !formData.scheduled_at} className="flex-1 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Scheduling...</> : <><Calendar className="w-4 h-4" />Schedule Pin</>}
            </button>
          </div>
        </form>
      </div>

      <CreateBoardModal isOpen={showCreateBoardModal} onClose={() => setShowCreateBoardModal(false)} onSuccess={handleBoardCreated} userId={user?.id || ''} />
    </>
  );
}