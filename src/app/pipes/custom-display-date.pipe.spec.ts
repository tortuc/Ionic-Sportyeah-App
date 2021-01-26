import { CustomDisplayDatePipe } from './custom-display-date.pipe';

describe('CustomDisplayDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDisplayDatePipe();
    expect(pipe).toBeTruthy();
  });
});
