export interface Topic {
  id: number;
  title: string;
  description: string;
  agent1_name: string;
  agent1_role: string;
  agent2_name: string;
  agent2_role: string;
  category: string;
  created_at: string;
}

export interface Debate {
  id: string;
  topic: string;
  status: 'waiting' | 'active' | 'finished';
  agent1_name: string;
  agent2_name: string;
  created_at: string;
  ended_at?: string;
  winner?: string;
}

export interface ArgumentScore {
  strength: number;
  relevance: number;
  logic: number;
  truth: number;
  humor: number;
  average: number;
  explanation: string;
}

export interface Argument {
  id: number;
  player_id: string;
  topic: string;
  content: string;
  side: string;
  debate_id: string;
  created_at: string;
  score?: ArgumentScore;
  upvotes: number;
  downvotes: number;
  vote_score: number;
  user_vote?: string; // Current user's vote on this argument
}

export interface Pagination {
  has_next: boolean;
  has_prev: boolean;
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}
