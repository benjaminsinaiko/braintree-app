class V1::CustomersController < ApplicationController
  def create
    result = gateway.customer.create(
      :first_name => "Jen",
      :last_name => "Smith",
      :company => "Braintree",
      :email => "jen@example.com",
      :phone => "312.555.1234",
      :fax => "614.555.5678",
      :website => "www.example.com"
    )
    if result.success?
      puts result.customer.id
    else
      p result.errors
    end
  end

  def gateway
    @gateway = Braintree::Gateway.new(
      :environment => :sandbox,
      :merchant_id => ENV['MERCHANT_ID'],
      :public_key => ENV['PUBLIC_KEY'],
      :private_key => ENV['PRIVATE_KEY'],
    )
  end
end
