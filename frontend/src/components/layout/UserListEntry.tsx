"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface UserEntryProps {
  userId: string; // Added userId to identify who to follow
  name: string;
  subtitle: string;
  image: string;
}

export const UserListEntry = ({ userId, name, subtitle, image }: UserEntryProps) => {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/follow`,
        { userId },
        { withCredentials: true }
      );
      setFollowed(true);
    } catch (err) {
      console.error("Follow failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="_left_inner_area_suggest_info">
      <div className="_left_inner_area_suggest_info_box">
        <div className="_left_inner_area_suggest_info_image">
          <Link href={`/profile/${userId}`}>
            <Image src={image} alt={name} width={40} height={40} className="_info_img rounded-circle object-fit-cover" />
          </Link>
        </div>
        <div className="_left_inner_area_suggest_info_txt">
          <Link href={`/profile/${userId}`}>
            <h4 className="_left_inner_area_suggest_info_title">{name}</h4>
          </Link>
          <p className="_left_inner_area_suggest_info_para">{subtitle}</p>
        </div>
      </div>
      <div className="_left_inner_area_suggest_info_link">
        <button 
            onClick={handleFollow}
            disabled={loading || followed}
            className="_info_link border-0 bg-transparent p-0"
            style={{ cursor: "pointer", color: followed ? "#999" : "" }}
        >
            {loading ? "..." : followed ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};