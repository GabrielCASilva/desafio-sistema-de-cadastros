import { AppController } from '../src/controllers/app.controller';
import { Test, TestSuite } from 'xunit.ts';

export default class AppControllerTests extends TestSuite {
  private controller: AppController;

  constructor() {
    super();
    this.controller = new AppController();
  }

  @Test()
  async shouldReturnBemVindo() {
    const result = this.controller.getHello();
    this.assert.equal('Bem-vindo à API!', result);
  }
}
