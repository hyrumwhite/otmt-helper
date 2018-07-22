export default class Api {
  static fetch(promise) {
    return promise.then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      let responseData;
      try {
        responseData = response.json();
      } catch (e) {
        responseData = response.text();
      }
      return responseData;
    });
  }
  static post({ url, body }) {
    return this.fetch(
      window.fetch(url, {
        credentials: "include",
        method: "POST",
        mode: "cors",
        referrer: "http://dmelive.com/Trips/mgmttrips.aspx",
        referrerPolicy: "no-referrer-when-downgrade",
        body
      })
    );
  }
  static get(url) {
    return this.fetch(window.fetch(url), {
      credentials: "include",
      mode: "cors",
      referrer: "http://dmelive.com/Trips/mgmttrips.aspx",
      referrerPolicy: "no-referrer-when-downgrade"
    });
  }
}
