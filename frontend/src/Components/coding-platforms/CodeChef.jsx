/* eslint-disable react/prop-types */
import { useContext } from "react";
import CodeChefDetails from "../codechef/CodeChefDetails";
import { UserContext } from "../../context/UserContext";
function extractId(url) {
  if (url == "") return "";
  return url.split("/").filter(Boolean).pop();
}

function CodeChef({ currentCodingPlatform }) {
  const username = extractId(
    useContext(UserContext).user.codingProfiles?.codechef || ""
  );
  return (
    <CodeChefDetails
      username={username}
      currentCodingPlatform={currentCodingPlatform}
    />
  );
}

export default CodeChef;
