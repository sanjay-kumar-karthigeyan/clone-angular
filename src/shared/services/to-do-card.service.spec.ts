import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { Card } from '../interface/card';

import { ToDoCardService } from './to-do-card.service';
import { map } from 'rxjs/operators';

describe('ToDoCardService', () => {
  let service: ToDoCardService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let baseUrl = "api/card";
  let mockCardData:Card = {_id: '', name: '', surname: '', description: ''}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToDoCardService
      ]
    });
    service = TestBed.inject(ToDoCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
