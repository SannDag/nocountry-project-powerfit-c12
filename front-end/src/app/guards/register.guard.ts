import { CanActivateFn, Router } from '@angular/router';
import { TokenStoreService } from '../services/token-store.service';

export const registerGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const tokenStore = new TokenStoreService();
  if(tokenStore.isLoggued()){
     //alert('Ya estás logueado. No puedes acceder a la página de registro.');
     router.navigate(['/home']);
     return false; // No permitir el acceso a la página de registro
  }
  return true;
};
