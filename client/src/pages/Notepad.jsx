import React from 'react';
import { useState, useEffect } from 'react';
import axiosClient from '../API/axiosClient';

export default function NotepadApp() {
  const [notes, setNotes] = useState([]);
const [currentNoteId, setCurrentNoteId] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [isEditing, setIsEditing] = useState(false);

const [formData, setFormData] = useState({
  title: '',
  content: '',
  category: 'personal',
  color: 'yellow'
});


  // Load notes from localStorage on mount
 useEffect(() => {
  const fetchNotes = async () => {
    try {
      const res = await axiosClient.get('/notes/fetch');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchNotes();
}, []);





  // Create new note
  const createNote = async () => {
  if (!formData.title.trim() || !formData.content.trim()) return;

  try {
    const res = await axiosClient.post('/notes/create', formData);
    setNotes(prev => [res.data, ...prev]);
    resetForm();
  } catch (err) {
    console.error(err);
  }
};


  // Update existing note
  const updateNote = async () => {
  try {
    const res = await axiosClient.put(
      `/notes/edit/${currentNoteId}`,
      formData
    );

    setNotes(notes.map(note =>
      note._id === res.data._id ? res.data : note
    ));

    resetForm();
  } catch (err) {
    console.error(err);
  }
};


  // Delete note
const deleteNote = async (id) => {
  try {
    await axiosClient.delete(`/notes/delete/${id}`);
    setNotes(notes.filter(note => note._id !== id));
  } catch (err) {
    console.error(err);
  }
};

  // Edit note
  const editNote = (note) => {
  setCurrentNoteId(note._id);
  setFormData({
    title: note.title,
    content: note.content,
    category: note.category,
    color: note.color
  });
  setIsEditing(true);
};


  // Reset form
  const resetForm = () => {
  setFormData({
    title: '',
    content: '',
    category: 'personal',
    color: 'yellow'
  });
  setCurrentNoteId(null);
  setIsEditing(false);
};


  // Filter notes based on search query
const filteredNotes = notes.filter(note =>
  (note.title ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
  (note.content ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
  (note.category ?? '').toLowerCase().includes(searchQuery.toLowerCase())
);

const colorThemes = {
    yellow: 'from-yellow-200 to-yellow-300 border-yellow-400',
    blue: 'from-blue-200 to-blue-300 border-blue-400',
    pink: 'from-pink-200 to-pink-300 border-pink-400',
    green: 'from-green-200 to-green-300 border-green-400',
    purple: 'from-purple-200 to-purple-300 border-purple-400',
    orange: 'from-orange-200 to-orange-300 border-orange-400'
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Quicksand', sans-serif;
        }
        
        .font-handwritten {
          font-family: 'Caveat', cursive;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .note-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .note-card:hover {
          transform: translateY(-8px) rotate(1deg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .sticky-note {
          box-shadow: 
            0 1px 3px rgba(0,0,0,0.12),
            0 10px 20px rgba(0,0,0,0.08);
        }

        .sticky-note::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 40px 40px 0;
          border-color: transparent rgba(0,0,0,0.1) transparent transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .mesh-gradient {
          background: 
            radial-gradient(at 0% 0%, rgba(251, 191, 36, 0.3) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.3) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.3) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.3) 0px, transparent 50%);
        }
      `}</style>

      <div className="min-h-screen bg-linear-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

        {/* Main Container */}
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
          
          {/* Header */}
          <header className="mb-8 animate-slideInDown">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 font-handwritten">NotePad Pro</h1>
                  <p className="text-gray-600 text-sm">Organize your thoughts beautifully</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md">
                  <span className="text-sm text-gray-600 font-semibold">{notes.length} Notes</span>
                </div>
              </div>
            </div>
          </header>

          {/* Search Bar */}
          <div className="mb-8 animate-fadeIn">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search notes by title, content, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200 transition-all"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Create/Edit Note Form */}
            <div className="lg:col-span-1 animate-scaleIn">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sticky top-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">
                  {isEditing ? '✏️ Edit Note' : '➕ Create New Note'}
                </h2>

                <div className="space-y-4">
                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Enter note title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
                    />
                  </div>

                  {/* Category Select */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
                    >
                      <option value="personal">📝 Personal</option>
                      <option value="work">💼 Work</option>
                      <option value="ideas">💡 Ideas</option>
                      <option value="todo">✅ To-Do</option>
                      <option value="important">⭐ Important</option>
                    </select>
                  </div>

                  {/* Color Picker */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color Theme</label>
                    <div className="grid grid-cols-6 gap-2">
                      {Object.keys(colorThemes).map(color => (
                        <button
                          key={color}
                          onClick={() => setFormData({ ...formData, color })}
                          className={`w-10 h-10 rounded-lg bg-linear-to-br ${colorThemes[color].split(' ')[0]} ${colorThemes[color].split(' ')[1]} border-2 ${
                            formData.color === color ? 'ring-4 ring-gray-400 scale-110' : 'ring-0'
                          } transition-all transform hover:scale-110`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content Textarea */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                    <textarea
                      placeholder="Write your note here..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all resize-none custom-scrollbar"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={updateNote}
                          className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all"
                        >
                          Update Note
                        </button>
                        <button
                          onClick={resetForm}
                          className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transform hover:scale-105 transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={createNote}
                        className="w-full bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all"
                      >
                        Create Note
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Grid */}
            <div className="lg:col-span-2">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-20 animate-fadeIn">
                  <div className="w-32 h-32 bg-linear-to-br from-yellow-200 to-orange-300 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                    <svg className="w-16 h-16 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2 font-handwritten">
                    {searchQuery ? 'No notes found' : 'No notes yet'}
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery ? 'Try a different search term' : 'Create your first note to get started!'}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredNotes.map((note, index) => (
                    <div
                        key={note._id}   // ✅ use _id from MongoDB
                        className="note-card sticky-note relative"
                        style={{ 
                        animationDelay: `${index * 0.1}s`,
                        opacity: 0,
                        animation: 'scaleIn 0.5s ease-out forwards'
                        }}
                    >
                      <div className={`bg-linear-to-br ${colorThemes[note.color]} border-2 rounded-2xl p-6 h-full flex flex-col`}>
                        {/* Note Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-800 truncate font-handwritten mb-1">
                              {note.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="px-2 py-1 bg-white/50 rounded-lg font-semibold">
                                {note.category}
                              </span>
                              <span>
                                {new Date(note.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Note Content */}
                        <p className="text-gray-700 mb-4 flex-1 line-clamp-6 whitespace-pre-wrap">
                          {note.content}
                        </p>

                        {/* Note Actions */}
                        <div className="flex gap-2 pt-4 border-t-2 border-gray-300/50">
                          <button
                            onClick={() => editNote(note)}
                            className="flex-1 bg-white/70 hover:bg-white text-gray-700 font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 transform hover:scale-105"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(note._id)}
                            className="flex-1 bg-red-500/80 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 transform hover:scale-105"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Button for Mobile */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="lg:hidden fixed bottom-8 right-8 w-14 h-14 bg-linear-to-br from-yellow-400 to-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </>
  );
}