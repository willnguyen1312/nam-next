import Image from "next/image";
import { Button, Container, Stack, Box } from "@chakra-ui/react";
import { Zeit } from "../components/icons";

export default function IndexPage() {
  return (
    <Container>
      <Stack direction={["column"]} spacing="24px">
        <Button>Hello there</Button>
        <Box>
          <Image src="https://picsum.photos/200" width={200} height={200} />
        </Box>
        <Box>
          <Zeit />
        </Box>
      </Stack>
    </Container>
  );
}
