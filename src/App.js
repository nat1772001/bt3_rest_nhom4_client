import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [productId, setProductId] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    setInventories(null);
  }, []);

  const checkInventory = () => {
    fetch(
      `http://localhost:8080/api/inventory?product_id=${productId}&quantity=${quantity}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setInventories(json);
      });
  };

  const formatMoney = (money) => {
    const config = {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 9,
    };
    return new Intl.NumberFormat("vi-VN", config).format(money);
  };

  return (
    <div className="App">
      <Row>
        <Col>
          <Container className="mt-3">
            <h1>Kiểm tra tồn kho</h1>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Mã sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mã sản phẩm"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số lượng"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Button variant="primary" onClick={checkInventory}>
                  Kiểm tra
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Col>
        <Col>
          <Container className="mt-3">
            {!inventories ? (
              <></>
            ) : inventories.length ? (
              <Alert variant="primary">
                <ul>
                  <h5>Thông tin sản phẩm: </h5>
                  <li>Tên: {inventories[0].product.name}</li>
                  <li>Mô tả: {inventories[0].product.description}</li>
                  <li>Đơn vị tính: {inventories[0].product.unity}</li>
                  <li>Đơn giá: {formatMoney(inventories[0].product.price)}</li>
                </ul>
                <ul>
                  <h5>Tồn kho:</h5>
                  {inventories.map((inventory) => {
                    return (
                      <li key={inventory.id}>
                        {inventory.warehouse.name}: {inventory.quantity} (
                        {inventory.product.unity})
                      </li>
                    );
                  })}
                </ul>
              </Alert>
            ) : (
              <Alert variant="danger">
                Không tìm thấy tồn kho của sản phẩm!
              </Alert>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;
