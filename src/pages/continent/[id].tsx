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
      >
        <Heading
          p="3.5rem 0"
          textAlign="center"
          fontSize="1.75rem"
          color="white"
          w="100%"
          fontWeight={600}
        >
          {continent.name}
        </Heading>
      </Flex>

      <Text
        lineHeight="1.313rem"
        fontSize="0.875rem"
        p="1.5rem 1rem"
        textAlign="justify"
      >
        {continent.description}
      </Text>

      <Grid templateColumns="repeat(3, 1fr)" p="0 1rem">
        <GridItem colSpan={1}>
          <Text color="yellow.100" fontSize="1.5rem">
            {countriesCount}
          </Text>
          <Text fontSize="1.125rem">países</Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text color="yellow.100" fontSize="1.5rem">
            {languagesCount}
          </Text>
          <Text fontSize="1.125rem">línguas</Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text color="yellow.100" fontSize="1.5rem">
            {citiesCount}
          </Text>
          <Text fontSize="1.125rem">cidades +100</Text>
        </GridItem>
      </Grid>

      <Heading p="2rem 1rem 1.25rem 1rem" fontSize="1.5rem" fontWeight={500}>
        Cidades +100
      </Heading>

      {continent.countries.map((country) =>
        country.cities.map((city) => (
          <CityCard
            key={city.name}
            country={country.name}
            flagImg={country.flagImg}
            name={city.name}
            url={city.img}
            m="0 3.75rem 1.25rem 3.75rem"
          />
        ))
      )}
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const data = await fetch(
    `http://localhost:3000/api/continents?id=${id}`
  ).then((res) => res.json());

  return {
    props: {
      continent: data,
    },
  };
};
