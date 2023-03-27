
from django.contrib import admin
from django.urls import path , include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index, name="index"),
     path('api/' , include('backend.api.urls'))
    # path('login',views.index,name='login'),
    # path('register',views.index,name='register'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
