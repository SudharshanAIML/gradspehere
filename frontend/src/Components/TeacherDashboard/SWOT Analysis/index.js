import fs from "fs/promises";

function normalizeRating(value, minVal, maxVal) {
  return (value - minVal) / (maxVal - minVal);
}

function computeFinalScore(student) {
  const normLeetcode = normalizeRating(student.leetcode, 800, 2200);
  const normCodechef = normalizeRating(student.codechef, 800, 2200);
  const normCodeforces = normalizeRating(student.codeforces, 300, 2000);

  const codingAvg = (normLeetcode + normCodechef + normCodeforces) / 3.0;
  const normCgpa = student.cgpa / 10.0;

  return parseFloat((0.6 * codingAvg + 0.4 * normCgpa).toFixed(3));
}

async function processStudents(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, "utf8");
    let jsonData = JSON.parse(data);

    jsonData.students.forEach((student) => {
      student.finalScore = computeFinalScore(student);
    });

    jsonData.students.sort((a, b) => b.finalScore - a.finalScore);

    jsonData.students.forEach((student, index) => {
      student.rank = index + 1;
    });

    await fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2), "utf8");
    console.log(`Processed data has been saved to '${outputFile}'.`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

const inputFile =
  "C:/Users/keert/OneDrive/Desktop/project/SDG CIT HACKATHON/git/gradsphere/frontend/src/Components/TeacherDashboard/SWOT Analysis/input.json";
const outputFile =
  "C:/Users/keert/OneDrive/Desktop/project/SDG CIT HACKATHON/git/gradsphere/frontend/src/Components/TeacherDashboard/SWOT Analysis/output.json";

processStudents(inputFile, outputFile);
