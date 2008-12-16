class CreateRegions < ActiveRecord::Migration
  def self.up
    create_table :regions do |t|
      t.column :region_uz, :string, :limit => 128, :null => false
	  t.column :region_ru, :string, :limit => 128, :null => false
	  t.column :region_en, :string, :limit => 128, :null => false
    end
  end

  def self.down
    drop_table :regions
  end
end
