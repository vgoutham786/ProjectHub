import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {
    private apiUrl = 'http://localhost:3000/auth'; // Replace with your backend API URL

    constructor(private http: HttpClient) { }

    registerUser(user: any) {
        // Send an HTTP POST request with the user data to your backend.
        return this.http.post(`${this.apiUrl}/register`, user);
    }
}
