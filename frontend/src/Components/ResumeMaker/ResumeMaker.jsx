/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useParams } from "react-router";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 15, paddingBottom: 5 },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  contact: { textAlign: "center", marginBottom: 10 },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
    textAlign: "center",
  },
  text: { fontSize: 12, marginLeft: 10 },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  image: { width: 100, height: 100, borderRadius: 50 },
});

const ResumePDF = ({ userData, withPhoto }) => (
  <Document>
    <Page style={styles.page}>
      {withPhoto && userData.user.profileImage && (
        <View style={styles.imageContainer}>
          <Image src={userData.user.profileImage} style={styles.image} />
        </View>
      )}
      <Text style={styles.name}>{userData.user.name}</Text>
      <Text style={styles.contact}>
        {userData.user.email} | {userData.user.linkedin} |{" "}
        {userData.user.github}
      </Text>
      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>
          {userData.user.department} - {userData.user.year} Year,{" "}
          {userData.user.semester} Semester
        </Text>
        <Text style={styles.text}>CGPA: {userData.user.cgpa}</Text>
        <Text style={styles.text}>College: {userData.user.college}</Text>
      </View>
      {/* Job Details Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Job Details</Text>
        <View style={styles.divider} />
        {userData.user.jobDetails.map((job, idx) => (
          <Text key={idx} style={styles.text}>
            • {job.company} - {job.role}: {job.description}
          </Text>
        ))}
      </View>
      {/* Projects Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Projects</Text>
        <View style={styles.divider} />
        {userData.repositories.map((repo, idx) => (
          <Text key={idx} style={styles.text}>
            • {repo.title}: {repo.description} ({repo.technologies})
          </Text>
        ))}
      </View>
      {/* Certificates Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Certificates</Text>
        <View style={styles.divider} />
        {userData.user.certificates.map((cert, idx) => {
          // Remove the .pdf suffix from the certificate name
          const certificateName = cert.name.replace(/\.pdf$/, "");
          return (
            <Text key={idx} style={styles.text}>
              • {certificateName} {/* Display the cleaned certificate name */}
            </Text>
          );
        })}
      </View>
      {/* Achievements Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Achievements</Text>
        <View style={styles.divider} />
        {userData.user.achievements.map((achieve, idx) => (
          <Text key={idx} style={styles.text}>
            • {achieve.description}
          </Text>
        ))}
      </View>
      {/* Technical Skills Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Technical Skills</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>{userData.user.techStacks.join(", ")}</Text>
      </View>
      {/* Soft Skills Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Soft Skills</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>{userData.user.softSkills.join(", ")}</Text>
      </View>
      {/* Volunteer Works Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Volunteer Works</Text>
        <View style={styles.divider} />
        {userData.user.volunteerWorks.map((work, idx) => (
          <Text key={idx} style={styles.text}>
            • {work.organization} - {work.role}: {work.description}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

const ResumeGenerator = () => {
  const [data, setData] = useState(null);
  const [template, setTemplate] = useState("basic");

  // Fetch recent GitHub repositories
  const fetchRecentRepos = async (username) => {
    const url = `https://api.github.com/users/${username}/repos`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const repos = await response.json();
      const recentRepos = repos.slice(0, 6).map((repo) => ({
        title: repo.name,
        description: repo.description,
        technologies: repo.language,
      }));
      return recentRepos;
    } catch (error) {
      console.error("Could not fetch repositories: ", error);
      return []; // Return an empty array in case of error
    }
  };

  // Fetch user data from your API
  const fetchUserData = async (uid) => {
    const url = `http://localhost:5000/api/profile/${uid}`; // Replace with your server URL if different

    try {
      const response = await fetch(url);

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const userData = await response.json();

      // Store the user data in an object
      const user = {
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        mobile: userData.mobile,
        portfolio: userData.portfolio,
        linkedin: userData.linkedin,
        github: userData.github,
        profileImage: userData.profileImage,
        techStacks: userData.techStacks,
        jobDetails: userData.jobDetails,
        codingProfiles: userData.codingProfiles,
        department: userData.department,
        year: userData.year,
        semester: userData.semester,
        rollNo: userData.rollNo,
        section: userData.section,
        certificates: userData.certificates,
        achievements: userData.achievements,
        softSkills: userData.softSkills,
        volunteerWorks: userData.volunteerWorks,
        college: "Chennai Institute of Technology", // Hardcoded college name
        cgpa: 8.5, // Hardcoded CGPA
      };

      return user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // Return null in case of error
    }
  };

  // Combine both functions into a single object
  const fetchCombinedData = async (uid) => {
    try {
      // Fetch user data
      const userData = await fetchUserData(uid);

      // Extract GitHub username from the user's GitHub URL
      const githubUrl = userData.github; // e.g., "https://github.com/johndoe"
      const githubUsername = githubUrl.split("/").pop(); // Extract "johndoe"

      // Fetch GitHub repositories using the extracted username
      const recentRepos = await fetchRecentRepos(githubUsername);

      // Combine the results into a single object
      const combinedData = {
        user: userData,
        repositories: recentRepos,
      };

      return combinedData;
    } catch (error) {
      console.error("Error fetching combined data:", error);
      return null; // Return null in case of error
    }
  };
  const { uid } = useParams();

  useEffect(() => {
    // Fetch combined data
    const fetchData = async () => {
      const combinedData = await fetchCombinedData(uid);
      setData(combinedData);
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading resume...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">Select Resume Template</h2>
      <div className="flex justify-between items-center">
        <select
          className="border p-2 rounded my-4"
          onChange={(e) => setTemplate(e.target.value)}
        >
          <option value="basic">Basic Resume</option>
          <option value="photo">Resume with Profile Picture</option>
        </select>

        <PDFDownloadLink
          document={
            <ResumePDF userData={data} withPhoto={template === "photo"} />
          }
          fileName="resume.pdf"
          className="h-fit"
        >
          {({ loading }) =>
            loading ? "Generating PDF..." : "Download Resume as PDF"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ResumeGenerator;
