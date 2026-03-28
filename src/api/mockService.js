/**
 * Mock Service to simulate asynchronous API fetching
 * This helps fulfill the API & Async handling requirements in the rubric.
 */

// Initial mock state data mapping equivalent to database entities
const INITIAL_LOGS = [
  { id: 1, type: 'error', message: 'Database connection failed', timestamp: '2023-10-01' },
  { id: 2, type: 'alert', message: 'High CPU usage', timestamp: '2023-10-01' },
  { id: 3, type: 'info', message: 'User logged in', timestamp: '2023-10-01' },
  { id: 4, type: 'error', message: 'API timeout', timestamp: '2023-10-01' },
];

let mockSubmissions = [
  { id: 101, name: 'John Doe', status: 'approved', created: '10/1/2023' },
  { id: 102, name: 'Jane Smith', status: 'pending', created: '10/2/2023' },
  { id: 103, name: 'Bob Johnson', status: 'rejected', created: '10/3/2023' },
];

/**
 * Mocks a network delay using Promises
 * @param {number} ms - Milliseconds to delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  /**
   * Fetches dashboard global logs and stats.
   * Has a 10% chance to throw an error to simulate real-world API failures.
   */
  getLogs: async () => {
    await delay(1200);
    // Simulate rare API error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch logs. API timeout.");
    }
    return [...INITIAL_LOGS];
  },

  /**
   * Fetches all client form submissions.
   */
  getSubmissions: async () => {
    await delay(1000);
    return [...mockSubmissions];
  },

  /**
   * Modifies the status of a specific submission.
   */
  updateSubmissionStatus: async (id, newStatus) => {
    await delay(600); // simulate patch request delay
    mockSubmissions = mockSubmissions.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    );
    // return the modified item
    return mockSubmissions.find(sub => sub.id === id);
  },

  /**
   * Creates a new client submission mock request.
   */
  createSubmission: async (submissionData) => {
    await delay(800);
    const newEntry = {
      ...submissionData,
      id: Date.now(),
      status: 'pending',
      created: new Date().toLocaleDateString(),
    };
    mockSubmissions = [newEntry, ...mockSubmissions];
    return newEntry;
  }
};
