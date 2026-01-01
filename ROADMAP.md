# 🛠️ Development Roadmap

### ✅ TODO List
- [ ] **Audio:** Implement smart ticker footer (Track info / Copyright loop).
- [ ] **UX:** Redesign entry gateway ("Welcome?" screen).
- [ ] **Meta:** Philosophy pivot (`e/acc` → `d/acc`).

---

### 1. 🎵 Smart Audio Footer
**Goal:** Create a dynamic, persistent footer for music playback.
* **Behavior:**
    * Default text: `@ 2026 amirinit`
    * Action: Cycles every ~5s to show `Now Playing: [Track Name]`.
* **Tech:** Lazy-load audio assets to improve initial TTI (Time to Interactive).

### 2. 🚪 Interactive Gateway
**Goal:** Replace current boot sequence with a minimal activation layer.
* **Design:** Black void style. Simple text: `Welcome?` + `Click anywhere to enter`.
* **Function:** Serves as the user-gesture trigger to unlock browser Autoplay policies seamlessly.

### 3. 🌐 d/acc Pivot
**Goal:** Align project branding with Decentralized Accelerationism.
* **Update:** Replace all `[ E/ACC ]` tags in `index.html` with `[ d/acc ]`.
* **Context:** Shift focus from raw speed to resilient/defensive acceleration.