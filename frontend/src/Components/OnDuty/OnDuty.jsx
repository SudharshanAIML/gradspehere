import React, { useState } from 'react';
import { Upload, MapPin, Send, X, Image as ImageIcon } from 'lucide-react';

export function OnDuty() {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    duration: '',
    evidence: '',
    location: null,
  });

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setFormData((prev) => ({
              ...prev,
              location: {
                latitude,
                longitude,
                address: data.display_name || 'Location found',
              },
            }));
          } catch (error) {
            alert('Error getting location address');
          }
        },
        (error) => {
          alert('Error getting location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          evidence: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submitRequest = () => {
    if (!formData.reason || !formData.duration || !formData.location || !formData.evidence) {
      alert('Please fill in all fields and provide location and evidence');
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    setRequests((prev) => [newRequest, ...prev]);
    setFormData({
      reason: '',
      duration: '',
      evidence: '',
      location: null,
    });
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">On-Duty Permission Requests</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Send className="h-5 w-5" />
            New Request
          </button>
        </div>

        {showForm && (
          <div className="mb-8 bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">New Permission Request</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for On-Duty
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 2 hours"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={getLocation}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <MapPin className="h-5 w-5" />
                    Get Current Location
                  </button>
                  {formData.location && (
                    <span className="text-sm text-gray-600">{formData.location.address}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evidence (Image)</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.evidence && (
                    <div className="relative w-20 h-20">
                      <img
                        src={formData.evidence}
                        alt="Evidence"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={submitRequest}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Submit Request
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{request.reason}</h4>
                  <p className="text-sm text-gray-600">Duration: {request.duration}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    request.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : request.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {request.location.address}
                </div>
                <div className="flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" />
                  <button
                    onClick={() => window.open(request.evidence, '_blank')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Evidence
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Submitted: {new Date(request.timestamp).toLocaleString()}
              </p>
            </div>
          ))}

          {requests.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No permission requests yet. Click "New Request" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
