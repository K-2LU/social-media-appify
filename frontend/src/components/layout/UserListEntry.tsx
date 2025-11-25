import Image from "next/image";
import Link from "next/link";

interface UserEntryProps {
  name: string;
  subtitle: string;
  image: string;
  action?: "Connect" | "Follow" | "Ignore";
}

export const UserListEntry = ({ name, subtitle, image, action = "Connect" }: UserEntryProps) => {
  return (
    <div className="_left_inner_area_suggest_info">
      <div className="_left_inner_area_suggest_info_box">
        <div className="_left_inner_area_suggest_info_image">
          <Link href="/profile">
            <Image src={image} alt={name} width={40} height={40} className="_info_img" />
          </Link>
        </div>
        <div className="_left_inner_area_suggest_info_txt">
          <Link href="/profile">
            <h4 className="_left_inner_area_suggest_info_title">{name}</h4>
          </Link>
          <p className="_left_inner_area_suggest_info_para">{subtitle}</p>
        </div>
      </div>
      <div className="_left_inner_area_suggest_info_link">
        <a href="#0" className="_info_link">{action}</a>
      </div>
    </div>
  );
};