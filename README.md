# Braintree Hosted Fields Example

An example Braintree integration for Ruby on Rails.
An example Braintree integration using a JavaScript client and Ruby on Rails server.

## Setup Instructions

1.  Install bundler:

```sh
gem install bundler
```

2.  Bundle:

```sh
bundle
```

3.  Next, you will need your Braintree API credentials. Credentials can be found by navigating to Account > My User > View Authorizations in the Braintree Control Panel. Full instructions can be [found on support site](https://articles.braintreepayments.com/control-panel/important-gateway-credentials#api-credentials).

4.  The `gem 'figaro'` has already been added and bundled. To create a `config/application.yml` file and have it added to the .gitignore run:

```sh
bundle exec figaro install
```

5.  In your config/application.yml file add the following, with your Braintree API credentials.

```ruby
# Braintree API Keys
MERCHANT_ID: <use_your_merchant_id>
PUBLIC_KEY: <use_your_public_key>
PRIVATE_KEY: <use_your_private_key>
```

6.  Start rails:

```sh
rails server
```

Then open `http://localhost:3000/` in your browser.
