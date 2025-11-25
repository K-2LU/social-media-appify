"use client";

import { useState } from "react";
import axios from "axios";
import { User } from "@/interfaces";

interface UpdateProfileProps {
  user: User;
  onClose: () => void;
  onUpdate: () => void; // Trigger refresh on parent
}

export const UpdateProfile = ({ user, onClose, onUpdate }: UpdateProfileProps) => {
  const [texts, setTexts] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    address: user.address || "",
    // ... add other fields like website if needed
  });
  // Note: File uploads for cover/profile pic would require the same logic as CreatePost

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // You might need to handle file upload separately here if you add image inputs
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users`, 
        { ...texts }, 
        { withCredentials: true }
      );
      onUpdate(); // Refresh parent data
      onClose();  // Close modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", 
      backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", 
      alignItems: "center", justifyContent: "center"
    }}>
      <div className="bg-white p-4 rounded shadow-lg" style={{width: "500px", maxWidth: "90%"}}>
        <h3 className="mb-3">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small text-muted">First Name</label>
            <input type="text" name="first_name" value={texts.first_name} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label small text-muted">Last Name</label>
            <input type="text" name="last_name" value={texts.last_name} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label small text-muted">Address</label>
            <input type="text" name="address" value={texts.address} onChange={handleChange} className="form-control" />
          </div>
          
          <div className="d-flex gap-2 justify-content-end mt-4">
             <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
             <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};