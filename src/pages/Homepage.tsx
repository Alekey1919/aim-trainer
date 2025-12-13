const Homepage = () => {
  return (
    <div className="h-screen w-screen flex from-10% from-[#1D2C34] to-[#1C1E28] bg-linear-to-br items-center justify-center">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-white text-5xl">
          Test your <span className="text-mint">aim</span> and{" "}
          <span className="text-mint">reflexes</span>
        </h1>

        <button className="bg-mint/50 rounded-lg text-dark-blue/10 py-2 px-4 w-fit text-2xl translate-y-12 hover:bg-mint/80 hover:text-dark-blue transition-all cursor-pointer">
          See game modes
        </button>
      </div>
    </div>
  );
};

export default Homepage;
