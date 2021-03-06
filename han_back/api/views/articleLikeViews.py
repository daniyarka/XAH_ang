from ..models.articleLikeModel import ArticleLike
from django.http import JsonResponse
from ..serializers.articleLikeSerializer import ArticleLikeModelSerializer
from rest_framework import status, request
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from ..models.article import Article
from rest_framework.authentication import TokenAuthentication


class articleLike_list(APIView):
    authentication_classes = (TokenAuthentication, )

    def get(self, request, pk):
        try:
            article = Article.objects.get(id=pk)
        except Article.DoesNotExist:
            return Response(status.HTTP_404_NOT_FOUND)


        likes = ArticleLike.objects.filter(article = Article.objects.get(id=pk))
        serializer = ArticleLikeModelSerializer(likes, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        serializer = ArticleLikeModelSerializer(data=request.data)

        try:
            article = Article.objects.get(id=pk)
        except Article.DoesNotExist:
            return Response(status.HTTP_404_NOT_FOUND)


        articlelikes = ArticleLike.objects.filter(user=request.user, article=Article.objects.get(id=pk))

        try:
            if (serializer.is_valid() and len(articlelikes)==0):
                serializer.save(user=request.user, article=article)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            Response(status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        articleLike = ArticleLike.objects.filter(user=request.user, article=Article.objects.get(id=pk))
        articleLike.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

