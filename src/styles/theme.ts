import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      900: "#47585B",
      500: "#999999",
      100: "#DADADA",
    },
    white: "#F5F8FA",
    yellow: {
      400: "#ffba0880",
      100: "#FFBA08",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.900",
        margin: 0,
        padding: 0,
      },
    },
  },
});
