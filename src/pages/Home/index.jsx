import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import IconSearch from "../../assets/img/landingPage/icon-search.svg";
import imageLanding from "../../assets/img/landingPage/1.svg";
import ImagePopular from "../../assets/img/landingPage/2.svg";
import ImageNewRecipe from "../../assets/img/landingPage/3.svg";
import ImagePopular1 from "../../assets/img/landingPage/4.svg";
import ImagePopular2 from "../../assets/img/landingPage/5.svg";
import ImagePopular3 from "../../assets/img/landingPage/6.svg";
import ImagePopular4 from "../../assets/img/landingPage/7.svg";
import ImagePopular5 from "../../assets/img/landingPage/8.svg";
import ImagePopular6 from "../../assets/img/landingPage/9.svg";

function Home() {
  return (
    <>
      <Navbar />

      <section className="max-[500px]:h-[30rem] h-[26rem] md:h-[30rem] lg:h-[40rem] xl:h-[52rem] relative">
        <div className="flex w-full h-full">
          <div className="w-[73%] h-full flex flex-col sm:justify-center">
            <div className="sm:hidden relative mt-20 ms-14">
              <input type="text" className="bg-[#EFEFEF] rounded-md w-full p-3 focus:outline-primary indent-7 text-sm" placeholder="Search Restaurant, Food" />
              <button className="absolute top-3.5 left-4 w-3.5 active:w-5 active:top-3 active:left-3">
                <img src={IconSearch} alt="icon-search" />
              </button>
            </div>
            <h2 className="text-[#2E266F] text-2xl sm:text-3xl lg:text-[3.2rem]/[4rem] font-bold ms-10 md:ms-16 xl:ms-24 max-sm:ms-14 max-[500px]:mt-3 max-sm:mt-8 xl:-mt-16">
              Discover Recipe <br /> & Delicious Food
            </h2>
            <div className="relative max-sm:hidden w-48 sm:w-72 lg:w-1/2 rounded-md ms-10 md:ms-16 xl:ms-24 mt-5">
              <input type="text" className="bg-[#EFEFEF] rounded-md xl:rounded-lg w-full p-3 xl:p-5 focus:outline-primary indent-7 text-sm" placeholder="Search Restaurant, Food" />
              <button className="absolute top-3.5 left-4 w-3.5 xl:w-4 xl:left-6 xl:top-5 active:w-5 active:top-3 active:left-3">
                <img src={IconSearch} alt="icon-search" />
              </button>
            </div>
          </div>
          <div className="bg-primary w-[27%] h-full"></div>
        </div>
        <img
          className="absolute w-48 sm:w-56 md:w-64 lg:w-96 xl:w-[36.5%] right-12 sm:right-16 md:right-28 xl:right-24 max-[500px]:top-52 top-40 sm:top-24 md:top-32 xl:top-36 rounded-md"
          src={imageLanding}
          // src={recipes[0] ? recipes[0].image : ''}
          alt="img-landing"
        />
      </section>
      {/* Search End */}

      {/* Popular For You ! Start */}
      <section>
        <div className="flex items-center gap-2 lg:gap-4 xl:gap-6 mb-9 lg:mb-12 xl:mb-20 px-10 md:px-16 xl:px-28">
          <div className="h-10 md:h-12 lg:h-16 xl:h-28 w-2 xl:w-5 bg-primary"></div>
          <h3 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">Popular For You !</h3>
        </div>

        <div className="w-full md:flex px-10 md:px-16 xl:px-20">
          <img src={ImagePopular} alt="img-popular" className="w-72 md:w-1/2 outline-corner xl:outline-corner-lg mb-12" />

          <div className="md:ps-16 lg:ps-32 xl:ps-40 md:flex md:flex-col md:justify-center">
            <h2 className="text-[#3F3A3A] text-xl md:text-2xl lg:text-3xl xl:text-[2.7rem]/[3.5rem] font-bold">Healthy Bone Broth Ramen (Quick & Easy)</h2>
            <div className="w-10 xl:w-20 h-2 border-b border-[#6F6A40]"></div>
            <p className="text-[#3F3A3A] mt-3 mb-8 text-sm xl:text-xl ">Quick + Easy Chicken Bone Broth Ramen Healthy chicken ramen in a hurry? That&apos;s right!</p>
            <Link to="/recipe" className="bg-primary text-xs px-[1.35rem] py-3 xl:px-[2.65rem] xl:py-4 rounded xl:rounded-md text-white tracking-wider xl:tracking-widest active:ring md:w-28 xl:w-40">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      {/* Popular For You ! End */}

      {/* New Recipe Start */}
      <section>
        <div className="flex items-center gap-2 lg:gap-4 xl:gap-5 px-10 md:px-16 xl:px-28 mt-16 xl:my-20 md:mt-12 mb-9 lg:mb-12">
          <div className="h-10 md:h-12 lg:h-16 xl:h-28 w-2 xl:w-5 bg-primary"></div>
          <h3 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">New Recipe</h3>
        </div>

        <div className="w-full md:flex px-10 md:px-16 xl:px-20 relative">
          <div className="w-2/5 h-80 md:h-full bg-primary absolute left-0 top-0"></div>

          <img src={ImageNewRecipe} alt="img-new" className="h-80 w-80 md:w-1/2 md:h-auto object-cover relative top-7 xl:top-16" />
          <div className="mt-14 md:ps-16 lg:ps-32 xl:ps-40 md:flex md:flex-col md:justify-center">
            <h2 className="text-[#3F3A3A] text-xl md:text-2xl lg:text-3xl xl:text-[2.7rem]/[3.5rem] font-bold">Healthy Bone Broth Ramen (Quick & Easy)</h2>
            <div className="w-10 xl:w-20 h-2 border-b border-[#6F6A40]"></div>
            <p className="text-[#3F3A3A] mt-3 mb-8 text-sm xl:text-xl">Quick + Easy Chicken Bone Broth Ramen Healthy chicken ramen in a hurry? That&apos;s right!</p>
            <Link to="/recipe" className="bg-primary text-xs px-[1.35rem] py-3 xl:px-[2.65rem] xl:py-4 rounded xl:rounded-md text-white tracking-wider xl:tracking-widest active:ring md:w-28 xl:w-40">
              Learn more
            </Link>
          </div>
        </div>
      </section>
      {/* New Recipe End */}

      {/* Popular Recipe Start */}
      <section className="px-10 md:px-16 xl:px-28 mb-20">
        <div className="flex items-center gap-2 lg:gap-4 xl:gap-5 mt-16 md:mt-24 lg:mt-24 xl:mt-44 mb-9 lg:mb-12 xl:mb-20">
          <div className="h-10 md:h-12 lg:h-16 xl:h-28 w-2 xl:w-5 bg-primary"></div>
          <h3 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">Popular Recipe</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-14">
          <Link to="/recipe" className="relative">
            <img src={ImagePopular1} alt="img-4" />
            <div className="w-full absolute left-0 bottom-5 bg-[rgba(255,255,255,.3)]">
              <p className="text-[#3F3A3A] font-bold text-xl xl:text-2xl px-5">Chiken Kare</p>
            </div>
          </Link>

          <Link to="/recipe" className="relative">
            <img src={ImagePopular2} alt="img-5" />
            <div className="w-full absolute left-0 bottom-5 bg-[rgba(255,255,255,.3)]">
              <p className="text-[#3F3A3A] font-bold text-xl xl:text-2xl px-5">Bomb Chicken</p>
            </div>
          </Link>

          <Link to="/recipe" className="relative">
            <img src={ImagePopular3} alt="img-6" />
            <div className="w-full absolute left-0 bottom-5 bg-[rgba(255,255,255,.3)]">
              <p className="text-[#3F3A3A] font-bold text-xl xl:text-2xl px-5">Banana Smothie Pop</p>
            </div>
          </Link>

          <Link to="/recipe" className="relative">
            <img src={ImagePopular4} alt="img-7" />
            <div className="w-full absolute left-0 bottom-5 bg-[rgba(255,255,255,.3)]">
              <p className="text-[#3F3A3A] font-bold text-xl xl:text-2xl px-5">Coffe Lava Cake</p>
            </div>
          </Link>

          <Link to="recipe" className="relative">
            <img src={ImagePopular5} alt="img-8" />
            <div className="w-full absolute left-0 bottom-5 bg-[rgba(255,255,255,.3)]">
              <p className="text-[#3F3A3A] font-bold text-xl xl:text-2xl px-5">Sugar Salmon</p>
            </div>
          </Link>

          <Link to="recipe" className="relative">
            <img src={ImagePopular6} alt="img-9" />
            <div className="w-full absolute left-0 bottom-5 bg-[rgba(255,255,255,.3)]">
              <p className="text-[#3F3A3A] font-bold text-xl xl:text-2xl px-5">Indian Salad</p>
            </div>
          </Link>
        </div>
      </section>
      {/* Popular Recipe End */}

      <Footer />
    </>
  );
}

export default Home;
