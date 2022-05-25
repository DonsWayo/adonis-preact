import { ApplicationContract } from '@ioc:Adonis/Core/Application';

import { preparePreact } from '../src/Preact';
import { useAdonisContext } from '../src/adonisContext';

export default class PreactProvider {
  public static needsApplication = true;
  public constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Preact', () => {
      return {
        useAdonisContext,
      };
    });
  }

  public boot() {
    this.app.container.withBindings(
      [
        'Adonis/Core/HttpContext',
        'Adonis/Core/Application',
        'Adonis/Core/Route',
      ],
      (HttpContext, app, Route) => {
        HttpContext.getter(
          'preact',
          function () {
            return preparePreact(this, app, Route);
          },
          true,
        );
      },
    );
  }
}
