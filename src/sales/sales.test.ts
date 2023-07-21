import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../graphql/typeDefs";
import { resolvers } from "../graphql/resolvers";

describe('Queries', () => {
  test('fetch list of sales', async () => {
    const GET_SALES = `
        sales {
          product
          salesRevenue
        }
    `;
    const testServer = new ApolloServer({
      typeDefs,
      resolvers
    })
    const res = await testServer.executeOperation({
      query: GET_SALES
    });
    expect(res.body).toMatchSnapshot();
  });
})