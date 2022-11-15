import { newE2EPage } from '@stencil/core/testing';

describe('yeti-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<yeti-input></yeti-input>');

    const element = await page.find('yeti-input');
    expect(element).toHaveClass('hydrated');
  });
});
