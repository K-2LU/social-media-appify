"use client"
import Link from 'next/link';

import axios from "axios";
import { useState, useEffect } from 'react';

import { EventData, Post } from '@/interfaces';
import { Header } from '@/components/layout/Header';
import { SidebarSection } from '@/components/layout/SidebarSection';
import { UserListEntry } from '@/components/layout/UserListEntry';
import { CreatePost } from '@/components/feed/CreatePost';
import { PostCard } from '@/components/feed/PostCard';
import { Suggestions } from '@/components/layout/Suggestions';


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
                    <Suggestions />
                  </div>
                </div>

                {/* --- Main feed --- */}
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="_layout_middle_wrap">
                    <div className="_layout_middle_inner">

                      <CreatePost onPostCreated={fetchPosts} />
                      {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}

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