"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/interfaces";
import { SidebarSection } from "./SidebarSection";
import { UserListEntry } from "./UserListEntry";

export const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/suggestions`,
          { withCredentials: true }
        );
        setSuggestions(res.data);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const resolveImage = (imgName: string | null) => {
    if (!imgName) return "/assets/images/profile.png"; // Fallback
    if (imgName.startsWith("http")) return imgName;
    return `/upload/${imgName}`;
  };

  // Helper to format name
  const getName = (user: User) => {
    return user.first_name 
      ? `${user.first_name} ${user.last_name || ""}` 
      : user.username;
  };

  if (loading || suggestions.length === 0) return null;

  return (
    <SidebarSection title="Suggested People" seeAllLink="/people">
      {suggestions.map((user) => (
        <UserListEntry
          key={user.id}
          userId={user.id}
          name={getName(user)}
          subtitle={`@${user.username}`}
          image={resolveImage(user.display_pic)}
        />
      ))}
    </SidebarSection>
  );
};