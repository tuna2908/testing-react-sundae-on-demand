export const ToppingOption = ({ imagePath, name }) => {
  return (
    <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
    </div>
  );
};
