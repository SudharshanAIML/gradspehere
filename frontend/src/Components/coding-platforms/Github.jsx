/* eslint-disable react/prop-types */
import { useContext } from "react";
import RepoCard from "../github/repocard";
import { UserContext } from "../../context/UserContext";

function extractId(url) {
  if (url == "") return "";
  return url.split("/").filter(Boolean).pop();
}

function GitHub({ currentCodingPlatform }) {
  const username = extractId(useContext(UserContext).user?.github || "");
  return (
    <RepoCard
      username={username}
      currentCodingPlatform={currentCodingPlatform}
    />
  );
}

export default GitHub;
