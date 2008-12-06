class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |user|
		user.column :email, :string, :null => false
		user.column :salted_password, :string, :null => false
		user.column :role_id, :integer, :default => 1
                user.column :email_confirmed, :boolean, :default => false
      end
  end

  def self.down
    drop_table :users
  end
end
