class HomeController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:set_parent_slider_value, :get_config, :set_child_slider_value, :create_slider, :delete_slider]

  def index
  end

  def set_parent_slider_value
    if ParentSlider.first.nil?
      ParentSlider.create(value: params["slider"].to_i)
    else
      parent_slider = ParentSlider.first
      parent_slider.update(value: params["slider"].to_i)
    end
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def set_child_slider_value
    child_slider = ChildSlider.find_by(count: params[:count].to_i)
    if child_slider.nil?
      ChildSlider.create(count: params[:count].to_i, value: params[:value].to_i)
    else
      child_slider.update(value: params[:value].to_i)
    end
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def get_config
    parent_slider = ParentSlider.first
    value = parent_slider.nil? ? 0 : parent_slider.value
    child_slider_values = ChildSlider.all.order(:count).select(:value).map(&:value)
    render json: { parent_slider_init: value, child_slider_init: child_slider_values }
  end

  def create_slider
    ChildSlider.create(count: params["count"], value: 0)
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def delete_slider
    child_slider = ChildSlider.find_by(count: params["count"].to_i)
    child_slider.delete if child_slider.present?
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

end
