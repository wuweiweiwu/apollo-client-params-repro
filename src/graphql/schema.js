import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from "graphql";

const SnackType = new GraphQLObjectType({
  name: "Snack",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  }
});

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    snack: {
      type: SnackType,
      args: { id: { type: GraphQLString } },
      resolve: (_, args) => {
        console.log(
          "snack THERE: ",
          args,
          snackData.find(s => s.id == args.id)
        );
        return snackData.find(s => s.id == args.id);
      }
    }
  }
});

const peopleData = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sara Smith" },
  { id: 3, name: "Budd Deey" }
];

const snackData = [
  { id: 11, name: "Apple" },
  { id: 22, name: "Orange" },
  { id: 33, name: "WTF" }
];

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData
      // fields: {
      //   snack: {
      //     args: {
      //       id: {
      //         type: GraphQLString
      //       }
      //     },
      //     type: SnackType,
      //     resolve: (_, args) => {
      //       console.log("snack HERE: ", args);
      //       return snackData.find(s => s.id === args.id);
      //     }
      //   }
      // }
    }
  }
});

export const schema = new GraphQLSchema({ query: QueryType });
