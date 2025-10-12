/* eslint-disable react/prop-types */
import { useContext } from "react";
import UserProfile from "../codeforces/UserProfile";
import { UserContext } from "../../context/UserContext";

function extractId(url) {
  if (url == "") return "";
  return url.split("/").filter(Boolean).pop();
}

function Codeforces({ currentCodingPlatform }) {
  const username = extractId(
    useContext(UserContext).user.codingProfiles?.codeforces || ""
  );
  return (
    <UserProfile
      userName={username}
      currentCodingPlatform={currentCodingPlatform}
    />
  );
}

export default Codeforces;
