/* global braintree, axios*/

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
          }
        );
      }
    );
  });
};
hostedFields();
