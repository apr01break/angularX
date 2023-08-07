import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from "../../models/product.model";
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { PaginationService } from '../../services/pagination.service';
import { Router } from '@angular/router';
import { Message } from '../../models/message.model';
import { PaginationPipe } from '../../pipes/pagination.pipe';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  openedDropdown: string | null = null;
  suscription: Subscription = Subscription.EMPTY;
  messageSuscription: Subscription = Subscription.EMPTY;
  currentPage: number = 1;
  numberRecords: number;
  searchText: string;
  pageSize: number = 5;
  message: Message;
  saveInProgress: boolean = false;

  constructor(public productService: ProductService, private paginationService: PaginationService, private router: Router) {
  }

  ngOnInit(): void {
    this.saveInProgress = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.saveInProgress = false;
        this.products = data;
        this.numberRecords = this.products.length;
      },
      error: (error) => {
        this.saveInProgress = false;
        let message: Message = {
          messageType: "error",
          textMessage: "Error al cargar los productos"
        }
        this.showMessage(message);
        console.log(error);
      }
    });
    this.messageSuscription = this.productService.getMessageToShow().subscribe(data => {
      this.showMessage(data);
    })
    this.suscription = this.paginationService.getNumberRecord().subscribe(data => {
      this.currentPage = 1;
      this.numberRecords = data;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  goToPage(currentPage: number, pageSize: number) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }

  toggleDropdown(productId: string) {
    if (this.openedDropdown === productId) {
      this.openedDropdown = null;
    } else {
      this.openedDropdown = productId;
    }
  }

  updateProduct(product: Product) {
    this.productService.updateProductToEdit(product);
    this.router.navigate(['/edit', product.id]);
  }

  deleteProduct(id: string) {
    this.saveInProgress = true;
    this.openedDropdown = null;
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        this.saveInProgress = false;
      },
      error: (error) => {
        let message: Message = {
          messageType: "error",
          textMessage: "Error al eliminar el producto"
        }
        this.showMessage(message);
        this.saveInProgress = false;
        console.log(error);
      }
    });
  }

  showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message = {} as Message;
    }, 2000);
  }

}
