class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
		t.column :category, :text, :limit => 512, :null => false
		t.column :count, :integer, :null => false
		t.column :title_ru, :string, :limit => 128, :null => false
		t.column :title_uz, :string, :limit => 128, :null => false
		t.column :title_en, :string, :limit => 128, :null => false
    end
  end

  def self.down
    drop_table :categories
  end
end
