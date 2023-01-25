import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Item from 'src/app/models/item';
import { Service } from 'src/app/services/service';
import { ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from 'src/app/models/user';
import ItemRequest from 'src/app/models/itemRequest';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  @ViewChild('closebutton') closebutton: ElementRef<HTMLElement> | undefined;
  public items: Item[] = [];

  constructor(
    public service: Service,
    private fb: FormBuilder,
    private meta: Meta
  ) {
    this.meta.addTag({
      name: 'An overview of all items with their name, descripion, price and owner',
      title: 'Putrid Grove | Items',
    });
  }

  itemForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{1,3}([.][0-9]{1,2})?$')],
    ],
    isShared: [false],
  });

  onSubmit(): void {
    this.handleAddItem();
  }

  handleAddItem() {
    this.logValidationErrors();

    if (this.itemForm.valid) {
      const name = !!this.itemForm.value.name ? this.itemForm.value.name! : '';
      const description = !!this.itemForm.value.description
        ? this.itemForm.value.description!
        : '';
      const price = !!this.itemForm.value.price
        ? +this.itemForm.value.price!
        : 0;
      const isShared = !!this.itemForm.value.isShared
        ? this.itemForm.value.isShared!
        : false;
      const isPayedOff = false;
      const iconPath = 'default';
      const payedById = '00000000-0000-0000-0000-000000000001';

      let item = new ItemRequest(
        name,
        description,
        price,
        iconPath,
        isShared,
        isPayedOff,
        payedById
      );

      this.service.addItem(item).subscribe({
        next: () => {
          this.closebutton!.nativeElement.click();
          this.itemForm.reset();
          this.ngOnInit();
        },
      });
    }
  }

  logValidationErrors(group: FormGroup = this.itemForm): void {
    // get all root keys
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        // @ts-ignore
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          // @ts-ignore
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              // @ts-ignore
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  validationMessages = {
    name: {
      required: "Name can't be empty",
      minlength: 'That name is too short',
    },
    description: {
      required: "Description can't be empty",
      minlength: 'The provided description is too short',
    },
    price: {
      required: "Price can't be empty",
      pattern: "That's not a correct price format",
    },
  };
  formErrors = {
    name: '',
    description: '',
    price: '',
  };

  ngOnInit(): void {
    this.items = [];

    this.service.loadItems().subscribe({
      next: (res) => {
        res.forEach((c: any, index: number) => {
          if (index !== 0) {
            this.items.push(c);
          }
        });
      },
    });
  }
}
