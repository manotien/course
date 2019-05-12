Rails.application.routes.draw do
  root 'home#index'
  post 'auth/login'
  resources :users
  match '*path', to: 'home#index', via: :all
  # get '*path', to: redirect('/')
end
