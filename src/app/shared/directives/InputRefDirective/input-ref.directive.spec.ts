import { InputRefDirective } from './input-ref.directive';
import { NgControl } from '@angular/forms';

describe('InputRefDirective', () => {
  it('should create an instance', () => {
    // Create a mock NgControl instance
    const mockNgControl: NgControl = {} as NgControl;

    // Pass the mockNgControl as an argument during the directive instantiation
    const directive = new InputRefDirective(mockNgControl);

    expect(directive).toBeTruthy();
  });
});
