import { newSpecPage } from '@stencil/core/testing';
import { YetiInput } from '../yeti-input';

describe('yeti-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [YetiInput],
      html: `<yeti-input></yeti-input>`,
    });
    expect(page.root).toEqualHtml(`
      <yeti-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </yeti-input>
    `);
  });
});
