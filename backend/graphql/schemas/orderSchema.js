module.exports.orderSchema = `


type Shipping {
    id: ID!
    phone: String
    address: String
}


input ShippingCreateInput{
    phone: String
    address: String
}



type Payment {
    id: ID!
    status: String
    updateTime: String
    emailAddress: String 
}


type OrderItem {
    id: ID!
    name: String
    qty: String
    photo: String
    price : String
    product: Product
}


input OrderItemCreateInput {
    name: String
    qty: String
    photo: String
    price : String
    product: ID
}





type Order {
    id: ID!
    paymentMethod: String!
    taxPrice: String
    shippingPrice: String
    totalPrice: String
    isPaid: Boolean
    isDelivered: Boolean
    user: User
    shippingAddress: Shipping
    paymentResult: Payment
    orderItems: [OrderItem!]!
  }




  input OrderCreateInput {
    paymentMethod: String
    taxPrice: String
    shippingPrice: String
    totalPrice: String
    shippingAddress: ShippingCreateInput
    orderItems: [OrderItemCreateInput]
  }








  input OrderUpdateToPaidInput {
    id: ID
    email: String
    source: ID
  }
`;
