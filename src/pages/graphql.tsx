import { useEffect } from "react";
import { Heading } from "@chakra-ui/react";

import { getPokemons } from "../graphql";

export default function GraphQlPage() {
  useEffect(() => {
    async function tada() {
      const result = await getPokemons();

      console.log(result);
    }

    tada();
  }, []);
  return (
    <main>
      <Heading>Pokemon</Heading>
    </main>
  );
}
