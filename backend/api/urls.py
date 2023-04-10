from django.urls import path, include
from . import views
from .views import (
    RegisterView,MyTokenObtainPairView,AddressesView,
    # ProductsView,ProductDetailView,
    ProductsViewSet,
    WishlistAPIView,AddTOWishList,
    Addtocart,CartItemview, CartItemView)

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('products', ProductsViewSet, basename='products')
# router.register('products/<slug:slug>', ProductDetailView,basename='products')
# router.register('cartitem', CartItemView , basename='cartitem')

urlpatterns=[
    path('',views.getRoutes),
    path('register/', RegisterView.as_view()),
    path('address/', AddressesView),
    
    path('',include(router.urls)),
    
    # path('products/', ProductsView),
    # path('products/<int:pk>', ProductDetailView),
    # path('products/<slug:slug>', ProductDetailView),
    # path('wishlist/',WishListView),
    path('addtowishlist/<slug:slug>',AddTOWishList),
    path('wishlist/', WishlistAPIView.as_view(), name='wishlist'),
    path('wishlist/<slug:slug>', WishlistAPIView.as_view(), name='wishlist-remove-detail'),
     
    path('cart/',CartItemview),
    path('cartitem/',CartItemView.as_view(),name='cart-detail'),
    path('cartitem/<slug:slug>',CartItemView.as_view() , name='cart-remove-detail'),
    path('Addtocart/<slug:slug>',Addtocart ),
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ]

