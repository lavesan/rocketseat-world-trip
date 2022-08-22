import React from "react";
import { IconButton, Image, Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";
import Link from "next/link";

export const Header = () => {
  const { asPath } = useRouter();
  const showArrowBack = asPath !== "/";

  return (
    <Grid
      as="header"
      p={["1rem", "1.688rem 8.75rem"]}
      templateColumns="repeat(5, 1fr)"
    >
      <GridItem colSpan={1}>
        {showArrowBack && (
          <Link href="/" passHref>
            <IconButton
              aria-label="Retornar home"
              as={BiChevronLeft}
              fontSize="1rem"
            />
          </Link>
        )}
      </GridItem>
      <GridItem
        colSpan={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src="/images/Logo.svg" alt="logo" w={["5.063rem", "11.5rem"]} />
      </GridItem>
      <GridItem colSpan={1} />
    </Grid>
  );
};
