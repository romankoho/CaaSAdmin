import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStatisticsComponent } from './cart-statistics.component';

describe('CartStatisticsComponent', () => {
  let component: CartStatisticsComponent;
  let fixture: ComponentFixture<CartStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
