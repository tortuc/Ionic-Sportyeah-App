import { MentionsPipe } from './mentions.pipe';

describe('MentionsPipe', () => {
  it('create an instance', () => {
    const pipe = new MentionsPipe();
    expect(pipe).toBeTruthy();
  });
});
