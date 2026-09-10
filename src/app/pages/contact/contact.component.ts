import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  email = 'gananathansaminathan@example.com';
  whatsappNumber = '+91 7826957799';
  // Digits only, with country code, for the wa.me deep link
  whatsappDigits = '917826957799';
  phone = '+91 7826957799';
  location = 'Bengaluru, Karnataka, India';

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get whatsappLink(): string {
    return `https://wa.me/${this.whatsappDigits}`;
  }

  get mailtoLink(): string {
    return `mailto:${this.email}`;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Wire this up to an email service (e.g. EmailJS, Formspree, or your
    // own backend endpoint) — this demo just confirms locally.
    this.snackBar.open('Message captured. Connect a backend to send it for real.', 'Dismiss', {
      duration: 4000
    });
    this.form.reset();
    this.submitted = false;
  }
}
