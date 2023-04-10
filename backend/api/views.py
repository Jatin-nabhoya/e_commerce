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
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

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
    # filter_backends = [DjangoFilterBackend]
    filter_backends = [filters.SearchFilter]
    filterset_fields = ['=name','slug','category','price','sub_category']
    
    
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
def AddTOWishList(request, slug):
    user = request.user 
    item = get_object_or_404(Products,slug=slug)
    print(request.data.get('productID'))
    product_id = request.data.get('productID')
    try:
        item1 = WishList.objects.filter(product=product_id,user=user)
        # print("already has ..: ",item1[2])
        return Response({'message': 'Item is already in WishList.'}, status=status.HTTP_200_OK)
    except:
        product,created = WishList.objects.get_or_create(product=item,user = user,)
        return Response({'message': 'Item added successfully.'}, status=status.HTTP_201_CREATED)




class WishlistAPIView(generics.ListCreateAPIView):
    serializer_class = WishListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WishList.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # serializer.save(user=self.request.user)
        user = self.request.user
        # if not user.is_valid:
        item = get_object_or_404(Products, pk=self.kwargs['pk'])
        serializer.save(owner=user, item=item)
        # else:                
        #     raise serializers.ValidationError("This is not a customer account.Please login as customer.")
    
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
        # id = request.data.get('productID', None)
        instance = self.request.user
        product_id = request.data.get('productID')
        print(product_id)
        item = get_object_or_404(Products,id=product_id)
        # if not user.is_valid:
        # try:
        #     wishlist_item = WishList.objects.get_or_create(user=instance, product=product_id)
        #     wishlist_item.save()
        #     return Response({'message': 'Item removed from cart.'}, status=status.HTTP_204_NO_CONTENT)
        # except WishList.DoesNotExist:
        #     return Response({'message': 'Item not found in cart.'}, status=status.HTTP_404_NOT_FOUND)
        
    
     
    
        
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
        
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Addtocart(request, slug):
    item = get_object_or_404(Products, slug=slug)
    print(item)
    product_id = request.data.get('productID')
    product_q = request.data.get('quantity')
    print(product_q)
    order_item, created = CartItem.objects.get_or_create(
        product=item,
        user=request.user,
        quantity=product_q,
    )
    # order_item.save()
    return Response({"message": "Item added to your cart", }, status=status.HTTP_200_OK)

    