import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

function Profilepage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    displayName: '',
    photoURL: ''
  });
  const [logoutRedirect, setLogoutRedirect] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setUserData({
        displayName: user.displayName || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user]);

  const handleFileUpload = async (file) => {
    try {
      setLoading(true);

      // Create preview URL for immediate display
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);

      const storage = getStorage();
      const storageRef = ref(storage, `profile-pictures/${user.uid}/${file.name}`);

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update local state with the download URL
      setUserData(prev => ({
        ...prev,
        photoURL: downloadURL
      }));

      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload profile picture");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogoutRedirect(true);
    } catch (err) {
      console.error('Error logging out:', err);
      setError(err.message);
    }
  };

  const handleEditProfile = () => {
    setEditing(!editing);
    setImagePreview(''); // Reset preview when exiting edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      await updateProfile(user, {
        displayName: userData.displayName,
        photoURL: userData.photoURL
      });
      setEditing(false);
      setImagePreview(''); // Clear preview after save
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || logoutRedirect) {
    return <Navigate to="/signin" replace />;
  }

  return (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <div className="bg-blue-700 text-white px-6 py-10 shadow-md relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-md">
            <img
              src={imagePreview || userData.photoURL || '/default-avatar.png'}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/default-avatar.png'; }}
            />
            {editing && (
              <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <svg className="h-4 w-4 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm6 9a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </label>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user.displayName || 'User'}</h1>
            <p className="text-sm text-blue-100">{user.email}</p>
          </div>
        </div>

        <div className="space-x-3">
          <button
            onClick={handleEditProfile}
            className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {/* Edit Mode */}
      {editing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="displayName"
              value={userData.displayName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Profile Picture URL</label>
            <input
              type="text"
              name="photoURL"
              value={userData.photoURL}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste an image URL"
            />
            <p className="text-xs text-gray-500 mt-1">Or use the upload icon in the header to select a file.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleEditProfile}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">User Details</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Name:</strong> {user.displayName || 'N/A'}</li>
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>User ID:</strong> <span className="break-all">{user.uid}</span></li>
              <li><strong>Account Created:</strong> {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleString() : 'Unknown'}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Security</h2>
            <p className="text-gray-600">Manage your authentication and connected accounts.</p>
            {/* You can add 2FA, change password, or connected providers here in future */}
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default Profilepage;