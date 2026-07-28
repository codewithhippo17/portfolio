#!/bin/bash

# Industrial Copilot
cat << 'SVG' > content/attachments/copilot-thumb.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#a6da95" stop-opacity="0.15" /><stop offset="100%" stop-color="#eed49f" stop-opacity="0.05" /></linearGradient></defs>
  <rect width="400" height="400" fill="#24273a" />
  <circle cx="200" cy="200" r="150" fill="url(#g1)" filter="blur(40px)" />
  <rect x="40" y="80" width="320" height="240" rx="12" fill="#181926" stroke="#5b6078" stroke-width="2" />
  <circle cx="65" cy="105" r="6" fill="#ed8796" /><circle cx="85" cy="105" r="6" fill="#eed49f" /><circle cx="105" cy="105" r="6" fill="#a6da95" />
  <text x="65" y="160" font-family="monospace" font-size="16" fill="#c6a0f6">import</text>
  <text x="135" y="160" font-family="monospace" font-size="16" fill="#cad3f5">torch</text>
  <text x="65" y="190" font-family="monospace" font-size="16" fill="#8aadf4">model</text>
  <text x="125" y="190" font-family="monospace" font-size="16" fill="#cad3f5">= Copilot(layers=</text>
  <text x="295" y="190" font-family="monospace" font-size="16" fill="#f5a97f">128</text>
  <text x="325" y="190" font-family="monospace" font-size="16" fill="#cad3f5">)</text>
  <text x="65" y="220" font-family="monospace" font-size="16" fill="#cad3f5">model.train(epochs=</text>
  <text x="255" y="220" font-family="monospace" font-size="16" fill="#f5a97f">1000</text>
  <text x="295" y="220" font-family="monospace" font-size="16" fill="#cad3f5">)</text>
  <text x="65" y="260" font-family="monospace" font-size="14" fill="#a6da95">> Loss: 0.0012 ... Converged.</text>
</svg>
SVG
sed -i 's/^status:.*/status: "completed"\nthumbnail: "copilot-thumb.svg"/' content/projects/ai-ml/industrial-copilot.md

# Inception
cat << 'SVG' > content/attachments/inception-thumb.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8aadf4" stop-opacity="0.15" /><stop offset="100%" stop-color="#8bd5ca" stop-opacity="0.05" /></linearGradient></defs>
  <rect width="400" height="400" fill="#24273a" />
  <circle cx="200" cy="200" r="150" fill="url(#g2)" filter="blur(40px)" />
  <rect x="40" y="80" width="320" height="240" rx="12" fill="#181926" stroke="#5b6078" stroke-width="2" />
  <circle cx="65" cy="105" r="6" fill="#ed8796" /><circle cx="85" cy="105" r="6" fill="#eed49f" /><circle cx="105" cy="105" r="6" fill="#a6da95" />
  <text x="65" y="160" font-family="monospace" font-size="16" fill="#8aadf4" font-weight="bold">~/inception$</text>
  <text x="200" y="160" font-family="monospace" font-size="16" fill="#cad3f5">docker-compose up -d</text>
  <text x="65" y="195" font-family="monospace" font-size="14" fill="#8bd5ca">Creating network "inception_net"</text>
  <text x="65" y="220" font-family="monospace" font-size="14" fill="#cad3f5">Creating mariadb ... </text>
  <text x="260" y="220" font-family="monospace" font-size="14" fill="#a6da95">done</text>
  <text x="65" y="245" font-family="monospace" font-size="14" fill="#cad3f5">Creating wordpress ... </text>
  <text x="280" y="245" font-family="monospace" font-size="14" fill="#a6da95">done</text>
  <text x="65" y="270" font-family="monospace" font-size="14" fill="#cad3f5">Creating nginx ... </text>
  <text x="240" y="270" font-family="monospace" font-size="14" fill="#a6da95">done</text>
</svg>
SVG
sed -i 's/^status:.*/status: "completed"\nthumbnail: "inception-thumb.svg"/' content/projects/devops/inception.md

# Cube3D
cat << 'SVG' > content/attachments/cube3d-thumb.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ed8796" stop-opacity="0.15" /><stop offset="100%" stop-color="#f5a97f" stop-opacity="0.05" /></linearGradient></defs>
  <rect width="400" height="400" fill="#24273a" />
  <circle cx="200" cy="200" r="150" fill="url(#g3)" filter="blur(40px)" />
  <rect x="40" y="80" width="320" height="240" rx="12" fill="#181926" stroke="#5b6078" stroke-width="2" />
  <circle cx="65" cy="105" r="6" fill="#ed8796" /><circle cx="85" cy="105" r="6" fill="#eed49f" /><circle cx="105" cy="105" r="6" fill="#a6da95" />
  <path d="M 280 140 L 280 260 L 250 220 L 250 180 Z" fill="#ed8796" opacity="0.6"/>
  <path d="M 250 180 L 250 220 L 190 230 L 190 170 Z" fill="#c6a0f6" opacity="0.4"/>
  <path d="M 190 170 L 190 230 L 120 280 L 120 120 Z" fill="#8aadf4" opacity="0.5"/>
  <line x1="200" y1="280" x2="200" y2="300" stroke="#a6da95" stroke-width="2" />
  <text x="65" y="160" font-family="monospace" font-size="16" fill="#f5a97f">void</text>
  <text x="115" y="160" font-family="monospace" font-size="16" fill="#8aadf4">cast_rays</text>
  <text x="210" y="160" font-family="monospace" font-size="16" fill="#cad3f5">(t_game *g)</text>
  <text x="65" y="300" font-family="monospace" font-size="14" fill="#a5adcb">// DDA Algorithm Implementation</text>
</svg>
SVG
sed -i 's/^status:.*/status: "completed"\nthumbnail: "cube3d-thumb.svg"/' content/projects/graphics/cube3d.md

# FDF
cat << 'SVG' > content/attachments/fdf-thumb.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f5bde6" stop-opacity="0.15" /><stop offset="100%" stop-color="#c6a0f6" stop-opacity="0.05" /></linearGradient></defs>
  <rect width="400" height="400" fill="#24273a" />
  <circle cx="200" cy="200" r="150" fill="url(#g4)" filter="blur(40px)" />
  <rect x="40" y="80" width="320" height="240" rx="12" fill="#181926" stroke="#5b6078" stroke-width="2" />
  <circle cx="65" cy="105" r="6" fill="#ed8796" /><circle cx="85" cy="105" r="6" fill="#eed49f" /><circle cx="105" cy="105" r="6" fill="#a6da95" />
  <!-- Wireframe mesh -->
  <path d="M 100 220 L 150 190 L 200 200 L 250 170 L 300 190" fill="none" stroke="#f5bde6" stroke-width="2" />
  <path d="M 100 250 L 150 220 L 200 230 L 250 200 L 300 220" fill="none" stroke="#c6a0f6" stroke-width="2" />
  <path d="M 100 280 L 150 250 L 200 260 L 250 230 L 300 250" fill="none" stroke="#8aadf4" stroke-width="2" />
  
  <path d="M 100 220 L 100 280" fill="none" stroke="#5b6078" stroke-width="1" />
  <path d="M 150 190 L 150 250" fill="none" stroke="#5b6078" stroke-width="1" />
  <path d="M 200 200 L 200 260" fill="none" stroke="#5b6078" stroke-width="1" />
  <path d="M 250 170 L 250 230" fill="none" stroke="#5b6078" stroke-width="1" />
  <path d="M 300 190 L 300 250" fill="none" stroke="#5b6078" stroke-width="1" />
  <text x="65" y="150" font-family="monospace" font-size="16" fill="#cad3f5">isometric_projection(matrix);</text>
</svg>
SVG
sed -i 's/^status:.*/status: "completed"\nthumbnail: "fdf-thumb.svg"/' content/projects/graphics/fdf.md

# IRC
cat << 'SVG' > content/attachments/irc-thumb.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#91d7e3" stop-opacity="0.15" /><stop offset="100%" stop-color="#8aadf4" stop-opacity="0.05" /></linearGradient></defs>
  <rect width="400" height="400" fill="#24273a" />
  <circle cx="200" cy="200" r="150" fill="url(#g5)" filter="blur(40px)" />
  <rect x="40" y="80" width="320" height="240" rx="12" fill="#181926" stroke="#5b6078" stroke-width="2" />
  <circle cx="65" cy="105" r="6" fill="#ed8796" /><circle cx="85" cy="105" r="6" fill="#eed49f" /><circle cx="105" cy="105" r="6" fill="#a6da95" />
  <text x="65" y="160" font-family="monospace" font-size="14" fill="#a5adcb">[SERVER]</text>
  <text x="145" y="160" font-family="monospace" font-size="14" fill="#cad3f5">Listening on 6667...</text>
  
  <text x="65" y="200" font-family="monospace" font-size="14" fill="#8aadf4">[CLIENT]</text>
  <text x="145" y="200" font-family="monospace" font-size="14" fill="#cad3f5">NICK hippo</text>
  
  <text x="65" y="230" font-family="monospace" font-size="14" fill="#8aadf4">[CLIENT]</text>
  <text x="145" y="230" font-family="monospace" font-size="14" fill="#cad3f5">USER hippo 0 * :Hamza</text>

  <text x="65" y="270" font-family="monospace" font-size="14" fill="#a5adcb">[SERVER]</text>
  <text x="145" y="270" font-family="monospace" font-size="14" fill="#a6da95">001 hippo :Welcome!</text>
</svg>
SVG
sed -i 's/^status:.*/status: "completed"\nthumbnail: "irc-thumb.svg"/' content/projects/networking/irc.md

# Philosophers
cat << 'SVG' > content/attachments/philosophers-thumb.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs><linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#eed49f" stop-opacity="0.15" /><stop offset="100%" stop-color="#ed8796" stop-opacity="0.05" /></linearGradient></defs>
  <rect width="400" height="400" fill="#24273a" />
  <circle cx="200" cy="200" r="150" fill="url(#g6)" filter="blur(40px)" />
  <rect x="40" y="80" width="320" height="240" rx="12" fill="#181926" stroke="#5b6078" stroke-width="2" />
  <circle cx="65" cy="105" r="6" fill="#ed8796" /><circle cx="85" cy="105" r="6" fill="#eed49f" /><circle cx="105" cy="105" r="6" fill="#a6da95" />
  
  <text x="65" y="160" font-family="monospace" font-size="14" fill="#8aadf4">pthread_mutex_lock</text>
  <text x="220" y="160" font-family="monospace" font-size="14" fill="#cad3f5">(&fork[</text>
  <text x="285" y="160" font-family="monospace" font-size="14" fill="#f5a97f">1</text>
  <text x="295" y="160" font-family="monospace" font-size="14" fill="#cad3f5">]);</text>

  <text x="65" y="210" font-family="monospace" font-size="14" fill="#a5adcb">12ms</text>
  <text x="110" y="210" font-family="monospace" font-size="14" fill="#cad3f5">1 has taken a fork</text>
  
  <text x="65" y="240" font-family="monospace" font-size="14" fill="#a5adcb">12ms</text>
  <text x="110" y="240" font-family="monospace" font-size="14" fill="#cad3f5">1 has taken a fork</text>

  <text x="65" y="270" font-family="monospace" font-size="14" fill="#a5adcb">12ms</text>
  <text x="110" y="270" font-family="monospace" font-size="14" fill="#a6da95" font-weight="bold">1 is eating</text>
</svg>
SVG
sed -i 's/^status:.*/status: "completed"\nthumbnail: "philosophers-thumb.svg"/' content/projects/systems/philosophers.md

chmod +x generate_svgs.sh
./generate_svgs.sh
