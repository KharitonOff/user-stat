import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import '!style!css!sass!../assets/styles/styles.scss';

platformBrowserDynamic().bootstrapModule(AppModule);
