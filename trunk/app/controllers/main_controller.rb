$a = 1
class MainController < ApplicationController
  
  def index
    #headers["Content-Type"] = "text/plain; charset=utf-8" 
  end
  
  def treedata
    @path = params[:path]
    @index = params[:index]
    if @path != "/"
      @path = @path [-(@path.length - 2) .. -1]
      if @path != "HYDRA"
          @arr = @path.split('/');
          @path = ""
          for ss in @arr
            @path += ss + "."
          end
      else
          @path += "."
      end
      @base = Admin.find(:all , :conditions => [ "tree LIKE ? AND ns = ?", @path+"%", @index])
      #SELECT * FROM admins WHERE (tree LIKE 'HYDRA.Users.%' AND ns = '2')
      @jsontxt = "["
      for bs in @base 
          @p = bs.tree+".%"
          @basesub = Admin.find(:all , :conditions => [ "tree LIKE ?", @p])
          if (@basesub.empty?)
              @leaf = "true"
              @icon = "iconCls: '" + bs.icon +  "',";    
          
          else
              @leaf = "false"
              @icon = "iconCls: 'tree-1-3',";    
          end
          @tree_title = bs.tree;
          @arr=@tree_title.split('.')
          @title=@arr[@arr.length-1]
         
          @jsontxt += "{text: '" + @title+ "', 
                        " + @icon +"
                        qtip: '" + bs.title + "',
                        id: '" + bs.tree + "',
                        leaf: " + @leaf + "                     
                      },\n"
        end 
        @jsontxt += "]"
        puts @jsontxt
    else
      @jsontxt = "[{text: 'HYDRA', id: 'HYDRA'}]"
    end
    
     render :text => @jsontxt
  end
  
  
  def tabdata
    headers["Content-Type"] = "text/plain; charset=utf-8" 
    @path = params[:path]
    @data = Admin.find(:all, :conditions => ["tree = ?", @path])
    render :text => @data[0].title, :layout => false
  end
   
  
  def update_title
    headers["Content-Type"] = "text/plain; charset=utf-8" 
    @path = params[:path]
    @value = params[:value]
    @data = Admin.update_all(['title = ?', @value], ['tree = ?', @path])   
    render :text => "O'zgartirish amalga oshirildi", :layout => false
  end
  
  
  def tree_add
   @text = params[:treetext] 
   @title = params[:treetitle]
   @path = params[:path]
   @find = Admin.find(:all, :conditions => ["tree = ?", @path +"."+ @text])
   if(@find.empty?)
       @arr = @path.split(".")
       @ns = @arr.size
       @table = Admin.new
       @table.tree = @path +"."+ @text
       @table.title = @title
       @table.ns = @ns
       @table.icon = "tree-1-1"
       if (@table.save)
          data={ :success => 'true', :text => 'Qo\'shildi!!!'}
        else 
          data={ :failure => 'true', :text => 'MB XATO'}
        end
   else
      data={ :failure => 'true', :text => 'Bunday text menyuda mavjud'}
   end
    render :text => data.to_json, :layout => false
  end
  
  def tree_del
    @path = params[:path] + "%"
    Admin.delete_all(["tree LIKE ?", @path])
    render :text => "O'chirildi"
  end

  
  def login
    headers["Content-Type"] = "text/plain; charset=utf-8" 
      puts params[:userlogin]
      
      if (params[:userlogin] == "geniuz" && params[:userpass] == "123")
         data = { :success => 'dd', :text => 'Success'}
      else
         data = { :failure => 'true', :text => "Username or Password wrong !"}
      end
     render :text => data.to_json, :layout => false
  end

  def edit_node
    headers["Content-Type"] = "text/plain; charset=utf-8" 
    @value = params[:child_value] 
    @tree = params[:tree]
    puts @value
    @oldvalue = params[:olddata]
    @arr = @tree.split(".")
#    @arr[-1] = @value
    @result = ""
    for aa in @arr
      @result += aa + "."
    end
#    @result=@result[0,@result.length-1]
    @dbdata=Admin.find(:all, :conditions => [ "tree LIKE ?", @tree+"%"])
    for row in @dbdata
      uzg = row.tree
      @newuzg='';
      @arr1=uzg.split('.')
      for @el in @arr1
        if(@el==@oldvalue)
          @el=@value
        end
         @newuzg+=@el+'.'
      end
      @newuzg = @newuzg[0, @newuzg.length - 1]
      Admin.update_all(["tree = ?", @newuzg],["id = ?", row.id])
    end    
    #@data = Admin.update_all(['tree = ?', @result], ['tree = ?', @tree])    
    datt = {:success => "true"}
    render :text => datt.to_json, :layout => false
  end
  #UPDATE admins SET tree = 'result' WHERE (tree = 'tree')

end
