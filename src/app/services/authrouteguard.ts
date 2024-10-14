import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { MFAComponent } from "../mfa/mfa.component";
export const RouteGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    // your  logic goes 
    const token = sessionStorage.getItem('authToken')
    const getmfatoken = localStorage.getItem('mfavalid')
    // const mfavalid = localStorage.getItem(JSON.parse('mfavalid'))
    const mfavalid = getmfatoken ? JSON.parse(getmfatoken) : false
    const router = inject(Router);
    if (token) {
        return true
    }
    else {
        router.navigateByUrl('login')
        return false;
    }
}