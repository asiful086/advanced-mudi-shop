import { makeVar } from "@apollo/client";

export const cartItems = makeVar(
  localStorage.getItem("shoppingCart")
    ? [...JSON.parse(localStorage.getItem("shoppingCart"))]
    : []
);

export const addToCart = (item) => {
  let exists = cartItems().find((ci) => ci.id === item.id);

  if (exists) {
    return increaseItem(exists);
  } else {
    item = { ...item, count: 1 };

    cartItems([...cartItems(), item]);
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems()));
  }
};

export const removeToCart = (item) => {
  cartItems(cartItems().filter((ci) => ci.id !== item.id));
  localStorage.setItem("shoppingCart", JSON.stringify(cartItems()));
};

export const increaseItem = (item) => {
  if (item.count < item.stock) {
    cartItems(
      cartItems().map((ci) => {
        if (ci.id === item.id) {
          ci.count++;
        }
        return ci;
      })
    );
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems()));
  } else {
    alert("No more stock available");
  }
};

export const decreaseItem = (item) => {
  cartItems(
    cartItems().map((ci) => {
      if (ci.id === item.id) {
        ci.count--;
      }
      return ci;
    })
  );
  localStorage.setItem("shoppingCart", JSON.stringify(cartItems()));
  if (item.count === 0) {
    return removeToCart(item);
  }
};

export const clearCart = () => {
  cartItems([]);
  localStorage.removeItem("shoppingCart");
};

//   Calculate prices
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const cartAllPrices = () => {
  let cartItemsPrice = 0;
  let shippingPrice = 0;
  let taxPrice = 0;
  let totalPrice = 0;

  if (cartItems().length > 0) {
    let cartTotalPrice = cartItems().reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    cartItemsPrice = addDecimals(cartTotalPrice);
    shippingPrice = addDecimals(cartTotalPrice > 100 ? 0 : 100);
    taxPrice = addDecimals(Number((0.15 * cartTotalPrice).toFixed(2)));

    totalPrice = (
      Number(cartItemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);
  }

  return {
    cartItemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
