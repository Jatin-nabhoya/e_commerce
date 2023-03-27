from datetime import timezone
from django.http import JsonResponse
# from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,action
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from rest_framework.generics import GenericAPIView 
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .serializers import AddressSerializer,ProductsSerializer,WishListSerializer,CartItemSerializer
from backend.models import Address,Products,WishList,CartItem

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    
    return Response(routes)



# Register -------------------------->>>

class RegisterView(GenericAPIView):
    serializer_class = UserSerializer
    
    def post(self, request):
        serializer=UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def AddressesView(request):
    user = request.user
    addresses = user.address_set.all()
    # address = Address.objects.all()
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def ProductsView(request):
#     products = Products.objects.all()
#     serializer = ProductsSerializer(products, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def ProductDetailView(request,slug):
#     product = Products.objects.get(slug=slug)
#     serializer = ProductsSerializer(product,many=False)
#     return Response(serializer.data)


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    lookup_field = 'slug'
    
# class ProductView(viewsets.ModelViewSet):
#     queryset = Products.objects.all()
#     serializer_class = ProductsSerializer
    
   
    
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def WishListView(request):
#     user = request.user
#     wishlist = user.wishlist_set.all()
#     serializer = WishListSerializer(wishlist, many=True)
#     return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddTOWishList(self,request,*args, **kwargs):
    user = self.request.user 
    serializer=WishListSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WishlistAPIView(generics.ListCreateAPIView):
    serializer_class = WishListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WishList.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def delete(self, request, *args, **kwargs):
        instance = self.request.user
        product_id = request.data.get('product')
        try:
            cart_item = WishList.objects.get(user=instance, product=product_id)
            cart_item.delete()
            return Response({'message': 'Item removed from cart.'}, status=status.HTTP_204_NO_CONTENT)
        except WishList.DoesNotExist:
            return Response({'message': 'Item not found in cart.'}, status=status.HTTP_404_NOT_FOUND) 
        
    def post(self, request, *args, **kwargs):
        id = request.data.get('productID', None)
        print(id)
        
    
     
    
        
# ===================================================>>>>   Add TO Cart

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def AddToCartView(request):
#     user = request.user
#     wishlist = user.addtocart_set.all()
#     serializer = AddToCartSerializer(wishlist, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CartItemview(request):
    # Retrieve all the cart items for the current user
    user = request.user
    cart_items = user.cartitem_set.filter()
    # cart_items = CartItem.objects.filter(user=request.user)

    # Calculate the subtotal by iterating over the cart items
    subtotal = 0
    for item in cart_items:
        subtotal += item.product.price * item.quantity

    # Create a dictionary to store the subtotal and cart items
    data = {
        'subtotal': subtotal,
        'cart_items': CartItemSerializer(cart_items, many=True).data
    }
    return Response(data, status=status.HTTP_200_OK)


# class CartItemView(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,)
#     # queryset = CartItem.objects.all()
#     serializer_class = CartItemSerializer
    
#     # lookup_field = 'slug'
    
#     def get_queryset(self):
#         # user = self.request.user
#         # cart_items = user.cartitem_set.filter()
#         cart_items = CartItem.objects.filter(user=self.request.user)
        
#     # cart_items = CartItem.objects.filter(user=request.user)

#     # Calculate the subtotal by iterating over the cart items
#         subtotal = 0
#         for item in cart_items:
#             subtotal += item.product.price * item.quantity

#     # Create a dictionary to store the subtotal and cart items
#         data = {
#             'subtotal': subtotal,
#             'cart_items': CartItemSerializer(cart_items, many=True).data
#         }
#         return Response(data, status=status.HTTP_200_OK)

class CartItemView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
    
    def get(self, request, *args, **kwargs):
        # user = request.user
        # cart_items = user.cartitem_set.filter()
        cart_items = CartItem.objects.filter(user=request.user)

        # Calculate the subtotal by iterating over the cart items
        subtotal = 0
        for item in cart_items:
            subtotal += item.product.price * item.quantity

        # Create a dictionary to store the subtotal and cart items
        data = {
            'subtotal': subtotal,
            'cart_items': CartItemSerializer(cart_items, many=True).data
        }
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        instance = self.request.user
        product_id = request.data.get('product')
        try:
            cart_item = CartItem.objects.get(user=instance, product=product_id)
            cart_item.delete()
            return Response({'message': 'Item removed from cart.'}, status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({'message': 'Item not found in cart.'}, status=status.HTTP_404_NOT_FOUND)      