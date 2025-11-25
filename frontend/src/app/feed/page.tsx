
import Link from 'next/link';
import { EventData } from '@/interfaces';
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
                    
                    {/* Explore Menu */}
                    <SidebarSection title="Explore">
                      <ul className="_left_inner_area_explore_list">
                        <li className="_left_inner_area_explore_item">
                           <Link href="/learning" className="_left_inner_area_explore_link">Learning</Link>
                        </li>
                        <li className="_left_inner_area_explore_item">
                           <Link href="/insights" className="_left_inner_area_explore_link">Insights</Link>
                        </li>
                        {/* Add more menu items here */}
                      </ul>
                    </SidebarSection>

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

                    {/* Events */}
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
        <div className="_layout_left_sidebar_wrap">
            
            {/* ... Explore Section ... */}
            {/* ... Suggested People Section ... */}

            {/* EVENTS SECTION */}
            <SidebarSection title="Events" seeAllLink="/events">
                {/* Map over the data */}
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </SidebarSection>

        </div>
    </div>

                  </div>
                </div>

                {/* --- MIDDLE FEED --- */}
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="_layout_middle_wrap">
                    <div className="_layout_middle_inner">
                      
                      <StoryReel />
                      
                      <CreatePost />
                      
                      {/* Post 1 */}
                      <PostCard 
                        author="Karim Saif"
                        time="5 minute ago"
                        content="-Healthy Tracking App"
                        image="/assets/images/timeline_img.png"
                        avatar="/assets/images/post_img.png"
                      />

                      {/* Post 2 (Example) */}
                      <PostCard 
                        author="Dylan Field"
                        time="1 hour ago"
                        content="Excited to announce the new Figma update!"
                        avatar="/assets/images/people3.png"
                      />

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