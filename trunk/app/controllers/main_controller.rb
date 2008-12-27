require 'rss/1.0'
require 'rss/2.0'
require 'open-uri'
require 'date'
class MainController < ApplicationController
  def index
	
	if cookies[:alluznet_lang]==nil || cookies[:alluznet_lang]==""
		lng = 'ru'
		cookies[:alluznet_lang] = 'ru'
		@lang='lang_ru'
	else
		@lang='lang_'+cookies[:alluznet_lang]
	end
	if cookies[:alluznet_lang]=='uz'
		lng = 'uz'
		@uname='Мехмон'
		@title='AllUz.Net Бош сахифаси'
	elsif cookies[:alluznet_lang]=='en'
		lng = 'en'
		@uname='Guest'
		@title='Main page AllUz.Net'
	else
		lng = 'ru'
		@uname='Гость'
		@title='Главная страница AllUz.Net'
	end
	@cookie = false
	@uid = cookies[:alluznet].to_s
    if (!@uid.empty?)
		@cookie = true
		@n = User.find(@uid)
		@uname = @n['email']
		@uinfo = Uinfo.find(:all , :conditions => ["user_id=?",cookies[:alluznet].to_s])
		if !@uinfo.empty?
			@fname=@uinfo[0].fname
			@lname=@uinfo[0].lname
			@phone=@uinfo[0].phone
	    end
    end
	
	begin
		source = "http://bank.uz/scripts/rss_valute?valute=2"
		content = "" 
		open(source) do |s| content = s.read end
		rss = RSS::Parser.parse(content, false)
		@usa=rss.items[0].description
		source = "http://bank.uz/scripts/rss_valute?valute=5"
		content = "" 
		open(source) do |s| content = s.read end
		rss = RSS::Parser.parse(content, false)
		@euro=rss.items[0].description
		source = "http://bank.uz/scripts/rss_valute?valute=11"
		content = "" 
		open(source) do |s| content = s.read end
		rss = RSS::Parser.parse(content, false)
		@rubl=rss.items[0].description
	rescue
		@usa="*"
		@euro="*"
		puts 'Error connect to http://bank.uz'
	ensure
		
	end

  end
  
  def title(wordCount)
	text.split[0..(wordCount-1)].join(" ") +(text.split.size > wordCount ? "..." : "")
  end
  
  #addAnnouncment
  def addAnnounce
	@alltext=params[:title]+"~"+params[:text]
	@price=params[:price]
	@currency=params[:curr]
	cat = Category.find(:all, :select => "category", :conditions => ["title_"+cookies[:alluznet_lang]+"=?",params[:category]])
	reg = Region.find(:all, :select => "id", :conditions => ["region_"+cookies[:alluznet_lang]+"=?",params[:region]])
	type = Tip.find(:all, :select => "id", :conditions => ["tip_"+cookies[:alluznet_lang]+"=?",params[:type]])
	if !reg.empty? && !cat.empty? && !type.empty? && cookies[:alluznet]!=nil
		@today = Time.now.day.to_s+"."+Time.now.month.to_s+"."+Time.now.year.to_s+" "+Time.now.hour.to_s+":"+Time.now.min.to_s+":"+Time.now.sec.to_s
		@post = Post.new
		@post.tekst = @alltext
		@post.price = @price
		@post.tip_id = type[0].id
		@post.category = cat[0].category
		@post.currency = @currency
		@post.region = reg[0].id.to_s
		@post.user_id = cookies[:alluznet]
		@post.posted_at = @today
		if @post.save
			data = { :success => 'true', :text => "Объявление добавлен!"}
		else
			data = { :failure => 'true', :text => "Произошло ошибка!"}
		end
	else
		data = { :failure => 'true', :text => "Произошло ошибка!"}
	end
	render :text => data.to_json, :layout => false
  end
  
  
  def getPosts
  
  
  end
  
  def getLastPostsMain
	start = 0
	limit = 5
	puts "-------------------------------"
	puts params[:nodeid]
	puts params[:tip_id]
	if params[:start] != nil
		start = params[:start]
		limit = params[:limit]
	end
	if params[:nodeid] != nil
		@post_count = Post.count(:conditions => ["posts.tip_id = ? AND posts.category LIKE ?",params[:tip_id], params[:nodeid]+"%"] )
		@posts = Post.find(:all, :select => "tekst, price, currency, title_" + cookies[:alluznet_lang] + ", tip_" + cookies[:alluznet_lang] + ", region_" + cookies[:alluznet_lang] + ", posted_at", 
						:order => "posted_at DESC",
						:conditions => ["posts.tip_id = ? AND posts.category LIKE ?",params[:tip_id], params[:nodeid]+"%"], 
						:joins => "join categories on posts.category = categories.category join tips on tips.id = posts.tip_id 
						join regions on regions.id = posts.region", :limit => limit, :offset => start)
	else 
		@post_count = Post.count(:conditions => ["posts.tip_id = ?",params[:tip_id]] )
		@posts = Post.find(:all, :select => "tekst, price, currency, title_" + cookies[:alluznet_lang] + ", tip_" + cookies[:alluznet_lang] + ", region_" + cookies[:alluznet_lang] + ", posted_at", 
						:order => "posted_at DESC",
						:conditions => ["posts.tip_id = ?",params[:tip_id]], 
						:joins => "join categories on posts.category = categories.category join tips on tips.id = posts.tip_id 
						join regions on regions.id = posts.region", :limit => limit, :offset => start)
	end
	if !@posts.empty?
		dataes = "{totalCount:'" + @post_count.to_s + "', rows: ["
		for post in @posts
			if cookies[:alluznet_lang]=="uz"
				cat = post.title_uz
				reg = post.region_uz
				tip = post.tip_uz
			elsif cookies[:alluznet_lang]=="ru"
				cat = post.title_ru
				reg = post.region_ru
				tip = post.tip_ru
			else
				cat = post.title_en
				reg = post.region_en
				tip = post.tip_en
			end
			dataes += "{date:'"+ post.posted_at + "', announce:'" + post.tekst + "', price:'" + post.price.to_s + "', tip:'" + 
				tip + "',category:'" + cat + "',region:'" + reg + "'},"
		end
		dataes += "]}"
	else
	end
	render :text => dataes, :layout => true
  end
  
  # def getPosts
	# node_id=params[:nodeid]
	# @posts = Post.find(:all, :select => "tekst, price, currency, title_" + cookies[:alluznet_lang] + ", tip_" + cookies[:alluznet_lang] + ", region_" + cookies[:alluznet_lang] + ", users.email, posted_at", 
						# :conditions => ["posts.category LIKE ?",node_id+"%"], 
						# :order => "posted_at DESC",
						# :joins => "join categories on posts.category = categories.category join tips on tips.id = posts.tip_id 
						# join regions on regions.id = posts.region  join users on users.id = posts.user_id", :limit => 10)
	# if !@posts.empty?
		# dataes="["
		# for post in @posts
			# if cookies[:alluznet_lang]=="uz"
				# cat = post.title_uz
				# reg = post.region_uz
				# tip = post.tip_uz
			# elsif cookies[:alluznet_lang]=="ru"
				# cat = post.title_ru
				# reg = post.region_ru
				# tip = post.tip_ru
			# else
				# cat = post.title_en
				# reg = post.region_en
				# tip = post.tip_en
			# end
			# dataes += "['" + post.posted_at + "','" + post.tekst + "'," + post.price.to_s + ",'" + tip + "','" + cat + "','" + reg + "'],"
		# end
		# dataes += "]"
		# render :text => dataes, :layout => true
	# else
		# render :text => "[['','',,'','','']]", :layout => true
	# end
  # end
  
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
  def update_data
    headers["Content-Type"] = "text/plain; charset=utf-8"
	ui = Uinfo.find(:all , :conditions => ["user_id=?",cookies[:alluznet].to_s])
	if !ui.empty?
		ui[0].fname = params[:fname]
		ui[0].lname = params[:lname]
		ui[0].phone = params[:phone]
		if ui[0].save 
			data = "Успешно сохранен!"
		else
			data = "Не получилось, повторите позже!"
		end
	else
		ui = Uinfo.new
		ui.user_id = cookies[:alluznet].to_s
		ui.fname = params[:fname]
		ui.lname = params[:lname]
		ui.phone = params[:phone]
		if ui.save 
			data = "Успешно сохранен!"
		else
			data = "Не получилось, повторите позже!"
		end
	end
	render :text => data, :layout => false
  end
 
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
  
  def news
	
  end
  
  def logout
    cookies.delete(:alluznet)
    redirect_to "/main"
  end
    
  def forgot
	headers["Content-Type"] = "text/plain; charset=utf-8" 
	if validate_email(params[:email])
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
	else 
		data = { :failure => 'true', :text => "Адрес электронного почты неправилно!"}
	end
	render :text => data.to_json, :layout => false
  end
  
  def login
    headers["Content-Type"] = "text/plain; charset=utf-8" 
    @ui = User.find(:all , :conditions => ["email=?",params[:userlogin]])
    if !@ui.empty?
        if hashed(params[:userpass])==@ui[0].salted_password
			if  @ui[0].email_confirmed 
				if @ui[0].role_id==1
					@uname=@ui[0].email
					data = { :success => 'true', :text => 'user', :put => '/main'}
					cookies[:alluznet] = @ui[0]['id'].to_s
				else
					data = { :success => 'true', :text => 'HI', :put => '/hydra'}
					cookies[:alluznet] = @ui[0]['id'].to_s
				end
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
		@temp=User.find(:all, :conditions => [ "email = ?", params[:email]])
		if !@temp.empty?
			data = { :failure => 'true', :text => 'Такая пользователь существует!'} 
		elsif validate_email(params[:email])
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
			
	else
		data = { :failure => 'true', :text => 'Регистрация не успешно'}  
	end
	render :text => data.to_json, :layout => false
  end
  

  #categories
  
  def getRegions
	headers["Content-Type"] = "text/plain; charset=utf-8" 
	@base = Region.find(:all , :select => "id, region_"+cookies[:alluznet_lang])
	@arr="{"
	@arr += "rows: ["
	if !@base.empty?
		for sub in @base
			if cookies[:alluznet_lang]=='uz'
				@arr += "{id:' " + sub.id.to_s + "', value:'" + sub.region_uz + "'},"
			elsif cookies[:alluznet_lang]=='ru'
				@arr += "{id: '" + sub.id.to_s + "', value:'" + sub.region_ru + "'},"
			else 
				@arr += "{id: '" + sub.id.to_s + "', value:'" + sub.region_en + "'},"
			end
		end
	end
	@arr += "]}"
	puts @arr
	render :text => @arr
  end
  
  
  def getTips
	headers["Content-Type"] = "text/plain; charset=utf-8" 
	@base = Tip.find(:all , :select => "id, tip_"+cookies[:alluznet_lang])
	@arr="{"
	@arr += "rows: ["
	if !@base.empty?
		for sub in @base
			if cookies[:alluznet_lang]=='uz'
				@arr += "{ids:'id" + sub.id.to_s + "', values:'" + sub.tip_uz + "'},"
			elsif cookies[:alluznet_lang]=='ru'
				@arr += "{ids:'id" + sub.id.to_s + "', values:'" + sub.tip_ru + "'},"
			else 
				@arr += "{ids:'id" + sub.id.to_s + "', values:'" + sub.tip_en + "'},"
			end
		end
	end
	@arr += "]}"
	puts "----------------------------"
	puts @arr
	render :text => @arr
  end
  
  
  def getCats
	headers["Content-Type"] = "text/plain; charset=utf-8" 
	@base = Category.find(:all , :select => "id, category, title_"+cookies[:alluznet_lang])
	@arr="{"
	@arr += "rows: ["
	if !@base.empty?
		for sub in @base
			if cookies[:alluznet_lang]=='uz'
				@arr += "{name:' " + sub.category + "', value:'" + sub.title_uz + "'},"
			elsif cookies[:alluznet_lang]=='ru'
				@arr += "{name: '" + sub.category + "', value:'" + sub.title_ru + "'},"
			else 
				@arr += "{name: '" + sub.category + "', value:'" + sub.title_en + "'},"
			end
		end
	end
	@arr += "]}"
	puts @arr
	render :text => @arr
  end
  
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
  
   def validate_email(email)
		if email =~/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i #@/([a-z0-9_.-]+)@([a-z0-9-]+)\.([a-z.]+)/i 
			return true  
		else
			return false
		end  
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