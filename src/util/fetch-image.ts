import fetch from 'node-fetch';

export interface FetchImageService {
  (url: string): Promise<string>
}

export const fetchImageService = (): FetchImageService =>
  async url => {
    const response = await fetch(url, { method: `GET` });
    const data = response.body.read();
    return data.toString(`base64`);
  };
