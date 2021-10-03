import Image from 'next/image';
import { Button, Container, Stack, Box } from '@chakra-ui/react';

import { Zeit } from '../components/icons';
import { useFirstTwentyPokemonsQuery } from '../graphql';

export default function IndexPage() {
    const [result] = useFirstTwentyPokemonsQuery();

    const { data } = result;
    // console.log(data);

    return (
        <Container>
            <Stack direction={['column']} spacing="24px">
                <Button data-test="docs-btn-anchor">Hello there</Button>
                <Box>
                    <Image
                        alt="Stuff"
                        src="https://picsum.photos/200"
                        width={200}
                        height={200}
                    />
                </Box>
                <Box>
                    <Zeit />
                </Box>
            </Stack>
        </Container>
    );
}
