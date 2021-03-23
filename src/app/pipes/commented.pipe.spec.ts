import { CommentedPipe } from './commented.pipe';

describe('CommentedPipe', () => {
  it('create an instance', () => {
    const pipe = new CommentedPipe();
    expect(pipe).toBeTruthy();
  });
});
