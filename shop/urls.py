from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('welcome', views.welcome, name='welcome'),
    path('hello', views.home, name='home'),
    path('gift', views.gift, name='gift'),
    path('signin', views.signin, name='signin'),
    path('signup', views.signup, name='signup'),
    path('signout', views.signout, name='signout'),
    path('location', views.location, name='location'),
    path('custom', views.custom, name='custom'),
    path("add-to-cart/", views.add_to_cart, name="add_to_cart"),
    path('export-cart-to-excel/', views.export_cart_to_excel, name='export_cart_to_excel'),

    
]