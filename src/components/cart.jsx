import "../css/card.css";
import { Trash } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import CartImg from "/images/cart2.jpg";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ProductContext } from "./home";
function Cart() {
  const { cart, removeItem } = useContext(ProductContext);
  console.log(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleRemove = (item) => {
    removeItem(item);
  };

  useEffect(() => {
    const newTotalPrice = cart.reduce((total, item) => total + item.price, 0);
    setTotalPrice(newTotalPrice);
    console.log(newTotalPrice);
  }, [cart]);

  return (
    <div>
      <div className="card-cart">
        <img
          src={CartImg}
          alt="Cart Image"
          style={{
            borderRadius: "35px 0 0 35px",
            width: "300px",
            height: "320px",
          }}
        />
        <div style={{ marginRight: "40px" }}>
          <h2
            style={{ margin: "20px", position: "sticky", background: "white" }}
          >
            Cart
          </h2>
          <div
            className="container"
            style={{
              overflow: "auto",
              paddingLeft: "30px",
              height: "220px",
              width: "300px",
              position: "relative",
            }}
          >
            {cart.length === 0 ? (
              <p>Cart is empty.</p>
            ) : (
              <ul style={{ padding: 0, listStyle: "none" }}>
                {cart.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {item.name} - ${item.price}
                    </div>
                    <Button
                      onClick={() => handleRemove(item)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.1)")
                      } // Scale up on hover
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      <Trash size={25} style={{ color: "#FF6347" }} />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p style={{ marginLeft: "20px" }}>Total Price: ${totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
