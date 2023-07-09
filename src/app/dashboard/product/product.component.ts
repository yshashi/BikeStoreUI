import { CategoryService } from 'src/app/service/category.service';
import { BrandService } from 'src/app/service/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  filteredproducts: any[] = [];
  filterBrand = '';
  filterCategory = '';
  filterModelYear = '';
  isEditMode = false;

  brands: any[] = [];
  categories: any[] = [];
  productIdToUpdate: number = 0;

  productForm!: FormGroup;
  constructor(private fb: FormBuilder,private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private toast: NgToastService) { }
  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      modelYear: ['', Validators.required],
      listPrice: ['', Validators.required],
    })
    this.columns = [
      { key: 'productId', title: 'Product ID' },
      { key: 'productName', title: 'Product Name', width:'30%' },
      { key: 'brand.brandName', title: 'Brand' },
      { key: 'category.categoryName', title: 'Category' },
      { key: 'modelYear', title: 'Model Year' },
      { key: 'listPrice', title: 'Price' },
      { key: 'action', title: 'Action' }

    ];
    this.getAllProduct();
    this.getAllBrands();
    this.getAllCategory();

  }

  getAllBrands(){
    this.brandService.getAll()
    .subscribe(res=>{
      this.brands = res;
    })
  }

  getAllCategory() {
    this.categoryService.getAll()
      .subscribe(res => {
        this.categories = res;
      })
  }

  getAllProduct() {
    this.productService.getAll()
      .subscribe({
        next: (res) => {
          this.products = res;

          this.data = this.products;
          this.filteredproducts = this.products;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  searchCategory(city: string) {
    this.productService.getByCategory(city)
      .subscribe(res => {
        this.filteredproducts = res;
        this.data = this.filteredproducts;
      })
  }

  searchBrand(zipCode: string) {
    this.productService.getByBrand(zipCode)
      .subscribe(res => {
        this.filteredproducts = res;
        this.data = this.filteredproducts;
      })
  }

  searchModelYear(year: string) {
    this.productService.getByModelYear(year)
      .subscribe(res => {
        this.filteredproducts = res;
        this.data = this.filteredproducts;
      })
  }

  onAdd(){
    this.productForm.reset();
    this.isEditMode = false;
  }

  addProduct() {
    console.log(this.productForm.value);
    this.productService.createProduct(this.productForm.value)
      .subscribe(res => {
        console.log(res);
        this.toast.success({ summary: "Product Added Successfully", detail: "SUCCESS", duration: 2000 });
        this.productForm.reset();
        this.getAllProduct();
        document.getElementById("btn-close")?.click();
      })
  }

  onEdit(row: any) {
    this.isEditMode = true;
    this.productIdToUpdate = row.productId;
    this.productForm.setValue({
      productName: row.productName,
      brandId: row.brandId,
      categoryId: row.categoryId,
      modelYear: row.modelYear,
      listPrice: row.listPrice,
    })

  }

  updateProduct() {
    let productObj = {
      productId: this.productIdToUpdate,
      ...this.productForm.value
    }
    this.productService.updateProduct(productObj)
      .subscribe(res => {
        console.log(res);
        this.isEditMode = false;
        this.toast.success({ summary: "Product Updated Successfully!", detail: "SUCCESS", duration: 2000 });
        this.productForm.reset();
        this.getAllProduct();
        document.getElementById("btn-close")?.click();
      })
  }

  close() {
    this.isEditMode = false;
  }

}
