import React from "react";
import { gql, useQuery } from "@apollo/client";
import { client } from "./index";

const ALL_PEOPLE = gql`
  query AllPeople($filter: String!, $id: String!) {
    people(filter: $filter) {
      id
      name
      snack(id: $id) {
        name
      }
    }
  }
`;

export default function App() {
  const { loading, data } = useQuery(ALL_PEOPLE, {
    variables: {
      filter: "",
      id: "22"
    }
  });

  // console.log(data);

  // React.useEffect(() => {
  //   client
  //     .query({
  //       query: ALL_PEOPLE,
  //       variables: {
  //         filter: "",
  //         id: "22"
  //       }
  //     })
  //     .then(console.log);
  // }, []);

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {data.people.map(person => (
            <li key={person.id}>
              {person.name}:{person.snack?.name}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
