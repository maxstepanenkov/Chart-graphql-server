export const typeDefs = `#graphql
  type Sales {
    product: String,
    salesRevenue: Float,
    region: String
  }
  type Query {
    sales: [Sales],
    salesByName(product: String): Sales,
    sortedSales(quantity: Int): [Sales]
  }
  type Mutation {
    updateSales(product: String!, salesRevenue: String): Sales
    deleteSales(product: String!): Sales
  }
`;