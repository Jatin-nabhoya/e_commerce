from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from backend.models import Address,Products,WishList,CartItem

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=20,min_length=5, write_only=True)
    email = serializers.EmailField(max_length=200,min_length=4)
    # username = serializers.CharField(max_length=255, min_length=2)
    
    class Meta:
        model = User
        fields=["username","email",'password']
        
    def validate(self, attrs):
        email = attrs.get('email','')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email" : ("email is already in use")})
        return super().validate(attrs)
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    
class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"

class ProductsSerializer(ModelSerializer):
    class Meta:
        model=Products
        fields="__all__"

class WishListSerializer(ModelSerializer):
    product = ProductsSerializer(read_only=True)
    class Meta:
        model=WishList
        fields=['id', 'user', 'product','created_at','updated_at']
        

class CartItemSerializer(ModelSerializer):
    product = ProductsSerializer(read_only=True)
    class Meta:
        model=CartItem
        fields=['id', 'user', 'product','quantity','created_at','updated_at']