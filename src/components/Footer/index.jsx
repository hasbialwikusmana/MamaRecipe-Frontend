function Footer() {
  return (
    <footer>
      <div className="w-full h-72 lg:h-96 xl:h-[34rem] bg-primary flex flex-col">
        <div className="w-full h-4/5 flex flex-col justify-center items-center gap-4">
          <h3 className="text-3xl sm:text-4xl xl:text-7xl text-[#2E266F] font-normal font-airbnb-cereal capitalize leading-10">Eat, Cook, Repeat</h3>
          <p className="text-sm xl:text-xl text-[#707070]">Share your best recipe by uploading here !</p>
        </div>
        <div className="flex justify-center gap-4 xl:gap-6 text-xs text-[#707070]">
          <a href="#">Product</a>
          <a href="#">Company</a>
          <a href="#">Learn more</a>
          <a href="#">Get in touch</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
