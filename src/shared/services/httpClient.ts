/**
 * Basic HTTP Client mapping responses for the Vue frontend.
 * Currently a stub to be replaced with actual Axios/Fetch or Firebase SDK calls.
 */

export class HttpClient {
  static async get<T>(url: string): Promise<T> {
    console.log(`[HTTP GET] ${url}`);
    // Stub implementation. Calling logic should handle mocks gracefully.
    return {} as T;
  }

  static async post<T>(url: string, body: any): Promise<T> {
    console.log(`[HTTP POST] ${url}`, body);
    return {} as T;
  }
}
