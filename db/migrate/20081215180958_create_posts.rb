class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
		t.column :text, :text, :limit => 650, :null => false
		t.column :price, :integer
		t.column :currency, :string
		t.column :region, :string, :limit => 128, :null => false
		t.column :user_id, :integer, :null => false
		t.column :posted_at, :date, :null => false
	end
  end

  def self.down
    drop_table :posts
  end
end
