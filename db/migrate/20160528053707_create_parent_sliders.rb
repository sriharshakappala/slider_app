class CreateParentSliders < ActiveRecord::Migration
  def change
    create_table :parent_sliders do |t|
      t.integer :value

      t.timestamps
    end
  end
end
