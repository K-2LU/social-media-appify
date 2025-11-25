"use client"
import Image from "next/image";
import Link from "next/link";
import { EventData } from "@/interfaces";

interface EventCardProps {
  event: EventData;
}

export const EventCard = ({ event }: EventCardProps) => {
  // Helper to format date from ISO string to UI format
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' }); // e.g., "Jul"

  return (
    <Link href={`/events/${event.id}`} className="_left_inner_event_card_link">
      <div className="_left_inner_event_card">
        
        {/* Event Image */}
        <div className="_left_inner_event_card_iamge">
          <Image 
            src={event.image} 
            alt={event.title} 
            width={300} 
            height={150} 
            className="_card_img" 
          />
        </div>

        {/* Event Date & Title */}
        <div className="_left_inner_event_card_content">
          <div className="_left_inner_card_date">
            <p className="_left_inner_card_date_para">{day}</p>
            <p className="_left_inner_card_date_para1">{month}</p>
          </div>
          <div className="_left_inner_card_txt">
            <h4 className="_left_inner_event_card_title">{event.title}</h4>
          </div>
        </div>

        <hr className="_underline" />

        {/* Footer: Attendees & Action */}
        <div className="_left_inner_event_bottom">
          <p className="_left_iner_event_bottom">
            {event.attendeesCount} People Going
          </p>
          <button 
            type="button" 
            className={`_left_iner_event_bottom_link ${event.isUserGoing ? '_active_link' : ''}`}
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating to event page when clicking button
              // Add your join/leave logic here
            }}
          >
            {event.isUserGoing ? "Joined" : "Going"}
          </button>
        </div>

      </div>
    </Link>
  );
};