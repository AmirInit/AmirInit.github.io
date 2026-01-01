# 🛠️ Development Roadmap

### ✅ TODO List
- [ ] **Audio:** Implement smart ticker footer (Track info / Copyright loop).
- [ ] **UX:** Refine boot sequence (Simplify prompt / Reduce friction).
- [ ] **Content:** Add Research & Code nodes (X, Scholar, Kaggle, HF).
- [ ] **Meta:** Philosophy pivot (`e/acc` → `d/acc`).

---

### 1. 🎵 Smart Audio Footer
**Goal:** Create a dynamic, persistent footer for music playback.
* **Behavior:**
    * Default text: `@ 2026 amirinit`
    * Action: Cycles every ~5s to show `Now Playing: [Track Name]`.
* **Tech:** Lazy-load audio assets to improve initial TTI.

### 2. ⚡ Boot Sequence Refinement
**Goal:** Simplify the entry experience while maintaining the terminal aesthetic.
* **Adjustments:**
    * Remove `--force` from the initial prompt text for a cleaner look.
    * Optimize the "Click to enter" interaction to be less intrusive.
    * *Optional:* Explore a minimal "Welcome" overlay if the terminal feels too heavy.

### 3. 🧠 Research & Social Nodes
**Goal:** Expand the grid to include academic and engineering profiles.
* **New Nodes:**
    * **X (Twitter):** For thoughts/threads.
    * **Google Scholar:** For academic papers.
    * **Kaggle:** For data science competitions.
    * **Hugging Face:** For model weights and datasets.

### 4. 🌐 d/acc Pivot
**Goal:** Align project branding with Decentralized Accelerationism.
* **Update:** Replace all `[ E/ACC ]` tags in `index.html` with `[ d/acc ]`.
* **Context:** Shift focus from raw speed to resilient/defensive acceleration.