import axios from "axios";

const API_URL = "http://localhost:3000/api/profile";
const CODEFORCES_API = "https://codeforces.com/api/user.info?handles=";
const CODECHEF_API = "https://codechef-api.vercel.app/handle/";
const LEETCODE_API = "http://localhost:3000/leetcode/";

// Function to generate a random CGPA between 6 and 10
const getRandomCGPA = () => (Math.random() * 4 + 6).toFixed(2);

const fetchRatings = async (platform, username) => {
  if (!username) return "N/A";
  try {
    let url;
    if (platform === "codeforces") {
      url = `${CODEFORCES_API}${username}`;
      const response = await axios.get(url);
      return response.data.result[0].rating || "N/A";
    } else if (platform === "codechef") {
      url = `${CODECHEF_API}${username}`;
      const response = await axios.get(url);
      return response.data.rating || "N/A";
    } else if (platform === "leetcode") {
      url = `${LEETCODE_API}${username}`;
      const response = await axios.get(url);
      return response.data.rating || "N/A";
    }
  } catch (error) {
    console.error(
      `Error fetching ${platform} rating for ${username}:`,
      error.message
    );
    return "N/A";
  }
};

const fetchUserData = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/${uid}`);
    const users = response.data;

    const formattedUsers = await Promise.all(
      users.map(async (user) => {
        const leetcodeRating = await fetchRatings(
          "leetcode",
          user.codingProfiles?.leetcode
        );
        const codechefRating = await fetchRatings(
          "codechef",
          user.codingProfiles?.codechef
        );
        const codeforcesRating = await fetchRatings(
          "codeforces",
          user.codingProfiles?.codeforces
        );

        return {
          name: user.name || "N/A",
          dept: user.department || "N/A",
          cgpa: getRandomCGPA(),
          leetcode: leetcodeRating,
          codechef: codechefRating,
          codeforces: codeforcesRating,
        };
      })
    );

    console.log(formattedUsers);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

fetchUserData("sh4sZv8ENfUt52b1OR73VeGYFji2");
