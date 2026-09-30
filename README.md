# PYPY CYBERSECURITY SMART GRID — 3D Presentation Website (V2)

> **PYPY CYBERSECURITY SMART GRID**  
> *AI-Driven Cyber-Physical Defence for Smart Grid Digital Twin*  
> **Universiti Malaysia Perlis (UniMAP)** — FTKE 2026

An Apple-inspired 3D cinematic interactive presentation website featuring an interactive IEEE 39-Bus digital twin, real-time cyber-attack simulations, multi-model AI defense architecture, and autonomous self-healing closed-loop orchestration.

---

## 🌟 Key Features (V2 3D Architecture)

1. **3D Interactive IEEE 39-Bus Digital Twin**:
   - Built with WebGL, Three.js, and `@react-three/fiber` / `@react-three/drei`.
   - Scroll-driven camera choreography transitioning through 10 distinct presentation scenes.
   - Interactive bus node inspection (Voltage p.u., Active & Reactive Power MW/Mvar, Generator status).
   - Dynamic 3D cyber-shield frequency rings and particle dust effects.

2. **Real-Time Cyber-Attack Simulation**:
   - **FDIA (False Data Injection Attack)** on Bus 5 telemetry.
   - **Coordinated Breaker Trip** on Line L_line_0 (Bus 1 - Bus 2).
   - **Substation Load Infiltration** exceeding stability limits.

3. **AI Defense Stack (Chapter 4 Benchmarks)**:
   - **Bi-LSTM**: Temporal anomaly detection (98.7% accuracy, 12ms inference).
   - **GCN / PINN**: Physics-informed graph convolutional network for topology state validation.
   - **RL Consensus (PPO/DQN)**: Autonomous consensus decision engine with 0.0% data leakage.

4. **Autonomous Self-Healing Loop**:
   - Interactive recovery sandbox: Disconnect compromised breakers, reroute power flows, and restore voltage stability to `GRID SECURED` state within 14.2ms.

5. **Direct Live Dashboard Integration**:
   - Header and footer buttons directly link to the active PYPY Digital Twin Live Dashboard via Cloudflare Tunnel:
     `https://score-civilization-gnome-association.trycloudflare.com`

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **3D & Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS + Custom SCADA / Engineering Tokens
- **Motion & Storytelling**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
