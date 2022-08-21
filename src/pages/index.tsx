import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { GetServerSideProps } from "next";

import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Header } from "../components/Header";
import Link from "next/link";
import { IContinent } from "../models/continent";

interface IHomeProps {
  continents: IContinent[];
}

export default function Home({ continents }: IHomeProps) {
  return (
    <Flex w="100%" flexDir="column">
      <Header />

      <Flex
        backgroundImage="/images/home-bg.svg"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        flexDir="column"
        p="1.75rem 1rem"
      >
        <Heading
          as="h1"
          color="gray.100"
          fontWeight={500}
          fontSize="1.25rem"
          lineHeight="1.875rem"
        >
          5 Continentes,
          <br />
          infinitas possibilidades.
        </Heading>
        <Text
          color="gray.100"
          pt="0.5rem"
          fontSize="0.875rem"
          lineHeight="1.313rem"
        >
          Chegou a hora de tirar do papel a viagem que você sempre sonhou.
        </Text>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" p="2.25rem 3.125rem">
        <GridItem colSpan={1}>
          <Icon as={BsDot} color="yellow.100" /> vida noturna
        </GridItem>
        <GridItem colSpan={1} display="flex" justifyContent="flex-end">
          <Icon as={BsDot} color="yellow.100" /> praia
        </GridItem>
        <GridItem colSpan={1}>
          <Icon as={BsDot} color="yellow.100" /> moderno
        </GridItem>
        <GridItem colSpan={1} display="flex" justifyContent="flex-end">
          <Icon as={BsDot} color="yellow.100" /> clássico
        </GridItem>
        <GridItem colSpan={2} display="flex" justifyContent="center">
          <Icon as={BsDot} color="yellow.100" /> e mais...
        </GridItem>
      </Grid>

      <Flex justify="center">
        <Divider orientation="horizontal" w="3.75rem" borderColor="gray.900" />
      </Flex>

      <Flex p="1.5rem 2.438rem 1.25rem" justify="center">
        <Text textAlign="center" lineHeight="1.875rem" fontSize="1.25rem">
          Vamos nessa?
          <br />
          Então escolha seu continente
        </Text>
      </Flex>

      <Flex mb="1.5rem">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {continents.map((continent) => (
            <SwiperSlide key={continent.name}>
              <Link href={`/continent/${continent.id}`} passHref>
                <Flex
                  as="a"
                  w="100vw"
                  justify="center"
                  p="12"
                  background={`linear-gradient(#00000080, #00000080), url(${continent.img})`}
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center"
                  backgroundSize="cover"
                  flexDir="column"
                >
                  <Heading
                    textAlign="center"
                    color="gray.100"
                    fontSize="1.5rem"
                  >
                    {continent.name}
                  </Heading>
                  <Text textAlign="center" color="gray.100" fontSize="0.875rem">
                    {continent.briefDescription}
                  </Text>
                </Flex>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("http://localhost:3000/api/continents").then((res) =>
    res.json()
  );

  return {
    props: {
      continents: data,
    },
  };
};
