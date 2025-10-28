import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAccount } from './credit-account';

describe('CreditAccount', () => {
  let component: CreditAccount;
  let fixture: ComponentFixture<CreditAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
