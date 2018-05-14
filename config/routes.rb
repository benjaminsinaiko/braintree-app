Rails.application.routes.draw do
  namespace :v1 do

    resources :checkouts, only: [:new, :create, :show]

  end
end
