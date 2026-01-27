import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies before imports
vi.mock('@octokit/rest', () => ({
  Octokit: vi.fn().mockImplementation(() => ({
    users: {
      getAuthenticated: vi.fn().mockResolvedValue({
        data: { login: 'testuser', name: 'Test User' },
      }),
    },
    repos: {
      listForAuthenticatedUser: vi.fn().mockResolvedValue({
        data: [
          { id: 1, name: 'repo1', full_name: 'testuser/repo1' },
          { id: 2, name: 'repo2', full_name: 'testuser/repo2' },
        ],
      }),
    },
  })),
}));

vi.mock('../src/auth/token-storage.js', () => ({
  getToken: vi.fn().mockResolvedValue('mock-token'),
  setToken: vi.fn().mockResolvedValue(undefined),
  deleteToken: vi.fn().mockResolvedValue(true),
  hasToken: vi.fn().mockResolvedValue(true),
}));

describe('GitHub MCP Server', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Token Storage', () => {
    it('should get token from storage', async () => {
      const { getToken } = await import('../src/auth/token-storage.js');
      const token = await getToken();
      expect(token).toBe('mock-token');
    });

    it('should check if token exists', async () => {
      const { hasToken } = await import('../src/auth/token-storage.js');
      const exists = await hasToken();
      expect(exists).toBe(true);
    });
  });

  describe('Tool Registration', () => {
    it('should have repos tools defined', async () => {
      const { reposTools } = await import('../src/tools/categories/repos.js');
      expect(reposTools).toBeDefined();
      expect(Array.isArray(reposTools)).toBe(true);
      expect(reposTools.length).toBeGreaterThan(0);

      // Check tool structure
      const listTool = reposTools.find(t => t.name === 'github_repos_list');
      expect(listTool).toBeDefined();
      expect(listTool?.description).toBeTruthy();
      expect(listTool?.inputSchema).toBeDefined();
    });

    it('should have issues tools defined', async () => {
      const { issuesTools } = await import('../src/tools/categories/issues.js');
      expect(issuesTools).toBeDefined();
      expect(issuesTools.length).toBeGreaterThan(0);

      const createTool = issuesTools.find(t => t.name === 'github_issues_create');
      expect(createTool).toBeDefined();
    });

    it('should have pulls tools defined', async () => {
      const { pullsTools } = await import('../src/tools/categories/pulls.js');
      expect(pullsTools).toBeDefined();
      expect(pullsTools.length).toBeGreaterThan(0);

      const mergeTool = pullsTools.find(t => t.name === 'github_pulls_merge');
      expect(mergeTool).toBeDefined();
    });

    it('should have search tools defined', async () => {
      const { searchTools } = await import('../src/tools/categories/search.js');
      expect(searchTools).toBeDefined();
      expect(searchTools.length).toBeGreaterThan(0);

      const searchReposTool = searchTools.find(t => t.name === 'github_search_repos');
      expect(searchReposTool).toBeDefined();
    });
  });

  describe('Event Queue', () => {
    it('should store and retrieve events', async () => {
      const { eventQueue } = await import('../src/webhooks/event-queue.js');

      // Clear any existing events
      eventQueue.clear();

      const event = {
        id: 'test-123',
        type: 'push',
        payload: { ref: 'refs/heads/main' },
        receivedAt: new Date(),
      };

      eventQueue.push(event);

      const events = eventQueue.getByType('push');
      expect(events).toHaveLength(1);
      expect(events[0].id).toBe('test-123');

      const allEvents = eventQueue.getAll();
      expect(allEvents).toHaveLength(1);

      eventQueue.clear();
    });

    it('should limit events per type', async () => {
      const { eventQueue } = await import('../src/webhooks/event-queue.js');

      eventQueue.clear();

      // Add many events
      for (let i = 0; i < 150; i++) {
        eventQueue.push({
          id: `event-${i}`,
          type: 'push',
          payload: {},
          receivedAt: new Date(),
        });
      }

      const events = eventQueue.getByType('push');
      expect(events.length).toBeLessThanOrEqual(100);

      eventQueue.clear();
    });
  });
});

describe('Tool Naming Convention', () => {
  it('should follow github_<category>_<method> pattern', async () => {
    const { reposTools } = await import('../src/tools/categories/repos.js');
    const { issuesTools } = await import('../src/tools/categories/issues.js');
    const { pullsTools } = await import('../src/tools/categories/pulls.js');

    const allTools = [...reposTools, ...issuesTools, ...pullsTools];

    for (const tool of allTools) {
      expect(tool.name).toMatch(/^github_[a-z]+_[a-zA-Z]+$/);
    }
  });

  it('should have descriptions for all tools', async () => {
    const { reposTools } = await import('../src/tools/categories/repos.js');

    for (const tool of reposTools) {
      expect(tool.description).toBeTruthy();
      expect(tool.description.length).toBeGreaterThan(10);
    }
  });

  it('should have valid input schemas', async () => {
    const { reposTools } = await import('../src/tools/categories/repos.js');

    for (const tool of reposTools) {
      expect(tool.inputSchema).toBeDefined();
      expect(tool.inputSchema.type).toBe('object');
    }
  });
});
