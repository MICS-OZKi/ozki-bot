const errorMessage = {
  error: "Server Error",
  error_description: "Error - Oracle server not found",
};

const sendRequestLocal = async (
  url: string,
  data: any,
  method: string,
  headers?: any
) => {
  return await sendRequest(
    `http://localhost:3000/${url}`,
    data,
    method,
    headers
  );
};

const sendRequestExternalAPI = async (
  url: string,
  data: any,
  method: string,
  headers?: any
) => {
  return await sendRequest(url, data, method, headers);
};

const sendRequest = async (
  url: string,
  data: any,
  method: string,
  headers?: any
) => {
  try {
    let response;
    if (method === "POST") {
      response = await fetch(`${url}`, {
        method: method,
        body: data,
        headers: headers,
      })
        .then((data) => {
          return data.json();
        })
        .catch(() => {
          throw errorMessage;
        });
    } else if (method === "GET") {
      response = await fetch(`${url}`, {
        method: method,
        headers: headers,
      })
        .then((data) => {
          return data.json();
        })
        .catch(() => {
          throw errorMessage;
        });
    }

    return response;
  } catch (error) {
    console.log("Error send Request", error); // eslint-disable-line no-console
    throw error;
  }
};

export { sendRequestLocal, sendRequestExternalAPI };
