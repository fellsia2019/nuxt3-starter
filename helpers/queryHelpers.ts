function addToken(params: any = {}) {
  const TOKEN = "";
  if (!TOKEN) return params;
  const TOKEN_HEADER = `Bearer ${TOKEN}`;

  const HEADERS = {
    ...(params.headers ? params.headers : {}),
    Authorization: TOKEN_HEADER,
  };

  return { ...params, headers: HEADERS };
}

export default {
  async get(url: string, params: any = {}): Promise<any> {
    try {
      const response = await $fetch(url, {
        ...addToken(params),
        method: "GET",
      });
      return response;
    } catch (e) {
      console.error(e);
      // @ts-ignore
      return e.response;
    }
  },

  async post(url: string, data: any = null, params: any = {}): Promise<any> {
    try {
      const response = await $fetch(url, {
        ...addToken(params),
        method: "POST",
        body: data,
      });
      return response;
    } catch (e) {
      console.error(e);
      // @ts-ignore
      return e.response;
    }
  },

  async put(url: string, data: any = null, params: any = {}): Promise<any> {
    try {
      const response = await $fetch(url, {
        ...addToken(params),
        method: "PUT",
        body: data,
      });
      return response;
    } catch (e) {
      console.error(e);
      // @ts-ignore
      return e.response;
    }
  },

  async delete(url: string, params: any = {}): Promise<any> {
    try {
      const response = await $fetch(url, {
        ...addToken(params),
        method: "DELETE",
      });
      return response;
    } catch (e) {
      console.error(e);
      // @ts-ignore
      return e.response;
    }
  },
};
