import {
  Avatar,
  Flex,
  FlexProps,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  theme,
} from "@chakra-ui/react";

interface ICityCardProps extends FlexProps {
  url: string;
  name: string;
  country: string;
  flagImg: string;
}

export function CityCard({
  url,
  name,
  flagImg,
  country,
  ...rest
}: ICityCardProps) {
  return (
    <Flex
      flexDir="column"
      border={`1px solid ${theme.colors.yellow[400]}`}
      borderRadius={4}
      overflow="hidden"
      {...rest}
    >
      <Image src={url} alt={name} h="10.813rem" />
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem colSpan={1} p="1.125rem 0 1.5rem 1.563rem">
          <Heading fontSize="1.25rem" fontWeight={600} mb="0.75rem">
            {name}
          </Heading>
          <Text fontSize="1rem" fontWeight={500} color="gray.500">
            {country}
          </Text>
        </GridItem>
        <GridItem
          colSpan={1}
          p="2.375rem 1.5rem 2.375rem 0"
          display="flex"
          justifyContent="flex-end"
        >
          <Avatar size="md" name={country} src={flagImg} />
        </GridItem>
      </Grid>
    </Flex>
  );
}
