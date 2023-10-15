import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service'; // Import your service
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Team Member'], // Default role
    });
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.registrationService.registerUser(formData).subscribe(
        (response) => {

          alert("User Registered");
    },
    (error) => {
      // Handle errors, e.g., show an error message
      alert(JSON.stringify(error, null, 2));
    }
      );
  }
}


}
