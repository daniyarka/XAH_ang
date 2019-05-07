from django.contrib import admin
from django.urls import path
from .views.articleLikeViews import articleLike_list, articleLike_delete
from .views.auth import Register
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('articles/<int:pk>/likes/', articleLike_list()),
    path('articles/<int:pk>/likes/<int:pk>/', articleLike_delete.as_view()),
    path('register/', Register.as_view()),
    path('login/', obtain_jwt_token),
]
dan huen