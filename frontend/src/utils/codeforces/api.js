import axios from 'axios';
import sha512 from 'crypto-js/sha512';
import Hex from 'crypto-js/enc-hex';

const API_KEY = '23263194aaabf2b11e10033421546c4b649befc1';
const API_SECRET = '0417c8ac3a976fe84f2aebf55257df7e439d7739';
const BASE_URL = 'https://codeforces.com/api';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

const getFromCache = (cacheKey) => {
  const cached = localStorage.getItem(cacheKey);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const now = Date.now();

  if (now - timestamp > CACHE_DURATION) {
    localStorage.removeItem(cacheKey);
    return null;
  }

  return data;
};

const setCache = (cacheKey, data) => {
  const cacheItem = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
};

const generateApiSig = (methodName, params) => {
  const rand = Math.random().toString(36).substring(2, 8);
  const sortedParams = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const sigStr = `${rand}/${methodName}?${sortedParams}#${API_SECRET}`;
  const hash = sha512(sigStr).toString(Hex);
  return `${rand}${hash}`;
};

let lastRequestTime = 0;
const REQUEST_DELAY = 2000; // 2 seconds in milliseconds

const makeRequest = async (methodName, params = {}) => {
  const cacheKey = `cf_${methodName}_${JSON.stringify(params)}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const now = Date.now();
  const timeToWait = Math.max(0, lastRequestTime + REQUEST_DELAY - now);
  if (timeToWait > 0) {
    await new Promise(resolve => setTimeout(resolve, timeToWait));
  }

  const time = Math.floor(Date.now() / 1000).toString();
  const allParams = {
    ...params,
    apiKey: API_KEY,
    time,
  };
  
  const apiSig = generateApiSig(methodName, allParams);
  
  try {
    const response = await axios.get(`${BASE_URL}/${methodName}`, {
      params: {
        ...allParams,
        apiSig,
      },
    });

    lastRequestTime = Date.now();

    if (response.data.status === 'FAILED') {
      throw new Error(response.data.comment || 'API request failed');
    }

    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response?.data?.comment || 'Network error occurred');
    }
    throw error;
  }
};

export const getUserInfo = async (handle) => {
  try {
    return await makeRequest('user.info', { handles: handle });
  } catch (error) {
    throw new Error(`Failed to fetch user info: ${error.message || 'Unknown error'}`);
  }
};

export const getUserRating = async (handle) => {
  try {
    return await makeRequest('user.rating', { handle });
  } catch (error) {
    throw new Error(`Failed to fetch user rating: ${error.message || 'Unknown error'}`);
  }
};

export const getUserStatus = async (handle) => {
  try {
    return await makeRequest('user.status', { handle, from: '1', count: '10' });
  } catch (error) {
    throw new Error(`Failed to fetch user status: ${error.message || 'Unknown error'}`);
  }
};