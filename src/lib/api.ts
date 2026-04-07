const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ==================== Pinterest OAuth ====================

export async function connectPinterest(userId: string) {
  window.location.href = `${API_URL}/auth/pinterest?user_id=${userId}`;
}

export async function getPinterestStatus(userId: string) {
  const response = await fetch(`${API_URL}/auth/pinterest/status?user_id=${userId}`);
  if (!response.ok) throw new Error('Failed to get Pinterest status');
  return response.json();
}

export async function disconnectPinterest(userId: string) {
  const response = await fetch(`${API_URL}/auth/pinterest/disconnect?user_id=${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to disconnect Pinterest');
  return response.json();
}

// ==================== User Profile ====================

export async function getUserProfile(userId: string) {
  const response = await fetch(`${API_URL}/api/user/profile?user_id=${userId}`);
  if (!response.ok) throw new Error('Failed to get user profile');
  return response.json(); // { success, profile: { username, profile_image, follower_count, pin_count, board_count, monthly_views } }
}

// ==================== Pins ====================

export async function getPins(userId: string, pageSize = 25, bookmark?: string) {
  const params = new URLSearchParams({ user_id: userId, page_size: String(pageSize) });
  if (bookmark) params.append('bookmark', bookmark);
  const response = await fetch(`${API_URL}/api/pins?${params}`);
  if (!response.ok) throw new Error('Failed to get pins');
  return response.json(); // { success, pins: [...], bookmark, total }
}

export async function getBoardPins(boardId: string, userId: string, pageSize = 25, bookmark?: string) {
  const params = new URLSearchParams({ user_id: userId, page_size: String(pageSize) });
  if (bookmark) params.append('bookmark', bookmark);
  const response = await fetch(`${API_URL}/api/boards/${boardId}/pins?${params}`);
  if (!response.ok) throw new Error('Failed to get board pins');
  return response.json(); // { success, pins: [...], bookmark, board_id }
}

// ==================== Boards ====================

export async function getBoards(userId: string) {
  const response = await fetch(`${API_URL}/api/boards?user_id=${userId}`);
  if (!response.ok) throw new Error('Failed to get boards');
  return response.json();
}

export async function createBoard(data: {
  user_id: string;
  name: string;
  description?: string;
  privacy?: string;
}) {
  const response = await fetch(`${API_URL}/api/boards/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create board');
  return response.json();
}

export async function updateBoard(boardId: string, data: { user_id: string; name?: string; description?: string; privacy?: string }) {
  const response = await fetch(`${API_URL}/api/boards/${boardId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update board');
  return response.json();
}

export async function deleteBoard(boardId: string, userId: string) {
  const response = await fetch(`${API_URL}/api/boards/${boardId}?user_id=${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete board');
  return response.json();
}

// ==================== Publish / Schedule ====================

export async function publishNow(data: {
  user_id: string;
  board_id: string;
  image_url: string;
  title: string;
  description?: string;
  link?: string;
  keywords?: string[];
}) {
  const response = await fetch(`${API_URL}/api/publish-now`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to publish post');
  return response.json();
}

export async function schedulePost(data: {
  user_id: string;
  board_id: string;
  image_url: string;
  title: string;
  description?: string;
  link?: string;
  scheduled_at: string;
  keywords?: string[];
}) {
  const response = await fetch(`${API_URL}/api/schedule-post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to schedule post');
  return response.json();
}

// ==================== Analytics ====================

export async function getAccountAnalytics(userId: string, days = 30) {
  const response = await fetch(`${API_URL}/api/analytics/account?user_id=${userId}&days=${days}`);
  if (!response.ok) throw new Error('Failed to get account analytics');
  return response.json();
}

export async function getPinAnalytics(pinId: string, userId: string, days = 30) {
  const response = await fetch(`${API_URL}/api/analytics/pin/${pinId}?user_id=${userId}&days=${days}`);
  if (!response.ok) throw new Error('Failed to get pin analytics');
  return response.json();
}

export async function getBoardAnalytics(boardId: string, userId: string, days = 30) {
  const response = await fetch(`${API_URL}/api/analytics/board/${boardId}?user_id=${userId}&days=${days}`);
  if (!response.ok) throw new Error('Failed to get board analytics');
  return response.json();
}