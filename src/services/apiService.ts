import { Topic, Debate, Pagination } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTopics = async (params?: {
  search?: string;
  category?: string;
  sort_by?: string;
  sort_dir?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
}): Promise<{ items: Topic[], pagination: Pagination }> => {
  const queryParams = new URLSearchParams();
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
  }
  
  const url = `${API_URL}/api/topics${params ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch topics: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchTopicsByCategory = async (category: string): Promise<{ topics: Topic[] }> => {
  const url = `${API_URL}/api/topics/category/${category}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch topics by category: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchTopicById = async (id: number): Promise<{ topic: Topic }> => {
  const url = `${API_URL}/api/topics/${id}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch topic: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchDebates = async (params?: {
  status?: 'waiting' | 'active' | 'finished';
  search?: string;
  sort_by?: string;
  sort_dir?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
}): Promise<{ items: Debate[], pagination: Pagination}> => {
  const queryParams = new URLSearchParams();
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
  }
  
  const url = `${API_URL}/api/debates${params ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch debates: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchDebateById = async (id: string): Promise<{ debate: Debate }> => {
  const url = `${API_URL}/api/debates/${id}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch debate: ${response.statusText}`);
  }
  
  return response.json();
};

export const createDebate = async (data: {
  topic?: string;
  agent1?: string;
  agent2?: string;
  created_by?: string;
  topic_id?: number;
}): Promise<{ message: string, debate: Debate }> => {
  const url = `${API_URL}/api/debates`;
  console.log('data', data);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create debate: ${response.statusText}`);
  }
  
  return response.json();
}; 