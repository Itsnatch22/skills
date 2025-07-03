'use client'
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiTrash, FiPlus, FiX, FiLogOut } from 'react-icons/fi';
import { Skill, SkillCategory, skillCategories, skillsData } from '@/types/skills';

export default function SkillsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: skillCategories[0],
    description: '',
    level: 'Beginner' as Skill['level'],
    tags: '',
    postedByName: '',
    postedByRole: '',
    postedByAvatar: '/avatars/default.jpg',
    resourceURL: '',
  });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Initialize form for editing
  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category as SkillCategory,
      description: skill.description,
      level: skill.level,
      tags: skill.tags.join(', '),
      postedByName: skill.postedBy.name,
      postedByRole: skill.postedBy.role,
      postedByAvatar: skill.postedBy.avatar,
      resourceURL: skill.resourceURL,
    });
    setIsModalOpen(true);
  };

  // Reset form for adding new skill
  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: skillCategories[0],
      description: '',
      level: 'Beginner',
      tags: '',
      postedByName: session?.user?.name || '',
      postedByRole: '',
      postedByAvatar: session?.user?.image || '/avatars/default.jpg',
      resourceURL: '',
    });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.description) {
      alert('Name, category, and description are required.');
      return;
    }

    const newSkill: Skill = {
      id: editingSkill ? editingSkill.id : `skill-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      level: formData.level,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      postedBy: {
        id: editingSkill ? editingSkill.postedBy.id : `user-${Date.now()}`,
        name: formData.postedByName || session?.user?.name || 'Anonymous',
        role: formData.postedByRole || 'Contributor',
        avatar: formData.postedByAvatar || session?.user?.image || '/avatars/default.jpg',
      },
      resourceURL: formData.resourceURL || 'https://example.com',
      createdAt: new Date(),
    };

    if (editingSkill) {
      setSkills(skills.map(skill => (skill.id === editingSkill.id ? newSkill : skill)));
    } else {
      setSkills([...skills, newSkill]);
    }
    setIsModalOpen(false);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
    setDeleteConfirmId(null);
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Authenticated content
  if (status === 'authenticated') {
    return (
      <div className="mx-auto py-12 px-4 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Skills Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome, {session.user?.name || session.user?.email}
              </p>
            </div>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openAddModal}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center"
              >
                <FiPlus className="mr-2" /> Add Skill
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center"
              >
                <FiLogOut className="mr-2" /> Sign Out
              </motion.button>
            </div>
          </div>

          {/* Skills Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                  <th className="pxofil-6 py-3 text-left text-sm font-semibold text-gray-900">Tags</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Posted By</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.length > 0 ? (
                  skills.map(skill => (
                    <motion.tr
                      key={skill.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-gray-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{skill.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{skill.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{skill.level}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{skill.tags.join(', ')}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{skill.postedBy.name} ({skill.postedBy.role})</td>
                      <td className="px-6 py-4 text-right flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => openEditModal(skill)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        >
                          <FiEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setDeleteConfirmId(skill.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <FiTrash />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No skills available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {deleteConfirmId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white rounded-lg p-6 max-w-md w-full"
                >
                  <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this skill? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(deleteConfirmId)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add/Edit Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white rounded-lg p-6 max-w-lg w-full"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 text-gray-600 hover:text-gray-800"
                    >
                      <FiX />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                          value={formData.category}
                          onChange={e => setFormData({ ...formData, category: e.target.value as SkillCategory })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          {skillCategories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={e => setFormData({ ...formData, description: e.target.value })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          rows={4}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Level</label>
                        <select
                          value={formData.level}
                          onChange={e => setFormData({ ...formData, level: e.target.value as Skill['level'] })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        >
                          {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                        <input
                          type="text"
                          value={formData.tags}
                          onChange={e => setFormData({ ...formData, tags: e.target.value })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="e.g. JavaScript, UI, Framework"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Posted By Name</label>
                        <input
                          type="text"
                          value={formData.postedByName}
                          onChange={e => setFormData({ ...formData, postedByName: e.target.value })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Posted By Role</label>
                        <input
                          type="text"
                          value={formData.postedByRole}
                          onChange={e => setFormData({ ...formData, postedByRole: e.target.value })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Posted By Avatar URL</label>
                        <input
                          type="text"
                          value={formData.postedByAvatar}
                          onChange={e => setFormData({ ...formData, postedByAvatar: e.target.value })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Resource URL</label>
                        <input
                          type="url"
                          value={formData.resourceURL}
                          onChange={e => setFormData({ ...formData, resourceURL: e.target.value })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                      >
                        {editingSkill ? 'Save Changes' : 'Add Skill'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Fallback for unauthenticated users (shouldn't reach here due to redirect)
  return null;
}