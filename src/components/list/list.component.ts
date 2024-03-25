import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProductsService } from '../../services/products/products.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { AuthService } from '../../services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content.component';

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})

export class ListComponent {
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private modalService: NgbModal
    ) { }

  category: string = ''
  categories: string[] = [];
  limit = 20;
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'button'];

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.productsService.getProducts(this.category, this.limit).subscribe({
      next: (products: any) => {
        this.products = products
      }
    })
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe({
      next: (categories: any) => this.categories = categories
    })
  }

  handleChangeCategory(event: Event){
    const { value } = event.target as HTMLInputElement;
    this.category = value;
    this.getProducts();
  }

  handleChangeLimit(event: Event){
    const { value } = event.target as HTMLInputElement;
    this.limit = Number(value);
    this.getProducts();
  }

  handleLogout(){
    this.authService.logoutUser();
  }

  openModal(product: Product) {
    const { title, image, description, price, category } = product;
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.imageUrl = image;
    modalRef.componentInstance.description = description;
    modalRef.componentInstance.price = price;
    modalRef.componentInstance.category = category;
  }

}