/* global braintree, axios*/

const form = document.querySelector("#hosted-fields");
const submit = document.querySelector("#submit");

const hostedFields = function() {
  axios.get("http://localhost:3000/v1/").then(response => {
    // Get client token
    const clientToken = response.data;

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

        // Create Hosted Fields
        braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: {
              // Style all elements
              input: {
                "font-size": "16px",
                color: ""
              },
              // Styling element state
              ":focus": {
                color: "blue"
              },
              ".valid": {
                color: "green"
              },
              ".invalid": {
                color: "red"
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
            // Replace loader with Hosted Fields
            // showHF();
            hideToggle("loader");
            hideToggle("payment-form");

            form.addEventListener(
              "submit",
              function(event) {
                event.preventDefault();

                hostedFieldsInstance.tokenize(function(tokenizeErr, payload) {
                  if (tokenizeErr) {
                    console.error("Tokenize err: ", tokenizeErr);
                    console.error("details: ", tokenizeErr.details);
                    hideToggle("card-error");
                    setTimeout(function() {
                      document
                        .getElementById("card-error")
                        .classList.toggle("hide");
                    }, 3000);
                    return;
                  } else {
                    console.log("Got a nonce: " + payload.nonce);
                    // Send payment nonce to server
                    axios
                      .post("http://localhost:3000/v1/checkouts/", {
                        payment_method_nonce: payload.nonce
                      })
                      .then(response => {
                        console.log("success: ", response.data);
                        if (response.data) {
                          displaySuccess();
                        }
                      })
                      .catch(function(error) {
                        console.log(error);
                        hideToggle("error-message");
                      });
                  }
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

function hideToggle(id) {
  let el = document.getElementById(id);
  el.classList.toggle("hide");
}

const paymentForm = document.getElementById("payment-form");

function displaySuccess() {
  const success = document.getElementById("success-display");
  paymentForm.classList.toggle("hide");
  success.classList.toggle("hide");
}

function paymentErr() {
  const message = document.getElementById("error-message");
  message.classList.toggle("hide");
}

function newTransaction() {
  location.reload();
}
