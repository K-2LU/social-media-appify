import { ReactNode } from "react";

interface SidebarSectionProps {
  title: string;
  seeAllLink?: string;
  children: ReactNode;
  className?: string;
}

export const SidebarSection = ({ title, seeAllLink, children, className }: SidebarSectionProps) => {
  return (
    <div className={`_layout_left_sidebar_inner ${className || ''}`}>
      <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
        <div className="_mar_b24 d-flex justify-content-between align-items-center">
          <h4 className="_left_inner_area_explore_title _title5">{title}</h4>
          {seeAllLink && <a href={seeAllLink} className="_left_inner_event_link">See all</a>}
        </div>
        {children}
      </div>
    </div>
  );
};