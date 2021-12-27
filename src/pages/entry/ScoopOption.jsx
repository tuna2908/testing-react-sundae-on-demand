export const ScoopOption = ({ imagePath, name }) => {
  return (
    <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
    </div>
  );
};
