import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Card } from 'src/shared/interface/card';
import { ToDoCardService } from 'src/shared/services/to-do-card.service';

import { ToDoCardComponent } from './to-do-card.component';

describe('ToDoCardComponent', () => {
  let component: ToDoCardComponent;
  let fixture: ComponentFixture<ToDoCardComponent>;
  let toDoService: ToDoCardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        // HttpClientTestingModule,
        HttpClientModule
      ],
      declarations: [ ToDoCardComponent ],
      providers: [ ToDoCardService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoCardComponent);
    component = fixture.componentInstance;
    toDoService = TestBed.inject(ToDoCardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all the card details', () => {
    component.getCardDetails();
    let instance: boolean = true;
    spyOn(toDoService, 'getCardData').and.callThrough();
    toDoService.getCardData().then(data => {
      for(let i = 0; i < data.userData.length; i++) {
        if(!instanceOfCard(data.userData[i])) {
          console.log('false')
          instance = false;
        } else {
          console.log('true')
        }
      }
      expect(instance).toBeTruthy();
    })
  })
});

function instanceOfCard(object: Card) {
  let card: Card = {name: 'test', surname:'test', description: 'test'};
  if(typeof(object.name) === typeof(card.name) && typeof(object.surname) === typeof(card.surname) && typeof(object.description) === typeof(card.description)) {
    return true;
  } else {
    return false;
  }
}