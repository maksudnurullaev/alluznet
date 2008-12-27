class CreateTips < ActiveRecord::Migration
  def self.up
    create_table :tips do |t|
		t.column :tip_uz, :string, :limit => 50, :null => false
		t.column :tip_ru, :string, :limit => 50, :null => false
		t.column :tip_en, :string, :limit => 50, :null => false
    end
  end

  def self.down
    drop_table :tips
  end
end
