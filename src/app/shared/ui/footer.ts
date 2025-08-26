import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-white/10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-neutral-400 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center sm:justify-between">
        <span>© {{year}} Emilio — Portfolio</span>
        <div class="flex gap-4">
          <a href="https://github.com/emiliosanchez99" target="_blank" class="hover:text-white">GitHub</a>
          <a href="https://www.linkedin.com/in/emiliosanchezdev" target="_blank" class="hover:text-white">LinkedIn</a>
          <a href="/assets/cv.pdf" target="_blank" class="hover:text-white">CV</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear();
}
