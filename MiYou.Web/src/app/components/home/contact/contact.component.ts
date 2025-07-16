import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact/contact.service';
import { CreateContactRequest } from '../../../models/contact/create/create-contact-request.model';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { getErrorMessage } from '../../../utilities/error/error.utilities';
import { onAnimationCreated, getAnimation } from '../../../utilities/animations/animation.utilities';
import { animationTypes } from '../../../utilities/enums/animationTypes.enum';

@Component({
  selector: 'contact-component',
  templateUrl: 'contact.component.html',
  styleUrl: 'contact.component.scss',
  imports: [ReactiveFormsModule, LottieComponent]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  isSuccess: boolean | undefined = undefined;
  isProcessing: boolean = false;
  errorMessage: string = '';

  handleAnimationCreated = onAnimationCreated;
  getErrorMessage = getErrorMessage;

  successAnimation: AnimationOptions;
  loadingAnimation: AnimationOptions;
  errorAnimation: AnimationOptions;

  constructor(
    private fb: FormBuilder,
    private readonly contactService: ContactService
  ) 
  {
    this.successAnimation = {
      path: 'assets/animations/email_sent.json',
      loop: true,
      autoplay: true,
    };
    this.successAnimation = getAnimation(animationTypes.contactSend, true, true);
    this.loadingAnimation = getAnimation(animationTypes.loading, true, true);
    this.errorAnimation = getAnimation(animationTypes.error, false, true);
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      companyName: ['', [Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      idea: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      additionalInfo: ['', [Validators.maxLength(1000)]]
    });
  }

  async sendContact() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    setTimeout(() => { // kleine timeout. geef Lottie de tijd om shit goed in te stellen in de DOM
      this.isProcessing = true;
    }, 50);

    const request: CreateContactRequest = {
      ...this.contactForm.value // 3 puntjes betekenen eig pak gwn alle values van contctForm en zet ze in request
    };

    try {
      await this.contactService.create(request);
      this.isSuccess = true;
      this.contactForm.reset();
    } catch (error) {
      this.isSuccess = false;
      this.errorMessage = getErrorMessage(error);
    }

    this.isProcessing = false;
  }

  resetForm() {
    this.isSuccess = undefined;
  }
}