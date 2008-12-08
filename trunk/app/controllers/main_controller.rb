class MainController < ApplicationController
  def index
  
	if cookies[:alluznet_lang]==nil || cookies[:alluznet_lang]==""
		cookies[:alluznet_lang] = 'ru'
		@lang='lang_ru'
	else
		@lang='lang_'+cookies[:alluznet_lang]
	end
	if cookies[:alluznet_lang]=='uz'
		@uname='Мехмон'
		@title='AllUz.Net Бош сахифаси'
	elsif cookies[:alluznet_lang]=='en'
		@uname='Guest'
		@title='Main page AllUz.Net'
	else
		@uname='Гость'
		@title='Главная страница AllUz.Net'
	end
    @cookie = false
	@uid = cookies[:alluznet].to_s
    if (!@uid.empty?)
       @cookie = true
       @n = User.find(@uid)
       @uname = @n['email']
    end
  end
  
  
  #addAnnouncment
  def addAnnounce
	
  end
  
  
  
  
  
  
  
  #multilanguage
  def chage_language
	if cookies[:alluznet_lang]==params[:lang]
		data='false'
	else
		cookies[:alluznet_lang]=params[:lang]
		data='true'
	end
	render :text => data, :layout => false
  end
  
  
  
  def getTexts
	lang=params[:lang]
	@texts=Langs.find(:all, :select => "tag,"+lang)
	@jsont=""
	for sub in @texts
		@jsont = sub.tag+ ": "
		if lang=="uz"
			@jsont += sub.uz+",\n"
		elsif lang=="ru"
			@jsont += sub.ru+",\n"
		else 
			@jsont += sub.en+",\n"
		end
	end
	@jsont=@jsont[0, @jsont.length-2]
	render :text => @jsont, :layout => false
  end
  
  
#Users  
  def update_pass
    headers["Content-Type"] = "text/plain; charset=utf-8"
	ui = User.find(:all , :conditions => ["id=?",cookies[:alluznet].to_s])
	if !ui.empty?
		if ui[0].salted_password==hashed(params[:op])
			ui[0].salted_password=hashed(params[:np])
			if ui[0].save
				data = "Пароль успешно сохранен!"
			else
				data = "Не получилось, повторите позже!"
			end
		else 
			data = "Пароль введен неправильно!"
		end
	else
		data =  "!"
	end
	render :text => data, :layout => false
  end
  
  def cabinet
  
  end
    
  def news
	
  end
  
  def logout
    cookies.delete(:alluznet)
    redirect_to "/main"
  end
    
  def forgot
	headers["Content-Type"] = "text/plain; charset=utf-8" 
	@ui = User.find(:all , :conditions => ["email=?",params[:email]])
	npas = generatePass
	if !@ui.empty?
		@ui[0].salted_password = hashed(npas)
		if @ui[0].save
			Msender.deliver_forgot_send(params[:email], "AllUzNet", npas)
			data = { :success => 'true', :text => "Новая пароль отправлено на почту "+params[:email]+"!"}
		else
			data = { :failure => 'true', :text => "Не поличилось попрубуйте позже!"}
		end
	else
			data = { :failure => 'true', :text => "Такая пользователь не сущаствует!"}
	end
	render :text => data.to_json, :layout => false
  end
  
  def login
    headers["Content-Type"] = "text/plain; charset=utf-8" 
    @ui = User.find(:all , :conditions => ["email=?",params[:userlogin]])
    if !@ui.empty?
        if hashed(params[:userpass])==@ui[0].salted_password
			if  @ui[0].email_confirmed
	            @uname=@ui[0].email
	            data = { :success => 'true', :text => 'Инфо'}
	            cookies[:alluznet] = @ui[0]['id'].to_s
			else
				data = { :failure => 'true', :text => "Вы не подтверждали электронную почту!"}
			end
        else
            data = { :failure => 'true', :text => "Электронный почта или пароль неправилно!"}
        end
    else
        data = { :failure => 'true', :text => "Электронный почта или пароль неправилно!"}
    end
    render :text => data.to_json, :layout => false
  end
  
  def verUser
	if !params[:email].empty?
		bool = User.exists?(["email = (?)", params[:email]])
		if bool
			data = "Эта электронная почта уже зарегистрирован!"
		else
			data = "Можно использовать!"
		end
	else
		data = ""
	end
	render :text => data, :layout => false
  end
  
  def activate
	@ui = User.find(:all , :conditions => ["salted_password=? AND email=?",params[:kod], params[:ue]])
	if !@ui.empty?
		if (@ui[0].email_confirmed!='t')
			@ui[0].email_confirmed='t'
			if @ui[0].save
				data = "Ваша учетная запись активирован!"
				
			end
		else
			data = "Ваша учетная запись уже активирован!"
		end
	else
		data = "Такая пользователь не существует!"
	end
	render :text => data, :layout => false
  end
	
  def register
	if request.get?
	  @user=User.new
      @user.email=params[:email]
      @user.password=params[:login_pass]
	  hs = 'http://localhost:3000/main/activate/?kod='+hashed(params[:login_pass])+'&ue='+params[:email]
	  if @user.save
		 Msender.deliver_send(@user.email, "AllUzNet", hs)
		 data = { :success => 'true', :text => 'Спосибо за регистрация. Данные о подтверждении авторизации отправлены на почту '+@user.email}  
      else
         data = { :failure => 'true', :text => 'Регистрация не успешно'}  
      end
    else
      data = { :failure => 'true', :text => 'Регистрация не успешно'}  
    end
    render :text => data.to_json, :layout => false
  end
  

  #categories
  
  def getCategories
	headers["Content-Type"] = "text/plain; charset=utf-8" 
    @path = params[:path]
	@path = @path.chomp("root") 
	@index = params[:index]
	@jsontxt = "["
	if @path==''
		@base = Category.find(:all , :select => "category, count, title_"+cookies[:alluznet_lang] , :conditions => [ "count = ?", @index])
	else
		@base = Category.find(:all , :select => "category, count, title_"+cookies[:alluznet_lang] , :conditions => [ "category LIKE ? AND count = ?", @path+"%",@index])
	end
	for sub in @base 
		@p = sub.category+".%"
		@basesub = Category.find(:all , :select => "category, count, title_"+cookies[:alluznet_lang] , :conditions => [ "category LIKE ?", @p])
		if (@basesub.empty?)
			@leaf = "true"
		else
			@leaf = "false"
		end
		if cookies[:alluznet_lang]=='uz'
			@jsontxt += "{text: '" + sub.title_uz+ "', id: '" 
		elsif cookies[:alluznet_lang]=='en'
			@jsontxt += "{text: '" + sub.title_en+ "', id: '" 
		else 
			@jsontxt += "{text: '" + sub.title_ru+ "', id: '" 
		end
		@jsontxt += sub.category+ "', leaf: " + @leaf + "},\n"
	end	
	@jsontxt += "]"
	render :text => @jsontxt
  end

	private
	
  def hashed(string)
    Digest::SHA1.hexdigest(string)
  end
  
  def generatePass
	pass = ""
	while true
		x=rand(123)
		if x>48 && x<57 || x>65 && x<90 || x>97 && x<122
			pass += x.chr
			if pass.length==15
				break
			end
		end
	end
	return pass
  end
  
end