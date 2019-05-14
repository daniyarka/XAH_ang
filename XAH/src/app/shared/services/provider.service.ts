import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from '../models/authResponse'
import {IArticle} from '../models/article';
import {IComment} from '../models/comment';
import {IUser} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(http: HttpClient) {
    super(http);
  }

  getComments(articleId: any): Promise<IComment[]>{
    return this.get(this.baseUrl + `articles/${articleId}/comments/?ordering=-date_published`, {})
  }

  createComment(body: string, articleId: any): Promise<IComment>{
    return this.post(this.baseUrl + `articles/${articleId}/comments/create/`, {
      body: body
    })
  }

  login(username: any, password: any): Promise<IAuthResponse>{
    return this.post( this.baseUrl + 'login/', {
      username: username,
      password: password
    })
  }

  register(username: any, password: any, email: any): Promise<IUser>{
    return this.post(  this.baseUrl + 'register/', {
      username: username,
      password: password,
      email: email
    })
  }
  
  logout(): Promise<any> {
    return this.post(this.baseUrl + 'logout/', {});
  }

  getArticles(): Promise<IArticle[]>{
    return this.get(this.baseUrl + 'articles/', {});
  }

  getArticle(): Promise<IArticle>{
    return this.get(`http://localhost:8000/api/articles/1/`, {});
  }

  putLike(){
    return this.post(`http://localhost:8000/api/articles/1/likes/`, {})
  }
}
