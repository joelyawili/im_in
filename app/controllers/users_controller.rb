class UsersController < ApplicationController
  skip_before_filter  :verify_authenticity_token

before_filter :authenticate_user!, except: [:index]

  def index
    if current_user
    @users = current_user.filter(params[:search])

      respond_to do |format|
        format.html
        format.js #-> loads /views/users/index.js.erb
      end
    end
  end

  def root_index
    @users = User.all
  end

  def show
      @user = User.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => { :user => @user } }
    end
  end

  def current_user_show
      @user = User.find(current_user.id)
    # respond_to do |format|
    #   format.json { render :json => { :user => @user } }
    # end
      render "users/show"
  end

  def followers
    @followers = current_user.followers
  end

  def following
    @following = current_user.following_users
    respond_to do |format|
      format.html
      format.json { render :json => { :following => @following } }
    end
  end

  def follow
    @friend = User.find(params[:user_id])
    # redirect_to user_following_path unless current_user
    # if current_user
    # if current_user == @friend
    # flash[:error] = "You cannot follow yourself."
    # redirect_to user_following_path(current_user)
    # else
    current_user.follow(@friend)
    flash[:notice] = "You are now following #{@friend.first_name}."
    redirect_to :back
    # end
    # end
  end

  def unfollow
    @friend = User.find(params[:user_id])

    redirect_to user_following_path unless current_user
    # if current_user
    current_user.stop_following(@friend)
    flash[:notice] = "You are no longer following #{@friend.first_name}."
    redirect_to :back
    # end
  end

  def update
    current_user.update(user_params)
    redirect_to user_path(@user)
  end

  def profile
    p current_user
    p session[:user_id]
    @user = User.find(session[:user_id])
    render json: { :user => current_user }
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :password, :email, :phone_number, :entity_name, :remote_avatar_url, :auth_method)
  end

end
