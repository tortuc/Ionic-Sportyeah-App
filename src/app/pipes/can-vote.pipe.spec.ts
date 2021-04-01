import { CanVotePipe } from './can-vote.pipe';

describe('CanVotePipe', () => {
  it('create an instance', () => {
    const pipe = new CanVotePipe();
    expect(pipe).toBeTruthy();
  });
});
