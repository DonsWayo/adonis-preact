declare module '@ioc:Preact' {
  import { ApplicationContract } from '@ioc:Adonis/Core/Application';
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
  import { RequestContract } from '@ioc:Adonis/Core/Request';
  import { RouterContract } from '@ioc:Adonis/Core/Route';

  export interface AdonisContextContract {
    app: ApplicationContract;
    ctx: HttpContextContract;
    request: RequestContract;
    params: HttpContextContract['params'];
    route: HttpContextContract['route'];
    makeUrl: RouterContract['makeUrl'];
    makeSignedUrl: RouterContract['makeSignedUrl'];
  }

  export function useAdonisContext(): AdonisContextContract;
}
declare module '@ioc:Adonis/Core/HttpContext' {
  import { ComponentType } from 'preact';

  interface HttpContextContract {
    preact: {
      share(obj: Record<string, unknown>): void;
      render<T>(
        Component: ComponentType<T>,
        props?: any,
      ): string;
    };
  }
}
