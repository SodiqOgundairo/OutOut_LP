import Header from "../components/Header"
import AppleLogo from "./../assets/img/AppleLogo.svg"
import GooglePlayLogo from "./../assets/img/GooglePlayLogo.svg"
import OutOutMockup from "./../assets/img/OutOutMockup.png"
import bgOne from "./../assets/img/bg-one.png"
import bgTwo from "./../assets/img/bg-two.png"

const HomeNew = () => {
  return (
    <main className="flex flex-col items-center justify-between text-center h-screen overflow-hidden">
      <Header className="w-screen"/>
      {/* <div className="flex flex-col items-center justify-center gap-8 text-center my-5">

      </div> */}
      <h1 className="text-bolder text-primary text-4xl font-bold w-4/5 md:text-5xl md:w-3/5 lg:text-6xl lg:w-3/5 ">
      {/* <h1 className="text-bolder text-primary text-3xl lg:text-7xl font-bold w-4/5 lg:w-2/5"> */}
        Share trips with the <br /> ones you love
      </h1>

      <p className="text-primary w-4/5 lg:w-4/5 ">
        A weekend getaway with your best friends or Thursday dinner with the
        crew? Vote on dates, <br />chat with your group, share photos, and split
        expenses—all in one place.
      </p>

      <div className="flex justify-between gap-2 md:gap-6">
        <a href="https://play.google.com/store/apps/details?id=com.outout.mobileapp" className="bg-dark text-light flex justify-between gap-2 items-center rounded-md px-4 py-2">
          <img src={GooglePlayLogo} alt="appleLogo" />
          <span className="flex flex-col justify-start items-start leading-tight">
            <p className=" text-xs md:text-sm">GET IT ON</p>
            <p className="text-xl md:text-2xl">Google Play </p>
          </span>
        </a>

        <a href="https://apps.apple.com/ng/app/outout/id6741428356" className="bg-dark text-light flex justify-between gap-2 items-center rounded-md px-4 py-2">
          <img src={AppleLogo} alt="appleLogo" />
          <span className="flex flex-col justify-start items-start leading-tight">
            <p className="text-xs md:text-sm">Download on the</p>
            <p className="text-xl md:text-2xl">App Store </p>
          </span>
        </a>
      </div>

      <img src={OutOutMockup} alt="OutOutMockup" className="md:w-2/5 z-50 "/>
      <img src={bgOne} alt="doodles" className="absolute bottom-0 right-0"/>
      <img src={bgTwo} alt="doodles" className="absolute bottom-0 left-0"/>
    </main>
  )
}

export default HomeNew
