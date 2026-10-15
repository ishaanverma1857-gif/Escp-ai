import { Atkinson_Hyperlegible_Next, Montserrat } from "next/font/google";

// Montserrat matches the ESCP AI brand (posters, wordmark); Atkinson keeps body text easy to read.
export const display = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

export const sans = Atkinson_Hyperlegible_Next({
  subsets: ["latin", "latin-ext"],
  variable: "--font-atkinson",
  display: "swap",
});
