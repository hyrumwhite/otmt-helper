export default class Api {
  static fetch(promise, type) {
    return promise.then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      console.log(response);
      let responseData;
      try {
        responseData = response[type]();
      } catch (e) {
        console.log(e);
        responseData = response.text();
      }
      return responseData;
    });
  }
  static post({ url, body }) {
    console.log("fetching the stuuf");
    return this.fetch(
      window.fetch(url, {
        credentials: "include",
        method: "POST",
        mode: "cors",
        referrer: "https://dmelive.com/Trips/mgmttrips.aspx",
        referrerPolicy: "no-referrer-when-downgrade",
        headers: {
          "Content-Type": "application/json, text/javascript, */*; q=0.01"
        },
        body
      })
    );
  }
  static get({ url, responseType }) {
    return this.fetch(
      window.fetch(url, {
        credentials: "include",
        mode: "cors",
        referrer: "https://dmelive.com/Trips/mgmttrips.aspx",
        referrerPolicy: "no-referrer-when-downgrade"
      }),
      responseType
    );
  }
}
