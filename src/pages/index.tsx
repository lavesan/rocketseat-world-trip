import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  Image,
  useBreakpointValue,
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

const pleasures = [
  { label: "vida noturna", img: "/images/cocktail.png" },
  { label: "praia", img: "/images/surf.png" },
  { label: "moderno", img: "/images/building.png" },
  { label: "clássico", img: "/images/museum.png" },
  { label: "e mais...", img: "/images/earth.png" },
];

export default function Home({ continents }: IHomeProps) {
  const mobile = useBreakpointValue(
    {
      base: true,
      md: false,
    },
    {
      fallback: "md",
    }
  );

  return (
    <Flex w="100%" flexDir="column">
      <Header />

      <Flex
        backgroundImage="/images/home-bg.svg"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        flexDir="row"
        justify="flex-start"
        position="relative"
        p={["1.75rem 1rem", "5rem 8.75rem"]}
      >
        <Flex flexDir="column" w={["100%", "50%"]}>
          <Heading
            as="h1"
            color="gray.100"
            fontWeight={500}
            fontSize={["1.25rem", "2.25rem"]}
            lineHeight={["1.875rem", "3.375rem"]}
          >
            5 Continentes,
            <br />
            infinitas possibilidades.
          </Heading>
          <Text
            color="gray.100"
            pt={["0.5rem", "1.25rem"]}
            fontSize={["0.875rem", "1.25rem"]}
            lineHeight={["1.313rem", "1.875rem"]}
          >
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </Flex>

        <Image
          display={["none", "block"]}
          position="absolute"
          right="8.75rem"
          top="3rem"
          src="/images/Airplane.svg"
          w="30vw"
        />
      </Flex>

      {mobile ? (
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
      ) : (
        <Flex flexDir="row" justify="space-between" px="8.75rem" my="5rem">
          {pleasures.map(({ label, img }) => (
            <Flex key={label} flexDir="column" align="center">
              <Image src={img} w="5.313rem" mb="1.5rem" />
              <Text fontSize="1.5rem">{label}</Text>
            </Flex>
          ))}
        </Flex>
      )}

      <Flex justify="center">
        <Divider
          orientation="horizontal"
          w={["3.75rem", "5.625rem"]}
          borderColor="gray.900"
        />
      </Flex>

      <Flex
        p={["1.5rem 2.438rem 1.25rem", "3.25rem 18.813rem"]}
        justify="center"
      >
        <Text
          textAlign="center"
          lineHeight={["1.875rem", "3.375rem"]}
          fontSize={["1.25rem", "2.25rem"]}
        >
          Vamos nessa?
          <br />
          Então escolha seu continente
        </Text>
      </Flex>

      <Flex mb="1.5rem" px={[0, "6.25rem"]}>
        <Swiper
          navigation
          style={{
            "--swiper-navigation-color": "var(--chakra-colors-yellow-100)",
            "--swiper-pagination-color": "var(--chakra-colors-yellow-100)",
          }}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {continents.map((continent) => (
            <SwiperSlide key={continent.name} color="yellow">
              <Link href={`/continent/${continent.id}`} passHref>
                <Flex
                  as="a"
                  w="100%"
                  justify="center"
                  p="12"
                  background={`linear-gradient(#00000080, #00000080), url(${continent.img})`}
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center"
                  backgroundSize="cover"
                  flexDir="column"
                  h={["15.625rem", "28.125rem"]}
                >
                  <Heading
                    textAlign="center"
                    color="gray.100"
                    fontSize={["1.5rem", "3rem"]}
                  >
                    {continent.name}
                  </Heading>
                  <Text
                    textAlign="center"
                    color="gray.100"
                    fontSize={["0.875rem", "1.5rem"]}
                  >
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const hostName = req.headers.host.includes("localhost")
    ? `http://${req.headers.host}`
    : `https://${req.headers.host}`;

  const data = await fetch(`${hostName}/api/continents`).then((res) =>
    res.json()
  );

  return {
    props: {
      continents: data,
    },
  };
};
