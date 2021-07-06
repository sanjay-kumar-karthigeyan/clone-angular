import { Component, OnInit } from '@angular/core';
import { Card } from '../../shared/interface/card';

import { ToDoCardService } from 'src/shared/services/to-do-card.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do-card',
  templateUrl: './to-do-card.component.html',
  styleUrls: ['./to-do-card.component.scss'],
})
export class ToDoCardComponent implements OnInit {
  public cardList: Card[];
  public cardForm: FormGroup;

  constructor(public todoservice: ToDoCardService, private fb: FormBuilder) {
    // this.todoservice.getCardData().then((data) => {
    //   console.log('card data from DB', data);
    //   this.cardList = data.userData;
    // });
    this.getCardDetails();

    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      description: ['', Validators.required],
    });

    // this.cardList = [
    //   {
    //     name: 'Jack',
    //     surname: 'Sparrow',
    //     description: 'My black perl',
    //   },
    //   {
    //     name: 'Jack1',
    //     surname: 'Sparrow',
    //     description: 'My black perl',
    //   },
    // ];
  }

  onSubmit(data: Card) {
    console.log('new todo-card', data);
    this.todoservice.createCardData(data).then((success) => {
      console.log('card data from DB', success);
      this.cardList.push(success.userData);
    });
  }

  async getCardDetails() {
    await this.todoservice.getCardData().then((data) => {
      console.log('card data from DB', data);
      this.cardList = data.userData;
    });
  }

  deleteCard(data: Card) {
    console.log('delete todo-card', data._id);
    this.todoservice.deleteCardData(data._id).then((success) => {
      console.log('card data from DB', success);
      this.cardList.splice(this.cardList.indexOf(data), 1);
    });
  }

  ngOnInit(): void {}
}
