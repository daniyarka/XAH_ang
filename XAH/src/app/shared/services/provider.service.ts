import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from '../models/authResponse';
import { IArticle } from '../models/article';
import { IComment } from '../models/comment';
import { IUser } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(http: HttpClient) {
    super(http);
  }

  getComment(commentId: any): Promise<IComment> {
    return this.get(this.baseUrl + `comments/${commentId}/`, {})
  }

  getComments(articleId: any): Promise<IComment[]> {
    return this.get(this.baseUrl + `articles/${articleId}/comments/?ordering=-date_published`, {});
  }

  createComment(body: string, articleId: any): Promise<IComment> {
    return this.post(this.baseUrl + `articles/${articleId}/comments/create/`, {
      body
    });
  }

  deleteComment(commentId): Promise<any> {
    return this.delete(this.baseUrl + `comments/delete/${commentId}/`, {});
  }

  login(username: any, password: any): Promise<IAuthResponse> {
    return this.post( this.baseUrl + 'login/', {
      username,
      password
    });
  }

  register(username: any, password: any, email: any): Promise<IUser> {
    return this.post(  this.baseUrl + 'register/', {
      username,
      password,
      email
    });
  }

  logout(): Promise<any> {
    return this.post(this.baseUrl + 'logout/', {});
  }

  getArticlesByViews(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/?ordering=-views', {});
  }

  getArticlesAutoViews(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/?ordering=-views&category=1', {});
  }

  getArticlesBusinessViews(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/?ordering=-views&category=2', {});
  }

  getArticlesSportViews(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/?ordering=-views&category=3', {});
  }

  getArticlesAutoDate(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/?ordering=-created_at&category=1', {});
  }

  getArticlesBusinessDate(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/?ordering=-created_at&category=2', {});
  }

  getArticlesSportDate(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/?ordering=-created_at&category=3', {});
  }

  getArticlesDate(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/?ordering=-created_at', {});
  }

  getArticlesByUser(): Promise<IArticle[]> {
    return this.get(this.baseUrl + 'articles/my/', {});
  }

  getArticle(articleId): Promise<IArticle> {
    return this.get(this.baseUrl  + `articles/${articleId}/`, {});
  }

  putArticleLike(articleId) {
    return this.post(this.baseUrl  + `articles/${articleId}/likes/`, {});
  }

  getArticleLikes(articleId) {
    return this.get(this.baseUrl  + `articles/${articleId}/likes/`, {});
  }

  createArticle(title, body, category, image_url): Promise<any>{
    return this.post(this.baseUrl + `articles/create/`, {
      title: title,
      body: body,
      image_url: image_url,
      category: category
    })
  }
  updateArticle(articleId, title, body, category, image_url): Promise<any> {
    return this.put(this.baseUrl + `articles/${articleId}/update/`, {
      title: title,
      body: body,
      image_url: image_url,
      category: category
    })
  }
  deleteArticle(articleId): Promise<any> {
    return this.delete(this.baseUrl + `articles/${articleId}/delete/`, {});
  }

  putLike() {
    return this.post(`http://localhost:8000/api/articles/1/likes/`, {});
  }

  deleteArticleLike(articleId) {
    return this.delete(this.baseUrl  + `articles/${articleId}/likes/`, {});
  }

  putCommentLike(commentId) {
    return this.post(this.baseUrl  + `comments/${commentId}/likes/`, {});
  }

  getCommentLikes(commentId) {
    return this.get(this.baseUrl  + `comments/${commentId}/likes/`, {});
  }

  deleteCommentLike(commentId) {
    return this.delete(this.baseUrl  + `comments/${commentId}/likes/`, {});
  }
}
