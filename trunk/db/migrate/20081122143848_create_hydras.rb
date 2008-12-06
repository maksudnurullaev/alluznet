class CreateHydras < ActiveRecord::Migration
  def self.up
    create_table :hydra do |t|
		t.column :tree, :text, :limit => 512, :null => false
		t.column :count, :integer, :null => false
		t.column :title, :string, :limit => 1024, :null => false
	end
  end

  def self.down
    drop_table :hydra
  end
end
