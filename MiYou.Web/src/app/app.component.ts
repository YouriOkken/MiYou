import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CookieConsentComponent } from "./components/cookies/popup/cookie-consent.component";

declare const particlesJS: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 120,
            density: { enable: true, value_area: 900 }
          },
          color: {
            value: ['#ffffff']
          },
          shape: {
            type: ['circle'],
            polygon: { nb_sides: 5 }
          },
          opacity: {
            value: 0.7,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.3,
              sync: false
            }
          },
          size: {
            value: 2.5,
            random: true,
            anim: {
              enable: true,
              speed: 3,
              size_min: 1,
              sync: false
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'right',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false,
              mode: 'attract'
            },
            onclick: {
              enable: true,
              mode: 'push'
            }
          },
          modes: {
            grab: {
              distance: 180,
              line_linked: { opacity: 0.6 }
            },
            bubble: {
              distance: 250,
              size: 8,
              duration: 2,
              opacity: 0.9,
              speed: 3
            },
            repulse: {
              distance: 100,
              duration: 0.4
            },
            attract: {
              distance: 100,
              duration: 0.4
            },
            slow: {
              radius: 100,
              factor: 3
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }

  getErrorMessage(error: any): string {
    if (!error?.error?.message) {
        return "Er ging iets fout!";
    }

    if (error.error.message === "failed to fetch") {
        return "Op dit moment kan er geen verbinding gemaakt worden met ons systeem.";
    }

    return error.error.message;
  }
}