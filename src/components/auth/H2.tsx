const H2: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h2 className="text-center text-[32px] font-normal sm:text-[40px]">
      {text}
    </h2>
  );
};

export default H2;
