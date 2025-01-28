import React from "react";
import Marquee from "react-fast-marquee";
const SubHeader = () => {
  return (
    <Marquee
      className="bg-primary mb-2 text-white py-2 font-tiroBangla "
      pauseOnHover={true}
    >
      " আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:+8801924542671 "
    </Marquee>
  );
};

export default SubHeader;
