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
  let cardList: Card;
  
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

  it('should get all the card details', async() => {
    component.getCardDetails();
    let instance: boolean = true;
    spyOn(toDoService, 'getCardData').and.callThrough();
    await toDoService.getCardData().then(data => {
      cardList = data.userData;
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
  });

  it('should create a card using API call', async() => {
    let card: Card = {
      name: 'testing card',
      surname: 'test',
      description: 'testing description'
    }
    // component.onSubmit(card);
    spyOn(toDoService, 'createCardData').and.callThrough();
    await toDoService.createCardData(card).then(async(data) => {
      await toDoService.deleteCardData(data.userData._id);
      expect(data.success).toBeTruthy();
    })
  });

  it('should call onSubmit function', async() => {
    let createServiceStub = {success: true, userData: {_id: '', name: '', surname :'', description: ''} as Card ,message: 'Card details fetched successfully'};
    let card: Card = {
      name: 'testing card',
      surname: 'test',
      description: 'testing description'
    }

    
    spyOn(toDoService, 'createCardData').and.returnValue(
      new Promise((resolve,reject) => {
        resolve(createServiceStub)
      })
    );
    component.onSubmit(card);
    await toDoService.createCardData(card).then(data => {
      expect(data.success).toBeTruthy();
    })
  })

  it('should delete the card using API call', async() => {
    let card: Card = {
      _id: '60dc59d718647a15b8d453f3',
      name: 'testing card',
      surname: 'test',
      description: 'testing description'
    }
   await toDoService.getCardData().then(data => {
      cardList = data.userData;
    });

    // component.deleteCard(card);
    spyOn(toDoService, 'deleteCardData').and.callThrough();
    await toDoService.deleteCardData(card._id).then(data => {
      expect(data.success).toBeTruthy();
    })
  });

  it('should call the delete function', async() => {
    let deleteServiceStub = {success: true,message: 'Card deleted successfully'};
    let card: Card = {
      name: 'testing card',
      surname: 'test',
      description: 'testing description'
    };

    spyOn(toDoService, 'deleteCardData').and.returnValue(
      new Promise((resolve,reject) => {
        resolve(deleteServiceStub)
      })
    );
    component.deleteCard(card);
    await toDoService.deleteCardData(card._id).then(data => {
      expect(data.success).toBeTruthy();
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