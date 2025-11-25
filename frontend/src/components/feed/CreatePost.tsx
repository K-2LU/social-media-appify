import Image from "next/image";

export const CreatePost = () => {
  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <Image src="/assets/images/txt_img.png" alt="User" width={40} height={40} className="_txt_img" />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form">
          <textarea className="form-control _textarea" placeholder="Leave a comment here" id="createPostText"></textarea>
          <label className="_feed_textarea_label" htmlFor="createPostText">Write something ...</label>
        </div>
      </div>
      
      <div className="_feed_inner_text_area_bottom">
        {/* Action Buttons */}
        <div className="_feed_inner_text_area_item">
           <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <button type="button" className="_feed_inner_text_area_bottom_photo_link">
                 Photo
              </button>
           </div>
           {/* Add Video and Article buttons here similar to Photo */}
        </div>
        
        <div className="_feed_inner_text_area_btn">
           <button type="button" className="_feed_inner_text_area_btn_link">
              Post
           </button>
        </div>
      </div>
    </div>
  );
};