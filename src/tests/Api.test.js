import { fetchData, API_URL } from "../utils/api";

describe("API Utility Functions", () => {
  it("fetchData function should return data", async () => {
    const url = `${API_URL}/movies?page=0&size=10&winner=true`;
    const response = await fetchData(url);
    const data = response.content;

    expect(response).toHaveProperty('content');
    expect(Array.isArray(data)).toBe(true);

    const idOneExists = data.some(item => item.id === 1);
    expect(idOneExists).toBe(true);
  });
});
