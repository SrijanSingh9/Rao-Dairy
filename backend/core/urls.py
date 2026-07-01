from django.contrib import admin
from django.urls import path, include # Import 'include'

urlpatterns = [
    path('admin/', admin.site.urls),
    # This routes anything starting with /api/ to your dairy app
    path('api/', include('dairy.urls')), 
]