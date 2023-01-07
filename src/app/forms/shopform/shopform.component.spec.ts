import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopformComponent } from './shopform.component';

describe('ShopformComponent', () => {
  let component: ShopformComponent;
  let fixture: ComponentFixture<ShopformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
