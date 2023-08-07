import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsComponent } from './list-products.component';
import { ProductService } from '../../services/product.service';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { PaginationComponent } from '../pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayComponent } from '../overlay/overlay.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../../models/product.model';
import { Message } from '../../models/message.model';
import { MessageComponent } from '../message/message.component';
import { CreateEditProductComponent } from '../create-edit-product/create-edit-product.component';
import { RouterTestingModule } from '@angular/router/testing';


class RouterStub {
  url = '';
  navigate(commands: any[], extras?: any) { }
}
class ProductTestingService {
  private productToEdit = new BehaviorSubject<Product>({} as any);
  getProducts(): Observable<Product[]> {
    return of([
      { id: 'PM22', name: 'Tarjeta XYS', description: 'XYS description test', logo: 'https://img.freepik.com/vector-gratis/ilustracion-vector-banner-sello-circulo_53876-27183.jpg', date_release: new Date(), date_revision: new Date() },
      { id: 'II88', name: 'Tarjeta XYS', description: 'XYS description test', logo: 'https://img.freepik.com/vector-gratis/ilustracion-vector-banner-sello-circulo_53876-27183.jpg', date_release: new Date(), date_revision: new Date() },
    ]);
  }

  getMessageToShow(): Observable<Message> {
    return of(
      { textMessage: 'success', messageType: 'Guardado correctamente'}
    );
  }

  updateProductToEdit(product: Product) {
    this.productToEdit.next(product);
  }

  getProductToEdit(): Observable<Product> {
    return this.productToEdit.asObservable();
  }

  deleteProduct(id: string): Observable<string> {
    return of("Product successfully removed");
  }
}

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let productSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'edit/:id', component: CreateEditProductComponent}
        ]),
      ],
      declarations: [ListProductsComponent, PaginationPipe, FilterPipe, PaginationComponent, OverlayComponent, MessageComponent],
      providers: [
        { provide: ProductService, useClass: ProductTestingService },
      ]
    });
    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products', () => {
    component.ngOnInit();
    expect(component.products.length).toBe(2);
  });

  it('should get the message', () => {
    component.ngOnInit();
    expect(component.message).toBeTruthy();
  });

  it('should update the product to edit', () => {
    let product: Product = {
      id: 'PM22', name: 'Tarjeta XYS', description: 'XYS description test', logo: 'https://img.freepik.com/vector-gratis/ilustracion-vector-banner-sello-circulo_53876-27183.jpg', date_release: new Date(), date_revision: new Date() 
    };
    component.updateProduct(product);
    component.productService.getProductToEdit().subscribe(data => {
      expect(data).toBe(product);
    })
  });

  it('should delete the product', () => {
    let product: Product = {
      id: 'PM22', name: 'Tarjeta XYS', description: 'XYS description test', logo: 'https://img.freepik.com/vector-gratis/ilustracion-vector-banner-sello-circulo_53876-27183.jpg', date_release: new Date(), date_revision: new Date() 
    };
    component.deleteProduct(product.id);
    component.productService.deleteProduct(product.id).subscribe(data => {
      expect(data).toBe("Product successfully removed");
    })
  });
});
