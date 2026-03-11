
const Header = ({ heading, paragraph }) => {
  return (
    <div className="pt-6">
      <div className="flex items-start justify-center flex-col max-w-[44rem]  ">
        <h1 className="font-display text-3xl text-text-primary ">{heading}</h1>
        <p className="font-mono text-[0.9rem] text-[#8b8ba0] tracking-tight  pt-2.5">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default Header;
