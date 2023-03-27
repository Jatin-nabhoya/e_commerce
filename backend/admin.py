from django.contrib import admin

# Register your models here.

from .models import Address,Products,WishList,CartItem


@admin.register(Address)
class Address(admin.ModelAdmin):
    list_display = ('user','street','city','state','zip_code')
    list_filter = ('created_at',)
    list_per_page = 25


# @admin.register(Products)
class Product(admin.ModelAdmin):
    list_display = ('id','name','category','sub_category','description','price','stock_status','inventory_count')
    prepopulated_fields = {"slug": ("name",)}
    # list_filter = ('created_at')
    list_per_page = 25

admin.site.register(Products,Product)

# admin.site.register(WishList)

@admin.register(CartItem)
class CartItem(admin.ModelAdmin):
    list_display =( 'user', 'product', 'quantity', 'created_at',"updated_at")
    list_filter = ('created_at',)
    list_per_page = 25


@admin.register(WishList)
class WishList(admin.ModelAdmin):
    list_display =('user', 'product', 'created_at',"updated_at")
    list_filter = ('created_at',)
    list_per_page = 25