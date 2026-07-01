from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer

# 1. GET endpoint for fetching the catalog
@api_view(['GET', 'POST'])
def manage_products(request):
    if request.method == 'GET':
        # If the owner dashboard asks, send everything. Otherwise, only send active products.
        show_all = request.GET.get('all', 'false').lower() == 'true'
        if show_all:
            products = Product.objects.all().order_by('-is_active', 'category')
        else:
            products = Product.objects.filter(is_active=True).order_by('category')
            
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        # Add a new product
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def update_product(request, product_id):
    # Edit price, name, or mark as out of stock (is_active=False)
    try:
        product = Product.objects.get(id=product_id)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
# 2. POST endpoint for processing the checkout
@api_view(['POST'])
def create_checkout_session(request):
    data = request.data
    
    try:
        # transaction.atomic() ensures that if one item fails, the whole order rolls back safely
        with transaction.atomic():
            order = Order.objects.create(
                customer_name=data['customer_name'],
                customer_phone=data['customer_phone'],
                delivery_address=data['delivery_address'],
                total_amount=data['total_amount']
            )
            
            for item in data['cart_items']:
                product = Product.objects.get(id=item['product_id'])
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item['quantity'],
                    price_at_time=product.price
                )
                
        return Response({"message": "Order placed successfully!", "order_id": order.id}, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'PATCH'])
def owner_orders(request, order_id=None):
    if request.method == 'GET':
        # NEW: Check if the frontend asked for ALL orders
        show_all = request.GET.get('all', 'false').lower() == 'true'
        
        if show_all:
            orders = Order.objects.all().order_by('-created_at')
        else:
            orders = Order.objects.exclude(status='Completed').order_by('-created_at')
            
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
        
    elif request.method == 'PATCH':
        try:
            order = Order.objects.get(id=order_id)
            order.status = request.data.get('status', order.status)
            order.save()
            return Response({"message": "Order updated successfully"})
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)