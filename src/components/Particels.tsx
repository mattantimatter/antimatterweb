import Particles3D from "./Particles3D";

const Particels = () => {
  return (
    <div
      className="fixed opacity-0 top-1/2 left-1/2 -translate-1/2 size-[900px] z-30"
      id="particles3d"
    >
      <div className="relative w-full h-full  scale-80  2xl:scale-100 2xl:translate-x-0">
        <Particles3D />
        <div className="size-1/2 top-1/2 left-1/2 -translate-1/2 absolute bg-primary rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default Particels;
