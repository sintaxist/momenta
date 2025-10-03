export const Invitado = ({ style }) => {
  return (
    <div
      className="absolute w-8 h-8 bg-gray-200 border-2 border-gray-400 rounded-full
      transform -translate-x-1/2 -translate-y-1/2
      hover:outline hover:outline-2 hover:outline-offset-1 hover:outline-blue-500"
      style={style}
    />
  );
};