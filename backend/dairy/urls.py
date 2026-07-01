from django.urls import path
from . import views

urlpatterns = [
    # Replaced get_products with manage_products
    path('products/', views.manage_products, name='manage_products'),
    path('products/<int:product_id>/', views.update_product, name='update_product'),
    
    path('checkout/', views.create_checkout_session, name='checkout'),
    path('orders/', views.owner_orders, name='get_orders'),
    path('orders/<int:order_id>/', views.owner_orders, name='update_order'),
]