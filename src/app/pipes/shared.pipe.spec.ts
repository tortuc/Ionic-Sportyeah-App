import { SharedPipe } from './shared.pipe';

describe('SharedPipe', () => {
  it('create an instance', () => {
    const pipe = new SharedPipe();
    expect(pipe).toBeTruthy();
  });
});
