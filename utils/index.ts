import moment from "moment";
import { StringifyOptions } from "querystring";

export const getExcerpt = (content: string, wordLimit = 20) => {
  const words = content.split(/\s+/); // Split by whitespace
  return (
    words.slice(0, wordLimit).join(" ") +
    (words.length > wordLimit ? "..." : "")
  );
};

export const formatDate = (strapiDate: string) => {
  // const strapiDate = "2023-10-02T11:17:15.676Z";
  const formattedDate = moment(strapiDate).format("MMM D, YYYY");

  // console.log(formattedDate); // Outputs: "Oct 2, 2023"
  return formattedDate;
};
