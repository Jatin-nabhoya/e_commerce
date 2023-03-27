from django.db import models

# Create your models here.

from django.contrib.auth.models import User
from django.urls import reverse
from django.template.defaultfilters import slugify
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , null=True)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.user.username
       
    

class Products(models.Model):
    def upload_path(instance,filename):
        return '/'.join(['images','products',str(instance.name), filename])
    
    name = models.CharField(max_length=100)
    slug = models.SlugField(null=True,unique=True)
    category = models.CharField(max_length=50)
    sub_category = models.CharField(max_length=50)
    price = models.FloatField()
    description = models.TextField()
    image1 = models.ImageField(upload_to=upload_path,null=False,blank=False)
    image2 = models.ImageField(upload_to=upload_path,null=False, blank=False)
    image3 = models.ImageField(upload_to=upload_path,null=False, blank=False)
    ratings = models.FloatField()
    stock_status = models.BooleanField()
    inventory_count = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

    
    # def get_absolute_url(self):
    #     return reverse("Product_detail", kwargs={"slug": self.slug})
    
    def save(self, *args, **kwargs):  # new
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)
    
# class Rating(models.Model):
#     product = models.ForeignKey(Products, on_delete=models.CASCADE)
#     customer = models.ForeignKey(User, on_delete=models.CASCADE)
#     rating = models.PositiveSmallIntegerField()
#     review = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
    
class WishList(models.Model):
    
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'product')
        
    def __str__(self):
        return self.user.username
    

    
class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1 ,validators=[MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'product')
        
    def __str__(self):
        return self.user.username