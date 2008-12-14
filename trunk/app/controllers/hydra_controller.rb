class HydraController < ApplicationController
  def index
  	if cookies[:alluznet_lang]==nil || cookies[:alluznet_lang]==""
		cookies[:alluznet_lang] = 'ru'
		@lang='lang_ru'
	else
		@lang='lang_'+cookies[:alluznet_lang]
	end
	@title='Главная страница AllUz.Net'
	@cookie = false
	@uid = cookies[:alluznet].to_s
    if (!@uid.empty?)
       @cookie = true
       @n = User.find(@uid)
       @uname = @n['email']
    end

  end

end
