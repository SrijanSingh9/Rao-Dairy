from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Milk', 'Milk'),
        ('Homemade Ghee', 'Homemade Ghee')
    ]
    
    name = models.CharField(max_length=150)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    badge = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    unit = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled')
    ]
    
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=15)
    delivery_address = models.TextField()
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    price_at_time = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Order #{self.order.id})"