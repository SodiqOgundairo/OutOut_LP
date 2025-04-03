import logo from "./../assets/img/OutOutLogo.png";
import background from "./../assets/img/LPImage.png";
import doodles from "./../assets/img/bg2.png";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="relative min-h-screen">
      <div className="mx-0 lg:mx-6 flex flex-col-reverse lg:flex-row justify-between items-center gap-10 h-full">
        <div className="flex flex-col gap-6 mx-10 lg:mx-28">
          <img src={logo} alt="" className="w-[30%] md:w-[20%]" />
          <p className="text-5xl md:text-7xl font-bold text-primary">
            Experience More, <br /> Simplify the Fun
          </p>
          <p className="text-primary">
            From brunches to trips, concerts to comedy nights, enjoying our time
            outside is all that matters. We’re creating a new way to make group
            activities smoother and more enjoyable. Be the first to experience
            it.
          </p>

          <div className="w-auto">
            <button className="px-20 py-3 text-light rounded-md bg-primary hover:bg-[#3eb9e2] transition duration-300 ease-in-out">
              Join the Waitlist
            </button>

            <Link to="/privacy" className="text-primary hover:text-[#3eb9e2] text-sm font-semibold ml-4 cursor-pointer my-4 md:my-0">
              Privacy Policy </Link>
          </div>
        </div>


        <img
          src={background}
          alt=""
          className="h-[300px] md:h-[550px] w-full lg:w-2/5 lg:h-full lg:py-6 lg:max-h-[100vh] object-cover object-fit -z-50"
        />
      </div>
      <img src={doodles} alt="" className="lg:absolute bottom-0 left-0 lg:w-3/5 -z-50" />
    </div>
  );
};

export default Home;
