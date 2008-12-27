class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
		t.column :tekst, :text, :limit => 650, :null => false
		t.column :tip_id, :integer, :null => false
		t.column :category, :text, :limit => 512, :null => false
		t.column :price, :integer
		t.column :currency, :string
		t.column :region, :string, :limit => 128, :null => false
		t.column :user_id, :integer, :null => false
		t.string :posted_at, :null => false
    end
  end

  def self.down
    drop_table :posts
  end
end
