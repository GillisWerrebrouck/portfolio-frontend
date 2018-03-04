let data = (() => {
  return {
      http: (() => {
          return {
              // get data
              get: (url, headers) => {
                  let options = 
                      {
                          method: "GET",
                          headers: headers,
                          mode: "cors",
                          cache: "default"
                      };

                  return new Promise((resolve, reject) => {
                      fetch(url, options).then((res) => {
                          resolve(res.json());
                      }).catch((err) => {
                          reject(err);
                      });
                  });
              },

              // post data
              post: (url, headers, body) => {
                  headers.Accept = "application/json";
                  headers["Content-Type"] = "application/json";
                  let options =
                      {
                          method: "POST",
                          headers: headers,
                          body: JSON.stringify(body)
                      };

                  return new Promise((resolve, reject) => {
                      fetch(url, options).then((res) => {
                          resolve(res.json());
                      }).catch((err) => {
                          reject(err);
                      });
                  });
              },

              // put data
              put: (url, headers, body = {}) => {
                  let options =
                      {
                          method: "PUT",
                          headers: headers,
                          body: JSON.stringify(body),
                          mode: "cors",
                          cache: "default"
                      };

                  return new Promise((resolve, reject) => {
                      fetch(url, options).then((res) => {
                          resolve(res.json());
                      }).catch((err) => {
                          reject(err);
                      });
                  });
              }
          };
      })(),

      storage: (() => {
          return {
              // sessionStorage
              session: (() => {
                  return {
                      // save data in storage
                      cache: (key, data) => {
                          sessionStorage.setItem(`${key}`, JSON.stringify(data));
                      },
      
                      // load data from storage
                      load: (key) => {
                          return JSON.parse(sessionStorage.getItem(`${key}`));
                      },
      
                      // remove data from storage
                      remove: (key) => {
                          sessionStorage.removeItem(`${key}`);
                      }
                  };
              })(),

              // localStorage
              local: (() => {
                  return {
                      // save data in storage
                      cache: (key, data) => {
                          localStorage.setItem(`${key}`, JSON.stringify(data));
                      },
      
                      // load data from storage
                      load: (key) => {
                          return JSON.parse(localStorage.getItem(`${key}`));
                      }
                  };
              })()
          };
      })()
  };
})();

export default data;