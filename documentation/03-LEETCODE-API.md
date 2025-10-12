# LeetCode Backend API Documentation

## Overview
The LeetCode Backend Service is a TypeScript-based Express API that provides comprehensive access to LeetCode user statistics, problem data, and contest information. It includes caching, rate limiting, and extensive endpoints for retrieving LeetCode data.

**Base URL**: `http://localhost:3000`
**Production URL**: `https://alfa-leetcode-api.onrender.com/`

**Technology Stack**:
- TypeScript
- Express.js 4.18.2
- Axios 1.7.2
- API Caching (5 minutes)
- Rate Limiting (60 requests/hour)

---

## Table of Contents
1. [API Features](#api-features)
2. [User Profile Endpoints](#user-profile-endpoints)
3. [Problem Endpoints](#problem-endpoints)
4. [Contest Endpoints](#contest-endpoints)
5. [Discussion Endpoints](#discussion-endpoints)
6. [Rate Limiting](#rate-limiting)
7. [Caching Strategy](#caching-strategy)
8. [Error Handling](#error-handling)

---

## API Features

### Core Capabilities
✅ User profile statistics
✅ Problem-solving history
✅ Contest rankings and history
✅ Submission tracking
✅ Daily problem fetching
✅ Problem filtering by tags and difficulty
✅ Discussion topics and comments
✅ Language statistics
✅ Skill statistics
✅ Calendar submissions

### Performance Features
- **Caching**: 5-minute cache for all responses
- **Rate Limiting**: 60 requests per hour per IP
- **CORS**: Enabled for all origins
- **Error Handling**: Comprehensive error messages

---

## User Profile Endpoints

### 1. Get User Profile
**Endpoint**: `GET /:username`

**Description**: Retrieves comprehensive user profile data

**Example Request**:
```
GET /johndoe
```

**Response**:
```json
{
  "matchedUser": {
    "username": "johndoe",
    "profile": {
      "realName": "John Doe",
      "userAvatar": "https://assets.leetcode.com/users/johndoe/avatar.png",
      "ranking": 12345,
      "reputation": 150
    },
    "submitStats": {
      "acSubmissionNum": [
        {
          "difficulty": "All",
          "count": 450,
          "submissions": 800
        },
        {
          "difficulty": "Easy",
          "count": 200,
          "submissions": 250
        },
        {
          "difficulty": "Medium",
          "count": 200,
          "submissions": 400
        },
        {
          "difficulty": "Hard",
          "count": 50,
          "submissions": 150
        }
      ]
    }
  }
}
```

---

### 2. Get User Badges
**Endpoint**: `GET /:username/badges`

**Description**: Retrieves all badges earned by the user

**Example Request**:
```
GET /johndoe/badges
```

**Response**:
```json
{
  "badges": [
    {
      "id": "annual-badge-2023",
      "displayName": "Annual Badge 2023",
      "icon": "https://assets.leetcode.com/badges/annual-2023.png",
      "creationDate": "2023-01-01"
    }
  ]
}
```

---

### 3. Get Solved Problems Count
**Endpoint**: `GET /:username/solved`

**Description**: Get total number of problems solved

**Example Request**:
```
GET /johndoe/solved
```

**Response**:
```json
{
  "solvedProblem": 450,
  "easySolved": 200,
  "mediumSolved": 200,
  "hardSolved": 50,
  "totalSubmissionNum": [
    {
      "difficulty": "All",
      "count": 800
    }
  ],
  "acSubmissionNum": [
    {
      "difficulty": "All",
      "count": 450
    }
  ]
}
```

---

### 4. Get Contest Details
**Endpoint**: `GET /:username/contest`

**Description**: Get user's contest participation details

**Example Request**:
```
GET /johndoe/contest
```

**Response**:
```json
{
  "userContestRanking": {
    "attendedContestsCount": 25,
    "rating": 1850.5,
    "globalRanking": 5432,
    "totalParticipants": 500000,
    "topPercentage": 1.08
  }
}
```

---

### 5. Get Contest History
**Endpoint**: `GET /:username/contest/history`

**Description**: Get complete contest participation history

**Example Request**:
```
GET /johndoe/contest/history
```

**Response**:
```json
{
  "contestHistory": [
    {
      "contest": {
        "title": "Weekly Contest 350",
        "startTime": 1686470400
      },
      "rating": 1850,
      "ranking": 1234,
      "problemsSolved": 3,
      "totalProblems": 4,
      "finishTimeInSeconds": 5400
    }
  ]
}
```

---

### 6. Get Recent Submissions
**Endpoint**: `GET /:username/submission`

**Query Parameters**:
- `limit` (optional): Number of submissions to retrieve (default: 20)

**Example Request**:
```
GET /johndoe/submission?limit=10
```

**Response**:
```json
{
  "submission": [
    {
      "title": "Two Sum",
      "titleSlug": "two-sum",
      "timestamp": "1686470400",
      "statusDisplay": "Accepted",
      "lang": "python3",
      "runtime": "45 ms",
      "memory": "14.2 MB"
    }
  ]
}
```

---

### 7. Get Accepted Submissions
**Endpoint**: `GET /:username/acSubmission`

**Query Parameters**:
- `limit` (optional): Number of submissions to retrieve (default: 20)

**Example Request**:
```
GET /johndoe/acSubmission?limit=7
```

**Response**:
```json
{
  "submission": [
    {
      "title": "Two Sum",
      "titleSlug": "two-sum",
      "timestamp": "1686470400",
      "statusDisplay": "Accepted",
      "lang": "python3"
    }
  ]
}
```

---

### 8. Get Submission Calendar
**Endpoint**: `GET /:username/calendar`

**Description**: Get user's submission calendar data

**Example Request**:
```
GET /johndoe/calendar
```

**Response**:
```json
{
  "submissionCalendar": {
    "1686470400": 5,
    "1686556800": 3,
    "1686643200": 7
  },
  "streak": 15,
  "totalActiveDays": 120
}
```

---

### 9. Get Full User Profile
**Endpoint**: `GET /userProfile/:username`

**Description**: Get complete profile in a single call (formatted)

**Example Request**:
```
GET /userProfile/johndoe
```

**Response**:
```json
{
  "totalSolved": 450,
  "totalSubmissions": [
    {
      "difficulty": "All",
      "count": 800
    }
  ],
  "totalQuestions": 3000,
  "easySolved": 200,
  "totalEasy": 700,
  "mediumSolved": 200,
  "totalMedium": 1800,
  "hardSolved": 50,
  "totalHard": 500,
  "ranking": 12345,
  "contributionPoint": 250,
  "reputation": 150,
  "submissionCalendar": {
    "1686470400": 5
  },
  "recentSubmissions": [],
  "matchedUserStats": {}
}
```

---

### 10. Get User Calendar by Year
**Endpoint**: `GET /userProfileCalendar`

**Query Parameters**:
- `username` (required): LeetCode username
- `year` (required): Year (e.g., 2024)

**Example Request**:
```
GET /userProfileCalendar?username=johndoe&year=2024
```

**Response**:
```json
{
  "data": {
    "matchedUser": {
      "userCalendar": {
        "activeYears": [2022, 2023, 2024],
        "streak": 15,
        "totalActiveDays": 120,
        "submissionCalendar": "JSON string"
      }
    }
  }
}
```

---

### 11. Get Language Statistics
**Endpoint**: `GET /languageStats`

**Query Parameters**:
- `username` (required): LeetCode username

**Example Request**:
```
GET /languageStats?username=johndoe
```

**Response**:
```json
{
  "data": {
    "matchedUser": {
      "languageProblemCount": [
        {
          "languageName": "Python3",
          "problemsSolved": 250
        },
        {
          "languageName": "JavaScript",
          "problemsSolved": 150
        },
        {
          "languageName": "Java",
          "problemsSolved": 50
        }
      ]
    }
  }
}
```

---

### 12. Get Question Progress
**Endpoint**: `GET /userProfileUserQuestionProgressV2/:userSlug`

**Description**: Get detailed question progress

**Example Request**:
```
GET /userProfileUserQuestionProgressV2/johndoe
```

**Response**:
```json
{
  "data": {
    "userProfileUserQuestionProgressV2": {
      "numAcceptedQuestions": [
        {
          "difficulty": "EASY",
          "count": 200
        },
        {
          "difficulty": "MEDIUM",
          "count": 200
        },
        {
          "difficulty": "HARD",
          "count": 50
        }
      ],
      "numFailedQuestions": [
        {
          "difficulty": "EASY",
          "count": 50
        }
      ],
      "numUntouchedQuestions": [
        {
          "difficulty": "EASY",
          "count": 500
        }
      ]
    }
  }
}
```

---

### 13. Get Skill Statistics
**Endpoint**: `GET /skillStats/:username`

**Description**: Get user's skill-based statistics

**Example Request**:
```
GET /skillStats/johndoe
```

**Response**:
```json
{
  "data": {
    "matchedUser": {
      "tagProblemCounts": {
        "advanced": [
          {
            "tagName": "Dynamic Programming",
            "tagSlug": "dynamic-programming",
            "problemsSolved": 50
          }
        ],
        "intermediate": [
          {
            "tagName": "Array",
            "tagSlug": "array",
            "problemsSolved": 100
          }
        ],
        "fundamental": [
          {
            "tagName": "Hash Table",
            "tagSlug": "hash-table",
            "problemsSolved": 80
          }
        ]
      }
    }
  }
}
```

---

### 14. Get Contest Ranking Info
**Endpoint**: `GET /userContestRankingInfo/:username`

**Description**: Get detailed contest ranking information

**Example Request**:
```
GET /userContestRankingInfo/johndoe
```

**Response**:
```json
{
  "data": {
    "userContestRanking": {
      "attendedContestsCount": 25,
      "rating": 1850.5,
      "globalRanking": 5432,
      "totalParticipants": 500000,
      "topPercentage": 1.08,
      "badge": {
        "name": "Knight"
      }
    },
    "userContestRankingHistory": [
      {
        "attended": true,
        "rating": 1850,
        "ranking": 1234,
        "trendDirection": "UP",
        "problemsSolved": 3,
        "totalProblems": 4,
        "finishTimeInSeconds": 5400,
        "contest": {
          "title": "Weekly Contest 350",
          "startTime": 1686470400
        }
      }
    ]
  }
}
```

---

## Problem Endpoints

### 15. Get Daily Problem
**Endpoint**: `GET /daily`

**Description**: Get today's daily challenge problem

**Example Request**:
```
GET /daily
```

**Response**:
```json
{
  "questionId": "1234",
  "questionFrontendId": "567",
  "title": "Two Sum",
  "titleSlug": "two-sum",
  "difficulty": "Easy",
  "isPaidOnly": false,
  "content": "Problem description...",
  "topicTags": [
    {
      "name": "Array",
      "slug": "array"
    },
    {
      "name": "Hash Table",
      "slug": "hash-table"
    }
  ],
  "stats": "{\"totalAccepted\": \"5M\", \"totalSubmission\": \"10M\"}",
  "hints": ["Hint 1", "Hint 2"]
}
```

---

### 16. Get Raw Daily Question
**Endpoint**: `GET /dailyQuestion`

**Description**: Get raw daily question data from LeetCode GraphQL

**Example Request**:
```
GET /dailyQuestion
```

**Response**:
```json
{
  "data": {
    "activeDailyCodingChallengeQuestion": {
      "date": "2024-12-10",
      "link": "/problems/two-sum/",
      "question": {
        "questionId": "1",
        "questionFrontendId": "1",
        "title": "Two Sum",
        "titleSlug": "two-sum",
        "difficulty": "Easy"
      }
    }
  }
}
```

---

### 17. Get Selected Problem
**Endpoint**: `GET /select`

**Query Parameters**:
- `titleSlug` (required): Problem slug (e.g., "two-sum")

**Example Request**:
```
GET /select?titleSlug=two-sum
```

**Response**:
```json
{
  "questionId": "1",
  "questionFrontendId": "1",
  "title": "Two Sum",
  "titleSlug": "two-sum",
  "difficulty": "Easy",
  "isPaidOnly": false,
  "content": "<p>Given an array of integers...</p>",
  "topicTags": [
    {
      "name": "Array",
      "slug": "array"
    }
  ],
  "codeSnippets": [
    {
      "lang": "Python3",
      "langSlug": "python3",
      "code": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        "
    }
  ],
  "stats": "{\"totalAccepted\": \"5M\"}",
  "hints": ["Use a hash map"],
  "similarQuestions": "[{\"title\": \"3Sum\", \"titleSlug\": \"3sum\"}]"
}
```

---

### 18. Get Problems List
**Endpoint**: `GET /problems`

**Query Parameters**:
- `limit` (optional): Number of problems (default: 20)
- `skip` (optional): Number of problems to skip (default: 0)
- `tags` (optional): Filter by tags (e.g., "array+hash-table")
- `difficulty` (optional): Filter by difficulty ("EASY", "MEDIUM", "HARD")

**Example Requests**:
```
GET /problems
GET /problems?limit=50
GET /problems?tags=array+math
GET /problems?tags=array+math&limit=10
GET /problems?difficulty=EASY
GET /problems?difficulty=MEDIUM&limit=30&skip=10
```

**Response**:
```json
{
  "problemsetQuestionList": {
    "total": 3000,
    "questions": [
      {
        "acRate": 49.5,
        "difficulty": "Easy",
        "freqBar": null,
        "frontendQuestionId": "1",
        "isFavor": false,
        "paidOnly": false,
        "status": null,
        "title": "Two Sum",
        "titleSlug": "two-sum",
        "topicTags": [
          {
            "name": "Array",
            "id": "VG9waWNUYWdOb2RlOjU=",
            "slug": "array"
          }
        ],
        "hasSolution": true,
        "hasVideoSolution": true
      }
    ]
  }
}
```

---

### 19. Get Official Solution
**Endpoint**: `GET /officialSolution`

**Query Parameters**:
- `titleSlug` (required): Problem slug

**Example Request**:
```
GET /officialSolution?titleSlug=two-sum
```

**Response**:
```json
{
  "data": {
    "question": {
      "solution": {
        "id": "123",
        "content": "## Approach 1: Brute Force...",
        "contentTypeId": "1",
        "canSeeDetail": true,
        "paidOnly": false,
        "hasVideoSolution": true,
        "paidOnlyVideo": false
      }
    }
  }
}
```

---

## Discussion Endpoints

### 20. Get Trending Discussions
**Endpoint**: `GET /trendingDiscuss`

**Query Parameters**:
- `first` (optional): Number of discussions (default: 20)

**Example Request**:
```
GET /trendingDiscuss?first=10
```

**Response**:
```json
{
  "data": {
    "cachedTrendingCategoryTopics": [
      {
        "id": "123456",
        "title": "How to solve Two Sum efficiently",
        "commentCount": 45,
        "viewCount": 1200,
        "post": {
          "author": {
            "username": "leetcode_user",
            "profile": {
              "userAvatar": "https://..."
            }
          },
          "creationDate": 1686470400,
          "content": "Discussion content..."
        }
      }
    ]
  }
}
```

---

### 21. Get Discussion Topic
**Endpoint**: `GET /discussTopic/:topicId`

**Description**: Get specific discussion topic details

**Example Request**:
```
GET /discussTopic/123456
```

**Response**:
```json
{
  "data": {
    "topic": {
      "id": "123456",
      "title": "Discussion Title",
      "post": {
        "content": "Discussion content...",
        "updationDate": 1686470400,
        "author": {
          "username": "user123"
        },
        "voteCount": 150
      }
    }
  }
}
```

---

### 22. Get Discussion Comments
**Endpoint**: `GET /discussComments/:topicId`

**Query Parameters**:
- `orderBy` (optional): "newest_to_oldest" or "oldest_to_newest" (default: "newest_to_oldest")
- `pageNo` (optional): Page number (default: 1)
- `numPerPage` (optional): Comments per page (default: 10)

**Example Request**:
```
GET /discussComments/123456?orderBy=newest_to_oldest&pageNo=1&numPerPage=10
```

**Response**:
```json
{
  "data": {
    "topicComments": {
      "data": [
        {
          "id": "789",
          "content": "Great explanation!",
          "creationDate": 1686470400,
          "numChildren": 2,
          "post": {
            "author": {
              "username": "commenter1"
            },
            "voteCount": 25
          }
        }
      ],
      "totalNum": 45
    }
  }
}
```

---

## Rate Limiting

### Configuration
- **Window**: 1 hour (60 minutes)
- **Limit**: 60 requests per IP
- **Headers**: 
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time when limit resets

### Rate Limit Response
**Status Code**: 429 Too Many Requests

**Response**:
```json
{
  "message": "Too many request from this IP, try again in 1 hour"
}
```

### Best Practices
- Cache responses on client side
- Implement exponential backoff
- Use batch endpoints when available
- Monitor rate limit headers

---

## Caching Strategy

### Configuration
- **Cache Duration**: 5 minutes
- **Cache Middleware**: apicache
- **Cache Key**: Request URL

### Cached Endpoints
All endpoints are cached for 5 minutes to reduce load on LeetCode's GraphQL API.

### Cache Headers
```
X-Cache-Status: HIT | MISS
Cache-Control: public, max-age=300
```

### Bypassing Cache
Cache cannot be bypassed by clients. Wait for cache expiration or restart the server.

---

## Error Handling

### Error Response Format
```json
{
  "error": "Error message description"
}
```

### Common Errors

**User Not Found (404)**:
```json
{
  "error": "User not found or profile is private"
}
```

**Invalid Parameters (400)**:
```json
{
  "error": "Missing titleSlug query parameter"
}
```

**LeetCode API Error (500)**:
```json
{
  "error": "Error from LeetCode API: GraphQL error message"
}
```

**Network Error (500)**:
```json
{
  "error": "No response received from LeetCode API"
}
```

---

## Docker Deployment

### Using Docker Compose

**File**: `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build: .
    container_name: alfa-leetcode-api-docker
    ports:
      - '3000:3000'
    restart: always
    environment:
      - PORT=3000
      - LEETCODE_API_URL=https://leetcode.com/graphql
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    command: npm run dev
```

**Commands**:
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build
```

### Using Docker Image

```bash
# Pull image
docker pull alfaarghya/alfa-leetcode-api:2.0.1

# Run container
docker run -p 3000:3000 alfaarghya/alfa-leetcode-api:2.0.1
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- user.test.ts
```

### Test Structure

**File**: `src/__tests__/user.test.ts`

```typescript
import request from 'supertest';
import app from '../app';

describe('User Endpoints', () => {
  it('should get user profile', async () => {
    const response = await request(app)
      .get('/testuser')
      .expect(200);
    
    expect(response.body).toHaveProperty('matchedUser');
  });
});
```

---

## Environment Variables

Create `.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# LeetCode API
LEETCODE_API_URL=https://leetcode.com/graphql

# Cache Configuration
CACHE_DURATION=300

# Rate Limiting
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=60
```

---

## API Response Times

Average response times:
- **Cached**: 5-20ms
- **Uncached User Data**: 200-500ms
- **Uncached Problem Data**: 300-800ms
- **Contest History**: 500-1000ms

---

## Integration Example

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const leetcodeAPI = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

// Get user profile
async function getUserProfile(username: string) {
  try {
    const response = await leetcodeAPI.get(`/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

// Get daily problem
async function getDailyProblem() {
  try {
    const response = await leetcodeAPI.get('/daily');
    return response.data;
  } catch (error) {
    console.error('Error fetching daily problem:', error);
    throw error;
  }
}
```

### Python

```python
import requests

BASE_URL = "http://localhost:3000"

def get_user_profile(username):
    response = requests.get(f"{BASE_URL}/{username}")
    return response.json()

def get_daily_problem():
    response = requests.get(f"{BASE_URL}/daily")
    return response.json()
```

---

## Production Deployment

### Render.com
The API is deployed on Render.com at:
```
https://alfa-leetcode-api.onrender.com/
```

### Vercel
Can be deployed using `vercel.json` configuration

### Heroku
```bash
heroku create leetcode-api
git push heroku main
```
