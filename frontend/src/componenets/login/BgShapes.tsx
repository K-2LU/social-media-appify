import Image from 'next/image';

export const BgShapes = () => {
  return (
    <>
      <div className="_shape_one">
        <Image src="/assets/images/shape1.svg" alt="" width={100} height={100} className="_shape_img" />
        <Image src="/assets/images/dark_shape.svg" alt="" width={100} height={100} className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <Image src="/assets/images/shape2.svg" alt="" width={100} height={100} className="_shape_img" />
        <Image src="/assets/images/dark_shape1.svg" alt="" width={100} height={100} className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <Image src="/assets/images/shape3.svg" alt="" width={100} height={100} className="_shape_img" />
        <Image src="/assets/images/dark_shape2.svg" alt="" width={100} height={100} className="_dark_shape _dark_shape_opacity" />
      </div>
    </>
  );
};