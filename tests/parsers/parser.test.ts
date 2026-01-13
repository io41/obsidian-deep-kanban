import { indentNewLines, replaceBrs } from '../../src/parsers/helpers/parser';

const setUseTab = (value: boolean) => {
  (window as any).app = {
    vault: {
      getConfig: jest.fn().mockReturnValue(value),
    },
  };
};

describe('parser helpers', () => {
  beforeEach(() => {
    setUseTab(false);
  });

  it('replaces <br> outside tables and code blocks', () => {
    const input = [
      'Line one<br>Line two',
      '| Col | Col2 |',
      '| --- | --- |',
      '| a<br>b | c |',
      '```',
      'code<br>',
      '```',
    ].join('\n');

    const output = replaceBrs(input);

    expect(output).toBe(
      [
        'Line one',
        'Line two',
        '| Col | Col2 |',
        '| --- | --- |',
        '| a<br>b | c |',
        '```',
        'code<br>',
        '```',
      ].join('\n')
    );
  });

  it('indents multiline content with spaces', () => {
    setUseTab(false);

    const input = ['Line one', '    - item', '    continuation'].join('\n');
    const output = indentNewLines(input);

    expect(output).toBe(['Line one', '    - item', '        continuation'].join('\n'));
  });

  it('indents multiline content with tabs when configured', () => {
    setUseTab(true);

    const input = ['Line one', '- item'].join('\n');
    const output = indentNewLines(input);

    expect(output).toBe(['Line one', '\t- item'].join('\n'));
  });
});
