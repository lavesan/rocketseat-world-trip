export interface IContinent {
  id: string;
  name: string;
  briefDescription: string;
  description: string;
  img: string;
  languages: string[];
  countries: {
    name: string;
    flagImg: string;
    cities: {
      name: string;
      img: string;
    }[];
  }[];
}
