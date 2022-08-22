import { Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { CityCard } from "../../components/CityCard";

import { Header } from "../../components/Header";
import { IContinent } from "../../models/continent";

interface IContinentProps {
  continent: IContinent;
}

export default function Continent({ continent }: IContinentProps) {
  const countriesCount = continent.countries.length;
  const languagesCount = continent.languages.length;
  let citiesCount = 0;

  continent.countries.forEach((country) => {
    citiesCount += country.cities.length;
  });

  return (
    <Flex w="100%" flexDirection="column">
      <Header />

      <Flex
        background={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${continent.img})`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        h={["9.375rem", "31.25rem"]}
        align={["center", "flex-end"]}
      >
        <Heading
          textAlign={["center", "start"]}
          fontSize={["1.75rem", "3rem"]}
          color="white"
          w="100%"
          fontWeight={600}
          pl={[0, "8.75rem"]}
          pb={[0, "3.688rem"]}
        >
          {continent.name}
        </Heading>
      </Flex>

      <Flex
        flexDir={["column", "row"]}
        px={["1rem", "8.75rem"]}
        pt={["1.5rem", "5rem"]}
        pb={["2rem", "5rem"]}
      >
        <Text
          lineHeight={["1.313rem", "2.25rem"]}
          fontSize={["0.875rem", "1.5rem"]}
          pb={["1.5rem", 0]}
          textAlign="justify"
          w={["100%", "50%"]}
        >
          {continent.description}
        </Text>

        <Flex
          w={["100%", "50%"]}
          flexDir="row"
          justify={["space-between", "space-around"]}
          align="center"
        >
          <Flex flexDir="column" align={["flex-start", "center"]}>
            <Text color="yellow.100" fontSize={["1.5rem", "3rem"]}>
              {countriesCount}
            </Text>
            <Text fontSize={["1.125rem", "1.5rem"]} fontWeight={[500, 600]}>
              países
            </Text>
          </Flex>
          <Flex flexDir="column" align={["flex-start", "center"]}>
            <Text color="yellow.100" fontSize={["1.5rem", "3rem"]}>
              {languagesCount}
            </Text>
            <Text fontSize={["1.125rem", "1.5rem"]} fontWeight={[500, 600]}>
              línguas
            </Text>
          </Flex>
          <Flex flexDir="column" align={["flex-start", "center"]}>
            <Text color="yellow.100" fontSize={["1.5rem", "3rem"]}>
              {citiesCount}
            </Text>
            <Text fontSize={["1.125rem", "1.5rem"]} fontWeight={[500, 600]}>
              cidades +100
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Heading
        p={["0 1rem 1.25rem 1rem", "0 8.75rem 2.5rem 8.75rem"]}
        fontSize={["1.5rem", "2.25rem"]}
        fontWeight={500}
      >
        Cidades +100
      </Heading>

      <Flex
        flexDir={["column", "row"]}
        px={["3.75rem", "8.75rem"]}
        justify="flex-start"
        wrap="wrap"
      >
        {continent.countries.map((country) =>
          country.cities.map((city) => (
            <CityCard
              key={city.name}
              country={country.name}
              flagImg={country.flagImg}
              name={city.name}
              url={city.img}
              mb={["1.25rem", "3rem"]}
              mr={[0, "2.813rem"]}
              w={["100%", "16rem"]}
            />
          ))
        )}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id } = params;
  const hostName = req.headers.host.includes("localhost")
    ? `http://${req.headers.host}`
    : `https://${req.headers.host}`;

  const data = await fetch(`${hostName}/api/continents?id=${id}`).then((res) =>
    res.json()
  );

  return {
    props: {
      continent: data,
    },
  };
};
