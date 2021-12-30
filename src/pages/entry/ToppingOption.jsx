import { Col, Form, Row } from 'react-bootstrap';

export const ToppingOption = ({ imagePath, name, updateItemCount }) => {
  const handleCBClick = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: 10 }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Check type="checkbox" onChange={handleCBClick} label={name} />
        </Col>
      </Form.Group>
    </Col>
  );
};
