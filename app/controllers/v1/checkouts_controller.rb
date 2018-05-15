class V1::CheckoutsController < ApplicationController
  def new
    client_token = gateway.client_token.generate
    # p client_token
    render json: client_token
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
