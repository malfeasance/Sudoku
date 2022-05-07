Rails.application.routes.draw do
  root "puzzles#index"

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :puzzles
  resources :users
end
