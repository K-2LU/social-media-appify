"use client"
import Link from 'next/link';

import axios from "axios";
import { useState, useEffect } from 'react';

import { EventData, Post } from '@/interfaces';
import { Header } from '@/components/layout/Header';
import { SidebarSection } from '@/components/layout/SidebarSection';
import { UserListEntry } from '@/components/layout/UserListEntry';
import { EventCard } from '@/components/layout/EventCard';
import { StoryReel } from '@/components/feed/StoryReel';
import { CreatePost } from '@/components/feed/CreatePost';
import { PostCard } from '@/components/feed/PostCard';

const events: EventData[] = [
  {
    id: "1",
    title: "No more terrorism no more cry",
    date: "2025-07-10T14:00:00Z",
    image: "/assets/images/feed_event1.png",
    attendeesCount: 17,
    isUserGoing: false
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    date: "2025-08-15T09:00:00Z",
    image: "/assets/images/feed_event1.png", // Replace with real image
    attendeesCount: 120,
    isUserGoing: true
  }
];

export default function FeedPage() {

  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      console.log("fetching posts");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post`,
        { withCredentials: true }
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* Feed Section Start */}
      <div className="_layout _layout_main_wrapper">

        {/* Global Header */}
        <div className="_main_layout">
          <Header />

          {/* Mobile Menu would go here as a component */}

          {/* Main Layout Structure */}
          <div className="container _custom_container">
            <div className="_layout_inner_wrap">
              <div className="row">

                {/* --- LEFT SIDEBAR --- */}
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                  <div className="_layout_left_sidebar_wrap">

                    {/* Suggested People */}
                    <SidebarSection title="Suggested People" seeAllLink="/people">
                      <UserListEntry
                        name="Steve Jobs"
                        subtitle="CEO of Apple"
                        image="/assets/images/people1.png"
                      />
                      <UserListEntry
                        name="Ryan Roslansky"
                        subtitle="CEO of Linkedin"
                        image="/assets/images/people2.png"
                      />
                    </SidebarSection>

                  </div>
                </div>

                {/* --- Main feed --- */}
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="_layout_middle_wrap">
                    <div className="_layout_middle_inner">

                      <StoryReel />

                      <CreatePost onPostCreated={fetchPosts} />
                      {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}

                    </div>
                  </div>
                </div>

                {/* --- RIGHT SIDEBAR --- */}
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                  <div className="_layout_right_sidebar_wrap">
                    <div className="_layout_right_sidebar_inner">

                      <SidebarSection title="You Might Like" seeAllLink="/suggested">
                        <UserListEntry
                          name="Radovan SkillArena"
                          subtitle="Founder & CEO"
                          image="/assets/images/Avatar.png"
                          action="Follow"
                        />
                      </SidebarSection>

                      <SidebarSection title="Your Friends" seeAllLink="/friends">
                        {/* Reuse UserListEntry or Create FriendEntry component */}
                        <UserListEntry
                          name="Steve Jobs"
                          subtitle="CEO of Apple"
                          image="/assets/images/people1.png"
                          action="Ignore" // Or hide button
                        />
                      </SidebarSection>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}