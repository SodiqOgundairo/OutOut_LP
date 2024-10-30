import logo from "./../assets/img/OutOutLogo.png";
import background from "./../assets/img/LPImage.png";
import doodles from "./../assets/img/bg1.png";


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
            <button className="px-20 py-3 text-light rounded-md bg-primary hover:bg-[#0e262e] transition duration-300 ease-in-out">
              Join the Waitlist
            </button>
          </div>
        </div>

        <img
          src={background}
          alt=""
          className="w-full lg:w-2/5 h-full lg:py-6 max-h-[100vh] object-contain"
        />
      </div>
      <img src={doodles} alt="" className="absolute bottom-0 left-0 w-3/5" />
    </div>
  );
};

export default Home;
