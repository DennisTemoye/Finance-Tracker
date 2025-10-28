import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitAccount } from './debit-account';

describe('DebitAccount', () => {
  let component: DebitAccount;
  let fixture: ComponentFixture<DebitAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
