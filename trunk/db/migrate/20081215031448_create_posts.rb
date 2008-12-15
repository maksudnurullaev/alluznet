class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
		t.column :title, :text, :limit => 256, :null => false
		t.column :text, :text, :limit => 600, :null => false
		t.column :price, :integer
		t.column :currency, :string
		t.column :region, :string, :limit => 128, :null => false
		t.column :user_id, :integer
		
    end
  end

  def self.down
    drop_table :posts
  end
end
