import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
  typePolicies: {
    //   those are the ROOT_QUERY
    Query: {
      fields: {
        getCategories: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getSubcategories: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // getCategory: {
        //   read(_, { readField, variables }) {
        //     const allCategories = readField("getCategories");
        //     if (allCategories) {
        //       return allCategories.find((category) => {
        //         const the_id = readField("id", category);
        //         return the_id === variables.id;
        //       });
        //     }
        //     return null;
        //   },
        // },
        getCategory(_, { args, toReference }) {
          return toReference({
            __typename: "Category",
            id: args.id,
          });
        },
        getSubcategory(_, { args, toReference }) {
          return toReference({
            __typename: "Subcategory",
            id: args.id,
          });
        },
        getSubsubcategory(_, { args, toReference }) {
          return toReference({
            __typename: "Subsubcategory",
            id: args.id,
          });
        },
      },
    },
  },
});
