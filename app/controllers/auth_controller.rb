class AuthController < ApplicationController
    def login
      user = User.find_by_username(params[:username])
      if user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: user.id)
        user_data = {
          full_name: user.full_name,
          token: token,
          user_id: user.id,
          role: user.role.code,
          role_name: user.role.name,
        }
        render json: user_data, status: :ok
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end
    end
    
    private
  
    def login_params
      params.permit(:username, :password)
    end
  end
  