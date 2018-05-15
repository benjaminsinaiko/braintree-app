/* global braintree, axios*/

const form = document.querySelector("#hosted-fields");
const submit = document.querySelector("#submit");

const hostedFields = function() {
  axios.get("http://localhost:3000/v1/").then(response => {
    // Get client token
    const clientToken = response.data;
    // console.log(clientToken);

    // Create client
    const client = braintree.client.create(
      {
        authorization: clientToken
      },
      function(err, clientInstance) {
        if (err) {
          console.error(err);
          return;
        } else if (clientInstance) {
          console.log("client: ", clientInstance);
        }

        // Create hosted fields
        braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: {
              input: {
                "font-size": "14px",
                "font-family": "helvetica, tahoma, calibri, sans-serif",
                color: "#3a3a3a"
              },
              ":focus": {
                color: "black"
              }
            },
            fields: {
              number: {
                selector: "#card-number",
                placeholder: "4111 1111 1111 1111"
              },
              cvv: {
                selector: "#cvv",
                placeholder: "123"
              },
              expirationMonth: {
                selector: "#expiration-month",
                placeholder: "MM"
              },
              expirationYear: {
                selector: "#expiration-year",
                placeholder: "YY"
              },
              postalCode: {
                selector: "#postal-code",
                placeholder: "90210"
              }
            }
          },
          function(err, hostedFieldsInstance) {
            if (err) {
              console.error(err);
              return;
            }
            // Make Pay button Active
            submit.removeAttribute("disabled");

            form.addEventListener(
              "submit",
              function(event) {
                event.preventDefault();

                hostedFieldsInstance.tokenize(function(tokenizeErr, payload) {
                  if (tokenizeErr) {
                    console.error(tokenizeErr);
                    return;
                  }

                  // If this was a real integration, this is where you would
                  // send the nonce to your server.
                  console.log("Got a nonce: " + payload.nonce);
                });
              },
              false
            );
          }
        );
      }
    );
  });
};
hostedFields();
