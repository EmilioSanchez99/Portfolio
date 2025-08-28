import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgOptimizedImage],
  template: `
    <section>
  <h2 class="text-3xl font-bold mb-6">Contacto</h2>

  <div class="grid gap-8 lg:grid-cols-3 items-start">
    <!-- Columna izquierda: Formulario (2/3) -->
    <div class="lg:col-span-2">
      <div class="rounded-2xl border border-white/10 p-6 max-w-3xl">
        <form [formGroup]="form" (ngSubmit)="onSubmit($event)" #formRef>
          <div class="grid gap-4">
            <div>
              <label class="block text-sm mb-1" for="from_name">Nombre</label>
              <input id="from_name" formControlName="from_name" name="from_name" type="text" placeholder="Tu nombre"
                     class="w-full px-4 py-3 rounded-2xl bg-neutral-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <p *ngIf="form.get('from_name')?.touched && form.get('from_name')?.invalid"
                 class="text-xs text-red-400 mt-1">El nombre es obligatorio.</p>
            </div>

            <div>
              <label class="block text-sm mb-1" for="from_email">Email</label>
              <input id="from_email" formControlName="from_email" name="from_email" type="email" placeholder="tucorreo@dominio.com"
                     class="w-full px-4 py-3 rounded-2xl bg-neutral-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <p *ngIf="form.get('from_email')?.touched && form.get('from_email')?.invalid"
                 class="text-xs text-red-400 mt-1">Introduce un email válido.</p>
            </div>

            <div>
              <label class="block text-sm mb-1" for="message">Mensaje</label>
              <textarea id="message" formControlName="message" name="message" rows="5" placeholder="¿En qué puedo ayudarte?"
                        class="w-full px-4 py-3 rounded-2xl bg-neutral-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"></textarea>
              <p *ngIf="form.get('message')?.touched && form.get('message')?.invalid"
                 class="text-xs text-red-400 mt-1">Escribe al menos 10 caracteres.</p>
            </div>

            <button type="submit"
                    [disabled]="form.invalid || loading()"
                    class="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90 disabled:opacity-50">
              {{ loading() ? 'Enviando…' : 'Enviar' }}
            </button>

            <p *ngIf="success()" class="text-sm text-green-400">
              ¡Gracias! Tu mensaje ha sido enviado correctamente.
            </p>
            <p *ngIf="error()" class="text-sm text-red-400">
              Vaya, no se pudo enviar. Inténtalo de nuevo en unos minutos.
            </p>
          </div>
        </form>
      </div>
    </div>

    <!-- Columna derecha: RRSS (1/3) -->
    <aside class="space-y-8 self-start">
      <a href="https://www.linkedin.com/in/emiliosanchezdev" target="_blank" rel="noopener noreferrer"
         class="w-full flex items-center gap-6 rounded-2xl border border-white/10 p-8 hover:border-white/30 transition bg-neutral-900/50 shadow-md">
        <img ngSrc="assets/icons/linkedin.png" width="48" height="48" alt="LinkedIn" class="w-12 h-12 shrink-0" />
        <div>
          <div class="font-semibold text-xl">LinkedIn</div>
          <div class="text-base text-neutral-400">linkedin.com/in/emiliosanchezdev</div>
        </div>
      </a>

      <a href="https://github.com/emiliosanchez99" target="_blank" rel="noopener noreferrer"
         class="w-full flex items-center gap-6 rounded-2xl border border-white/10 p-8 hover:border-white/30 transition bg-neutral-900/50 shadow-md">
        <img ngSrc="assets/icons/github.png" width="48" height="48" alt="GitHub" class="w-12 h-12 shrink-0" />
        <div>
          <div class="font-semibold text-xl">GitHub</div>
          <div class="text-base text-neutral-400">github.com/emiliosanchez99</div>
        </div>
      </a>

      <a href="mailto:emiliosanvar99@gmail.com"
         class="w-full flex items-center gap-6 rounded-2xl border border-white/10 p-8 hover:border-white/30 transition bg-neutral-900/50 shadow-md">
        <img ngSrc="assets/icons/email.png" width="48" height="48" alt="Email" class="w-12 h-12 shrink-0" />
        <div>
          <div class="font-semibold text-xl">Email</div>
          <div class="text-base text-neutral-400">emiliosanvar99@gmail.com</div>
        </div>
      </a>
    </aside>
  </div>
</section>

  `
})
export class ContactComponent {
  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

  loading = signal(false);
  success = signal(false);
  error   = signal(false);

  form!: FormGroup;

  // tu Formspree ID (con /f/)
  private FSP_FORM_ID = 'f/movnqjda';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      from_name:  ['', [Validators.required, Validators.minLength(2)]],
      from_email: ['', [Validators.required, Validators.email]],
      message:    ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async onSubmit(ev: Event) {
    ev.preventDefault();
    this.success.set(false);
    this.error.set(false);

    if (this.form.invalid || !this.formRef?.nativeElement) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    try {
      const formData = new FormData(this.formRef.nativeElement);
      const res = await fetch(`https://formspree.io/${this.FSP_FORM_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (!res.ok) throw new Error('Formspree error');
      this.success.set(true);
      this.form.reset();
    } catch (e) {
      console.error(e);
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }
}
