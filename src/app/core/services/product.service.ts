import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from "../models/product.model";
import { BehaviorSubject, Observable } from "rxjs";
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";
  private header = new HttpHeaders({ 'authorId': '995821478' });
  private productToEdit = new BehaviorSubject<Product>({} as any);
  private messageToShow = new BehaviorSubject<Message>({} as any);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.header });
  }

  validateExistingId(id: string) {
    return this.http.get<boolean>(this.apiUrl + "/verification?id=" + id, { headers: this.header });
  }

  createProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.header });
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(this.apiUrl, product, { headers: this.header });
  }

  deleteProduct(id: string) {
    return this.http.delete<string>(this.apiUrl + "?id=" + id, { headers: this.header });
  }

  updateMessage(message: Message) {
    this.messageToShow.next(message);
  }

  getMessageToShow(): Observable<Message> {
    return this.messageToShow.asObservable();
  }

  updateProductToEdit(product: Product) {
    this.productToEdit.next(product);
  }

  getProductToEdit(): Observable<Product> {
    return this.productToEdit.asObservable();
  }
}
