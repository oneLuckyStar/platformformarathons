import querystring, { ParsedUrlQueryInput } from 'querystring';
const SERVER_ADDRESS = 'http://localhost:3000/api';

class Server {
  async getData<T>(
    url: string,
    params?: ParsedUrlQueryInput,
  ): Promise<T | null> {
    try {
      let queryString = querystring.stringify(params);
      const headers: { [key: string]: string } = {};
      const token = localStorage.getItem('token');
      if (token) headers['Authorization'] = `Bearer ${token}`;

      return fetch(
        `${SERVER_ADDRESS}${url}${queryString ? '?' + queryString : ''}`,
        {
          headers,
        },
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async postData<T>(url: string, body: object): Promise<T | null> {
    try {
      const headers: { [key: string]: string } = {};
      const token = localStorage.getItem('token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
      headers['Content-Type'] = 'application/json';

      return fetch(`${SERVER_ADDRESS}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

const server = new Server();

export { server };
