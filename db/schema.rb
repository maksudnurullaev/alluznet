# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20081211150438) do

  create_table "categories", :force => true do |t|
    t.text    "category", :limit => 512, :null => false
    t.integer "count",                   :null => false
    t.string  "title_ru", :limit => 128, :null => false
    t.string  "title_uz", :limit => 128, :null => false
    t.string  "title_en", :limit => 128, :null => false
  end

  create_table "hydra", :force => true do |t|
    t.text    "tree",  :limit => 512,  :null => false
    t.integer "count",                 :null => false
    t.string  "title", :limit => 1024, :null => false
  end

  create_table "uinfos", :force => true do |t|
    t.integer "user_id",               :null => false
    t.string  "fname",   :limit => 20
    t.string  "lname",   :limit => 20
    t.string  "phone",   :limit => 12
  end

  create_table "users", :force => true do |t|
    t.string  "email",                              :null => false
    t.string  "salted_password",                    :null => false
    t.integer "role_id",         :default => 1
    t.boolean "email_confirmed", :default => false
  end

end
