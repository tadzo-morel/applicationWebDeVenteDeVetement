import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, switchMap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddressInfo, LatLng } from '../models/location.models';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  private http = inject(HttpClient);
  private cache = new Map<string, AddressInfo>();

  detectUserLocation(): Observable<AddressInfo | null> {
    return this.getCurrentPosition().pipe(
      switchMap(pos => this.reverseGeocode(pos.lat, pos.lng).pipe(
        map(info => ({ ...info, latLng: pos }))
      )),
      catchError(() => this.getLocationByIp().pipe(
        catchError(() => of(null))
      ))
    );
  }

  getCurrentPosition(): Observable<LatLng> {
    return new Observable<LatLng>(observer => {
      if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
        observer.error(new Error('Geolocation non supportee'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => {
          observer.next({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          observer.complete();
        },
        err => observer.error(err),
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
      );
    });
  }

  reverseGeocode(lat: number, lng: number): Observable<AddressInfo> {
    const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const url = `${environment.geolocation.nominatimBaseUrl}/reverse`;
    const params = {
      format: 'json',
      lat: String(lat),
      lon: String(lng),
      'accept-language': 'fr',
      zoom: '14'
    };
    const headers = new HttpHeaders({
      'User-Agent': environment.geolocation.nominatimUserAgent
    });

    return this.http.get<NominatimResponse>(url, { params, headers }).pipe(
      map(res => this.parseNominatim(res, { lat, lng })),
      map(info => {
        this.cache.set(cacheKey, info);
        return info;
      })
    );
  }

  getLocationByIp(): Observable<AddressInfo> {
    return this.http.get<GeoJsResponse>(environment.geolocation.ipFallbackUrl).pipe(
      map(res => ({
        country: res.country,
        region: res.region,
        city: res.city,
        latLng: res.latitude && res.longitude
          ? { lat: parseFloat(res.latitude), lng: parseFloat(res.longitude) }
          : undefined
      }))
    );
  }

  distanceBetween(p1: LatLng, p2: LatLng): number {
    const R = 6371;
    const dLat = this.toRad(p2.lat - p1.lat);
    const dLng = this.toRad(p2.lng - p1.lng);
    const a = Math.sin(dLat / 2) ** 2
      + Math.cos(this.toRad(p1.lat)) * Math.cos(this.toRad(p2.lat))
      * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private parseNominatim(res: NominatimResponse, latLng: LatLng): AddressInfo {
    const a = res?.address ?? {};
    return {
      country: a.country,
      region: a.state ?? a.region,
      city: a.city ?? a.town ?? a.village ?? a.county,
      neighborhood: a.suburb ?? a.neighbourhood ?? a.quarter,
      latLng
    };
  }
}

interface NominatimResponse {
  address?: {
    country?: string;
    state?: string;
    region?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    suburb?: string;
    neighbourhood?: string;
    quarter?: string;
  };
}

interface GeoJsResponse {
  country?: string;
  region?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
}
