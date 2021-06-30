import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ToDoCardService } from './to-do-card.service';

describe('ToDoCardService', () => {
  let service: ToDoCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ToDoCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
